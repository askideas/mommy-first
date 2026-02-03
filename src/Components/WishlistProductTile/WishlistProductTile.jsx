import React, { useState } from 'react'
import './WishlistProductTile.css'
import { Heart, X, Loader2, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { toast } from 'react-toastify'
import DefaultImg from '../../assets/default.png'
import { getProductDetails } from '../../services/productService'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'

const WishlistProductTile = ({ data, onRemove }) => {
    const product = data
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const [isRemoving, setIsRemoving] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [isAdded, setIsAdded] = useState(false)
    const [error, setError] = useState('')
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const handleAddToBag = async (e) => {
        e.stopPropagation()
        
        if (!product.available_for_sale) {
            toast.error('This product is currently unavailable')
            return
        }

        if (isAdding || isAdded) return
        
        setIsAdding(true)
        setError('')

        try {
            // Fetch product details to get the actual variant ID
            console.log('Fetching product details for:', product.handle)
            const productResponse = await getProductDetails(product.handle)
            
            if (!productResponse.success || !productResponse.data?.variants?.length) {
                console.error('Failed to get product details:', productResponse)
                setError('Product not found')
                toast.error('Unable to add product to cart')
                setTimeout(() => setError(''), 3000)
                setIsAdding(false)
                return
            }

            // Get the first variant (default variant) - this is the correct variant ID
            const variantId = productResponse.data.variants[0].id
            
            const items = [{
                variantId: variantId,
                quantity: 1
            }]

            console.log('Adding to cart with variant ID:', variantId)
            const response = await addToCart(items)
            console.log('Add to cart response:', response)

            if (response.success) {
                setIsAdded(true)
                toast.success('Added to cart!')
                
                // Remove from wishlist after successful add to cart
                if (onRemove) {
                    setTimeout(async () => {
                        await onRemove(product.handle)
                    }, 500)
                }
            } else {
                setError(response.message || 'Failed to add')
                toast.error(response.message || 'Failed to add to cart')
                setTimeout(() => setError(''), 3000)
            }
        } catch (err) {
            console.error('Add to cart error:', err)
            setError('Something went wrong')
            toast.error('Something went wrong')
            setTimeout(() => setError(''), 3000)
        } finally {
            setIsAdding(false)
        }
    }

    const handleRemove = async (e) => {
        e.stopPropagation()
        setShowConfirmModal(true)
    }

    const confirmRemove = async () => {
        setIsRemoving(true)
        setShowConfirmModal(false)
        try {
            await onRemove(product.handle)
        } catch (error) {
            console.error('Error removing from wishlist:', error)
        } finally {
            setIsRemoving(false)
        }
    }

    const formatPrice = (price, currency = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(price)
    }

    return (
        <>
            <div 
                className={`wishlist-product-tile-container`} 
                onClick={() => navigate(`/shop/${product.handle}`)}
            >
                {!product.available_for_sale && (
                <p className="wpt-label">Out of Stock</p>
            )}
            <img 
                src={product.image || DefaultImg} 
                alt={product.title} 
                className='wishlist-prd-image'
                onError={(e) => e.target.src = DefaultImg}
            />
            <div className="wishlist-product-details-con">
                <p className="wishlist-prd-name">{product.title}</p>
                <p className="wishlist-prd-price">
                    {formatPrice(product.price, product.currency)}
                </p>
                <div className='wishlist-btn-section-con'>
                    <button 
                        className={`button-pink-border wishlist-add-to-bag ${isAdded ? 'added' : ''} ${error ? 'error' : ''}`}
                        onClick={handleAddToBag}
                        disabled={isAdding || !product.available_for_sale || isRemoving}
                    >
                        {isAdding ? (
                            <><Loader2 className="spinner" size={14} /> Adding...</>
                        ) : isAdded ? (
                            <><Check size={14} /> Added!</>
                        ) : error ? (
                            error
                        ) : (
                            'Add to Bag'
                        )}
                    </button>
                    <button 
                        className='button-pink-center remove-item' 
                        onClick={handleRemove}
                        disabled={isRemoving || isAdding}
                    >
                        {isRemoving ? <Loader2 className="spinner" size={14} /> : <X />}
                    </button>
                </div>
            </div>
        </div>

        <ConfirmationModal
            isOpen={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
            onConfirm={confirmRemove}
            title="Remove from Wishlist"
            message="Are you sure you want to remove this item from your wishlist?"
            confirmText="Yes, Remove"
            cancelText="Cancel"
            isLoading={isRemoving}
        />
        </>
    )
}

export default WishlistProductTile
