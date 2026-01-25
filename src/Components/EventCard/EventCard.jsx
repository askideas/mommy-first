import React from 'react'
import { useNavigate } from 'react-router-dom'
import './EventCard.css'

const EventCard = ({ event }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/events/${event.id}`)
  }

  const handleButtonClick = (e) => {
    e.stopPropagation()
    navigate(`/events/${event.id}`)
  }

  return (
    <div className="event-card-wrapper" onClick={handleCardClick}>
      <div className="event-card-image-container">
        <img 
          src={event.image} 
          alt={event.title} 
          className="event-card-image"
        />
        {event.isLive && (
          <span className="event-card-live-badge">LIVE</span>
        )}
        {event.badge && !event.isLive && (
          <span className="event-card-custom-badge" style={{ background: event.badgeColor || 'var(--primary-pink)' }}>
            {event.badge}
          </span>
        )}
      </div>
      
      <div className="event-card-content">
        <h3 className="event-card-title">{event.title}</h3>
        <p className="event-card-subtitle">{event.subtitle}</p>
        <p className="event-card-description">{event.description}</p>
        
        {event.type === 'reserve' ? (
          <button className="button-pink-border" onClick={handleButtonClick}>Reserve</button>
        ) : (
          <button className="button-pink-border" onClick={handleButtonClick}>Learn more</button>
        )}
      </div>
    </div>
  )
}

export default EventCard
