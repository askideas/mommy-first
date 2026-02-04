import React, { useState, useEffect } from 'react'
import './ActivitiesHome.css'
import Heading from '../Heading/Heading'
import CardWithImage from '../CardwithImage/CardWithImage'
import { useNavigate } from 'react-router-dom'
import { getEvents } from '../../services/blogService'

const ActivitiesHome = () => {
  const navigate = useNavigate()
  const [eventsData, setEventsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
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

  const displayedEvents = eventsData.slice(0, 3)
  const totalEvents = eventsData.length

  return (
    <div className='container' style={{marginBottom: '154px'}}>
      <Heading data={headingData}/>
      <div className="filters-section">
        <button className='filter-button active'>Latest</button>
        <button className='filter-button'>2024</button>
        <button className='filter-button'>2023</button>
      </div>
      <div className="activities-home-container">
        {
          isLoading ? (
            <p>Loading events...</p>
          ) : displayedEvents.length > 0 ? (
            displayedEvents.map((edge, index) => {
              const item = edge.node
              return (
                <CardWithImage key={index} item={item} />
              )
            })
          ) : (
            <p>No events available at the moment.</p>
          )
        }
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
          <p className='progress-bar-text'>You've seen {displayedEvents.length} out of {totalEvents} activities</p>
          <div className="progress-bar-con">
              <span></span>
          </div>
          <button className='button-label' onClick={()=> navigate('/events')}>View all</button>
      </div>
    </div>
    
  )
}

export default ActivitiesHome
