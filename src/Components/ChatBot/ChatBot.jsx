import React from 'react'
import './ChatBot.css'
import Icon from '../../assets/Chatbot/icon.svg'

const ChatBot = () => {
  return (
    <div className="chatbot-main-container">
        <div className="chat-bot-trigger">
            <img src={Icon} alt="" />
            <div className="active-icon"></div>
        </div>
    </div>
    
  )
}

export default ChatBot