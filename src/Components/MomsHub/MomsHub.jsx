import React, { useState, useEffect } from 'react'
import './MomsHub.css'
import { useFadeUpAnimation, getFadeUpClass } from '../../hooks/useFadeUpAnimation'
import Heading from '../Heading/Heading'
import BlogCard from '../BlogCard/BlogCard'
import { getJournals } from '../../services/blogService'

const MomsHub = () => {
  const [journalsData, setJournalsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Animation refs
  const [headingRef, headingVisible] = useFadeUpAnimation(0.2)
  const [itemsRef, itemsVisible] = useFadeUpAnimation(0.2)
  const [progressRef, progressVisible] = useFadeUpAnimation(0.2)
  
  const headingData = {
    'title': "Moms Hub",
    'subtitle': "Together with Moms",
    'description': false
  }

  useEffect(() => {
    fetchJournals()
  }, [])

  const fetchJournals = async () => {
    setIsLoading(true)
    try {
      const response = await getJournals()
      console.log('Journals response:', response)
      if (response.success && response.data?.articles?.edges) {
        setJournalsData(response.data.articles.edges)
      }
    } catch (error) {
      console.error('Failed to fetch journals:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const displayedJournals = journalsData.slice(0, 3)
  const totalJournals = journalsData.length

  return (
    <div className="container" style={{marginBottom: '154px'}}>
      <div className="mommy-hub-container">
        <div ref={headingRef} className={getFadeUpClass('fade-up-animation', headingVisible)}>
          <Heading data={headingData}/>
        </div>
        <div ref={itemsRef} className={getFadeUpClass('fade-up-animation', itemsVisible)} style={{animationDelay: '0.1s'}}>
          <div className="moms-hub-items-con">
          {
            isLoading ? (
              <p>Loading journals...</p>
            ) : displayedJournals.length > 0 ? (
              displayedJournals.map((edge, index) => {
                const blog = edge.node
                return (
                  <BlogCard key={index} blog={blog} />
                )
              })
            ) : (
              <p>No journals available at the moment.</p>
            )
          }
        </div>
      </div>

        <div ref={progressRef} className={getFadeUpClass('fade-up-animation', progressVisible)} style={{animationDelay: '0.2s'}}>
        <div className="d-flex flex-column justify-content-center align-items-center">
            <p className='progress-bar-text'>You've seen {displayedJournals.length} out of {totalJournals} journals</p>
            <div className="progress-bar-con">
                <span></span>
            </div>
            <button className='button-label'>Community</button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default MomsHub