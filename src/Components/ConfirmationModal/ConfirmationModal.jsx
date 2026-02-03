import React from 'react'
import './ConfirmationModal.css'
import { Trash2 } from 'lucide-react'

const ConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "Remove Item",
    message = "Are you sure you want to remove this item?",
    confirmText = "Yes, Remove",
    cancelText = "Cancel",
    isLoading = false
}) => {
    if (!isOpen) return null

    const handleConfirm = () => {
        onConfirm()
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && !isLoading) {
            onClose()
        }
    }

    return (
        <div className="confirmation-modal-backdrop" onClick={handleBackdropClick}>
            <div className="confirmation-modal-container">
                <div className="confirmation-modal-icon">
                    <Trash2 size={32} />
                </div>
                <h3 className="confirmation-modal-title">{title}</h3>
                <p className="confirmation-modal-message">{message}</p>
                <div className="confirmation-modal-actions">
                    <button 
                        className="confirmation-btn confirm-btn button-pink-center"
                        onClick={handleConfirm}
                        disabled={isLoading}
                    >
                        {confirmText}
                    </button>
                    <button 
                        className="confirmation-btn cancel-btn button-pink-border"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
