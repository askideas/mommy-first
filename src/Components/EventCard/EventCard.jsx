import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './EventCard.css'
import '../../Pages/Modals/SessionBookingModal/SessionBookingModal.css'
import { X } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { db } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

const EventCard = ({ event }) => {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(null)
  const [sessionData, setSessionData] = useState(null)

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

  // Fetch session data from Firestore
  useEffect(() => {
    const fetchSessionData = async () => {
      if (!sessionId) return;

      try {
        const sessionDocRef = doc(db, 'liveSessions', sessionId);
        const sessionDoc = await getDoc(sessionDocRef);

        if (sessionDoc.exists()) {
          const data = sessionDoc.data();
          const formattedData = formatSessionData(data);
          setSessionData(formattedData);
          console.log('Formatted Session Data:', formattedData);
        } else {
          console.log('No session document found');
        }
      } catch (error) {
        console.error('Error fetching session data:', error);
      }
    };

    fetchSessionData();
  }, [sessionId]);

  // Format session data by year and month
  const formatSessionData = (data) => {
    const yearMonthData = {};

    // Process dates array
    data.dates?.forEach((dateEntry) => {
      const date = new Date(dateEntry.date);
      const year = date.getFullYear();
      const month = date.getMonth(); // 0-11 (Jan=0, Dec=11)

      // Initialize year if not exists
      if (!yearMonthData[year]) {
        yearMonthData[year] = Array(12).fill(null).map(() => []);
      }

      // Add date and time slots to appropriate month
      yearMonthData[year][month].push({
        date: dateEntry.date,
        timeSlots: dateEntry.timeSlots || []
      });
    });

    return {
      sessionName: data.sessionName,
      status: data.status,
      createdAt: data.createdAt,
      yearMonthData: yearMonthData
    };
  };

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
