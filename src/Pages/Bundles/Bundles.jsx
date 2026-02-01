import React from 'react'
import './Bundles.css'
import BG from '../../assets/BundlesHome/bg-image.png'
import Badge from '../../assets/BundlesHome/badge.png'
import WebExc from '../../assets/BundlesHome/web-exc.png'
import Calendar from '../../assets/BundlesHome/calendar.svg'
import Shield from '../../assets/BundlesHome/shield-tick.svg'
import Certificate from '../../assets/BundlesHome/certificate.svg'
import Heart from '../../assets/BundlesHome/heart-rounded.svg'
import Family from '../../assets/BundlesHome/family.svg'
import Baby from '../../assets/BundlesHome/baby.svg'
import Pregnant from '../../assets/BundlesHome/pregnant.svg'
import BoughtTogether from '../../Components/BoughtTogether/BoughtTogether'
import AllBundlesSlider from '../../Components/AllBundlesSlider/AllBundlesSlider'
import MomsReviewsSlider from '../../Components/MomsReviewsSlider/MomsReviewsSlider'
import MomsMomentsSlider from '../../Components/MomsMomentsSlider/MomsMomentsSlider'
import FaqSlider from '../../Components/FaqSlider/FaqSlider'
import BundlesRecommendedModal from '../../Components/BundlesRecommendedModal/BundlesRecommendedModal'
import BundleTile from '../../Components/BundleTile/BundleTile'

import Pads from '../../assets/BundlesHome/pad.svg'
import Coolingpad from '../../assets/BundlesHome/coolingpad.svg'
import Soft from '../../assets/BundlesHome/soft.svg'
import PeriBottle from '../../assets/BundlesHome/peribottle.svg'
import Underwear from '../../assets/BundlesHome/underwear.svg'

