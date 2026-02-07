import React, { useState, useEffect } from 'react'
import './Blogs.css'
import Heading from '../../Components/Heading/Heading'
import BlogCard from '../../Components/BlogCard/BlogCard'
import BlogCardSkeleton from '../../Components/BlogCard/BlogCardSkeleton'
import { blogHeadingData } from '../../data/blogsData'
import { getJournals } from '../../services/blogService'
import { useFadeUpAnimation } from '../../hooks/useFadeUpAnimation'

const Blogs = () => {
  const [visibleCount, setVisibleCount] = useState(6)
  const [isExpanded, setIsExpanded] = useState(false)
  const [blogsData, setBlogsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Animation refs
  const [headingRef, headingVisible] = useFadeUpAnimation(0.1, true)
  const [gridRef, gridVisible] = useFadeUpAnimation(0.1, true)
  const [buttonRef, buttonVisible] = useFadeUpAnimation(0.1, true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    setIsLoading(true)
    try {
      const response = await getJournals()
      console.log('Blogs response:', response)
      if (response.success && response.data?.articles?.edges) {
        setBlogsData(response.data.articles.edges)
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExpandToggle = () => {
    if (isExpanded) {
      setVisibleCount(6)
      setIsExpanded(false)
    } else {
      setVisibleCount(blogsData.length)
      setIsExpanded(true)
    }
  }

  const visibleBlogs = blogsData.slice(0, visibleCount)

  return (
    <div className="blogs-page-container">
      <div ref={headingRef} className={`blogs-heading-section ${headingVisible ? 'animate-in' : ''}`}>
        <Heading data={blogHeadingData} />
      </div>
      
      <div className="blogs-grid-wrapper">
        <div ref={gridRef} className={`blogs-grid-container ${gridVisible ? 'animate-in' : ''}`}>
          {isLoading ? (
            // Show 6 skeleton loaders while fetching
            Array(6).fill(0).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))
          ) : (
            visibleBlogs.map((blog) => (
              <BlogCard key={blog.node.id} blog={blog.node} />
            ))
          )}
        </div>
      </div>

      {!isLoading && blogsData.length > 6 && (
        <div ref={buttonRef} className={`blogs-expand-wrapper ${buttonVisible ? 'animate-in' : ''}`}>
          <button 
            className="button-pink-border"
            onClick={handleExpandToggle}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Blogs