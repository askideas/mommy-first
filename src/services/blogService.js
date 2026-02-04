// Blog API Service
// Handles all blog-related API calls

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
 * Get live sessions from blog
 * @returns {Promise} - Response with live sessions data
 */
export const getLiveSessions = async () => {
  try {
    const token = await fetchAuthToken()
    
    if (!token) {
      return { success: false, message: 'Failed to authenticate. Please try again.' }
    }

    const response = await fetch(`${API_BASE_URL}/blogs/live-sesions`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return response.json()
  } catch (error) {
    console.error('Get Live Sessions Error:', error)
    return { success: false, message: 'Failed to fetch live sessions. Please try again.' }
  }
}

/**
 * Get journals from blog
 * @returns {Promise} - Response with journals data
 */
export const getJournals = async () => {
  try {
    const token = await fetchAuthToken()
    
    if (!token) {
      return { success: false, message: 'Failed to authenticate. Please try again.' }
    }

    const response = await fetch(`${API_BASE_URL}/blogs/journals`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return response.json()
  } catch (error) {
    console.error('Get Journals Error:', error)
    return { success: false, message: 'Failed to fetch journals. Please try again.' }
  }
}

/**
 * Get all blogs
 * @param {string} blogHandle - The blog handle to fetch articles from
 * @returns {Promise} - Response with blogs data
 */
export const getBlogs = async (blogHandle = 'news') => {
  try {
    const token = await fetchAuthToken()
    
    if (!token) {
      return { success: false, message: 'Failed to authenticate. Please try again.' }
    }

    const response = await fetch(`${API_BASE_URL}/blogs/${blogHandle}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return response.json()
  } catch (error) {
    console.error('Get Blogs Error:', error)
    return { success: false, message: 'Failed to fetch blogs. Please try again.' }
  }
}

/**
 * Get events
 * @returns {Promise} - Response with events data
 */
export const getEvents = async () => {
  try {
    const token = await fetchAuthToken()
    
    if (!token) {
      return { success: false, message: 'Failed to authenticate. Please try again.' }
    }

    const response = await fetch(`${API_BASE_URL}/blogs/events`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return response.json()
  } catch (error) {
    console.error('Get Events Error:', error)
    return { success: false, message: 'Failed to fetch events. Please try again.' }
  }
}
