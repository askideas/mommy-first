import React from 'react'
import './BlogCardSkeleton.css'

const BlogCardSkeleton = () => {
  return (
    <div className="blog-card-skeleton">
      <div className="skeleton-blog-image"></div>
      <div className="skeleton-blog-details">
        <div className="skeleton-blog-title"></div>
        <div className="skeleton-blog-title-short"></div>
        <div className="skeleton-blog-excerpt"></div>
        <div className="skeleton-blog-excerpt-short"></div>
        <div className="skeleton-blog-footer">
          <div className="skeleton-blog-author"></div>
          <div className="skeleton-blog-button"></div>
        </div>
      </div>
    </div>
  )
}

export default BlogCardSkeleton
