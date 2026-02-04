import React, { useEffect, useState } from 'react'
import './SessionsSection.css'
import { useAuth } from '../../contexts/AuthContext'
import { Play, Loader2 } from 'lucide-react'
import { getUserDetails } from '../../services/userService'

const SessionsSection = () => {
  const { customer } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    fetchSessions()
  }, [customer])

  const fetchSessions = async () => {
    if (!customer?.id) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    try {
      const response = await getUserDetails(customer.id)
      console.log('User details response:', response)
      
      if (response.success && response.data?.metafields?.custom?.sessions?.value) {
        try {
          const sessionsData = JSON.parse(response.data.metafields.custom.sessions.value)
          setSessions(sessionsData)
        } catch (e) {
          console.error('Error parsing sessions:', e)
          setSessions([])
        }
      } else {
        setSessions([])
      }
    } catch (error) {
      console.error('Error fetching sessions:', error)
      setSessions([])
    } finally {
      setIsLoading(false)
    }
  }

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

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'today':
        return 'status-today'
      case 'upcoming':
        return 'status-upcoming'
      case 'expired':
        return 'status-expired'
      case 'confirmed':
        return 'status-confirmed'
      default:
        return 'status-confirmed'
    }
  }

  if (isLoading) {
    return (
      <div className="sessions-section-container">
        <div className="sessions-section-header">
          <div className="section-title-con">
            <Play />
            <h1>Sessions</h1>
          </div>
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
        <div className="section-title-con">
          <Play />
          <h1>Sessions</h1>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="no-sessions">
          <Play size={48} />
          <h3>No Sessions Booked</h3>
          <p>You haven't booked any sessions yet. Browse our events to book your first session!</p>
        </div>
      ) : (
        <div className="sessions-list">
          {sessions.map((session, index) => (
            <div key={index} className="session-item">
              <div className="session-icon">
                <Play size={20} />
              </div>
              <div className="session-details">
                <h3 className="session-name">{session.sessionName}</h3>
                <p className="session-info">Led by Certified OB/GYN Nurse</p>
              </div>
              <div className="session-meta">
                <p className="session-date">{formatDate(session.sessionDate)}</p>
                <span className={`session-status ${getStatusBadgeClass(session.status)}`}>
                  {session.status === 'confirmed' ? 'Confirmed' : session.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SessionsSection
