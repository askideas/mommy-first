import React from 'react'
import './HomeVideoSection.css'
import { Play } from 'lucide-react'

const HomeVideoSection = () => {
  return (
    <div className="container" style={{marginBottom: '154px'}}>
        <h1 className="video-section-heading">See How It Works</h1>
        <div className="filters-section my-4">
            <button className='filter-button active'>Postpartum Recovery Essential Kit </button>
            <button className='filter-button'>C-Section Recovery Kit </button>
            <button className='filter-button'>Mega Recovery Kit </button>
        </div>
        <div className="video-container">
            <div className="video"><Play className='icon' /></div>
        </div>
    </div>
  )
}

export default HomeVideoSection