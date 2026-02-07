import React, { useState, useEffect } from 'react'
import './LiveSessions.css'
import Heading from '../../Components/Heading/Heading'
import EventCard from '../../Components/EventCard/EventCard'
import { getLiveSessions } from '../../services/blogService'
import SkeletonLoader from '../../Components/SkeletonLoader/SkeletonLoader'
import ErrorComponent from '../../Components/ErrorComponent/ErrorComponent'
import SomeWentWrong from '../../assets/something-went-wrong.svg'

const LiveSessions = () => {
  const [liveSessionsData, setLiveSessionsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [displayedItems, setDisplayedItems] = useState(9)
  const ITEMS_PER_PAGE = 9

  const headingData = {
    title: "Live Sessions",
    subtitle: "Connect with Experts",
    description: "Join our live sessions with healthcare professionals, parenting experts,<br/>and fellow moms for support and guidance."
  }

  useEffect(() => {
    fetchLiveSessions()
  }, [])

  const fetchLiveSessions = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await getLiveSessions()
      console.log('Live sessions response:', response)
      if (response.success && response.data?.articles?.edges) {
        setLiveSessionsData(response.data.articles.edges)
      } else {
        setError('No live sessions available at the moment.')
      }
    } catch (err) {
      console.error('Failed to fetch live sessions:', err)
      setError('Failed to load live sessions. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const visibleItems = liveSessionsData.slice(0, displayedItems)
  const hasMore = displayedItems < liveSessionsData.length
  const totalItems = liveSessionsData.length

  const handleLoadMore = () => {
    setDisplayedItems(prev => Math.min(prev + ITEMS_PER_PAGE, liveSessionsData.length))
  }

  // Skeleton loader for loading state
  const renderSkeletons = () => {
    return [...Array(6)].map((_, index) => (
      <div key={index} className="event-card-skeleton">
        <SkeletonLoader height="200px" borderRadius="16px" />
        <div style={{ padding: '16px' }}>
          <SkeletonLoader height="24px" width="80%" style={{ marginBottom: '12px' }} />
          <SkeletonLoader height="16px" width="60%" style={{ marginBottom: '8px' }} />
          <SkeletonLoader height="40px" width="100%" style={{ marginTop: '16px' }} />
        </div>
      </div>
    ))
  }

  return (
    <div className='container' style={{ marginBottom: '154px', marginTop: '90px' }}>
      <Heading data={headingData} />
      
      {isLoading ? (
        <div className="live-sessions-grid mt-5">
          {renderSkeletons()}
        </div>
      ) : error ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <ErrorComponent data={{
            title: "Something went wrong",
            subtitle: error,
            image: SomeWentWrong,
            buttons: [
              { label: "Retry", className: "button-pink-center", onClick: fetchLiveSessions },
              { label: "Go to HOME", className: "button-pink-border", link: '/' },
            ]
          }} />
        </div>
      ) : liveSessionsData.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
          <p className="no-sessions-text">No live sessions available at the moment. Check back soon!</p>
        </div>
      ) : (
        <>
          <div className="live-sessions-grid mt-5">
            {visibleItems.map((session, index) => (
              <EventCard key={session.node?.id || index} event={session.node} />
            ))}
          </div>
          
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p className='progress-bar-text'>
              You've seen {visibleItems.length} out of {totalItems} sessions
            </p>
            <div className="progress-bar-con">
              <span style={{ width: `${(visibleItems.length / totalItems) * 100}%` }}></span>
            </div>
            {hasMore && (
              <button className='button-label' onClick={handleLoadMore}>
                Load more
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default LiveSessions