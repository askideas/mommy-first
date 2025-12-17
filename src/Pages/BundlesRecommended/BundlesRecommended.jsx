import { CircleCheck, SquareX, X } from 'lucide-react'
import React from 'react'
import './BundlesRecommended.css'
import BoxImg from '../../assets/BundleRecom/box-img.png'

const BundlesRecommended = () => {
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
            <div className="bundle-recommented-item-details-container">
                <div className="bundle-recommented-item-details">

                </div>

                <div className="bundle-recommented-item-details-optional">
                    <div className="close-container">
                        <div className="label-div">Optional</div>
                        <SquareX className='close-btn' />
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
    </>
  )
}

export default BundlesRecommended