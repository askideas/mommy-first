// Cart API Service
// Handles all cart-related API calls for both guest and authenticated users

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

// ============================================
// Helper Functions
// ============================================

/**
 * Get guest cart ID from localStorage
 * @returns {string|null} - The guest cart ID or null
 */
export const getGuestCartId = () => {
  return localStorage.getItem('guestCartId')
}

/**
 * Set guest cart ID in localStorage
 * @param {string} cartId - The cart ID to store
 */
export const setGuestCartId = (cartId) => {
  localStorage.setItem('guestCartId', cartId)
}

/**
 * Clear guest cart ID from localStorage
 */
export const clearGuestCartId = () => {
  localStorage.removeItem('guestCartId')
}

/**
 * Fetch authentication token for API calls
 * @returns {Promise<string|null>} - The auth token or null if failed
 */
const fetchAuthToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId: import.meta.env.VITE_API_CLIENT_ID,
        clientSecret: import.meta.env.VITE_API_CLIENT_SECRET
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    if (result.success && result.token) {
      return result.token
    } else {
      throw new Error(result.message || 'Failed to get authentication token')
    }
  } catch (error) {
    console.error('Error fetching auth token:', error)
    return null
  }
}

// ============================================
// Guest Cart Endpoints (No Authentication)
// ============================================

/**
 * Create a new guest cart
 * @param {string} [email] - Optional email for order notifications
 * @returns {Promise} - Response with cart data
 */
export const createGuestCart = async (email = null) => {
  try {
    const body = email ? { email } : {}

    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const result = await response.json()

    // Store cartId in localStorage if successful
    if (result.success && result.data?.cartId) {
      setGuestCartId(result.data.cartId)
    }

    return result
  } catch (error) {
    console.error('Create Guest Cart Error:', error)
    return { success: false, message: 'Failed to create cart. Please try again.' }
  }
}

/**
 * Get cart by cart ID (guest cart)
 * @param {string} cartId - The cart ID
 * @returns {Promise} - Response with cart data
 */
export const getCartById = async (cartId) => {
  try {
    const encodedCartId = encodeURIComponent(cartId)

    const response = await fetch(`${API_BASE_URL}/cart/${encodedCartId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.json()
  } catch (error) {
    console.error('Get Cart By ID Error:', error)
    return { success: false, message: 'Failed to fetch cart. Please try again.' }
  }
}

/**
 * Add items to guest cart
 * @param {string} cartId - The cart ID
 * @param {Array} items - Array of items to add [{variantId, quantity}]
 * @returns {Promise} - Response with updated cart data
 */
export const addItemsToGuestCart = async (cartId, items) => {
  try {
    const encodedCartId = encodeURIComponent(cartId)

    const response = await fetch(`${API_BASE_URL}/cart/${encodedCartId}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items })
    })

    return response.json()
  } catch (error) {
    console.error('Add Items to Guest Cart Error:', error)
    return { success: false, message: 'Failed to add items to cart. Please try again.' }
  }
}

/**
 * Update items in guest cart
 * @param {string} cartId - The cart ID
 * @param {Array} items - Array of items to update [{lineId, quantity}]
 * @returns {Promise} - Response with updated cart data
 */
export const updateGuestCartItems = async (cartId, items) => {
  try {
    const encodedCartId = encodeURIComponent(cartId)

    const response = await fetch(`${API_BASE_URL}/cart/${encodedCartId}/items`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items })
    })

    return response.json()
  } catch (error) {
    console.error('Update Guest Cart Items Error:', error)
    return { success: false, message: 'Failed to update cart items. Please try again.' }
  }
}

/**
 * Remove items from guest cart
 * @param {string} cartId - The cart ID
 * @param {Array} lineIds - Array of line IDs to remove
 * @returns {Promise} - Response with updated cart data
 */
export const removeItemsFromGuestCart = async (cartId, lineIds) => {
  try {
    const encodedCartId = encodeURIComponent(cartId)

    const response = await fetch(`${API_BASE_URL}/cart/${encodedCartId}/items`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lineIds })
    })

    return response.json()
  } catch (error) {
    console.error('Remove Items from Guest Cart Error:', error)
    return { success: false, message: 'Failed to remove items from cart. Please try again.' }
  }
}

// ============================================
// User Cart Endpoints (Authentication Required)
// ============================================

/**
 * Merge guest cart with user cart on login
 * Call this immediately after user logs in
 * @param {number} userId - The user's customer ID
 * @param {string} [guestCartId] - Optional guest cart ID from localStorage
 * @returns {Promise} - Response with merged cart data
 */
