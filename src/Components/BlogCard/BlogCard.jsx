import React from 'react'
import './BlogCard.css'

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card-wrapper">
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
          <button className="button-pink-border">Reserve</button>
        ) : (
          <button className="button-pink-border">Read article</button>
        )}
      </div>
    </div>
  )
}

export default BlogCard
