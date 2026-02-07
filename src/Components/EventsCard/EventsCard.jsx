import React from 'react'
import './EventsCard.css'
import { useNavigate } from 'react-router-dom'

const EventsCard = ({ event }) => {
    const navigate = useNavigate()

    // Default placeholder image
    const defaultImage = 'https://via.placeholder.com/400x300/FD8CBB/FFFFFF?text=Mommy+First'

    // Helper function to get metafield value
    const getMetafieldValue = (key) => {
        const metafield = event.metafields?.find(m => m.key === key)
        return metafield?.value ?? null
    }

    // Get event data
    const imageUrl = event.image?.url || defaultImage
    const title = event.title || ''
    const handle = event.handle || ''
    const buttonLabel = getMetafieldValue('button_label') || 'Learn more'
    const isExternalEvent = getMetafieldValue('is_external_event')
    const externalUrl = getMetafieldValue('external_redirection_url')
    const labelOnImage = getMetafieldValue('label_on_image')

    // Format date from metafield
    const dateTime = getMetafieldValue('live_session_date_and_time')
    let formattedDate = ''
    if (dateTime) {
        formattedDate = new Date(dateTime).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    } else if (event.publishedAt) {
        formattedDate = new Date(event.publishedAt).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    // Handle navigation based on is_external_event
    const handleClick = () => {
        if (isExternalEvent === true || isExternalEvent === 'true') {
            if (externalUrl) {
                // Check if it's an external URL or internal path
                if (externalUrl.startsWith('http://') || externalUrl.startsWith('https://')) {
                    window.open(externalUrl, '_blank')
                } else {
                    navigate(externalUrl)
                }
            }
        } else {
            navigate(`/events/${handle}`)
        }
    }

    return (
        <div className="events-card" onClick={handleClick}>
            <span className={`label ${labelOnImage ? '' : 'd-none'}`}>{labelOnImage}</span>
            <img src={imageUrl} alt={title} />
            <div className="content-con">
                <h1>{title}</h1>
                <p>{formattedDate}</p>
                <button className='button-label' onClick={(e) => { e.stopPropagation(); handleClick(); }}>{buttonLabel}</button>
            </div>
        </div>
    )
}

export default EventsCard
