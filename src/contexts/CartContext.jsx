import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthContext'
import { 
    getCart, 
    addToCart as addToCartService, 
    updateCartItems as updateCartItemsService, 
    removeFromCart as removeFromCartService,
    getGuestCartId
} from '../services/cartService'

const CartContext = createContext()

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }
    return context
}

export const CartProvider = ({ children }) => {
    const { customer, isAuthenticated } = useAuth()
    const [cart, setCart] = useState(null)
    const [items, setItems] = useState([])
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [cartNotification, setCartNotification] = useState(null)

    // Show cart notification with product details
    const showCartNotification = (productName, productImage = null) => {
        setCartNotification({ name: productName, image: productImage, timestamp: Date.now() })
        setTimeout(() => {
            setCartNotification(null)
        }, 4000)
    }

    // Hide cart notification
    const hideCartNotification = () => {
        setCartNotification(null)
    }

    // Fetch cart on mount and when auth changes
    useEffect(() => {
        fetchCart()
    }, [customer?.id, isAuthenticated])

    const fetchCart = useCallback(async () => {
        // Only fetch if user is logged in OR there's a guest cart
        const guestCartId = getGuestCartId()
        if (!customer?.id && !guestCartId) {
            setCart(null)
            setItems([])
            setTotalQuantity(0)
            return
        }

        setIsLoading(true)
        try {
            const response = await getCart(customer?.id || null)
            console.log('Cart context - fetched cart:', response)
            
            if (response.success && response.data) {
                setCart(response.data)
                setItems(response.data.items || [])
                setTotalQuantity(response.data.totalQuantity || 0)
            } else {
                setCart(null)
                setItems([])
                setTotalQuantity(0)
            }
        } catch (error) {
            console.error('Error fetching cart:', error)
        } finally {
            setIsLoading(false)
        }
    }, [customer?.id])

    const addToCart = async (itemsToAdd) => {
        setIsUpdating(true)
        try {
            const response = await addToCartService(itemsToAdd, customer?.id || null)
            console.log('Cart context - add to cart response:', response)
            
            if (response.success && response.data) {
                setCart(response.data)
                setItems(response.data.items || [])
                setTotalQuantity(response.data.totalQuantity || 0)
                return { success: true, data: response.data }
            } else {
                return { success: false, message: response.message || 'Failed to add to cart' }
            }
        } catch (error) {
            console.error('Add to cart error:', error)
            return { success: false, message: 'Something went wrong' }
        } finally {
            setIsUpdating(false)
        }
    }

    const updateCartItems = async (itemsToUpdate) => {
        setIsUpdating(true)
        try {
            const response = await updateCartItemsService(itemsToUpdate, customer?.id || null)
            console.log('Cart context - update cart response:', response)
            
            if (response.success && response.data) {
                setCart(response.data)
                setItems(response.data.items || [])
                setTotalQuantity(response.data.totalQuantity || 0)
                return { success: true, data: response.data }
            } else {
                return { success: false, message: response.message || 'Failed to update cart' }
            }
        } catch (error) {
            console.error('Update cart error:', error)
            return { success: false, message: 'Something went wrong' }
        } finally {
            setIsUpdating(false)
        }
    }

    const removeFromCart = async (lineIds) => {
        setIsUpdating(true)
        try {
            const response = await removeFromCartService(lineIds, customer?.id || null)
            console.log('Cart context - remove from cart response:', response)
            
            if (response.success && response.data) {
                setCart(response.data)
                setItems(response.data.items || [])
                setTotalQuantity(response.data.totalQuantity || 0)
                return { success: true, data: response.data }
            } else {
                return { success: false, message: response.message || 'Failed to remove from cart' }
            }
        } catch (error) {
            console.error('Remove from cart error:', error)
            return { success: false, message: 'Something went wrong' }
        } finally {
            setIsUpdating(false)
        }
    }

    const clearCart = () => {
        setCart(null)
        setItems([])
        setTotalQuantity(0)
    }

    const value = {
        cart,
        items,
        totalQuantity,
        isLoading,
        isUpdating,
        cartNotification,
        showCartNotification,
        hideCartNotification,
        fetchCart,
        addToCart,
        updateCartItems,
        removeFromCart,
        clearCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
