import React from 'react'
import './BundlesHome.css'
import Heading from '../Heading/Heading'
import BG from '../../assets/BundlesHome/bg-image.png'
import Badge from '../../assets/BundlesHome/badge.png'
import Clock from '../../assets/BundlesHome/clock.png'
import Bleed from '../../assets/BundlesHome/bleed.png'
import FeelStore from '../../assets/BundlesHome/feel-store.png'
import WebExc from '../../assets/BundlesHome/wb-ex.png'

const BundlesHome = () => {
    const headingData = {
        'title': "PREMIUM BUNDLES",
        'subtitle': "Your Recovery, Simplified.",
        'description': [' Curated bundles designed to take the guesswork out of', ' postpartum care — premium, practical, and priced to save.']
    }

  return (
    <div className="container">
        <Heading data={headingData} />
        <div className="bundles-home-container">
          <img src={BG} alt="" className='bg-image' />
          <img src={WebExc} alt="" className='website-exclusive' />
          <div className="badge-con">
            <img src={Badge} alt="" />
            <span className="badge-text">5 Bundles</span>
          </div>
          <div className="badge-content-section">
            <p>Curated postpartum bundles that match</p>
            <p>how l<img src={Clock} alt="" className='clock' />ng you actually</p>
            <div className='images-flash-container'>
              <img src={Bleed} alt="" className='flash-animation' />
              <span>and</span>
              <img src={FeelStore} alt="" />
            </div>
          </div>
        </div>
    </div>
  )
}

export default BundlesHome