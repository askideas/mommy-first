import React, { createContext, useContext, useState, useEffect } from 'react'
import { mergeCartsOnLogin, clearGuestCartId } from '../services/cartService'

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
  const [customer, setCustomer] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isNewCustomer, setIsNewCustomer] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  // Check session expiry every minute
  useEffect(() => {
    const checkSessionExpiry = () => {
      const loginTime = localStorage.getItem('loginTime')
      if (loginTime) {
        const now = Date.now()
        const elapsed = now - parseInt(loginTime, 10)
        const maxSession = 5 * 60 * 60 * 1000 // 5 hours in ms
        if (elapsed > maxSession) {
          logout()
          alert('Your session has expired. Please log in again.')
        }
      }
    }
    const interval = setInterval(checkSessionExpiry, 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const checkAuthStatus = async () => {
    try {
      const sessionToken = localStorage.getItem('sessionToken')
      const storedUser = localStorage.getItem('user')
      const storedCustomer = localStorage.getItem('customer')
      const storedIsNew = localStorage.getItem('isNewCustomer')
      
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
          if (storedCustomer) {
            setCustomer(JSON.parse(storedCustomer))
          }
          if (storedIsNew === 'true') {
            setIsNewCustomer(true)
          }
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

  const setUserData = (userData, customerData = null, isNew = false) => {
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    
    if (customerData) {
      localStorage.setItem('customer', JSON.stringify(customerData))
      setCustomer(customerData)
    }
    
    localStorage.setItem('isNewCustomer', JSON.stringify(isNew))
    setIsNewCustomer(isNew)
    setIsAuthenticated(true)
  }

  const clearAuth = () => {
    localStorage.removeItem('sessionToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    localStorage.removeItem('customer')
    localStorage.removeItem('isNewCustomer')
    localStorage.removeItem('loginTime')
    setUser(null)
    setCustomer(null)
    setIsNewCustomer(false)
    setIsAuthenticated(false)
  }

  const login = async (sessionToken, refreshToken, userData, customerData = null, isNew = false) => {
    setTokens(sessionToken, refreshToken)
    setUserData(userData, customerData, isNew)
    
    // Merge guest cart with user cart on login
    if (customerData?.id) {
      try {
        console.log('Merging carts on login for user:', customerData.id)
        const mergeResponse = await mergeCartsOnLogin(customerData.id)
        console.log('Cart merge response:', mergeResponse)
        
        if (mergeResponse.success && mergeResponse.merged) {
          console.log(`Merged ${mergeResponse.itemsMerged} items from guest cart`)
        }
      } catch (error) {
        console.error('Cart merge error:', error)
        // Don't fail login if cart merge fails
      }
    }
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
      // Clear guest cart ID on logout
      clearGuestCartId()
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

  const getCustomer = () => {
    return customer || JSON.parse(localStorage.getItem('customer'))
  }

  const updateCustomer = (customerData) => {
    localStorage.setItem('customer', JSON.stringify(customerData))
    setCustomer(customerData)
  }

  const clearNewCustomerFlag = () => {
    localStorage.removeItem('isNewCustomer')
    localStorage.setItem('profileCompleted', 'true')
    setIsNewCustomer(false)
  }

  // Helper function to extract metafield values from customer data
  const getCustomerMetafield = (fieldName) => {
    if (!customer?.metafields?.custom) return null
    const field = customer.metafields.custom[fieldName]
    return field?.value || null
  }

  // Get all customer metafields as a flat object
  const getCustomerMetafields = () => {
    if (!customer?.metafields?.custom) return {}
    const metafields = customer.metafields.custom
    return {
      nationality: metafields.nationality?.value || '',
      gender: metafields.gender?.value || '',
      dueDate: metafields.due_date?.value || '',
      dateOfBirth: metafields.date_of_birth?.value || ''
    }
  }

  const value = {
    user,
    customer,
    isAuthenticated,
    isLoading,
    isNewCustomer,
    login,
    logout,
    refreshSession,
    getSessionToken,
    getCustomer,
    updateCustomer,
    clearNewCustomerFlag,
    checkAuthStatus,
    getCustomerMetafield,
    getCustomerMetafields
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
