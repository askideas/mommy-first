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
  const [availableDates, setAvailableDates] = useState([])
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)

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
          
          // Extract all available dates (normalize to local timezone)
          const dates = data.dates?.map(dateEntry => {
            const [year, month, day] = dateEntry.date.split('-');
            return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          }) || [];
          setAvailableDates(dates);
          
          console.log('Formatted Session Data:', formattedData);
          console.log('Available Dates:', dates);
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
      // Parse date in local timezone to avoid UTC offset issues
      const [year, month, day] = dateEntry.date.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      
      // Initialize year if not exists
      if (!yearMonthData[year]) {
        yearMonthData[year] = Array(12).fill(null).map(() => []);
      }

      // Add date and time slots to appropriate month
      yearMonthData[year][month - 1].push({
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

  // Check if a date is available
  const isDateAvailable = (date) => {
    const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const result = availableDates.some(availableDate => {
      const normalizedAvailable = new Date(availableDate.getFullYear(), availableDate.getMonth(), availableDate.getDate());
      const match = normalizedDate.getTime() === normalizedAvailable.getTime();
      if (match) {
        console.log('Match found:', normalizedDate, normalizedAvailable);
      }
      return match;
    });
    console.log('Checking date:', date.toDateString(), 'Available:', result, 'Total available dates:', availableDates.length);
    return result;
  };

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
    
    if (date && sessionData) {
      // Format date to match Firestore format (YYYY-MM-DD)
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      const monthData = sessionData.yearMonthData[year]?.[month] || [];
      const selectedDateData = monthData.find(d => d.date === dateString);
      
      setSelectedTimeSlots(selectedDateData?.timeSlots || []);
      console.log('Date String:', dateString);
      console.log('Month Data:', monthData);
      console.log('Selected Date Data:', selectedDateData);
      console.log('Selected Date Time Slots:', selectedDateData?.timeSlots);
    } else {
      setSelectedTimeSlots([]);
    }
  };

  // Format time to 12-hour format
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Handle time slot selection
  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
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
                  onChange={handleDateChange}
                  inline
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy"
                  calendarClassName="session-calendar"
                  filterDate={isDateAvailable}
                  dayClassName={(date) => 
                    isDateAvailable(date) ? 'available-date' : undefined
                  }
                />
            </div>
            <h1 className="selected-date">Select time slot</h1>
            <h2 className="desc">
              {selectedDate 
                ? `Available slots for ${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                : 'Please select a date first'
              }
            </h2>
            <div className="time-slots-container">
              {selectedTimeSlots.length > 0 ? (
                selectedTimeSlots.map((slot, index) => (
                  <button 
                    key={index}
                    className={`time-slot ${selectedTimeSlot === slot ? 'selected' : ''} ${slot.booked >= slot.capacity ? 'full' : ''}`}
                    onClick={() => handleTimeSlotClick(slot)}
                    disabled={slot.booked >= slot.capacity}
                  >
                    {formatTime(slot.time)}
                    <span className="slot-capacity"> ({slot.capacity - slot.booked} left)</span>
                  </button>
                ))
              ) : (
                <p className="no-slots-message">
                  {selectedDate ? 'No slots available for this date' : 'Select a date to view available time slots'}
                </p>
              )}
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
