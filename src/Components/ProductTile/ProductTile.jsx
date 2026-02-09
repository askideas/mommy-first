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
    const { user, customer, addToWishlistHandles, removeFromWishlistHandles, wishlistHandles } = useAuth()
    const [isAdding, setIsAdding] = useState(false)
    const [isAdded, setIsAdded] = useState(false)
    const [error, setError] = useState('')
    const [isWishlisting, setIsWishlisting] = useState(false)
    const [isInWishlist, setIsInWishlist] = useState(false)
    const { isAuthenticated } = useAuth();

    // Check if product is available for sale
    const isOutOfStock = product.availableForSale === false || 
                         product.variants?.[0]?.availableForSale === false ||
                         product.inventory === 0 ||
                         product.totalInventory === 0

    // Check if product is in wishlist using AuthContext
    useEffect(() => {
        if (customer && product?.handle) {
            var wishlistItems = wishlistHandles;
            setIsInWishlist(
                wishlistItems.includes(product.handle)
            )
        } else {
            setIsInWishlist(false)
        }
    }, [customer, product])

    const handleAddToCart = async (e) => {
        e.stopPropagation() // Prevent navigation to product details
        
        if (isAdding || isAdded || isOutOfStock) return
        
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
                toast.success('Product added to cart!', {
                    autoClose: 1500,
                    hideProgressBar: true
                })
                // Reset after 2 seconds
                setTimeout(() => {
                    setIsAdded(false)
                }, 2000)
            } else {
                setError(response.message || 'Failed to add')
                toast.error(response.message || 'Failed to add product', {
                    autoClose: 1500,
                    hideProgressBar: true
                })
                setTimeout(() => setError(''), 3000)
            }
        } catch (err) {
            console.error('Add to cart error:', err)
            setError('Something went wrong')
            toast.error('Something went wrong', {
                autoClose: 1500,
                hideProgressBar: true
            })
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
        <div className={`product-tile-container ${isOutOfStock ? 'out-of-stock' : ''}`} onClick={() => navigate(`/shop/${product.handle}`)}>
            <p className={`pt-label ${product.label ? '' : 'd-none'}`}>{product.label}</p>
            {/* {isOutOfStock && <span className="out-of-stock-badge">Out of Stock</span>} */}
            <div className="prd-image-wrapper">
                <img src={product.image || DefaultImg} alt="" className='prd-image' onError={(e) => e.target.src = DefaultImg} />
                {/* {isOutOfStock && <div className="out-of-stock-overlay"></div>} */}
            </div>
            <div className="product-details-con">
                <p className="prd-name">{product.name || product.title}</p>
                <p className="prd-price">${product.price}USD</p>
                <div className='btn-section-con'>
                    <button 
                        className={`addtobag ${isAdded ? 'added' : ''} ${error ? 'error' : ''} ${isOutOfStock ? 'out-of-stock-btn' : ''}`}
                        onClick={handleAddToCart}
                        disabled={isAdding || isOutOfStock}
                    >
                        {isOutOfStock ? (
                            'Out of Stock'
                        ) : isAdding ? (
                            <><Loader2 className="spinner" size={14} /> Adding...</>
                        ) : isAdded ? (
                            <>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0013 18.3337C14.6037 18.3337 18.3346 14.6027 18.3346 10.0003C18.3346 5.39795 14.6037 1.66699 10.0013 1.66699C5.39893 1.66699 1.66797 5.39795 1.66797 10.0003C1.66797 14.6027 5.39893 18.3337 10.0013 18.3337Z" fill="white"/>
                                <path d="M5.90625 10L8.40625 12.5L13.4062 7.5" stroke="#5ED34B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Added</>
                        ) : error ? (
                            error
                        ) : (
                            'Add to Bag'
                        )}
                    </button>
                    {isWishlisting ? (
                        <Loader2 className="wishlist-spinner" size={20} />
                    ) : (
                        <>
                            {!isOutOfStock && <Heart 
                                className={`wishlist ${isInWishlist ? 'filled' : ''} ${isAuthenticated ? 'd-none' : ''}`}
                                onClick={handleWishlist}
                                data-bs-toggle={isAuthenticated ? undefined : "offcanvas"} 
                                data-bs-target={isAuthenticated ? undefined : "#AuthenticationModal"} 
                                fill={isInWishlist ? 'currentColor' : 'none'}
                            />}

                            {!isOutOfStock && <Heart 
                                className={`wishlist ${isInWishlist ? 'filled' : ''} ${isAuthenticated ? '' : 'd-none'}`}
                                onClick={handleWishlist}
                                fill={isInWishlist ? 'currentColor' : 'none'}
                            />}
                        </>
                        
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductTile