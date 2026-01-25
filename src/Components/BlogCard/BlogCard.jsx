import React from 'react'
import { useNavigate } from 'react-router-dom'
import './BlogCard.css'

const BlogCard = ({ blog }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/blogs/${blog.id}`)
  }

  const handleButtonClick = (e) => {
    e.stopPropagation()
    navigate(`/blogs/${blog.id}`)
  }

  return (
    <div className="blog-card-wrapper" onClick={handleCardClick}>
      <div className="blog-card-image-container">
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="blog-card-image"
        />
        {blog.isLive && (
          <span className="blog-card-live-badge">LIVE</span>
        )}
      </div>
      
      <div className="blog-card-content">
        <h3 className="blog-card-title">{blog.title}</h3>
        <p className="blog-card-subtitle">{blog.subtitle}</p>
        <p className="blog-card-description">{blog.description}</p>
        
        {blog.type === 'reserve' ? (
          <button className="button-pink-border" onClick={handleButtonClick}>Reserve</button>
        ) : (
          <button className="button-pink-border" onClick={handleButtonClick}>Read article</button>
        )}
      </div>
    </div>
  )
}

export default BlogCard
