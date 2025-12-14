import React from 'react'
import './HeroTextSection.css'
import Check from '../../assets/HeroText/check.svg'
import Ht1 from '../../assets/HeroText/ht1.svg'
import Ht2 from '../../assets/HeroText/ht2.svg'
import Ht3 from '../../assets/HeroText/ht3.svg'
import Ht4 from '../../assets/HeroText/ht4.svg'
import Round from '../../assets/HeroText/pink-round.png'

const HeroTextSection = () => {
  return (
    <div className="container">
        <div className="hero-text-section-container">
            <p><span className='strike-one'>OBGYN-</span> <img src={Check} alt="" className='check' /> approved, <img src={Ht1} alt="" /></p>
            <p>mom-tested <img src={Ht2} alt="" className='mx-3' /> essentials</p>
            <p>that make healing feel <img src={Ht3} alt="" className='mx-3' /> natural,</p>
            <p>soothing, <img src={Ht4} alt="" className='mx-3' /> and <span className='strike-two'>stress-free.</span> </p>
            {/* <div className="pink-round-container ">
                <img src={Round} alt="" className='bg-image ' />
            </div> */}
        </div>
    </div>
  )
}

export default HeroTextSection