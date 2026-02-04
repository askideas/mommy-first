import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './EventCard.css'
import '../../Pages/Modals/SessionBookingModal/SessionBookingModal.css'
import { X } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const EventCard = ({ event }) => {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(null)

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

  const handleCardClick = (e) => {
    e.preventDefault();
  }

  const handleButtonClick = (e) => {
    e.stopPropagation();
  }

  return (
    <>
      <div className="event-card-wrapper" onClick={()=> navigate(`/events/${event.handle || event.id}`)}>
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
          
          <button 
            className="button-pink-border" 
            data-bs-toggle="offcanvas" 
            data-bs-target={`#sessionBookingModal${sessionId}`}
            onClick={handleButtonClick}
          >
            {buttonLabel ? buttonLabel : 'Reserve Slot'}
          </button>
        </div>
      </div>

      <div class="offcanvas offcanvas-end sessionBookingModal" tabindex="-1" id={`sessionBookingModal${sessionId}`} aria-labelledby="offcanvasRightLabel">
        <div className="mf-off-canvas-header">
            <p className="head-ing">LIVE session</p>
            <button className="close-btn" data-bs-dismiss="offcanvas" aria-label="Close"><X /></button>
        </div>
        <div className="session-modal-body">
            <h1 className="selected-date">Select date</h1>
            <h2 className="desc">Available dates are below</h2>
            <div className="session-booking-calender">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  inline
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy"
                  calendarClassName="session-calendar"
                />
            </div>
            <h1 className="selected-date">Select time slot</h1>
            <h2 className="desc">Available slots are below</h2>
            <div className="time-slots-container">
                <button className="time-slot">10:00 AM</button>
                <button className="time-slot">10:00 AM</button>
                <button className="time-slot">10:00 AM</button>
                <button className="time-slot">10:00 AM</button>
                <button className="time-slot">10:00 AM</button>
            </div>
        </div>
        <div className="session-modal-footer">
            <button className="button-pink-center">Reserve slot</button>
        </div>
      </div>
    </>
    
  )
}

export default EventCard
