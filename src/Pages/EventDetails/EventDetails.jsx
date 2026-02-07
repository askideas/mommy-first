import React, { useState, useEffect } from 'react'
import './EventDetails.css'
import { NavLink, useParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import EventsCard from '../../Components/EventsCard/EventsCard'
import { getEventByHandle, getEvents } from '../../services/blogService'

const EventDetails = () => {
    const { eventId } = useParams()
    const [event, setEvent] = useState(null)
    const [relatedEvents, setRelatedEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchEventData()
        fetchRelatedEvents()
    }, [eventId])

    const fetchEventData = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await getEventByHandle(eventId)
            console.log('Event details response:', response)
            if (response.success && response.data) {
                setEvent(response.data)
            } else {
                setError('Event not found')
            }
        } catch (error) {
            console.error('Failed to fetch event:', error)
            setError('Failed to load event')
        } finally {
            setIsLoading(false)
        }
    }

    const fetchRelatedEvents = async () => {
        try {
            const response = await getEvents()
            if (response.success && response.data?.articles?.edges) {
                // Get 3 related events excluding current one
                const filtered = response.data.articles.edges
                    .filter(edge => edge.node.handle !== eventId)
                    .slice(0, 3)
                setRelatedEvents(filtered)
            }
        } catch (error) {
            console.error('Failed to fetch related events:', error)
        }
    }

    // Helper function to get metafield value
    const getMetafieldValue = (key) => {
        const metafield = event?.metafields?.find(m => m.key === key)
        return metafield?.value ?? null
    }

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return ''
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    // Format time
    const formatTime = (dateString) => {
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
                <div className="event-details-skeleton">
                    <div className="skeleton-breadcrumbs">
                        <div className="skeleton-breadcrumb-item"></div>
                        <div className="skeleton-breadcrumb-item"></div>
                        <div className="skeleton-breadcrumb-item"></div>
                    </div>
                    
                    <div className="skeleton-title-main"></div>
                    
                    <div className="event-details-main-container">
                        <div className="skeleton-image"></div>
                        
                        <div className="event-description">
                            <div className="skeleton-title"></div>
                            <div className="skeleton-paragraph"></div>
                            <div className="skeleton-paragraph"></div>
                            <div className="skeleton-paragraph short"></div>
                        </div>
                        
                        <div className="event-schedule-container">
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
                    
                    <div className="related-events-container">
                        <div className="skeleton-card"></div>
                        <div className="skeleton-card"></div>
                        <div className="skeleton-card"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !event) {
        return (
            <div className="event-details-not-found">
                <h2>Event not found</h2>
                <NavLink to="/events">Back to Events</NavLink>
            </div>
        )
    }

    const eventDate = getMetafieldValue('event_date') || getMetafieldValue('live_session_date_and_time')
    const eventVenue = getMetafieldValue('event_venue')
    const buttonLabel = getMetafieldValue('button_label') || 'Book your seat'

    return (
        <div className="container mt-5">
            <div className="breadcrumbs-section">
                <NavLink to="/">Home</NavLink>
                <ChevronRight />
                <NavLink to="/events">Events</NavLink>
                <ChevronRight />
                <span>Event details</span>
            </div>
            <h1 className="event-details-heading">{event.title}</h1>
            <div className="event-details-main-container">
                <img 
                    src={event.image?.url} 
                    alt={event.title} 
                    className='event-image' 
                />
                <div className="event-description">
                    <h1>About the event</h1>
                    {event.contentHtml ? (
                        <div dangerouslySetInnerHTML={{ __html: event.contentHtml }} />
                    ) : event.excerpt ? (
                        <p>{event.excerpt}</p>
                    ) : (
                        <p>Join us for this exciting event! More details coming soon.</p>
                    )}
                </div>
                <div className="event-schedule-container">
                    <div className="schedule-item">
                        <p>Date</p>
                        <h1>{formatDate(eventDate) || 'TBA'}</h1>
                    </div>

                    <div className="schedule-item">
                        <p>Time</p>
                        <h1>{formatTime(eventDate) || 'TBA'}</h1>
                    </div>

                    <div className="schedule-item">
                        <p>Venue</p>
                        <h1>{eventVenue || 'TBA'}</h1>
                    </div>
                </div>
                <button className='button-pink-center book-slot-btn'>{buttonLabel}</button>
            </div>

            {relatedEvents.length > 0 && (
                <div className="related-events-container">
                    {relatedEvents.map((item, index) => (
                        <EventsCard key={item.node?.id || index} event={item.node} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default EventDetails
