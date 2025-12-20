import React from 'react'
import './ComingSoon.css'
import HeroImageLabel from '../HeroImageLabel/HeroImageLabel'
import HeroImg from '../../assets/coming-soon-hero.png'
import ComingSoonBox from '../../assets/comingsoonbox.svg'

const ComingSoon = () => {
    const HeroLabel = {
        image: HeroImg,
        text: 'Designed to Maximize Comfort for Expecting Moms',
        height: 280,
        pwidth: 487
    };
  return (
    <>
        <HeroImageLabel data={HeroLabel} />
        <div className="container">
            <div className="coming-sson-content-container">
                <img src={ComingSoonBox} alt="" />
                <h1 className="heading">Launching soon</h1>
                <h2 className="sub-heading">We’re working on it. Stay tuned.</h2>
            </div>
        </div>
        
    </>
  )
}

export default ComingSoon