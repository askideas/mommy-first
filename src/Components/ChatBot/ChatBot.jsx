import React, { useState } from 'react'
import './ChatBot.css'
import Icon from '../../assets/Chatbot/icon.svg'
import { X } from 'lucide-react'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)

  const topics = [
    'New Bundles and Offers',
    'Returns & Exchanges',
    'Speak to any support agent?',
    'Contact Customer Support',
    'Suggestions & Complaints',
    'Business Enquiries',
    'Affiliations'
  ]

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="chatbot-main-container">
        {isOpen && (
          <div className="chatbot-flyout">
            <div className="chatbot-header">
              <div className="header-content">
                <h1 className="chatbot-title">Hello ✨</h1>
                <p className="chatbot-subtitle">How can I help you?</p>
              </div>
              <button className="chatbot-close-btn" onClick={toggleChatbot}>
                <X size={20} />
              </button>
            </div>
            
            <div className="chatbot-body">
              <h3 className="topics-heading">Topics</h3>
              <div className="topics-list">
                {topics.map((topic, index) => (
                  <button key={index} className="topic-item">
                    {topic}
                  </button>
                ))}
              </div>
              
              <div className="chatbot-footer">
                <button className="btn-help">Still need help?</button>
                <button className="btn-faq">FAQ</button>
              </div>
            </div>
          </div>
        )}
        
        <div 
          className={`chat-bot-trigger ${isOpen ? 'no-animation' : ''}`}
          onClick={toggleChatbot}
        >
            <img src={Icon} alt="" />
            <div className="active-icon"></div>
        </div>
    </div>
    
  )
}

export default ChatBot