import React from 'react'
import './ProductDetailsSkeleton.css'

const ProductDetailsSkeleton = () => {
  return (
    <div className="product-details-skeleton">
      <div className="skeleton-pdp-container">
        <div className="skeleton-pdp-left">
          <div className="skeleton-main-image"></div>
          <div className="skeleton-thumbnail-list">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="skeleton-thumbnail"></div>
            ))}
          </div>
        </div>
        
        <div className="skeleton-pdp-right">
          <div className="skeleton-pdp-title"></div>
          <div className="skeleton-pdp-title-short"></div>
          <div className="skeleton-pdp-rating"></div>
          <div className="skeleton-pdp-price"></div>
          <div className="skeleton-pdp-description"></div>
          <div className="skeleton-pdp-description"></div>
          <div className="skeleton-pdp-description-short"></div>
          <div className="skeleton-pdp-buttons">
            <div className="skeleton-pdp-quantity"></div>
            <div className="skeleton-pdp-add-btn"></div>
          </div>
          <div className="skeleton-pdp-accordion">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="skeleton-accordion-item"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsSkeleton
