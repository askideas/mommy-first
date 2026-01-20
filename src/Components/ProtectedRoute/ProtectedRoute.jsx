import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

/**
 * ProtectedRoute - A wrapper component that protects routes from unauthenticated access
 * 
 * Usage:
 * <Route element={<ProtectedRoute><Profile /></ProtectedRoute>} path='/profile' />
 * 
 * If user is not authenticated, they will be redirected to home page
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  // Show nothing while checking auth status
  if (isLoading) {
    return (
      <div className="auth-loading-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh'
      }}>
        <div className="loading-spinner" style={{
          width: '40px',
          height: '40px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid var(--primary-pink, #DC5F92)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  // If not authenticated, redirect to home
  if (!isAuthenticated) {
    // Store the attempted URL for potential redirect after login
    return <Navigate to="/" state={{ from: location }} replace />
  }

  // User is authenticated, render the protected content
  return children
}

export default ProtectedRoute
