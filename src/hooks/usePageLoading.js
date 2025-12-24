import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useLoading } from '../contexts/LoadingContext'

export const usePageLoading = () => {
  const location = useLocation()
  const { startLoading, stopLoading } = useLoading()
  const prevLocation = useRef(location.pathname)

  // Use layoutEffect to start loading synchronously before paint
  useLayoutEffect(() => {
    // Check if location actually changed
    if (prevLocation.current !== location.pathname) {
      startLoading()
      prevLocation.current = location.pathname
    }
  }, [location.pathname])

  useEffect(() => {
    // Stop loading after content is ready
    const timer = setTimeout(() => {
      stopLoading()
    }, 4000)

    return () => clearTimeout(timer)
  }, [location.pathname, location.search])
}
