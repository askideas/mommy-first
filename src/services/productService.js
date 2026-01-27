// Product API Service
// Handles product-related API calls

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const getProductDetails = async (productHandle, token) => {
  try {
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
