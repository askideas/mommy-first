import React from 'react'
import './BundlesHome.css'
import Heading from '../Heading/Heading'

const BundlesHome = () => {
    const headingData = {
        'title': "BUNDLES",
        'subtitle': "Your Recovery, Simplified.",
        'description': [' Curated bundles designed to take the guesswork out of', ' postpartum care — premium, practical, and priced to save.']
    }

  return (
    <div className="container">
        <Heading data={headingData} />
        <div className="bundles-home-container"></div>
    </div>
  )
}

export default BundlesHome