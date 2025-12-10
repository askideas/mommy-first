import React from 'react'
import Heading from '../Heading/Heading'
import './MommyFirstTrust.css'
import Loom from '../../assets/trust/loom.svg'
import Trust22 from '../../assets/trust/trust22.svg'

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
                <div className="tile-one"></div>
                <div className="tile-two"></div>
            </div>

            <div className="second-grid">
                <div className="tile-one"></div>
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