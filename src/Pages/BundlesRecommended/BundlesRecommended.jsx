import { Check, CircleCheck, Clock, SquareX, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import './BundlesRecommended.css'
import BoxImg from '../../assets/BundleRecom/box-img.png'
import LabelImg from '../../assets/BundleRecom/label.png'
import BundleTileImg from '../../assets/BundleRecom/bundle-item-1.png'
import MomsReviewsSlider from '../../Components/MomsReviewsSlider/MomsReviewsSlider'
import BoughtTogether from '../../Components/BoughtTogether/BoughtTogether'
import FaqSlider from '../../Components/FaqSlider/FaqSlider'
import MomsMomentsSlider from '../../Components/MomsMomentsSlider/MomsMomentsSlider'
import AllBundlesSlider from '../../Components/AllBundlesSlider/AllBundlesSlider'
import HightLightImg from '../../assets/BundlesHome/badge.png'
import BundleTile from '../../Components/BundleTile/BundleTile'

const BundlesRecommended = () => {
    const [movement, setMovement] = useState('')
    useEffect(() => {
      setTimeout(() => {
        setMovement('moved')
      }, 2500);
    }, [])

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
        { "label": "Pads", "quantity": 36 },
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
        <div className="container">
            <div className="bundles-recommended-container-hero-section">
                <div className="heading-section-bundles">
                    <h1>Your recommended bundle,just for you!</h1>
                    <h2>Take a breath. We’re always here to help you find the bundle that fits your needs.</h2>
                    <button className='button-pink-border'>CONTINUE SHOPING</button>
                </div>

                <div className="bundles-best-value-section">
                    <div className="image-highlist">
                        <img src={HightLightImg} alt="" />
                        <span>Best Value</span>
                    </div>

                    <p className="heading-label-sec">
                        <span className="bundle-name">2 Weeks Full Recovery Set</span>
                        <span className="days-label">7-14 days</span>
                    </p>

                    <p className="bundle-description">Best for core support for the hardest days at home</p>

                    <img src={BundleTileImg} alt="" className="bundle-tile-image" />

                    <div className="bundle-items">
                        <span>36 Pads</span>
                        <span>20 Underwear</span>
                        <span>20 Cooling pads</span>
                        <span>48 Liners</span>
                        <span>10 fl oz foam</span>
                        <span>Peri bottle + Bag</span>
                    </div>

                    <svg className="line-separator" width="295" height="1" viewBox="0 0 295 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="0.5" x2="294.667" y2="0.5" stroke="#F2B8C6"/>
                        <line y1="0.5" x2="294.667" y2="0.5" stroke="url(#paint0_linear_14742_6974)"/>
                        <defs>
                        <linearGradient id="paint0_linear_14742_6974" x1="0" y1="1.5" x2="294.667" y2="1.5" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white"/>
                        <stop offset="0.490385" stop-color="#EAA4B9"/>
                        <stop offset="0.971154" stop-color="white"/>
                        </linearGradient>
                        </defs>
                    </svg>

                    <p className="bundle-price">
                        <span className="price">$139.99</span>
                        <span className="price-label">Retail value $195 | Save $55.01</span>
                    </p>

                    <button className="button-pink-center">ADD TO BAG</button>

                    <div className="feature-of-bundle">
                        <p>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="#5ED34B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>Secure checkout</span>
                        </p>
                        <p>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="#5ED34B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>Loved by moms</span>
                        </p>
                        <p>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="#5ED34B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>FREE shipping</span>
                        </p>
                        <p>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="#5ED34B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>Hassle free returns</span>
                        </p>
                    </div>

                </div>

                <div className="optional-bundles-to-items-container">
                    <div className="close-container">
                        <div className="label-div">Optional</div>
                        <SquareX className='close-btn' onClick={()=> setMovement('')} />
                    </div>
                    <p className="head-ing">Hospital-bag <br /> add-on </p>
                    <img src={BoxImg} alt="" className='box-img' />
                    <p className="description">This is the #1 combination chosen by moms preparing for birth.</p>
                    <div className="labels">
                        <p className="label">24 Pad Liners</p>
                        <p className="label">8 Underwear</p>
                        <p className="label">8 Cooling Pads</p>
                        <p className="label"> Witch Hazel Perineal Foam</p>
                    </div>
                    <div className="btns-con">
                        <button className="button-pink-center" style={{width: '78px', height: '36px', fontSize: '14px', boxShadow: 'none'}}>Add +</button>
                        <button className="button-pink-border" style={{width: '78px', height: '36px', fontSize: '14px', padding: '4px', boxShadow: 'none'}}>Remove</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="more-bundles-container">
            <div className="container">
                <div className="heading-sec">
                    <h1>More Bundles, Add more anytime</h1>
                    <h2>Choose based on how long you'd like your care to last.</h2>
                </div>

                <div className="bundles-more-section">
                    {
                        Bundles.map((bundle, index) => {
                            return (
                                <BundleTile data={bundle} key={index}/>
                            )
                        })
                    }
                </div>
            </div>
            
        </div>

        {/* <BoughtTogether />
        <AllBundlesSlider /> */}
        <MomsReviewsSlider />
        <MomsMomentsSlider />
        <FaqSlider />

    </>
  )
}

export default BundlesRecommended