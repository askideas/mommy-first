import React, { useState } from 'react'
import './WishlistProductTile.css'
import { Heart, X, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { toast } from 'react-toastify'
import DefaultImg from '../../assets/default.png'

const WishlistProductTile = ({ data, onRemove }) => {
    const product = data
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const [isRemoving, setIsRemoving] = useState(false)
    const [isAddingToCart, setIsAddingToCart] = useState(false)

    const handleAddToBag = async (e) => {
        e.stopPropagation()
        
        if (!product.available_for_sale) {
            toast.error('This product is currently unavailable')
            return
        }

        setIsAddingToCart(true)
        try {
            // You'll need to get the variant ID - for now using the product handle
            // In a real scenario, you'd fetch product details to get the default variant ID
            await addToCart([{ 
                variantId: product.graphql_id.replace('Product', 'ProductVariant') + '/1', 
                quantity: 1 
            }])
            toast.success('Added to cart!')
        } catch (error) {
            console.error('Error adding to cart:', error)
            toast.error('Failed to add to cart')
        } finally {
            setIsAddingToCart(false)
        }
    }

    const handleRemove = async (e) => {
        e.stopPropagation()
        setIsRemoving(true)
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
                        className='button-pink-border wishlist-add-to-bag'
                        onClick={handleAddToBag}
                        disabled={isAddingToCart || !product.available_for_sale}
                    >
                        {isAddingToCart ? (
                            <><Loader2 className="spinner" size={14} /> Adding...</>
                        ) : (
                            'Add to Bag'
                        )}
                    </button>
                    <button 
                        className='button-pink-center remove-item' 
                        onClick={handleRemove}
                        disabled={isRemoving}
                    >
                        {isRemoving ? <Loader2 className="spinner" size={14} /> : <X />}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WishlistProductTile
