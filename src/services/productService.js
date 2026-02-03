// Product API Service
// Handles product-related API calls

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

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

/**
 * Get paginated products list
 * @param {string} token - JWT Bearer token
 * @param {number} page - Page number (default: 1)
 * @returns {Promise<Object>} Response with products array, pagination info
 */
export const getProducts = async (token, page = 1) => {
  try {
    const url = page === 1 
      ? `${API_BASE_URL}/products`
      : `${API_BASE_URL}/products/pg-${page}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Get Products Error:', error);
    return { success: false, message: 'Failed to fetch products.' };
  }
};

/**
 * Get single product details by handle
 * @param {string} productHandle - Product handle (e.g., 'cotton-t-shirt')
 * @param {string} token - JWT Bearer token (optional, will fetch if not provided)
 * @returns {Promise<Object>} Response with product data
 */
export const getProductDetails = async (productHandle, token = null) => {
  try {
    // Fetch token if not provided
    if (!token) {
      token = await fetchAuthToken()
      if (!token) {
        return { success: false, message: 'Failed to authenticate' }
      }
    }

    const response = await fetch(`${API_BASE_URL}/products/${productHandle}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Get Product Details Error:', error);
    return { success: false, message: 'Failed to fetch product details.' };
  }
};

/**
 * Get all collections
 * @param {string} token - JWT Bearer token
 * @param {number} limit - Number of collections to fetch (default: 50)
 * @returns {Promise<Object>} Response with collections array
 */
export const getCollections = async (token, limit = 50) => {
  try {
    const response = await fetch(`${API_BASE_URL}/collections?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Get Collections Error:', error);
    return { success: false, message: 'Failed to fetch collections.' };
  }
};

/**
 * Get collection with all products (uses Admin API)
 * @param {string} collectionHandle - Collection handle or GID
 * @param {string} token - JWT Bearer token
 * @param {number} limit - Number of products to fetch (default: 50)
 * @returns {Promise<Object>} Response with collection and products data
 */
export const getCollectionWithProducts = async (collectionHandle, token, limit = 50) => {
  try {
    const response = await fetch(`${API_BASE_URL}/collections/${collectionHandle}?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Get Collection With Products Error:', error);
    return { success: false, message: 'Failed to fetch collection with products.' };
  }
};