export const mergeCartsOnLogin = async (userId, guestCartId = null) => {
  try {
    const token = await fetchAuthToken()

    if (!token) {
      return { success: false, message: 'Failed to authenticate. Please try again.' }
    }

    const body = {
      userId,
      guestCartId: guestCartId || getGuestCartId()
    }

    const response = await fetch(`${API_BASE_URL}/cart/merge`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const result = await response.json()

    // Clear guest cartId after successful merge
    if (result.success) {
      clearGuestCartId()
    }

    return result
  } catch (error) {
    console.error('Merge Carts Error:', error)
    return { success: false, message: 'Failed to merge carts. Please try again.' }
  }
}

/**
 * Get user's cart (creates one if doesn't exist)
 * @param {number} userId - The user's customer ID
 * @returns {Promise} - Response with cart data
 */
export const getUserCart = async (userId) => {
  try {
    const token = await fetchAuthToken()

    if (!token) {
      return { success: false, message: 'Failed to authenticate. Please try again.' }
    }

    const response = await fetch(`${API_BASE_URL}/cart/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return response.json()
  } catch (error) {
    console.error('Get User Cart Error:', error)
    return { success: false, message: 'Failed to fetch cart. Please try again.' }
  }
}

/**
 * Add items to user's cart
 * @param {number} userId - The user's customer ID
 * @param {Array} items - Array of items to add [{variantId, quantity}]
 * @returns {Promise} - Response with updated cart data
 */
export const addItemsToUserCart = async (userId, items) => {
  try {
    const token = await fetchAuthToken()

    if (!token) {
      return { success: false, message: 'Failed to authenticate. Please try again.' }
    }

    const response = await fetch(`${API_BASE_URL}/cart/user/${userId}/items`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items })
    })

    return response.json()
  } catch (error) {
    console.error('Add Items to User Cart Error:', error)
    return { success: false, message: 'Failed to add items to cart. Please try again.' }
  }
}

/**
 * Update items in user's cart
 * @param {number} userId - The user's customer ID
 * @param {Array} items - Array of items to update [{lineId, quantity}]
 * @returns {Promise} - Response with updated cart data
 */
export const updateUserCartItems = async (userId, items) => {
  try {
    const token = await fetchAuthToken()

    if (!token) {
      return { success: false, message: 'Failed to authenticate. Please try again.' }
    }

    const response = await fetch(`${API_BASE_URL}/cart/user/${userId}/items`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items })
    })

    return response.json()
  } catch (error) {
    console.error('Update User Cart Items Error:', error)
    return { success: false, message: 'Failed to update cart items. Please try again.' }
  }
}

/**
 * Remove items from user's cart
 * @param {number} userId - The user's customer ID
 * @param {Array} lineIds - Array of line IDs to remove
 * @returns {Promise} - Response with updated cart data
 */
export const removeItemsFromUserCart = async (userId, lineIds) => {
  try {
    const token = await fetchAuthToken()

    if (!token) {
      return { success: false, message: 'Failed to authenticate. Please try again.' }
    }

    const response = await fetch(`${API_BASE_URL}/cart/user/${userId}/items`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lineIds })
    })

    return response.json()
  } catch (error) {
    console.error('Remove Items from User Cart Error:', error)
    return { success: false, message: 'Failed to remove items from cart. Please try again.' }
  }
}

// ============================================
// Unified Cart Functions (Auto-detect guest/user)
// ============================================

/**
 * Get cart - automatically uses user cart if logged in, guest cart otherwise
 * @param {number|null} userId - User ID if logged in, null for guest
 * @returns {Promise} - Response with cart data
 */
export const getCart = async (userId = null) => {
  if (userId) {
    return getUserCart(userId)
  } else {
    const cartId = getGuestCartId()
    if (cartId) {
      return getCartById(cartId)
    } else {
      // No cart exists, create one
      return createGuestCart()
    }
  }
}

/**
 * Add items to cart - automatically uses user cart if logged in, guest cart otherwise
 * @param {Array} items - Array of items to add [{variantId, quantity}]
 * @param {number|null} userId - User ID if logged in, null for guest
 * @returns {Promise} - Response with updated cart data
 */
export const addToCart = async (items, userId = null) => {
  if (userId) {
    return addItemsToUserCart(userId, items)
  } else {
    let cartId = getGuestCartId()

    // Create cart if doesn't exist
    if (!cartId) {
      const createResponse = await createGuestCart()
      if (!createResponse.success) {
        return createResponse
      }
      cartId = createResponse.data.cartId
    }

    return addItemsToGuestCart(cartId, items)
  }
}

/**
 * Update cart items - automatically uses user cart if logged in, guest cart otherwise
 * @param {Array} items - Array of items to update [{lineId, quantity}]
 * @param {number|null} userId - User ID if logged in, null for guest
 * @returns {Promise} - Response with updated cart data
 */
export const updateCartItems = async (items, userId = null) => {
  if (userId) {
    return updateUserCartItems(userId, items)
  } else {
    const cartId = getGuestCartId()
    if (!cartId) {
      return { success: false, message: 'No cart found' }
    }
    return updateGuestCartItems(cartId, items)
  }
}

/**
 * Remove items from cart - automatically uses user cart if logged in, guest cart otherwise
 * @param {Array} lineIds - Array of line IDs to remove
 * @param {number|null} userId - User ID if logged in, null for guest
 * @returns {Promise} - Response with updated cart data
 */
export const removeFromCart = async (lineIds, userId = null) => {
  if (userId) {
    return removeItemsFromUserCart(userId, lineIds)
  } else {
    const cartId = getGuestCartId()
    if (!cartId) {
      return { success: false, message: 'No cart found' }
    }
    return removeItemsFromGuestCart(cartId, lineIds)
  }
}

/**
 * Redirect to checkout
 * @param {string} checkoutUrl - The checkout URL from cart data
 */
export const goToCheckout = (checkoutUrl) => {
  if (checkoutUrl) {
    window.location.href = checkoutUrl
  }
}

/**
 * Initiate checkout
 * @param {string} cartId - The cart ID
 * @param {string} [customerAccessToken] - Optional customer access token
 * @returns {Promise} - Response with checkout URL
 */
export const initiateCheckout = async (cartId, customerAccessToken = null) => {
  try {
    const body = { cartId }
    if (customerAccessToken) {
      body.customerAccessToken = customerAccessToken
    }

    const response = await fetch(`${API_BASE_URL}/cart/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    return response.json()
  } catch (error) {
    console.error('Initiate Checkout Error:', error)
    return { success: false, message: 'Failed to initiate checkout. Please try again.' }
  }
}
