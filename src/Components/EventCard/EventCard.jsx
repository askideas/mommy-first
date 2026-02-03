import React from 'react'
import { useNavigate } from 'react-router-dom'
import './EventCard.css'

const EventCard = ({ event }) => {
  const navigate = useNavigate()

  // Helper function to get metafield value
  const getMetafieldValue = (key) => {
    const metafield = event.metafields?.find(m => m.key === key)
    return metafield?.value || null
  }

  // Extract data from API response
  const sessionId = getMetafieldValue('live_session_id')
  const venue = getMetafieldValue('live_session_venue')
  const dateTime = getMetafieldValue('live_session_date_and_time')
  const buttonLabel = getMetafieldValue('button_label')
  
  // Format date and time if available
  const formattedDateTime = dateTime ? new Date(dateTime).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }) : ''

  const handleCardClick = () => {
    navigate(`/events/${event.handle || event.id}`)
  }

  const handleButtonClick = (e) => {
    e.stopPropagation()
    navigate(`/events/${event.handle || event.id}`)
  }

  return (
    <div className="event-card-wrapper" onClick={handleCardClick}>
      <div className="event-card-image-container">
        <img 
          src={event.image?.url || event.image} 
          alt={event.title} 
          className="event-card-image"
        />
        {venue && (
          <span className="event-card-live-badge">{venue}</span>
        )}
        {sessionId && (
          <span className="event-card-session-id">{sessionId}</span>
        )}
      </div>
      
      <div className="event-card-content">
        <h3 className="event-card-title">{event.title}</h3>
        {event.excerpt && (
          <p className="event-card-subtitle">{event.excerpt}</p>
        )}
        {dateTime && (
          <p className="event-card-datetime">{formattedDateTime}</p>
        )}
        {event.author?.name && (
          <p className="event-card-author">By {event.author.name}</p>
        )}
        
        <button className="button-pink-border" onClick={handleButtonClick}>{buttonLabel ? buttonLabel : 'Reserve Slot'}</button>
      </div>
    </div>
  )
}

export default EventCard
