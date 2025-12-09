import React from 'react'
import './StoriesHome.css'
import Star from '../../assets/Reviews/star.svg'
import M1 from '../../assets/Reviews/m1.svg'
import M2 from '../../assets/Reviews/m2.svg'
import M3 from '../../assets/Reviews/m3.svg'
import M4 from '../../assets/Reviews/m4.svg'
import M5 from '../../assets/Reviews/m5.svg'
import M6 from '../../assets/Reviews/m6.svg'
import M7 from '../../assets/Reviews/m7.svg'
import M8 from '../../assets/Reviews/m8.svg'
import M9 from '../../assets/Reviews/m9.svg'
import M10 from '../../assets/Reviews/m10.svg'
import M11 from '../../assets/Reviews/m11.svg'
import M12 from '../../assets/Reviews/m12.svg'
import M13 from '../../assets/Reviews/m13.svg'
import Shade from '../../assets/Reviews/shade.svg'

const StoriesHome = () => {
  return (
    <div className="container">
        <div className="stories-home-container">
            <div className="star-section">
                <img src={Star} alt="" />
                <img src={Star} alt="" />
                <img src={Star} alt="" />
                <img src={Star} alt="" />
                <img src={Star} alt="" />
            </div>
            <h1 className="star-heading">Read Reviews,<br/>Shop with confidence</h1>
            <div className="gallery-container">
                <div className="gallery-item one">
                    <div className="shade"></div>
                    <img src={M1} alt="" />
                    <img src={M2} alt="" />
                </div>

                <div className="gallery-item two">
                    <div className="shade"></div>
                    <img src={M3} alt="" />
                    <img src={M4} alt="" />
                </div>

                <div className="gallery-item three">
                    <div className="shade"></div>
                    <img src={M5} alt="" />
                </div>

                <div className="gallery-item four">
                    <div className="shade"></div>
                    <img src={M6} alt="" />
                </div>

                <div className="gallery-item five">
                    <div className="shade"></div>
                    <img src={M7} alt="" />
                </div>

                <div className="gallery-item four">
                    <div className="shade"></div>
                    <img src={M8} alt="" />
                </div>

                <div className="gallery-item three">
                    <div className="shade"></div>
                    <img src={M9} alt="" />
                </div>

                <div className="gallery-item two">
                    <div className="shade"></div>
                    <img src={M10} alt="" />
                    <img src={M11} alt="" />
                </div>

                <div className="gallery-item one">
                    <div className="shade"></div>
                    <img src={M12} alt="" />
                    <img src={M13} alt="" />
                </div>
            </div>

            <div className="reviews-text-container">
                <img src={Shade} className="shade-con" alt="" />
                <div className="label">Love from Moms</div>
                <div className="review-text">I absolutely loved this postpartum kit. I just recently gave birth to my <br/>son and bought this kit to help ease my pain and it definitely did that!<br/> The cold pads are the perfect size covering the whole area. <br/><br/>The herbal spray felt amazing as it really cools and soothes your lady<br/> parts and is a great essential to have. The peri spray bottle is also<br/> helpful due to the multi-use friendly sprayer. I would definitely <br/>recommend this kit for any mamas looking to feel better<br/> postpartum!!</div>
                <div className="reviewr-name">Jessica <br /> <span>Fort Worth, Texas</span></div>
                <div className="progress-bar">
                    <span></span>
                </div>
                <button className='button-label'>View all  Stories</button>
            </div>
        </div>
    </div>
  )
}

export default StoriesHome