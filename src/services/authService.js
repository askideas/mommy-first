// Authentication API Service
// Handles all authentication-related API calls

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

// Helper function for API calls
const apiCall = async (endpoint, data) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

// ============================================
// EMAIL OTP AUTHENTICATION
// ============================================

/**
 * Send OTP to email address
 * @param {string} email - User's email address
 * @returns {Promise} - Response with success status and masked email
 */
export const sendEmailOTP = async (email) => {
  try {
    const data = await apiCall('/login/email/send', { email })
    return data
  } catch (error) {
    console.error('Send Email OTP Error:', error)
    return { success: false, message: 'Failed to send OTP. Please try again.' }
  }
}

/**
 * Verify email OTP
 * @param {string} email - User's email address
 * @param {string} code - 6-digit OTP code
 * @returns {Promise} - Response with tokens and user data on success
 */
export const verifyEmailOTP = async (email, code) => {
  try {
    const data = await apiCall('/login/email/verify', { email, code })
    return data
  } catch (error) {
    console.error('Verify Email OTP Error:', error)
    return { success: false, message: 'Verification failed. Please try again.' }
  }
}

// ============================================
// MOBILE OTP AUTHENTICATION
// ============================================

/**
 * Send OTP to mobile number
 * @param {string} phone - User's phone number in E.164 format (e.g., +919876543210)
 * @returns {Promise} - Response with success status and masked phone
 */
export const sendMobileOTP = async (phone) => {
  try {
    const data = await apiCall('/login/mobile/send', { phone })
    return data
  } catch (error) {
    console.error('Send Mobile OTP Error:', error)
    return { success: false, message: 'Failed to send OTP. Please try again.' }
  }
}

/**
 * Verify mobile OTP
 * @param {string} phone - User's phone number in E.164 format
 * @param {string} code - 6-digit OTP code
 * @returns {Promise} - Response with tokens and user data on success
 */
export const verifyMobileOTP = async (phone, code) => {
  try {
    const data = await apiCall('/login/mobile/verify', { phone, code })
    return data
  } catch (error) {
    console.error('Verify Mobile OTP Error:', error)
    return { success: false, message: 'Verification failed. Please try again.' }
  }
}

// ============================================
// GOOGLE OAUTH
// ============================================

/**
 * Start Google OAuth flow
 * @param {string} redirectUrl - URL to redirect after Google auth
 * @returns {Promise} - Response with authUrl to redirect user
 */
export const startGoogleAuth = async (redirectUrl) => {
  try {
    const data = await apiCall('/login/google/start', { redirectUrl })
    return data
  } catch (error) {
    console.error('Google Auth Start Error:', error)
    return { success: false, message: 'Failed to start Google login. Please try again.' }
  }
}

/**
 * Exchange Google auth code for tokens
 * @param {string} code - Authorization code from Google redirect
 * @returns {Promise} - Response with tokens and user data on success
 */
export const exchangeGoogleCode = async (code) => {
  try {
    const data = await apiCall('/login/google/exchange', { code })
    return data
  } catch (error) {
    console.error('Google Code Exchange Error:', error)
    return { success: false, message: 'Google login failed. Please try again.' }
  }
}

// ============================================
// FACEBOOK OAUTH
// ============================================

/**
 * Start Facebook OAuth flow
 * @param {string} redirectUrl - URL to redirect after Facebook auth
 * @returns {Promise} - Response with authUrl to redirect user
 */
export const startFacebookAuth = async (redirectUrl) => {
  try {
    const data = await apiCall('/login/facebook/start', { redirectUrl })
    return data
  } catch (error) {
    console.error('Facebook Auth Start Error:', error)
    return { success: false, message: 'Failed to start Facebook login. Please try again.' }
  }
}

/**
 * Exchange Facebook auth code for tokens
 * @param {string} code - Authorization code from Facebook redirect
 * @returns {Promise} - Response with tokens and user data on success
 */
export const exchangeFacebookCode = async (code) => {
  try {
    const data = await apiCall('/login/facebook/exchange', { code })
    return data
  } catch (error) {
    console.error('Facebook Code Exchange Error:', error)
    return { success: false, message: 'Facebook login failed. Please try again.' }
  }
}

// ============================================
// APPLE OAUTH
// ============================================

/**
 * Start Apple OAuth flow
 * @param {string} redirectUrl - URL to redirect after Apple auth
 * @returns {Promise} - Response with authUrl to redirect user
 */
export const startAppleAuth = async (redirectUrl) => {
  try {
    const data = await apiCall('/login/apple/start', { redirectUrl })
    return data
  } catch (error) {
    console.error('Apple Auth Start Error:', error)
    return { success: false, message: 'Failed to start Apple login. Please try again.' }
  }
}

/**
 * Exchange Apple auth code for tokens
 * @param {string} code - Authorization code from Apple redirect
 * @returns {Promise} - Response with tokens and user data on success
 */
export const exchangeAppleCode = async (code) => {
  try {
    const data = await apiCall('/login/apple/exchange', { code })
    return data
  } catch (error) {
    console.error('Apple Code Exchange Error:', error)
    return { success: false, message: 'Apple login failed. Please try again.' }
  }
}

// ============================================
// SESSION MANAGEMENT
// ============================================

/**
 * Validate session token
 * @param {string} sessionToken - Current session token
 * @returns {Promise} - Response with validation status
 */
export const validateSession = async (sessionToken) => {
  try {
    const data = await apiCall('/login/validate', { sessionToken })
    return data
  } catch (error) {
    console.error('Session Validation Error:', error)
    return { success: false, message: 'Session validation failed.' }
  }
}

/**
 * Refresh session using refresh token
 * @param {string} refreshToken - Current refresh token
 * @returns {Promise} - Response with new tokens on success
 */
export const refreshSession = async (refreshToken) => {
  try {
    const data = await apiCall('/login/refresh', { refreshToken })
    return data
  } catch (error) {
    console.error('Session Refresh Error:', error)
    return { success: false, message: 'Session refresh failed.' }
  }
}

/**
 * Logout user
 * @param {string} refreshToken - Current refresh token
 * @returns {Promise} - Response with logout status
 */
export const logoutUser = async (refreshToken) => {
  try {
    const data = await apiCall('/login/logout', { refreshToken })
    return data
  } catch (error) {
    console.error('Logout Error:', error)
    return { success: false, message: 'Logout failed.' }
  }
}

// ============================================
// COUNTRY CODES FOR MOBILE LOGIN
// ============================================

export const countryCodes = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦' },
  { code: '+968', country: 'Oman', flag: '🇴🇲' },
  { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿' }
]
