import React, { useState } from 'react'
import './Blogs.css'
import Heading from '../../Components/Heading/Heading'
import BlogCard from '../../Components/BlogCard/BlogCard'
import { blogsData, blogHeadingData } from '../../data/blogsData'

const Blogs = () => {
  const [visibleCount, setVisibleCount] = useState(6)
  const [isExpanded, setIsExpanded] = useState(false)

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
      <Heading data={blogHeadingData} />
      
      <div className="blogs-grid-wrapper">
        <div className="blogs-grid-container">
          {visibleBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>

      {blogsData.length > 6 && (
        <div className="blogs-expand-wrapper">
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