const Bundles = () => {

   const Bundles = [
    {
      "id": "first-week-healing-system",
      "title": "The First Week Healing System",
      "duration": "5–7 days",
      "description": "Best for core support for the hardest days at home",
      "price": 84.99,
      "currency": "USD",
      "retailValue": 120,
      "savings": 35.01,
      "cta": "Add to Bag",
      "highlights": [
        "Easy and Secure checkout",
        "Loved by moms",
        "FREE shipping",
        "Hassle free return policy"
      ],
      "contents": [
        { "label": "Pads", "quantity": 18 },
        { "label": "Underwear", "quantity": 12 },
        { "label": "Cooling Pads", "quantity": 12 },
        { "label": "Liners", "quantity": 24 },
        { "label": "Foam", "quantity": "5 fl oz" },
        { "label": "Peri Bottle", "quantity": 1 },
        { "label": "Bag", "quantity": 1 }
      ],
      "tags": ["postpartum", "healing", "starter-kit"],
      "isActive": false
    },
    {
      "id": "2-weeks-full-recovery-set",
      "title": "2 Weeks Full Recovery Set",
      "duration": "7–14 days",
      "badge": "Best Value",
      "description": "Best for core support for the hardest days at home",
      "price": 139.99,
      "currency": "USD",
      "retailValue": 195,
      "savings": 55.01,
      "cta": "Add to Bag",
      "highlights": [
        "Secure checkout",
        "Loved by moms",
        "FREE shipping",
        "Hassle free returns"
      ],
      "contents": [
        { "label": "Pads", "quantity": 36 },
        { "label": "Underwear", "quantity": 20 },
        { "label": "Cooling Pads", "quantity": 20 },
        { "label": "Liners", "quantity": 48 },
        { "label": "Foam", "quantity": "10 fl oz" },
        { "label": "Peri Bottle", "quantity": 1 },
        { "label": "Bag", "quantity": 1 }
      ],
      "tags": ["postpartum", "healing", "best-value", "recommended"],
      "isActive": true
    },
    {
      "id": "21-day-postpartum-care",
      "title": "21-Day Postpartum Care",
      "duration": "17–21 days",
      "description": "Best for core support for the hardest days at home",
      "price": 84.99,
      "currency": "USD",
      "retailValue": 240,
      "savings": 70.01,
      "cta": "Add to Bag",
      "highlights": [
        "Secure checkout",
        "Loved by moms",
        "FREE shipping",
        "Hassle free returns"
      ],
      "contents": [
        { "label": "Pads", "quantity": 56 },
        { "label": "Underwear", "quantity": 28 },
        { "label": "Cooling Pads", "quantity": 28 },
        { "label": "Liners", "quantity": 48 },
        { "label": "Foam", "quantity": "10 fl oz" },
        { "label": "Peri Bottle", "quantity": 1 },
        { "label": "Bag", "quantity": 1 }
      ],
      "tags": ["postpartum", "healing", "complete-kit"],
      "isActive": false
    }
  ]

  return (
    <>
        <div className="bundles-page">
            <div className="container">
                {/* Heading Section */}
                {/* <div className="bundles-heading-section">
                <h1 className="bundles-main-title">Your Recovery, Simplified</h1>
                <p className="bundles-subtitle">
                    Curated bundles designed to take the guesswork out of<br />
                    postpartum care — premium, practical, and priced to save
                </p>
                </div> */}

                {/* Hero Banner Section */}
                <div className="bundles-hero-container">
                <img src={BG} alt="" className='bg-image' />
                <img src={WebExc} alt="Website Exclusive" className='website-exclusive' />
                <div className="badge-con">
                    <img src={Badge} alt="" />
                    <span className="badge-text">3 Bundles</span>
                </div>
                <div className="hero-content-section">
                    <p className="hero-sec-label-txt">Premium postpartum recovery bundles 2-21 days</p>
                    <h2 className="hero-main-text">
                        Everything you actually use<br />
                        organised for the first <span>2–21 days</span>
                    </h2>
                    <p className="hero-sub-text">
                    Pads, cooling relief, witch hazel soothing, soft supportive underwear, and a peri <br /> bottle for gentle cleansing—bundled so you can come home ready.
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
                
                <div className="d-flex justify-content-center align-items-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 26L24 36L34 26M14 12L24 22L34 12" stroke="#D87AA1" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                
                {/* CTA Button */}
                {/* <div className="bundles-cta-container">
                    <button className="button-pink-center" data-bs-toggle="offcanvas" data-bs-target="#bundlesuggestionsmodal" style={{width: 'fit-content'}}>
                        Not sure which bundle?
                    </button>
                </div> */}
            </div>
        </div>

        <div className="container">
            <div className="why-bundles-section-con">
                <h1 className="heading">Why bundles (vs. piecing it together)?</h1>
                <div className="why-bundles-cards-section">
                    <div className="card-item">
                        <img src={Pregnant} alt="" />
                        <h1>Prepared <br /> before birth</h1>
                        <p>Pack what you need for the <br /> hospital bag, keep the rest <br /> waiting at home.</p>
                    </div>

                    <div className="card-item">
                        <img src={Baby} alt="" />
                        <h1>Designed by real <br /> postpartum needs</h1>
                        <p>Soothing, cooling, and <br /> support—together.</p>
                    </div>

                    <div className="card-item">
                        <img src={Family} alt="" />
                        <h1>Less stress on <br /> partners</h1>
                        <p>Everything is already waiting <br /> at home.</p>
                    </div>
                </div>
                <p className="description">You’ll need comfort + soothing + gentle cleansing—not just “pads.” <br /> This system keeps everything consistent and ready.</p>
                <div className="d-flex justify-content-center align-items-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 26L24 36L34 26M14 12L24 22L34 12" stroke="#D87AA1" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>

        <div className="bundles-list-container-section">
            <div className="container">
                <h1 className="head-ing-sec">Now, select a bundle that fits <br /> your recovery timeline.</h1>
                
                <div className="list-of-bundles">
                    {
                        Bundles.map((bundle, index) => {
                            return (
                                <BundleTile data={bundle} key={index} />
                            )
                        })
                    }
                </div>

                <div className="need-help-section">
                    <h1>Need help choosing a bundle?</h1>
                    <p>Answer two quick questions and we’ll match you with the bundle that fits your <br /> stage of recovery and how many days of care you want covered.</p>
                    <button className='button-pink-center' data-bs-toggle="offcanvas" data-bs-target="#bundlesuggestionsmodal">Find My Bundle</button>
                </div>

                <div className="d-flex justify-content-center align-items-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 26L24 36L34 26M14 12L24 22L34 12" stroke="#D87AA1" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>

        <div className="container">
            <div className="whats-inside-section-container">
                <h1 className="heading-sec">What’s inside every Mommy <br /> First recovery bundle</h1>
                <p className="desc-tion">The essentials most moms reach for repeatedly especially during the first days at home.</p>
                <div className="whats-inside-list">
                    <div className="whats-inside-item">
                        <img src={Pads} alt="" />
                        <h1>Postpartum Pads</h1>
                        <p>Reliable coverage for postpartum bleeding - so you can rest, not worry.</p>
                    </div>

                    <div className="whats-inside-item">
                        <img src={Coolingpad} alt="" />
                        <h1>Cooling Pads</h1>
                        <p>Cooling relief to help reduce discomfort and support those tender first days.</p>
                    </div>

                    <div className="whats-inside-item">
                        <img src={Soft} alt="" />
                        <h1>Witch Hazel Liners + Foam</h1>
                        <p>Soothing, cooling comfort to help reduce itch and burn during recovery.</p>
                    </div>

                    <div className="whats-inside-item">
                        <img src={PeriBottle} alt="" />
                        <h1>Peri Bottle + Travel Bag</h1>
                        <p>Gentle cleansing after the bathroom - one of the most-used postpartum tools.</p>
                    </div>

                    <div className="whats-inside-item">
                        <img src={Underwear} alt="" />
                        <h1>Soft Underwear</h1>
                        <p>Gentle, supportive underwear that helps keep everything comfortably in place.</p>
                    </div>
                </div>
            </div>
        </div>

        <BundlesRecommendedModal />
        {/* <BoughtTogether />
        <AllBundlesSlider /> */}
        <MomsReviewsSlider />
        <MomsMomentsSlider />
        <FaqSlider />
    </>
    
  )
}

export default Bundles