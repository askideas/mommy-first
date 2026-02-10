import React, { useState } from 'react'
import './WishlistListItem.css'
import { Loader2, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { toast } from 'react-toastify'
import DefaultImg from '../../assets/default.png'
import { getProductDetails } from '../../services/productService'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'

const WishlistListItem = ({ data, onRemove }) => {
    const product = data
    const navigate = useNavigate()
    const { addToCart, showCartNotification } = useCart()
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
                showCartNotification(product?.title || 'Product', product?.image)
                
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
                className="wishlist-list-item" 
                onClick={() => navigate(`/shop/${product.handle}`)}
            >
                <div className="wishlist-item-image">
                    <img 
                        src={product.image || DefaultImg} 
                        alt={product.title} 
                        onError={(e) => e.target.src = DefaultImg}
                    />
                </div>

                <div className="wishlist-item-info">
                    <p className="wishlist-item-name">{product.title}</p>
                    {product.variant_title && (
                        <p className="wishlist-item-variant">{product.variant_title}</p>
                    )}
                    <button 
                        className='wishlist-item-remove' 
                        onClick={handleRemove}
                        disabled={isRemoving || isAdding}
                    >
                        {isRemoving ? (
                            <Loader2 className="spinner" size={14} />
                        ) : (
                            <>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                </svg>
                                Remove
                            </>
                        )}
                    </button>
                    {!product.available_for_sale && (
                        <span className="wishlist-item-out-of-stock">Out of Stock</span>
                    )}
                </div>

                <div className="wishlist-item-price">
                    <p>{formatPrice(product.price, product.currency)}</p>
                </div>

                <div className="wishlist-item-action">
                    <button 
                        className={`button-pink-center wishlist-item-add-btn ${isAdded ? 'added' : ''} ${error ? 'error' : ''}`}
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

export default WishlistListItem
