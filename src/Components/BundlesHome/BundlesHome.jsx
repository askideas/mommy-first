import React from 'react'
import './BundlesHome.css'
import Heading from '../Heading/Heading'
import BG from '../../assets/BundlesHome/bg-image.png'
import Badge from '../../assets/BundlesHome/badge.png'
import ClockImg from '../../assets/BundlesHome/clock.png'
import Bleed from '../../assets/BundlesHome/bleed.png'
import FeelStore from '../../assets/BundlesHome/feel-store.png'
import WebExc from '../../assets/BundlesHome/wb-ex.png'
import Calendar from '../../assets/BundlesHome/calendar.svg'
import Shield from '../../assets/BundlesHome/shield-tick.svg'
import Certificate from '../../assets/BundlesHome/certificate.svg'
import Heart from '../../assets/BundlesHome/heart-rounded.svg'
import { ArrowRight, ChevronDown, Clock, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BundlesRecommendedModal from '../BundlesRecommendedModal/BundlesRecommendedModal'

const BundlesHome = () => {
  const navigate = useNavigate();
    const headingData = {
        'title': "PREMIUM BUNDLES",
        'subtitle': "Your Recovery, Simplified.",
        'description': [' Curated bundles designed to take the guesswork out of', ' postpartum care — premium, practical, and priced to save.']
    }

  return (
    <div className="container" style={{marginBottom: '154px'}}>
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
            <p>how l<img src={ClockImg} alt="" className='clock' />ng you actually</p>
            <div className='images-flash-container'>
              <img src={Bleed} alt="" className='flash-animation' />
              <span>and</span>
              <img src={FeelStore} alt="" />
            </div>
          </div>
        </div>
        <div className="w-100">
          <div className="bundles-details-container">
            <div className="bundle-details-item">
              <img src={Calendar} alt="" />
              <div className="text-container">
                <h1 className="heading">2–21</h1>
                <h1 className="sub-heading">days of care</h1>
              </div>
            </div>

            <div className="bundle-details-item">
              <img src={Shield} alt="" />
              <div className="text-container">
                <h1 className="sub-heading">One less thing</h1>
                <h1 className="sub-heading">to worry about</h1>
              </div>
            </div>

            <div className="bundle-details-item">
              <img src={Certificate} alt="" />
              <div className="text-container">
                <h1 className="heading">OB/GYN</h1>
                <h1 className="sub-heading">Approved Essentials</h1>
              </div>
            </div>

            <div className="bundle-details-item">
              <img src={Heart} alt="" />
              <div className="text-container">
                <h1 className="heading">10,000+</h1>
                <h1 className="sub-heading">Trusted MOMS</h1>
              </div>
            </div>
          </div>
          <p className="description-item">Postpartum bleeding can last up to 6 weeks. Soreness often lingers 2–3 weeks. <br /> Our systems remove the guesswork with 2–21 days of care in one box.</p>
          <div className="w-100 d-flex justify-content-center align-items-center">
            <button className="button-pink-full" data-bs-toggle="offcanvas" data-bs-target="#bundlesuggestionsmodal">Shop Postpartum Bundles <ArrowRight style={{width: '20px', height: '20px'}} /></button>
          </div>
        </div>

        <BundlesRecommendedModal />
        
    </div>
  )
}

export default BundlesHome