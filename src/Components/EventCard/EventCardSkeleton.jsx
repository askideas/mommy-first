import React from 'react'
import './EventCardSkeleton.css'

const EventCardSkeleton = () => {
  return (
    <div className="event-card-skeleton">
      <div className="skeleton-event-image"></div>
      <div className="skeleton-event-details">
        <div className="skeleton-event-title"></div>
        <div className="skeleton-event-subtitle"></div>
        <div className="skeleton-event-date"></div>
        <div className="skeleton-event-author"></div>
        <div className="skeleton-event-button"></div>
      </div>
    </div>
  )
}

export default EventCardSkeleton
