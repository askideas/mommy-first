import React from 'react'
import './PageLoader.css'

const PageLoader = () => {
  return (
    <div className="page-loader-wrapper">
      <div className="loader-content">
        <div className="loader"></div>
        <p className="loader-text">
            <span>MommyFirst</span> 
            <span className='title' >Because Moms Deserve the Best</span>
        </p>
      </div>
    </div>
  )
}

export default PageLoader
