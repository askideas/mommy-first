import React from 'react'
import './CareHub.css'
import MainImage from '../../assets/carehub/human.png'
import Pinkround from '../../assets/carehub/pink-round.png'
import CenterShade from '../../assets/carehub/center-shade.png'
import Img1 from '../../assets/Reviews/m1.svg'
import Img2 from '../../assets/Reviews/m2.svg'
import Img3 from '../../assets/Reviews/m3.svg'
import Img4 from '../../assets/Reviews/m4.svg'
import Img5 from '../../assets/Reviews/m5.svg'
import Calendar from '../../assets/carehub/calendar.svg'
import File from '../../assets/carehub/file-download.svg'
import Heart from '../../assets/carehub/heart-rounded.svg'

const CareHub = () => {
  return (
    <div className="container">
        <div className="carehub-hero-section">
            <h1 className="heading">CARE HUB</h1>
            <h2 className="subheading">Support for every stage <br /> of motherhood.</h2>
            <div className="hero-section-image-round">
                <img src={Pinkround} alt="" className='pink-round' />
                <img src={CenterShade} alt="" className="center-shade" />
                <img src={MainImage} alt="" className="main-human-image" />
                <div className="floating-div-con one">
                    <img src={Img1} alt="" className='avatar-img' />
                    <div className="text-con">
                        <p className="text-desc">Ann, just downloaded <span>Ultimate Postpartum Recovery Guide</span> </p>
                        <p className="text-details">
                            <span className="name">Florida, USA</span>
                            <span className="time">Just now</span>
                        </p>
                    </div>
                </div>
                <div className="floating-div-con two">
                    <img src={Img2} alt="" className='avatar-img' />
                    <div className="text-con">
                        <p className="text-desc">Maria, downloaded <span>Hospital Bag Checklist</span> </p>
                        <p className="text-details">
                            <span className="name">Florida, USA</span>
                            <span className="time">2m</span>
                        </p>
                    </div>
                </div>
                <div className="floating-div-con three">
                    <img src={Img3} alt="" className='avatar-img' />
                    <div className="text-con">
                        <p className="text-desc">Jessica, downloaded <span>Postpartum Hygiene Checklist</span> </p>
                        <p className="text-details">
                            <span className="name">Florida, USA</span>
                            <span className="time">2m</span>
                        </p>
                    </div>
                </div>
                <div className="floating-div-con four">
                    <img src={Img4} alt="" className='avatar-img' />
                    <div className="text-con">
                        <p className="text-desc">Ann, just downloaded <span>Ultimate Postpartum Recovery Guide</span> </p>
                        <p className="text-details">
                            <span className="name">Florida, USA</span>
                            <span className="time green">Just now</span>
                        </p>
                    </div>
                </div>
                <div className="floating-div-con five">
                    <img src={Img5} alt="" className='avatar-img' />
                    <div className="text-con">
                        <p className="text-desc">Maria, downloaded <span>Hospital Bag Checklist</span> </p>
                        <p className="text-details">
                            <span className="name">Florida, USA</span>
                            <span className="time">2m</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="labels-sec-con">
                <div className="label-item-sec">
                    <img src={Calendar} alt="" className="image" />
                    <p className="text-con-sec">
                        <span className='active'>FREE</span>
                        <span>with Sign-up</span>
                    </p>
                </div>

                <div className="label-item-sec">
                    <img src={Heart} alt="" className="image" />
                    <p className="text-con-sec">
                        <span>Rated 100%</span>
                        <span>positive by moms</span>
                    </p>
                </div>

                <div className="label-item-sec">
                    <img src={File} alt="" className="image" />
                    <p className="text-con-sec">
                        <span>Downloaded by</span>
                        <span>99% of moms</span>
                    </p>
                </div>
            </div>

            <p className="care-hero-desc">Thoughtfully created care guides, expert-led education, and <br /> gentle movement—hosted by Mommy First.</p>

            <div className="care-hub-hero-btn-sec">
                <button className='button-pink-center care-btn'>Care Guides</button>
                <button className='button-pink-border jour-btn'>The Journal</button>
                <button className='button-pink-center live-btn'>LIVE Sessions</button>
            </div>
        </div>
    </div>
  )
}

export default CareHub