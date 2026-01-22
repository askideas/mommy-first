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
 * @param {Object} profileData - Profile data to update
 * @param {string} profileData.firstName - User's first name
 * @param {string} profileData.lastName - User's last name
 * @param {string} [profileData.gender] - User's gender
 * @param {string} [profileData.dateOfBirth] - User's date of birth (YYYY-MM-DD)
 * @param {string} [profileData.dueDate] - User's due date (YYYY-MM-DD)
 * @param {string} [profileData.nationality] - User's nationality
 * @returns {Promise} - Response with updated customer data
 */
export const updateNewUserProfile = async (userId, profileData) => {
  try {
    const token = await fetchAuthToken()
    
    if (!token) {
      return { success: false, message: 'Failed to authenticate. Please try again.' }
    }
    
    // Build the update payload with metafields
    const updatePayload = {
      firstName: profileData.firstName,
      lastName: profileData.lastName
    }
    
    // Add metafields if provided
    const metafields = {}
    if (profileData.gender) metafields.gender = profileData.gender
    if (profileData.dateOfBirth) metafields.date_of_birth = profileData.dateOfBirth
    if (profileData.dueDate) metafields.due_date = profileData.dueDate
    if (profileData.nationality) metafields.nationality = profileData.nationality
    
    if (Object.keys(metafields).length > 0) {
      updatePayload.metafields = metafields
    }
    
    const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatePayload)
    })
    
    return response.json()
  } catch (error) {
    console.error('Update New User Profile Error:', error)
    return { success: false, message: 'Failed to update profile. Please try again.' }
  }
}
