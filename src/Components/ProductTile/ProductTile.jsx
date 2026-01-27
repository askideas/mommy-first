import React, { useState } from 'react'
import './ProductTile.css'
import { Heart, Loader2, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DefaultImg from '../../assets/default.png'
import { useCart } from '../../contexts/CartContext'

const ProductTile = (props) => {
    const product = props.data;
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const [isAdding, setIsAdding] = useState(false)
    const [isAdded, setIsAdded] = useState(false)
    const [error, setError] = useState('')

    const handleAddToCart = async (e) => {
        e.stopPropagation() // Prevent navigation to product details
        
        if (isAdding || isAdded) return
        
        setIsAdding(true)
        setError('')

        try {
            // Use variantId if available, otherwise construct from product id
            const variantId = product.variantId || product.variants?.[0]?.id || `gid://shopify/ProductVariant/${product.id}`
            
            const items = [{
                variantId: variantId,
                quantity: 1
            }]

            console.log('Adding to cart:', items)
            const response = await addToCart(items)
            console.log('Add to cart response:', response)

            if (response.success) {
                setIsAdded(true)
                // Reset after 2 seconds
                setTimeout(() => {
                    setIsAdded(false)
                }, 2000)
            } else {
                setError(response.message || 'Failed to add')
                setTimeout(() => setError(''), 3000)
            }
        } catch (err) {
            console.error('Add to cart error:', err)
            setError('Something went wrong')
            setTimeout(() => setError(''), 3000)
        } finally {
            setIsAdding(false)
        }
    }

    const handleWishlist = (e) => {
        e.stopPropagation() // Prevent navigation to product details
        // Wishlist functionality can be added here
        console.log('Add to wishlist:', product.id)
    }

    return (
        <div className={`product-tile-container`} onClick={() => navigate(`/shop/${product.handle}`)}>
            <p className={`pt-label ${product.label ? '' : 'd-none'}`}>{product.label}</p>
            <img src={product.image || DefaultImg} alt="" className='prd-image' onError={(e) => e.target.src = DefaultImg} />
            <div className="product-details-con">
                <p className="prd-name">{product.name || product.title}</p>
                <p className="prd-price">${product.price}USD</p>
                <div className='btn-section-con'>
                    <button 
                        className={`addtobag ${isAdded ? 'added' : ''} ${error ? 'error' : ''}`}
                        onClick={handleAddToCart}
                        disabled={isAdding}
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
                    <Heart className='wishlist' onClick={handleWishlist} />
                </div>
            </div>
        </div>
    )
}

export default ProductTile