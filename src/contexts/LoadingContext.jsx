import React, { createContext, useContext, useState, useEffect } from 'react'

const LoadingContext = createContext()

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider')
  }
  return context
}

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initial page load
    const handleLoad = () => {
      // Add a small delay to ensure content is rendered
      setTimeout(() => {
        setIsLoading(false)
      }, 4000)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}
