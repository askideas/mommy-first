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
import { ArrowRight, ChevronDown, Clock } from 'lucide-react'

const BundlesHome = () => {
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
            <button className="button-pink-full" data-bs-toggle="offcanvas" data-bs-target="#bundlesuggestions">Shop Postpartum Bundles <ArrowRight style={{width: '20px', height: '20px'}} /></button>
          </div>
        </div>

        <div className="offcanvas offcanvas-end" tabindex="-1" id="bundlesuggestionsModal" aria-labelledby="offcanvasRightLabel">
          <div className="heading-section-container">
            <div className="d-flex justify-content-between align-items-center label-skip-con">
              <p className="label-sec"><Clock /> 30-second bundle finder</p>
              <p className="skip">Skip</p>
            </div>
            <h1 className="heading-txt">Not sure which <br /> bundle you need?</h1>
            <h1 className="sub-heading-txt">Answer two quick questions and we’ll match you with the bundle that fits your stage of recovery and how many days of care you want covered.</h1>
          </div>
          <div className="filter-section-container">
            <div className="dropdown mf-dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Select <ChevronDown style={{width: '16px', height: '16px'}} />
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>
          </div>
        </div>
        
    </div>
  )
}

export default BundlesHome