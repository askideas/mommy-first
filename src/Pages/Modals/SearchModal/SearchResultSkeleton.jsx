import React from 'react'
import './SearchResultSkeleton.css'

const SearchResultSkeleton = () => {
  return (
    <div className="search-result-skeleton">
      <div className="skeleton-search-image"></div>
      <div className="skeleton-search-details">
        <div className="skeleton-search-name"></div>
        <div className="skeleton-search-price"></div>
      </div>
    </div>
  )
}

export default SearchResultSkeleton
