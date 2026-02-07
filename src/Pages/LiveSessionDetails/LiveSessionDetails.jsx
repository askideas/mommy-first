import React, { useState, useEffect } from 'react'
import './LiveSessionDetails.css'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { ChevronRight, X, Check } from 'lucide-react'
import EventCard from '../../Components/EventCard/EventCard'
import { getLiveSessionByHandle, getLiveSessions } from '../../services/blogService'
import { db } from '../../firebase/config'
import { doc, getDoc, setDoc, getDocs, collection, query, where } from 'firebase/firestore'
import { useAuth } from '../../contexts/AuthContext'
import { updateNewUserProfile, getUserDetails } from '../../services/userService'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const LiveSessionDetails = () => {
    const { handle } = useParams()
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const [session, setSession] = useState(null)
    const [relatedSessions, setRelatedSessions] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    // Booking states
    const [selectedDate, setSelectedDate] = useState(null)
    const [sessionData, setSessionData] = useState(null)
    const [availableDates, setAvailableDates] = useState([])
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([])
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
    const [isLoadingSlots, setIsLoadingSlots] = useState(false)
    const [isBooking, setIsBooking] = useState(false)
    const [bookingSuccess, setBookingSuccess] = useState(false)
    const [reservationId, setReservationId] = useState('')

    useEffect(() => {
        fetchSessionData()
        fetchRelatedSessions()
    }, [handle])

    const fetchSessionData = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await getLiveSessionByHandle(handle)
            console.log('Live session details response:', response)
            if (response.success && response.data) {
                setSession(response.data)
            } else {
                setError('Live session not found')
            }
        } catch (error) {
            console.error('Failed to fetch live session:', error)
            setError('Failed to load live session')
        } finally {
            setIsLoading(false)
        }
    }

    const fetchRelatedSessions = async () => {
        try {
            const response = await getLiveSessions()
            if (response.success && response.data?.articles?.edges) {
                const filtered = response.data.articles.edges
                    .filter(edge => edge.node.handle !== handle)
                    .slice(0, 3)
                setRelatedSessions(filtered)
            }
        } catch (error) {
            console.error('Failed to fetch related sessions:', error)
        }
    }

    // Helper function to get metafield value
    const getMetafieldValue = (key) => {
        const metafield = session?.metafields?.find(m => m.key === key)
        return metafield?.value ?? null
    }

    // Get session ID for Firestore booking
    const sessionId = getMetafieldValue('live_session_id')

    // Fetch Firestore session data for booking
    useEffect(() => {
        const fetchFirestoreSessionData = async () => {
            if (!sessionId) return

            try {
                const sessionDocRef = doc(db, 'liveSessions', sessionId)
                const sessionDoc = await getDoc(sessionDocRef)

                if (sessionDoc.exists()) {
                    const data = sessionDoc.data()
                    const formattedData = formatSessionData(data)
                    setSessionData(formattedData)
                    
                    const dates = data.dates?.map(dateEntry => {
                        const [year, month, day] = dateEntry.date.split('-')
                        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
                    }) || []
                    setAvailableDates(dates)
                }
            } catch (error) {
                console.error('Error fetching session data:', error)
            }
        }

        fetchFirestoreSessionData()
    }, [sessionId])

    // Format session data by year and month
    const formatSessionData = (data) => {
        const yearMonthData = {}

        data.dates?.forEach((dateEntry) => {
            const [year, month, day] = dateEntry.date.split('-')
            
            if (!yearMonthData[year]) {
                yearMonthData[year] = Array(12).fill(null).map(() => [])
            }

            yearMonthData[year][month - 1].push({
                date: dateEntry.date,
                timeSlots: dateEntry.timeSlots || []
            })
        })

        return {
            sessionName: data.sessionName,
            status: data.status,
            createdAt: data.createdAt,
            yearMonthData: yearMonthData
        }
    }

    // Check if a date is available
    const isDateAvailable = (date) => {
        const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        return availableDates.some(availableDate => {
            const normalizedAvailable = new Date(availableDate.getFullYear(), availableDate.getMonth(), availableDate.getDate())
            return normalizedDate.getTime() === normalizedAvailable.getTime()
        })
    }

    // Handle date selection
    const handleDateChange = (date) => {
        setSelectedDate(date)
        setSelectedTimeSlot(null)
        setIsLoadingSlots(true)
        
        if (date && sessionData) {
            const year = date.getFullYear()
            const month = date.getMonth()
            const day = date.getDate()
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            
            setTimeout(() => {
                const monthData = sessionData.yearMonthData[year]?.[month] || []
                const selectedDateData = monthData.find(d => d.date === dateString)
                setSelectedTimeSlots(selectedDateData?.timeSlots || [])
                setIsLoadingSlots(false)
            }, 300)
        } else {
            setSelectedTimeSlots([])
            setIsLoadingSlots(false)
        }
    }

    // Format time to 12-hour format
    const formatTime = (time) => {
        const [hours, minutes] = time.split(':')
        const hour = parseInt(hours)
        const ampm = hour >= 12 ? 'PM' : 'AM'
        const hour12 = hour % 12 || 12
        return `${hour12}:${minutes} ${ampm}`
    }

    // Handle time slot selection
    const handleTimeSlotClick = (timeSlot) => {
        setSelectedTimeSlot(timeSlot)
    }

    // Generate unique booking ID
    const generateBookingId = async () => {
        const today = new Date()
        const day = String(today.getDate()).padStart(2, '0')
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const year = today.getFullYear()
        const prefix = `MFLS${day}${month}${year}`

        const bookingsRef = collection(db, 'sessionBookings')
        const q = query(bookingsRef, where('__name__', '>=', prefix), where('__name__', '<', prefix + '\uf8ff'))
        const querySnapshot = await getDocs(q)
        
        const nextNumber = querySnapshot.size + 1
        return `${prefix}${nextNumber}`
    }

    // Handle reserve slot
    const handleReserveSlot = async () => {
        if (!selectedDate || !selectedTimeSlot) {
            alert('Please select both date and time slot')
            return
        }

        setIsBooking(true)
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const customer = JSON.parse(localStorage.getItem('customer'))
            
            if (!user || !customer) {
                alert('User not authenticated')
                setIsBooking(false)
                return
            }

            const bookingId = await generateBookingId()
            
            const year = selectedDate.getFullYear()
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
            const day = String(selectedDate.getDate()).padStart(2, '0')
            const sessionDateFormatted = `${year}-${month}-${day}`

            const customerName = `${customer.firstName || ''} ${customer.lastName || ''}`.trim()
            const userName = user.displayName || user.name || ''
            const finalName = customerName || userName || customer.email || user.email || 'Guest'

            const bookingData = {
                bookedAt: new Date().toISOString(),
                email: customer.email || user.email || '',
                mobile: customer.phone || '',
                name: finalName,
                sessionDate: sessionDateFormatted,
                sessionId: sessionId || '',
                sessionName: sessionData?.sessionName || session?.title || 'Live Session',
                status: 'confirmed',
                timeSlot: selectedTimeSlot.time || ''
            }

            await setDoc(doc(db, 'sessionBookings', bookingId), bookingData)

            const userDetailsResponse = await getUserDetails(customer.id)
            let existingSessions = []
            
            if (userDetailsResponse.success && userDetailsResponse.data) {
                const sessionsMetafield = userDetailsResponse.data.metafields?.custom?.sessions
                
                if (sessionsMetafield && sessionsMetafield.value) {
                    try {
                        existingSessions = Array.isArray(sessionsMetafield.value)
                            ? sessionsMetafield.value
                            : JSON.parse(sessionsMetafield.value)
                        
                        if (!Array.isArray(existingSessions)) {
                            existingSessions = []
                        }
                    } catch (e) {
                        existingSessions = []
                    }
                }
            }

            const newSession = {
                bookingId: bookingId,
                sessionId: sessionId,
                sessionName: bookingData.sessionName,
                sessionDate: sessionDateFormatted,
                timeSlot: selectedTimeSlot.time,
                status: 'confirmed',
                bookedAt: bookingData.bookedAt
            }
            
            existingSessions.push(newSession)

            await updateNewUserProfile(customer.id, {
                firstName: customer.firstName,
                lastName: customer.lastName,
                metafields: [{
                    namespace: 'custom',
                    key: 'sessions',
                    value: JSON.stringify(existingSessions),
                    type: 'json'
                }]
            })

            // Send emails
            let emailToken = null
            try {
                const tokenResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/token`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        clientId: import.meta.env.VITE_API_CLIENT_ID,
                        clientSecret: import.meta.env.VITE_API_CLIENT_SECRET
                    })
                })
                
                const tokenData = await tokenResponse.json()
                if (tokenData.success && tokenData.token) {
                    emailToken = tokenData.token
                }
            } catch (tokenError) {
                console.error('Error fetching email auth token:', tokenError)
            }
            
            if (emailToken) {
                const formattedDate = new Date(sessionDateFormatted).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
                
                const customerEmailHtml = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
                        <h1 style="color: #DC5F92; text-align: center;">Session Booking Confirmed! 🎉</h1>
                        <div style="background: #FFF6F8; padding: 20px; border-radius: 12px; margin: 20px 0;">
                            <h2 style="color: #DC5F92; margin-top: 0;">Reservation Details</h2>
                            <p style="font-size: 16px; line-height: 1.6;">
                                <strong>Reservation ID:</strong> ${bookingId}<br/>
                                <strong>Session Name:</strong> ${bookingData.sessionName}<br/>
                                <strong>Date:</strong> ${formattedDate}<br/>
                                <strong>Time:</strong> ${formatTime(selectedTimeSlot.time)}<br/>
                                <strong>Name:</strong> ${bookingData.name}<br/>
                            </p>
                        </div>
                        <p style="font-size: 14px; line-height: 1.6;">
                            You're in! See you soon. 💛<br/><br/>
                            Please join on time to enjoy the full session. We're excited to have you!<br/><br/>
                            If you have any questions, please contact us with the reference number <strong>${bookingId}</strong>.
                        </p>
                        <div style="text-align: center; margin-top: 30px;">
                            <p style="color: #999; font-size: 12px;">Wishing you a happy motherhood journey!</p>
                            <p style="color: #DC5F92; font-weight: bold;">Mommy First</p>
                        </div>
                    </div>
                `
                
                const adminEmailHtml = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
                        <h1 style="color: #DC5F92;">New Session Booking</h1>
                        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h2 style="margin-top: 0;">Booking Details</h2>
                            <p style="font-size: 14px; line-height: 1.6;">
                                <strong>Reservation ID:</strong> ${bookingId}<br/>
                                <strong>Session Name:</strong> ${bookingData.sessionName}<br/>
                                <strong>Session ID:</strong> ${sessionId}<br/>
                                <strong>Date:</strong> ${formattedDate}<br/>
                                <strong>Time:</strong> ${formatTime(selectedTimeSlot.time)}<br/>
                                <strong>Customer Name:</strong> ${bookingData.name}<br/>
                                <strong>Email:</strong> ${bookingData.email}<br/>
                                <strong>Mobile:</strong> ${bookingData.mobile || 'N/A'}<br/>
                                <strong>Booked At:</strong> ${new Date(bookingData.bookedAt).toLocaleString()}<br/>
                                <strong>Status:</strong> Confirmed
                            </p>
                        </div>
                    </div>
                `
                
                // Send customer email
                try {
                    await fetch(`${import.meta.env.VITE_API_BASE_URL}/mail/send`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${emailToken}`
                        },
                        body: JSON.stringify({
                            toEmail: bookingData.email,
                            toName: bookingData.name,
                            subject: `Session Booking Confirmed - ${bookingId}`,
                            text: `Session Booking Confirmed! Reservation ID: ${bookingId}. Session: ${bookingData.sessionName}. Date: ${formattedDate}. Time: ${formatTime(selectedTimeSlot.time)}. See you soon!`,
                            html: customerEmailHtml
                        })
                    })
                } catch (emailError) {
                    console.error('Failed to send customer email:', emailError)
                }
                
                // Send admin email
                try {
                    await fetch(`${import.meta.env.VITE_API_BASE_URL}/mail/send`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${emailToken}`
                        },
                        body: JSON.stringify({
                            toEmail: 'connect.clicknova@gmail.com',
                            toName: 'Mommy First Admin',
                            subject: `New Session Booking - ${bookingId}`,
                            text: `New session booking received. Reservation ID: ${bookingId}. Customer: ${bookingData.name} (${bookingData.email}). Session: ${bookingData.sessionName}. Date: ${formattedDate}. Time: ${formatTime(selectedTimeSlot.time)}.`,
                            html: adminEmailHtml
                        })
                    })
                } catch (emailError) {
                    console.error('Failed to send admin email:', emailError)
                }
            }

            setReservationId(bookingId)
            setBookingSuccess(true)
            toast.success('Session booked successfully!')
        } catch (error) {
            console.error('Booking failed:', error)
            alert(`Failed to reserve slot. Error: ${error.message || 'Unknown error'}. Please try again.`)
        } finally {
            setIsBooking(false)
        }
    }

    // Format date
    const formatDateDisplay = (dateString) => {
        if (!dateString) return ''
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    // Format time display
    const formatTimeDisplay = (dateString) => {
        if (!dateString) return ''
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }

    if (isLoading) {
        return (
            <div className="container mt-5">
                <div className="live-session-details-skeleton">
                    <div className="skeleton-breadcrumbs">
                        <div className="skeleton-breadcrumb-item"></div>
                        <div className="skeleton-breadcrumb-item"></div>
                        <div className="skeleton-breadcrumb-item"></div>
                    </div>
                    
                    <div className="skeleton-title-main"></div>
                    
                    <div className="live-session-details-main-container">
                        <div className="skeleton-image"></div>
                        
                        <div className="live-session-description">
                            <div className="skeleton-title"></div>
                            <div className="skeleton-paragraph"></div>
                            <div className="skeleton-paragraph"></div>
                            <div className="skeleton-paragraph short"></div>
                        </div>
                        
                        <div className="live-session-schedule-container">
                            <div className="schedule-item">
                                <div className="skeleton-label"></div>
                                <div className="skeleton-value"></div>
                            </div>
                            <div className="schedule-item">
                                <div className="skeleton-label"></div>
                                <div className="skeleton-value"></div>
                            </div>
                            <div className="schedule-item">
                                <div className="skeleton-label"></div>
                                <div className="skeleton-value"></div>
                            </div>
                        </div>
                        
                        <div className="skeleton-button"></div>
                    </div>
                    
                    <div className="related-sessions-container">
                        <div className="skeleton-card"></div>
                        <div className="skeleton-card"></div>
                        <div className="skeleton-card"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !session) {
        return (
            <div className="live-session-details-not-found">
                <h2>Live session not found</h2>
                <NavLink to="/live-sessions">Back to Live Sessions</NavLink>
            </div>
        )
    }

    const sessionDateTime = getMetafieldValue('live_session_date_and_time')
    const sessionVenue = getMetafieldValue('live_session_venue')
    const buttonLabel = getMetafieldValue('button_label') || 'Reserve your slot'

    return (
        <div className="container mt-5">
            <div className="breadcrumbs-section">
                <NavLink to="/">Home</NavLink>
                <ChevronRight />
                <NavLink to="/live-sessions">Live Sessions</NavLink>
                <ChevronRight />
                <span>Session details</span>
            </div>
            <h1 className="live-session-details-heading">{session.title}</h1>
            <div className="live-session-details-main-container">
                <img 
                    src={session.image?.url} 
                    alt={session.title} 
                    className='live-session-image' 
                />
                <div className="live-session-description">
                    <h1>About the session</h1>
                    {session.contentHtml ? (
                        <div dangerouslySetInnerHTML={{ __html: session.contentHtml }} />
                    ) : session.excerpt ? (
                        <p>{session.excerpt}</p>
                    ) : (
                        <p>Join us for this informative live session! More details coming soon.</p>
                    )}
                </div>
                <div className="live-session-schedule-container">
                    <div className="schedule-item">
                        <p>Date</p>
                        <h1>{formatDateDisplay(sessionDateTime) || 'TBA'}</h1>
                    </div>

                    <div className="schedule-item">
                        <p>Time</p>
                        <h1>{formatTimeDisplay(sessionDateTime) || 'TBA'}</h1>
                    </div>

                    <div className="schedule-item">
                        <p>Venue</p>
                        <h1>{sessionVenue || 'Online'}</h1>
                    </div>
                </div>
                {isAuthenticated ? (
                    <button 
                        className='button-pink-center book-slot-btn'
                        data-bs-toggle="offcanvas" 
                        data-bs-target="#liveSessionBookingModal"
                    >
                        {buttonLabel}
                    </button>
                ) : (
                    <button 
                        className='button-pink-center book-slot-btn'
                        data-bs-toggle="offcanvas" 
                        data-bs-target="#AuthenticationModal"
                    >
                        {buttonLabel}
                    </button>
                )}
            </div>

            {relatedSessions.length > 0 && (
                <div className="related-sessions-container">
                    {relatedSessions.map((item, index) => (
                        <EventCard key={item.node?.id || index} event={item.node} />
                    ))}
                </div>
            )}

            {/* Booking Modal */}
            <div className="offcanvas offcanvas-end sessionBookingModal" tabIndex="-1" id="liveSessionBookingModal" aria-labelledby="offcanvasRightLabel">
                <div className="mf-off-canvas-header">
                    <p className="head-ing">LIVE session</p>
                    <button className="close-btn" data-bs-dismiss="offcanvas" aria-label="Close"><X /></button>
                </div>
                <div className="session-modal-body">
                    {bookingSuccess ? (
                        <div className="booking-success-screen">
                            <div className="success-icon">
                                <Check size={48} />
                            </div>
                            <h1 className="reservation-id-label">Reservation ID</h1>
                            <h2 className="reservation-id">{reservationId}</h2>
                            <p className="success-message">You're in! See you soon.</p>
                            <p className="success-submessage">Please check your email for the session link. <br /> Join on time to enjoy the full session. Wishing <br /> you a happy motherhood journey. 💛</p>
                            <p className="contact-message">If you have any questions, please contact us with the <br /> reference number to our support team.</p>
                            <div className="success-buttons">
                                <button className="button-pink-center" onClick={() => navigate('/')}>Home</button>
                                <button className="button-pink-border" onClick={() => navigate('/contact')}>Contact us</button>
                            </div>
                        </div>
                    ) : (
                        <>
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
                                {isLoadingSlots ? (
                                    <>
                                        {[1, 2, 3, 4].map((item) => (
                                            <div key={item} className="time-slot-skeleton">
                                                <div className="skeleton-line"></div>
                                                <div className="skeleton-line-small"></div>
                                            </div>
                                        ))}
                                    </>
                                ) : selectedTimeSlots.length > 0 ? (
                                    selectedTimeSlots.map((slot, index) => {
                                        const slotsLeft = slot.capacity - slot.booked
                                        const isFull = slotsLeft <= 0
                                        return (
                                            <button 
                                                key={index}
                                                className={`time-slot ${selectedTimeSlot === slot ? 'selected' : ''} ${isFull ? 'full' : ''}`}
                                                onClick={() => handleTimeSlotClick(slot)}
                                                disabled={isFull}
                                            >
                                                {formatTime(slot.time)}
                                                <span className="slot-capacity">
                                                    {isFull ? ' (Full)' : ` (${slotsLeft} left)`}
                                                </span>
                                            </button>
                                        )
                                    })
                                ) : (
                                    <p className="no-slots-message">
                                        {selectedDate ? 'No slots available for this date' : 'Select a date to view available time slots'}
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                </div>
                {!bookingSuccess && (
                    <div className="session-modal-footer">
                        <button 
                            className="button-pink-center" 
                            onClick={handleReserveSlot}
                            disabled={!selectedDate || !selectedTimeSlot || isBooking}
                        >
                            {isBooking ? 'Reserving...' : 'Reserve slot'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LiveSessionDetails