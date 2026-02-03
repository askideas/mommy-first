import React, { useState, useEffect } from 'react'
import './ProductTile.css'
import { Heart, Loader2, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DefaultImg from '../../assets/default.png'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { addToWishlist, removeFromWishlist } from '../../services/userService'
import { toast } from 'react-toastify'

const ProductTile = (props) => {
    const product = props.data;
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const { user, customer, isInWishlist: checkIsInWishlist, addToWishlistHandles, removeFromWishlistHandles } = useAuth()
    const [isAdding, setIsAdding] = useState(false)
    const [isAdded, setIsAdded] = useState(false)
    const [error, setError] = useState('')
    const [isWishlisting, setIsWishlisting] = useState(false)
    const [isInWishlist, setIsInWishlist] = useState(false)

    // Check if product is in wishlist using AuthContext
    useEffect(() => {
        if (user && product?.handle) {
            setIsInWishlist(checkIsInWishlist(product.handle))
        } else {
            setIsInWishlist(false)
        }
    }, [user, product, checkIsInWishlist])

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

    const handleWishlist = async (e) => {
        e.stopPropagation() // Prevent navigation to product details
        
        // Check if user is logged in
        if (!user || !customer) {
            // Open login modal
            const loginButton = document.querySelector('[data-bs-target="#loginoffcanvas"]')
            if (loginButton) {
                loginButton.click()
            }
            return
        }

        if (isWishlisting) return

        setIsWishlisting(true)

        try {
            const userId = customer.id
            const productHandle = product.handle

            let response
            if (isInWishlist) {
                // Remove from wishlist
                response = await removeFromWishlist(userId, productHandle)
            } else {
                // Add to wishlist
                response = await addToWishlist(userId, productHandle)
            }

            if (response.success) {
                setIsInWishlist(!isInWishlist)
                
                // Update wishlist handles in AuthContext
                if (isInWishlist) {
                    removeFromWishlistHandles(productHandle)
                } else {
                    addToWishlistHandles(productHandle)
                }
                
                toast.success(!isInWishlist ? 'Added to wishlist!' : 'Removed from wishlist', {
                    autoClose: 1500,
                    hideProgressBar: true
                })
            } else {
                console.error('Wishlist error:', response.message)
                toast.error(response.message || 'Failed to update wishlist', {
                    autoClose: 1500,
                    hideProgressBar: true
                })
            }
        } catch (err) {
            console.error('Wishlist error:', err)
            toast.error('Something went wrong', {
                autoClose: 1500,
                hideProgressBar: true
            })
        } finally {
            setIsWishlisting(false)
        }
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
                    {isWishlisting ? (
                        <Loader2 className="wishlist-spinner" size={20} />
                    ) : (
                        <Heart 
                            className={`wishlist ${isInWishlist ? 'filled' : ''}`}
                            onClick={handleWishlist}
                            fill={isInWishlist ? 'currentColor' : 'none'}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductTile