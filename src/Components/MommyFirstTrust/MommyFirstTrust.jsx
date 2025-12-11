import React from 'react'
import Heading from '../Heading/Heading'
import './MommyFirstTrust.css'
import Loom from '../../assets/trust/loom.svg'
import Trust22 from '../../assets/trust/trust22.svg'
import Trust11 from '../../assets/trust/trust11.svg'
import Trust111 from '../../assets/trust/trust11-1.svg'
import BlueShade from '../../assets/trust/blue-shade.svg'
import Trust121 from '../../assets/trust/trust121.svg'
import TrustArrow from '../../assets/trust/trust-arrow.svg'
import Star from '../../assets/Reviews/star.svg'

const MommyFirstTrust = () => {
    const headingData = {
        'title': "WHY US",
        'subtitle': "Why Moms Trust Mommy First",
        'description': false
    }

  return (
    <div className="container">
        <Heading data={headingData} />
        <div className="mommy-first-trust-container">
            <div className="first-grid">
                <div className="tile-one">
                    <img src={Trust11} alt="" className='image' />
                    <h1 className="heading">Cleanse with Care</h1>
                    <p className="count"><span>9</span>/10</p>
                    <p className="description">new moms say it’s an essential postpartum item</p>
                    <img src={Trust111} alt="" />
                </div>
                <div className="tile-two">
                    <img src={BlueShade} alt="" className="blue-shade" />
                    <img src={Trust121} alt="" className="image" />
                    <div className="content-div">
                        <h1 className="heading">Cool & Calm</h1>
                        <h1 className="count">99 <span>%</span></h1>
                        <p className="description">of moms report soothing relief within the first 3 days of use</p>
                    </div>
                </div>
            </div>

            <div className="second-grid">
                <div className="tile-one">
                    <h1 className="heading">Inspired by moms. <br /> Strengthened by their trust.</h1>
                    <img src={TrustArrow} alt="" className="arrow-image" />
                    <div className="count"><span className="rating">4.9</span><span className='out-of'>/5</span></div>
                    <div className="reviews-container">
                        <div className="description">Trusted by Moms <br /> Worldwide</div>
                        <div className="stars">
                            <img src={Star} alt="" />
                            <img src={Star} alt="" />
                            <img src={Star} alt="" />
                            <img src={Star} alt="" />
                            <img src={Star} alt="" />
                        </div>
                    </div>
                </div>
                <div className="tile-two">
                    <p className='m-0'><span className='gradient'>20K+</span> <br /><span>Loving MOMS</span></p>
                    <img src={Trust22} alt="" />
                </div>
            </div>

            <div className="third-grid">
                <div className="trust-content">
                    <img src={Loom} alt="" />
                    <h1>Heal Naturally</h1>
                    <p>(Witch Hazel + Probiotics)</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MommyFirstTrust