import { CircleCheck, Clock, SquareX, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import './BundlesRecommended.css'
import BoxImg from '../../assets/BundleRecom/box-img.png'
import Flakes1 from '../../assets/BundleRecom/flakes1.svg'
import Flakes2 from '../../assets/BundleRecom/flakes2.svg'
import Flakes3 from '../../assets/BundleRecom/flakes3.svg'
import Flakes4 from '../../assets/BundleRecom/flakes4.svg'
import LabelImg from '../../assets/BundleRecom/label.png'
import BundleTileImg from '../../assets/BundleRecom/bundle-tile-img.png'
import MomsReviewsSlider from '../../Components/MomsReviewsSlider/MomsReviewsSlider'
import BoughtTogether from '../../Components/BoughtTogether/BoughtTogether'
import FaqSlider from '../../Components/FaqSlider/FaqSlider'

const BundlesRecommended = () => {
    const [movement, setMovement] = useState('')
    useEffect(() => {
      setTimeout(() => {
        setMovement('moved')
      }, 2500);
    }, [])
    
  return (
    <>
        <div className="container">
            <div className="bundles-recommended-heading">
                <p className='head-ing'>Your recommended bundle, <br /> just for you!</p>
                <div className="labels-con">
                    <p className="label-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#5ED34B" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                        <span>Fast Shipping</span>
                    </p>

                    <p className="label-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#5ED34B" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                        <span>FREE Returns</span>
                    </p>
                </div>
            </div>
        </div>

        <div className="container">
            <div className={`bundle-recommented-item-details-container `}>
                <div className={`flakes-con ${movement}`}>
                    <img src={Flakes1} alt="" className="flakes1" />
                    <img src={Flakes2} alt="" className="flakes2" />
                    <img src={Flakes3} alt="" className="flakes3" />
                    <img src={Flakes4} alt="" className="flakes4" />
                </div>
                <div className={`bundle-recommented-item-details ${movement}`}>
                    <div className="label-sec-con">
                        <img src={LabelImg} alt="" />
                        <p>Recommended</p>
                    </div>
                    <div className="d-flex flex-column h-100 justify-content-between align-items-center">
                        <div className="headinf-sec-container">
                            <p className="label">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                                </svg>
                                5-7  Days of Care</p>
                            <p className="head-txt">The First Week <br /> Healing System</p>
                            <div className="recom-labels">
                                <p className="label-item">24 Pad Liners</p>
                                <p className="label-item">8 Underwear</p>
                                <p className="label-item">1 Peri bottle</p>
                                <p className="label-item">8 Cooling Pads</p>
                                <p className="label-item">Witch Hazel Perineal Care Foam</p>
                            </div>
                            <div className="price-section-con">
                                <div className="price-sec">$49.99</div>
                                <div className="price-desc">Only $7.78/day — less than your daily coffee</div>
                            </div>
                        </div>

                        <div className="bundles-recom-tile-footer">
                            <img src={BundleTileImg} alt="" />
                            <div className="check-container">
                                <input type="checkbox"  id="checkbox-bundle-tile" checked />
                                <span>C-Section compatible</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center w-100" style={{marginTop: '14px'}}>
                                <button className='button-pink-center' style={{width: '143px', height: '36px'}}>Buy Now</button>
                                <button className='button-pink-border' style={{width: '143px', height: '36px'}}>Add to Bag +</button>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className={`bundle-recommented-item-details-optional ${movement} `}>
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

        <BoughtTogether />
        <MomsReviewsSlider />
        <FaqSlider />

    </>
  )
}

export default BundlesRecommended