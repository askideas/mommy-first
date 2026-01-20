import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  exchangeGoogleCode,
  exchangeFacebookCode,
  exchangeAppleCode
} from '../../services/authService'
import './AuthCallback.css'

const AuthCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login } = useAuth()
  const [status, setStatus] = useState('processing')
  const [message, setMessage] = useState('Processing your login...')

  useEffect(() => {
    handleCallback()
  }, [])

  const handleCallback = async () => {
    const code = searchParams.get('code')
    const provider = searchParams.get('provider')
    const error = searchParams.get('error')

    // Handle error from OAuth provider
    if (error) {
      setStatus('error')
      setMessage('Login was cancelled or failed. Redirecting to home...')
      setTimeout(() => navigate('/'), 3000)
      return
    }

    // No code received
    if (!code) {
      setStatus('error')
      setMessage('No authorization code received. Redirecting to home...')
      setTimeout(() => navigate('/'), 3000)
      return
    }

    try {
      let response

      switch (provider) {
        case 'google':
          setMessage('Completing Google login...')
          response = await exchangeGoogleCode(code)
          break
        case 'facebook':
          setMessage('Completing Facebook login...')
          response = await exchangeFacebookCode(code)
          break
        case 'apple':
          setMessage('Completing Apple login...')
          response = await exchangeAppleCode(code)
          break
        default:
          // Try to determine provider from URL or default to Google
          setMessage('Completing login...')
          response = await exchangeGoogleCode(code)
      }

      if (response.success) {
        // Store tokens, user data, and customer data
        login(
          response.sessionToken, 
          response.refreshToken, 
          response.user,
          response.customer,
          response.isNewCustomer
        )
        
        setStatus('success')
        setMessage(response.isNewCustomer 
          ? 'Account created! Redirecting to your profile...' 
          : 'Login successful! Redirecting to your profile...'
        )
        
        // Redirect to profile page
        setTimeout(() => navigate('/profile#profile'), 1500)
      } else {
        setStatus('error')
        setMessage(response.message || 'Login failed. Redirecting to home...')
        setTimeout(() => navigate('/'), 3000)
      }
    } catch (err) {
      console.error('OAuth callback error:', err)
      setStatus('error')
      setMessage('Something went wrong. Redirecting to home...')
      setTimeout(() => navigate('/'), 3000)
    }
  }

  return (
    <div className="auth-callback-container">
      <div className="auth-callback-content">
        {status === 'processing' && (
          <div className="loading-spinner"></div>
        )}
        
        {status === 'success' && (
          <div className="success-icon">✓</div>
        )}
        
        {status === 'error' && (
          <div className="error-icon">✕</div>
        )}
        
        <p className={`status-message ${status}`}>{message}</p>
      </div>
    </div>
  )
}

export default AuthCallback
