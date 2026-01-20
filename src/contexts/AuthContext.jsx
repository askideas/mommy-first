import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const sessionToken = localStorage.getItem('sessionToken')
      const storedUser = localStorage.getItem('user')
      
      if (sessionToken && storedUser) {
        // Validate the session token with the server
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login/validate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionToken })
        })
        
        const data = await response.json()
        
        if (data.success) {
          setUser(JSON.parse(storedUser))
          setIsAuthenticated(true)
        } else {
          // Try to refresh the session
          const refreshed = await refreshSession()
          if (!refreshed) {
            clearAuth()
          }
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      clearAuth()
    } finally {
      setIsLoading(false)
    }
  }

  const setTokens = (sessionToken, refreshToken) => {
    localStorage.setItem('sessionToken', sessionToken)
    localStorage.setItem('refreshToken', refreshToken)
  }

  const setUserData = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    setIsAuthenticated(true)
  }

  const clearAuth = () => {
    localStorage.removeItem('sessionToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    setUser(null)
    setIsAuthenticated(false)
  }

  const login = (sessionToken, refreshToken, userData) => {
    setTokens(sessionToken, refreshToken)
    setUserData(userData)
  }

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      
      if (refreshToken) {
        await fetch(`${import.meta.env.VITE_API_BASE_URL}/login/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken })
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearAuth()
    }
  }

  const refreshSession = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      
      if (!refreshToken) {
        return false
      }
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setTokens(data.sessionToken, data.refreshToken)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Session refresh failed:', error)
      return false
    }
  }

  const getSessionToken = () => {
    return localStorage.getItem('sessionToken')
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshSession,
    getSessionToken,
    checkAuthStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
