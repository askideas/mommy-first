import React, { useEffect } from 'react'
import './Toast.css'
import { CheckCircle, XCircle, Info, AlertCircle } from 'lucide-react'

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="toast-icon" />
      case 'error':
        return <XCircle className="toast-icon" />
      case 'warning':
        return <AlertCircle className="toast-icon" />
      case 'info':
        return <Info className="toast-icon" />
      default:
        return <CheckCircle className="toast-icon" />
    }
  }

  return (
    <div className={`toast-container toast-${type}`}>
      {getIcon()}
      <span className="toast-message">{message}</span>
    </div>
  )
}

export default Toast
