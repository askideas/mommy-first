import React, { useEffect, useState } from 'react'
import './SessionsSection.css'
import { useAuth } from '../../contexts/AuthContext'
import { Play, Loader2 } from 'lucide-react'
import { getUserDetails, updateNewUserProfile } from '../../services/userService'
import { db } from '../../firebase/config'
import { doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

const SessionsSection = () => {
  const { customer } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isCancelling, setIsCancelling] = useState(null)
  const [sessions, setSessions] = useState([])

  // Extract sessions data from customer metafields (like BabiesSection)
  useEffect(() => {
    const extractSessions = () => {
      try {
        const sessionsMetafield = customer?.metafields?.custom?.sessions
        if (sessionsMetafield && sessionsMetafield.value) {
          const sessionsData = Array.isArray(sessionsMetafield.value)
            ? sessionsMetafield.value
            : JSON.parse(sessionsMetafield.value)
          setSessions(sessionsData)
        } else {
          setSessions([])
        }
      } catch (error) {
        console.error('Error extracting sessions data:', error)
        setSessions([])
      }
    }
    
    extractSessions()
  }, [customer])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  const getSessionStatus = (sessionDate) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const sessionDay = new Date(sessionDate)
    sessionDay.setHours(0, 0, 0, 0)
    
    if (sessionDay.getTime() === today.getTime()) {
      return 'Today'
    } else if (sessionDay > today) {
      return 'Upcoming'
    } else {
      return 'Expired'
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'today':
        return 'status-today'
      case 'upcoming':
        return 'status-upcoming'
      case 'expired':
        return 'status-expired'
      default:
        return 'status-upcoming'
    }
  }

  const handleCancelSession = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this session?')) {
      return
    }

    setIsCancelling(bookingId)
    
    try {
      // Find the session to get details for email
      const session = sessions.find(s => s.bookingId === bookingId)
      if (!session) {
        toast.error('Session not found')
        return
      }

      console.log('Cancelling session:', bookingId)

      // 1. Delete from Firebase
      console.log('Deleting from Firebase...')
      const sessionDocRef = doc(db, 'sessionBookings', bookingId)
      await deleteDoc(sessionDocRef)
      console.log('✅ Deleted from Firebase')

      // 2. Remove from user metafields
      console.log('Removing from user metafields...')
      const updatedSessions = sessions.filter(s => s.bookingId !== bookingId)
      
      const updateResponse = await updateNewUserProfile(customer.id, {
        firstName: customer.firstName,
        lastName: customer.lastName,
        metafields: [{
          namespace: 'custom',
          key: 'sessions',
          value: JSON.stringify(updatedSessions),
          type: 'json'
        }]
      })
      console.log('Update response:', updateResponse)

      // Update local state
      setSessions(updatedSessions)
      console.log('✅ Removed from metafields')

      // 3. Send cancellation emails
      console.log('Fetching auth token for emails...')
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
        const formattedDate = new Date(session.sessionDate).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })

        const formatTime = (time) => {
          const [hours, minutes] = time.split(':')
          const hour = parseInt(hours)
          const ampm = hour >= 12 ? 'PM' : 'AM'
          const hour12 = hour % 12 || 12
          return `${hour12}:${minutes} ${ampm}`
        }
        
        // Customer cancellation email
        const customerEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <h1 style="color: #DC5F92; text-align: center;">Session Cancelled</h1>
            <div style="background: #FFF6F8; padding: 20px; border-radius: 12px; margin: 20px 0;">
              <h2 style="color: #DC5F92; margin-top: 0;">Cancellation Details</h2>
              <p style="font-size: 16px; line-height: 1.6;">
                <strong>Reservation ID:</strong> ${bookingId}<br/>
                <strong>Session Name:</strong> ${session.sessionName}<br/>
                <strong>Date:</strong> ${formattedDate}<br/>
                <strong>Time:</strong> ${formatTime(session.timeSlot)}<br/>
              </p>
            </div>
            <p style="font-size: 14px; line-height: 1.6;">
              Your session has been successfully cancelled.<br/><br/>
              We hope to see you at another session soon!<br/><br/>
              If you have any questions, please contact us with the reference number <strong>${bookingId}</strong>.
            </p>
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #999; font-size: 12px;">Wishing you a happy motherhood journey!</p>
              <p style="color: #DC5F92; font-weight: bold;">Mommy First</p>
            </div>
          </div>
        `
        
        // Admin cancellation email
        const adminEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <h1 style="color: #DC5F92;">Session Cancellation</h1>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0;">Cancellation Details</h2>
              <p style="font-size: 14px; line-height: 1.6;">
                <strong>Reservation ID:</strong> ${bookingId}<br/>
                <strong>Session Name:</strong> ${session.sessionName}<br/>
                <strong>Session ID:</strong> ${session.sessionId}<br/>
                <strong>Date:</strong> ${formattedDate}<br/>
                <strong>Time:</strong> ${formatTime(session.timeSlot)}<br/>
                <strong>Customer Name:</strong> ${customer.firstName} ${customer.lastName}<br/>
                <strong>Email:</strong> ${customer.email}<br/>
                <strong>Cancelled At:</strong> ${new Date().toLocaleString()}<br/>
                <strong>Status:</strong> Cancelled
              </p>
            </div>
          </div>
        `
        
        // Send customer email
        try {
          const customerEmailResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/mail/send`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${emailToken}`
            },
            body: JSON.stringify({
              toEmail: customer.email,
              toName: `${customer.firstName} ${customer.lastName}`,
              subject: `Session Cancelled - ${bookingId}`,
              text: `Session Cancelled. Reservation ID: ${bookingId}. Session: ${session.sessionName}. Date: ${formattedDate}. Time: ${formatTime(session.timeSlot)}. Your session has been successfully cancelled.`,
              html: customerEmailHtml
            })
          })
          
          const customerEmailData = await customerEmailResponse.json()
          
          if (customerEmailData.success) {
            console.log('✅ Customer cancellation email sent')
          }
        } catch (emailError) {
          console.error('Failed to send customer email:', emailError)
        }
        
        // Send admin email
        try {
          const adminEmailResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/mail/send`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${emailToken}`
            },
            body: JSON.stringify({
              toEmail: 'connect.clicknova@gmail.com',
              toName: 'Mommy First Admin',
              subject: `Session Cancelled - ${bookingId}`,
              text: `Session cancelled. Reservation ID: ${bookingId}. Customer: ${customer.firstName} ${customer.lastName} (${customer.email}). Session: ${session.sessionName}. Date: ${formattedDate}. Time: ${formatTime(session.timeSlot)}.`,
              html: adminEmailHtml
            })
          })
          
          const adminEmailData = await adminEmailResponse.json()
          
          if (adminEmailData.success) {
            console.log('✅ Admin cancellation email sent')
          }
        } catch (emailError) {
          console.error('Failed to send admin email:', emailError)
        }
      }

      toast.success('Session cancelled successfully')
    } catch (error) {
      console.error('Failed to cancel session:', error)
      toast.error('Failed to cancel session. Please try again.')
    } finally {
      setIsCancelling(null)
    }
  }

  if (isLoading) {
    return (
      <div className="sessions-section-container">
        <div className="sessions-section-header">
          <p className='heading'>
            <Play />
            <span>Sessions</span>
          </p>
        </div>
        <div className="sessions-loading">
          <Loader2 className="spinner" />
          <p>Loading sessions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="sessions-section-container">
      <div className="sessions-section-header">
        <p className='heading'>
          <Play />
          <span>Sessions</span>
        </p>
      </div>

      {sessions.length === 0 ? (
        <div className="no-sessions">
          <Play size={48} />
          <h3>No Sessions Booked</h3>
          <p>You haven't booked any sessions yet. Browse our events to book your first session!</p>
        </div>
      ) : (
        <div className="sessions-list">
          {sessions.map((session, index) => {
            const sessionStatus = getSessionStatus(session.sessionDate)
            return (
              <div key={index} className="session-item">
                <div className="session-icon">
                  <Play size={20} />
                </div>
                <div className="session-details">
                  <h3 className="session-name">{session.sessionName}</h3>
                  <p className="session-info">Led by: Certified OB/GYN Nurse</p>
                </div>
                <div className="session-meta">
                  <p className="session-date">{formatDate(session.sessionDate)}</p>
                  <span className={`session-status ${getStatusBadgeClass(sessionStatus)}`}>
                    {sessionStatus}
                  </span>
                  <button 
                    className="cancel-session-btn button-pink-border"
                    onClick={() => handleCancelSession(session.bookingId)}
                    disabled={isCancelling === session.bookingId}
                  >
                    {isCancelling === session.bookingId ? (
                      <>
                        <Loader2 size={14} className="spinner" />
                        Cancelling...
                      </>
                    ) : (
                      'Cancel'
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SessionsSection
