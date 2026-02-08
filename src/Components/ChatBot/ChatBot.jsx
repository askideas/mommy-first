import React, { useState, useRef, useEffect } from 'react'
import './ChatBot.css'
import Icon from '../../assets/Chatbot/icon.svg'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const flyoutRef = useRef(null);

  // Close flyout when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && flyoutRef.current && !flyoutRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const topics = [
    {
      'label': 'New Bundles and Offers',
      'link': '/bundles'
    },
    {
      'label': 'Returns & Exchanges',
      'link': '/profile#orders'
    },
    {
      'label': 'Speak to any support agent?',
      'link': '/contact'
    },
    {
      'label': 'Contact Customer Support',
      'link': '/contact'
    },
    {
      'label': 'Suggestions & Complaints',
      'link': '/enquiries'
    },
    {
      'label': 'Business Enquiries',
      'link': '/enquiries'
    },
    {
      'label': 'Affiliations',
      'link': '/af-marketing'
    }
  ]

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="chatbot-main-container" ref={flyoutRef}>
        {isOpen && (
          <div className="chatbot-flyout">
            <div className="chatbot-header">
              <div className="blur-ness"></div>
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
                  <button key={index} className="topic-item" onClick={()=>navigate(topic.link)}>
                    {topic.label}
                  </button>
                ))}
              </div>
              
              <div className="chatbot-footer">
                <button className="btn-help button-pink-center" onClick={()=>navigate('/contact')}>Still need help?</button>
                <button className="btn-faq button-pink-border" onClick={()=>navigate('/faqs')}>FAQ</button>
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