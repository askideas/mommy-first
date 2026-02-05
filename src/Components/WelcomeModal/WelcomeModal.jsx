import React from 'react'
import './WelcomeModal.css'

const WelcomeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="welcome-modal-overlay" onClick={onClose}>
      <div className="welcome-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="buttons-section">
            <button className='button-pink-center'>SHOP BUNDLES NOW</button>
            <button className='button-pink-border checklater'>CHECK LATER</button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeModal
