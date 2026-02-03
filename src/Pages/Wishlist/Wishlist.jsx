import React, { useState, useEffect } from 'react'
import './Wishlist.css'
import HeroImage from '../../assets/hero-label.png'
import HeroImageLabel from '../../Components/HeroImageLabel/HeroImageLabel'
import WishlistProductTile from '../../Components/WishlistProductTile/WishlistProductTile'
import { useAuth } from '../../contexts/AuthContext'
import { getWishlist, removeFromWishlistNew } from '../../services/userService'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import WishlistImage from '../../assets/wishlist-heart-image.svg'

const Wishlist = () => {
    const { customer, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const [wishlistItems, setWishlistItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentCount, setCurrentCount] = useState(16)
    const PRODUCTS_PER_PAGE = 16

    const HeroLabel = {
        image: HeroImage,
        text: 'Designed to Maximize Comfort for Expecting Moms',
        height: 280,
        pwidth: 487
    }

    // Fetch wishlist on mount
    useEffect(() => {
        if (isAuthenticated && customer?.id) {
            fetchWishlist()
        }
    }, [customer?.id, isAuthenticated])

    const fetchWishlist = async () => {
        const userId = customer?.id
        if (!userId) {
            navigate('/profile')
            return
        }

        setIsLoading(true)
        try {
            const response = await getWishlist(userId)
            console.log('Wishlist response:', response)
            
            if (response.success) {
                setWishlistItems(response.data || [])
            } else {
                toast.error(response.message || 'Failed to load wishlist')
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error)
            toast.error('Failed to load wishlist')
        } finally {
            setIsLoading(false)
        }
    }

    const handleRemoveFromWishlist = async (productHandle) => {
        const userId = customer?.id
        if (!userId) {
            toast.error('Please log in to manage your wishlist')
            return
        }

        try {
            const response = await removeFromWishlistNew(userId, productHandle)
            
            if (response.success) {
                // Remove item from local state
                setWishlistItems(prev => prev.filter(item => item.handle !== productHandle))
                toast.success('Removed from wishlist')
            } else {
                toast.error(response.message || 'Failed to remove item')
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error)
            toast.error('Failed to remove item')
        }
    }

    // Handle Load More button click
    const handleLoadMore = () => {
        setCurrentCount(prev => Math.min(prev + PRODUCTS_PER_PAGE, wishlistItems.length))
    }

    // Get displayed products based on currentCount
    const displayedProducts = wishlistItems.slice(0, currentCount)
    
    // Calculate progress percentage
    const progressPercentage = wishlistItems.length > 0 
        ? (currentCount / wishlistItems.length) * 100 
        : 0

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="wishlist-page-container">
                <HeroImageLabel data={HeroLabel} />
                <div className="container">
                    <div className="wishlist-items-main-container">
                        <div className="empty-wishlist-page">
                            <img src={WishlistImage} alt="Wishlist" />
                            <h3>Please log in to view your wishlist</h3>
                            <button className='button-pink-center' onClick={() => navigate('/profile')}>
                                LOG IN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className="wishlist-page-container">
        <HeroImageLabel data={HeroLabel} />
        <div className="container">
            {isLoading ? (
                <div className="wishlist-loading-page">
                    <Loader2 className="spinner" size={40} />
                    <p>Loading your wishlist...</p>
                </div>
            ) : wishlistItems.length === 0 ? (
                <div className="wishlist-items-main-container">
                    <div className="empty-wishlist-page">
                        <img src={WishlistImage} alt="Wishlist" />
                        <h3>Wishlist is empty</h3>
                        <p>You don't have any products <br /> in the wishlist yet.</p>
                        <button className='button-pink-center' onClick={() => navigate('/shop')}>
                            RETURN TO SHOP
                        </button>
                    </div>
                </div>
            ) : (
                <div className="wishlist-items-main-container">
                    <div className="wishlist-items">
                        {displayedProducts.map((product, index) => (
                            <WishlistProductTile 
                                data={product} 
                                key={product.id + '-' + index}
                                onRemove={handleRemoveFromWishlist}
                            />
                        ))}
                    </div>
                    {/* <div className="d-flex flex-column justify-content-center align-items-center">
                        <p className='wishlist-progress-bar-text'>
                            You've seen {currentCount} out of {wishlistItems.length} items
                        </p>
                        <div className="wishlist-progress-bar-con">
                            <span style={{ width: `${progressPercentage}%` }}></span>
                        </div>
                        {currentCount < wishlistItems.length && (
                            <button 
                                className='button-label' 
                                onClick={handleLoadMore}
                            >
                                Load more
                            </button>
                        )}
                    </div> */}
                </div>
            )}
        </div>
    </div>
  )
}

export default Wishlist