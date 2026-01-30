import React from 'react'
import './ProductsLoader.css'

const ProductsLoader = ({ text = "Loading amazing products for you..." }) => {
  return (
    <div className="products-loader-container">
      <div className="products-loader-content">
        <div className="products-loader-spinner">
          <div className="spinner-heart">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#heartGradient)"/>
              <defs>
                <linearGradient id="heartGradient" x1="2" y1="3" x2="22" y2="21.35" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FC79AF"/>
                  <stop offset="100%" stopColor="#DE4783"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <p className="products-loader-text">{text}</p>
        <div className="products-loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default ProductsLoader
