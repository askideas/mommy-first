import React from 'react'
import './ProductTileSkeleton.css'

const ProductTileSkeleton = () => {
  return (
    <div className="product-tile-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-details">
        <div className="skeleton-name"></div>
        <div className="skeleton-price"></div>
        <div className="skeleton-buttons">
          <div className="skeleton-add-btn"></div>
          <div className="skeleton-heart"></div>
        </div>
      </div>
    </div>
  )
}

export default ProductTileSkeleton
