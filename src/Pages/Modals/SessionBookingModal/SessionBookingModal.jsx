import React, { useState } from 'react'
import './SessionBookingModal.css'
import { X } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const SessionBookingModal = () => {
  const [selectedDate, setSelectedDate] = useState(null)

  return (
    <div class="offcanvas offcanvas-end" tabindex="-1" id="sessionBookingModal" aria-labelledby="offcanvasRightLabel">
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
  )
}

export default SessionBookingModal