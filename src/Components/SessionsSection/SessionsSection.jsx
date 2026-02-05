import React, { useEffect, useState } from 'react'
import './SessionsSection.css'
import { useAuth } from '../../contexts/AuthContext'
import { Play, Loader2 } from 'lucide-react'
import { getUserDetails } from '../../services/userService'

const SessionsSection = () => {
  const { customer } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
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

  const handleCancelSession = (bookingId) => {
    // TODO: Implement cancel session functionality
    console.log('Cancel session:', bookingId)
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
                  >
                    Cancel
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
