import React, { useState, useEffect } from 'react'
import './Events.css'
import Heading from '../../Components/Heading/Heading'
import EventsCard from '../../Components/EventsCard/EventsCard'
import SkeletonLoader from '../../Components/SkeletonLoader/SkeletonLoader'
import { useFadeUpAnimation } from '../../hooks/useFadeUpAnimation'
import { getEvents } from '../../services/blogService'

const Events = () => {
    const [eventsData, setEventsData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [displayedItems, setDisplayedItems] = useState(9)
    const ITEMS_PER_PAGE = 9
    
    // Animation refs
    const [headingRef, headingVisible] = useFadeUpAnimation(0.1, true)
    const [filtersRef, filtersVisible] = useFadeUpAnimation(0.1, true)
    const [gridRef, gridVisible] = useFadeUpAnimation(0.1, true)
    const [progressRef, progressVisible] = useFadeUpAnimation(0.1, true)

    const headingData = {
        'title': "What's On",
        'subtitle': "Our Activities & Engagements",
        'description': false
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        setIsLoading(true)
        try {
            const response = await getEvents()
            console.log('Events response:', response)
            if (response.success && response.data?.articles?.edges) {
                setEventsData(response.data.articles.edges)
            }
        } catch (error) {
            console.error('Failed to fetch events:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const visibleItems = eventsData.slice(0, displayedItems)
    const hasMore = displayedItems < eventsData.length
    const totalItems = eventsData.length

    const handleLoadMore = () => {
        setDisplayedItems(prev => Math.min(prev + ITEMS_PER_PAGE, eventsData.length))
    }

    // Skeleton loader for loading state
    const renderSkeletons = () => {
        return [...Array(6)].map((_, index) => (
            <div key={index} className="event-skeleton-card">
                <SkeletonLoader height="100%" style={{ aspectRatio: '1/1' }} borderRadius="16px" />
                <div style={{ padding: '24px' }}>
                    <SkeletonLoader height="24px" width="80%" style={{ marginBottom: '20px' }} />
                    <SkeletonLoader height="16px" width="60%" style={{ marginBottom: '20px' }} />
                    <SkeletonLoader height="40px" width="100%" />
                </div>
            </div>
        ))
    }

    return (
        <div className='container' style={{marginBottom: '154px', marginTop: '90px'}}>
        <div ref={headingRef} className={`events-heading-section ${headingVisible ? 'animate-in' : ''}`}>
            <Heading data={headingData}/>
        </div>
        <div ref={filtersRef} className={`filters-section ${filtersVisible ? 'animate-in' : ''}`}>
            <button className='filter-button active'>Latest</button>
            <button className='filter-button'>2024</button>
            <button className='filter-button'>2023</button>
        </div>
        
        {isLoading ? (
            <div className="activities-home-container">
                {renderSkeletons()}
            </div>
        ) : eventsData.length === 0 ? (
            <div className="no-events-message">
                <p>No events available at the moment. Check back soon!</p>
            </div>
        ) : (
            <>
                <div ref={gridRef} className={`activities-home-container ${gridVisible ? 'animate-in' : ''}`}>
                    {visibleItems.map((item, index) => (
                        <EventsCard key={item.node?.id || index} event={item.node} />
                    ))}
                </div>
                <div ref={progressRef} className={`d-flex flex-column justify-content-center align-items-center ${progressVisible ? 'animate-in' : ''}`}>
                    <p className='progress-bar-text'>You have seen {visibleItems.length} out of {totalItems} activities</p>
                    <div className="progress-bar-con">
                        <span style={{ width: `${(visibleItems.length / totalItems) * 100}%` }}></span>
                    </div>
                    {hasMore && (
                        <button className='button-label' onClick={handleLoadMore}>Load more</button>
                    )}
                </div>
            </>
        )}
        </div>
    )
}

export default Events
