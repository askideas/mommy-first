import React from 'react'
import './SkeletonLoader.css'

const SkeletonLoader = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div className="skeleton-product-card" key={index}>
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-price"></div>
            <div className="skeleton-label"></div>
          </div>
        </div>
      ))}
    </>
  )
}

export default SkeletonLoader
