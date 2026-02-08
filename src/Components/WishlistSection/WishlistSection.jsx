import React, { useState, useEffect } from 'react'
import './WishlistSection.css'
import Heart from '../../assets/profile/heart.svg'
import { Loader2, Heart as HeartIcon } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { getWishlist, removeFromWishlistNew } from '../../services/userService'
import WishlistProductTile from '../WishlistProductTile/WishlistProductTile'
import { toast } from 'react-toastify'
import WishlistImage from '../../assets/wishlist-heart-image.svg'
import { useNavigate } from 'react-router-dom'
import ProfileSkeletonLoader from '../ProfileSkeletonLoader/ProfileSkeletonLoader'

const WishlistSection = () => {
    const { user, customer, removeFromWishlistHandles } = useAuth()
    const [wishlistItems, setWishlistItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const navigate = useNavigate();

    useEffect(() => {
        fetchWishlist()
    }, [customer?.id])

    const fetchWishlist = async () => {
        const userId = customer?.id || user?.userId
        if (!userId) return

        setIsLoading(true)
        try {
            const response = await getWishlist(userId)
            console.log('Wishlist response:', response)
            
            if (response.success) {
                setWishlistItems(response.data || [])
            } else {
                setMessage({ type: 'error', text: response.message || 'Failed to load wishlist' })
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error)
            setMessage({ type: 'error', text: 'Failed to load wishlist' })
        } finally {
            setIsLoading(false)
        }
    }

    const handleRemoveFromWishlist = async (productHandle) => {
        const userId = customer?.id || user?.userId
        if (!userId) {
            toast.error('Please log in to manage your wishlist')
            return
        }

        try {
            const response = await removeFromWishlistNew(userId, productHandle)
            
            if (response.success) {
                // Remove item from local state
                setWishlistItems(prev => prev.filter(item => item.handle !== productHandle))
                // Update global wishlist state in AuthContext
                removeFromWishlistHandles(productHandle)
                toast.success('Removed from wishlist')
            } else {
                toast.error(response.message || 'Failed to remove item')
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error)
            toast.error('Failed to remove item')
        }
    }

    return (
        <div className="wishlist-section-container">
            <div className="wishlist-section-header">
                <p className='heading'>
                    <img src={Heart} alt="Wishlist" />
                    <span>My Wishlist</span>
                </p>
            </div>

            {isLoading && (
                <ProfileSkeletonLoader type="wishlist" />
            )}

            {!isLoading && message.text && (
                <div className={`wishlist-message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="wishlist-section-body">
                {wishlistItems.length === 0 && !isLoading ? (
                    <div className="empty-wishlist">
                        <img src={WishlistImage} alt="" />
                        <h3>Wishlist is empty</h3>
                        <p>You don't have any products <br /> in the wishlist yet.</p>
                        <button className='button-pink-center' onClick={()=>navigate('/shop')}>RETURN TO SHOP</button>
                    </div>
                ) : (
                    <div className="wishlist-products-grid">
                        {wishlistItems.map((product) => (
                            <WishlistProductTile 
                                key={product.id} 
                                data={product}
                                onRemove={handleRemoveFromWishlist}
                            />
                        ))}
                    </div>
                )}
            </div>

            {wishlistItems.length > 0 && (
                <div className="wishlist-section-footer">
                    <p className="wishlist-count">
                        {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
                    </p>
                </div>
            )}
        </div>
    )
}

export default WishlistSection