import React from 'react'
import { useNavigate } from 'react-router-dom'
import './BlogCard.css'

const BlogCard = ({ blog }) => {
  const navigate = useNavigate()

  // Default placeholder image for blogs without images
  const defaultImage = 'https://via.placeholder.com/400x300/FD8CBB/FFFFFF?text=Mommy+First'

  // Helper function to get metafield value
  const getMetafieldValue = (key) => {
    const metafield = blog.metafields?.find(m => m.key === key)
    return metafield?.value || null
  }

  const handleCardClick = () => {
    navigate(`/blogs/${blog.handle || blog.id}`)
  }

  const handleButtonClick = (e) => {
    e.stopPropagation()
    navigate(`/blogs/${blog.handle || blog.id}`)
  }

  const buttonLabel = getMetafieldValue('button_label')

  // Format published date if available
  const formattedDate = blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : ''

  return (
    <div className="blog-card-wrapper" onClick={handleCardClick}>
      <div className="blog-card-image-container">
        <img 
          src={blog.image.url || defaultImage} 
          alt={blog.title} 
          className="blog-card-image"
        />
      </div>
      
      <div className="blog-card-content">
        <h3 className="blog-card-title">{blog.title}</h3>
        {blog.excerpt && (
          <p className="blog-card-excerpt">{blog.excerpt}</p>
        )}
        {formattedDate && (
          <p className="blog-card-date">{formattedDate}</p>
        )}
        {blog.author?.name && (
          <p className="blog-card-author">By {blog.author.name}</p>
        )}
        
        <button className="button-pink-border" onClick={handleButtonClick}>{buttonLabel ? buttonLabel : 'Reacd Article'}</button>
      </div>
    </div>
  )
}

export default BlogCard
