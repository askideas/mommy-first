import React from 'react'
import './Bundles.css'
import BG from '../../assets/BundlesHome/bg-image.png'
import Badge from '../../assets/BundlesHome/badge.png'
import WebExc from '../../assets/BundlesHome/wb-ex.png'
import Calendar from '../../assets/BundlesHome/calendar.svg'
import Shield from '../../assets/BundlesHome/shield-tick.svg'
import Certificate from '../../assets/BundlesHome/certificate.svg'
import Heart from '../../assets/BundlesHome/heart-rounded.svg'
import BoughtTogether from '../../Components/BoughtTogether/BoughtTogether'
import AllBundlesSlider from '../../Components/AllBundlesSlider/AllBundlesSlider'
import MomsReviewsSlider from '../../Components/MomsReviewsSlider/MomsReviewsSlider'
import MomsMomentsSlider from '../../Components/MomsMomentsSlider/MomsMomentsSlider'
import FaqSlider from '../../Components/FaqSlider/FaqSlider'
import BundlesRecommendedModal from '../../Components/BundlesRecommendedModal/BundlesRecommendedModal'

const Bundles = () => {
  return (
    <>
        <div className="bundles-page">
            <div className="container">
                {/* Heading Section */}
                <div className="bundles-heading-section">
                <h1 className="bundles-main-title">Your Recovery, Simplified</h1>
                <p className="bundles-subtitle">
                    Curated bundles designed to take the guesswork out of<br />
                    postpartum care — premium, practical, and priced to save
                </p>
                </div>

                {/* Hero Banner Section */}
                <div className="bundles-hero-container">
                <img src={BG} alt="" className='bg-image' />
                <img src={WebExc} alt="Website Exclusive" className='website-exclusive' />
                <div className="badge-con">
                    <img src={Badge} alt="" />
                    <span className="badge-text">5 Bundles</span>
                </div>
                <div className="hero-content-section">
                    <h2 className="hero-main-text">
                    Postpartum bleeding can last up<br />
                    to 6 weeks, and Soreness often<br />
                    lingers up to 3 weeks
                    </h2>
                    <p className="hero-sub-text">
                    Our recovery systems give you the supplies you actually need<br />
                    —without the guesswork.
                    </p>
                </div>
                </div>

                {/* Stats/Features Section */}
                <div className="bundles-stats-container">
                <div className="bundle-stat-item">
                    <img src={Calendar} alt="Calendar" />
                    <div className="stat-text-container">
                    <h3 className="stat-heading">2–21</h3>
                    <p className="stat-subheading">days of care</p>
                    </div>
                </div>

                <div className="bundle-stat-item">
                    <img src={Shield} alt="Shield" />
                    <div className="stat-text-container">
                    <p className="stat-subheading">One less thing</p>
                    <p className="stat-subheading">to worry about</p>
                    </div>
                </div>

                <div className="bundle-stat-item">
                    <img src={Certificate} alt="Certificate" />
                    <div className="stat-text-container">
                    <h3 className="stat-heading">OB/GYN</h3>
                    <p className="stat-subheading">Approved Essentials</p>
                    </div>
                </div>

                <div className="bundle-stat-item">
                    <img src={Heart} alt="Heart" />
                    <div className="stat-text-container">
                    <h3 className="stat-heading">10,000+</h3>
                    <p className="stat-subheading">Trusted MOMS</p>
                    </div>
                </div>
                </div>

                {/* Description Text */}
                <p className="bundles-description-text">
                Postpartum bleeding can last up to 6 weeks. Soreness often lingers 2–3 weeks.<br />
                Our systems remove the guesswork with 2–21 days of care in one box.
                </p>

                {/* CTA Button */}
                <div className="bundles-cta-container">
                <button className="button-pink-center" data-bs-toggle="offcanvas" data-bs-target="#bundlesuggestionsmodal" style={{width: '230px'}}>
                    Not sure which bundle?
                </button>
                </div>
            </div>
        </div>
        <BundlesRecommendedModal />
        <BoughtTogether />
        <AllBundlesSlider />
        <MomsReviewsSlider />
        <MomsMomentsSlider />
        <FaqSlider />
    </>
    
  )
}

export default Bundles