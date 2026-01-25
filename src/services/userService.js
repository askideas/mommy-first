// User API Service
// Handles all user-related API calls

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

/**
 * Fetch authentication token for API calls
 * @returns {Promise<string|null>} - The auth token or null if failed
 */
export const fetchAuthToken = async () => {
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

/**
 * Get user details by ID
 * @param {number} userId - The Shopify customer ID
 * @returns {Promise} - Response with user data
 */
export const getUserDetails = async (userId) => {
  try {
    const token = await fetchAuthToken()
    
    if (!token) {
      return { success: false, message: 'Failed to authenticate. Please try again.' }
    }
    
    const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    
    return response.json()
  } catch (error) {
    console.error('Get User Details Error:', error)
    return { success: false, message: 'Failed to fetch user details. Please try again.' }
  }
}

/**
 * Update user details by ID
 * @param {number} userId - The Shopify customer ID
 * @param {Object} userData - User data to update
 * @param {string} [userData.firstName] - User's first name
 * @param {string} [userData.lastName] - User's last name
 * @param {string} [userData.email] - User's email address
 * @param {string} [userData.phone] - User's phone number
 * @param {Object} [userData.metafields] - User's custom metafields
 * @param {string} [userData.metafields.nationality] - User's nationality
 * @param {string} [userData.metafields.gender] - User's gender
 * @param {string} [userData.metafields.due_date] - User's due date (YYYY-MM-DD)
 * @param {string} [userData.metafields.date_of_birth] - User's date of birth (YYYY-MM-DD)
 * @returns {Promise} - Response with updated user data
 */
export const updateUserDetails = async (userId, userData) => {
  try {
    const token = await fetchAuthToken()
    
    if (!token) {
      return { success: false, message: 'Failed to authenticate. Please try again.' }
    }
    
    const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    
    return response.json()
  } catch (error) {
    console.error('Update User Details Error:', error)
    return { success: false, message: 'Failed to update user details. Please try again.' }
  }
}

/**
 * Update user profile for new customers
 * @param {number} userId - The Shopify customer ID
 * @param {Object} updatePayload - The complete update payload in API format
 * @returns {Promise} - Response with updated customer data
 */
export const updateNewUserProfile = async (userId, updatePayload) => {
  try {
    const token = await fetchAuthToken()
    
    if (!token) {
      console.error('Failed to get auth token')
      return { success: false, message: 'Failed to authenticate. Please try again.' }
    }
    
    console.log('Auth token obtained successfully')
    console.log('PUT request to:', `${API_BASE_URL}/user/${userId}`)
    console.log('Request payload:', JSON.stringify(updatePayload, null, 2))
    
    const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatePayload)
    })
    
    console.log('Response status:', response.status)
    
    const result = await response.json()
    console.log('Response data:', result)
    
    return result
  } catch (error) {
    console.error('Update New User Profile Error:', error)
    return { success: false, message: 'Failed to update profile. Please try again.' }
  }
}

/**
 * Create a new address for user
 * @param {number} userId - The Shopify customer ID
 * @param {Object} addressData - Address data to create
 * @returns {Promise} - Response with created address data
 */
export const createUserAddress = async (userId, addressData) => {
  try {
    const token = await fetchAuthToken()
    
    if (!token) {
      return { success: false, message: 'Failed to authenticate. Please try again.' }
    }
    
    const response = await fetch(`${API_BASE_URL}/user/${userId}/address`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addressData)
    })
    
    return response.json()
  } catch (error) {
    console.error('Create Address Error:', error)
    return { success: false, message: 'Failed to create address. Please try again.' }
  }
}

/**
 * Update an existing address
 * @param {number} userId - The Shopify customer ID
 * @param {number} addressId - The address ID to update
 * @param {Object} addressData - Address data to update
 * @returns {Promise} - Response with updated address data
 */
export const updateUserAddress = async (userId, addressId, addressData) => {
  try {
    const token = await fetchAuthToken()
    
    if (!token) {
      return { success: false, message: 'Failed to authenticate. Please try again.' }
    }
    
    const response = await fetch(`${API_BASE_URL}/user/${userId}/address/${addressId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addressData)
    })
    
    return response.json()
  } catch (error) {
    console.error('Update Address Error:', error)
    return { success: false, message: 'Failed to update address. Please try again.' }
  }
}

/**
 * Delete an address
 * @param {number} userId - The Shopify customer ID
 * @param {number} addressId - The address ID to delete
 * @returns {Promise} - Response with deletion status
 */
export const deleteUserAddress = async (userId, addressId) => {
  try {
    const token = await fetchAuthToken()
    
    if (!token) {
      return { success: false, message: 'Failed to authenticate. Please try again.' }
    }
    
    const response = await fetch(`${API_BASE_URL}/user/${userId}/address/${addressId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    
    return response.json()
  } catch (error) {
    console.error('Delete Address Error:', error)
    return { success: false, message: 'Failed to delete address. Please try again.' }
  }
}

/**
 * Set an address as default
 * @param {number} userId - The Shopify customer ID
 * @param {number} addressId - The address ID to set as default
 * @returns {Promise} - Response with updated address data
 */
export const setDefaultAddress = async (userId, addressId) => {
  try {
    const token = await fetchAuthToken()
    
    if (!token) {
      return { success: false, message: 'Failed to authenticate. Please try again.' }
    }
    
    const response = await fetch(`${API_BASE_URL}/user/${userId}/address/${addressId}/default`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    
    return response.json()
  } catch (error) {
    console.error('Set Default Address Error:', error)
    return { success: false, message: 'Failed to set default address. Please try again.' }
  }
}
