import React from 'react'
import './About.css'
import Flower from '../../assets/About/flower.svg'
import FlowerShade from '../../assets/About/flower-shade.svg'
import Us from '../../assets/About/us.png'
import PfImg from '../../assets/About/pf-img.png'
import Strike2 from '../../assets/About/strike2.svg'
import Strike4 from '../../assets/About/strike4.svg'
import RightImg from '../../assets/About/right-img.png'
import Certificate from '../../assets/About/certificate.svg'
import Shield from '../../assets/About/shield.svg'
import Heart from '../../assets/About/heart.svg'
import Clock from '../../assets/About/clock.svg'
import { useFadeUpAnimation } from '../../hooks/useFadeUpAnimation'

const About = () => {
  // Animation refs
  const [headingRef, headingVisible] = useFadeUpAnimation(0.1, true)
  const [infrastructureRef, infrastructureVisible] = useFadeUpAnimation(0.1, true)
  const [drivesRef, drivesVisible] = useFadeUpAnimation(0.1, true)

  return (
    <>
        <div className="container">
            <div ref={headingRef} className={`about-page-heading-container ${headingVisible ? 'animate-in' : ''}`}>
                <p className="heading">Who we are!</p>
                <img src={Flower} alt="" className='flower' />
                <p className="sub-heading">
                    <span className='from-left'>The Science of Safety.</span> <br />
                    <span className='sub-heading-span from-right'>The Heart of a <span className='strike-span'>Mother.</span> </span>
                </p>
                <p className="description">Born in New York from the partnership of a Clinical Pharmacist who saw the <br /> medical gap, and a Clinical Quality Specialist who lived through it.</p>
                
                <p className='about-desc'><span className='bold'>Mommy First™</span> was founded in <img src={Us} alt="" className='flag' /><span className='bold'>New York</span> by  <br />
                <span className='active' > <img src={Strike2} alt="" />Dr. Jewelline</span> (Clinical Pharmacist) and <br />
                <span className='active' ><img src={Strike4} alt="" />Dr. Varsha</span> (Medical Graduate & Clinical Quality Specialist) <br /> 
                to solve the disconnect between hospital discharge <br /> and recovery at home.
                </p>
            </div>

            <div className="mf-menber-profile">
                <div className="mf-pf-card">
                    <img src={Flower} alt="" className='flower3' />
                    <img src={PfImg} alt="" className='profile-img' />
                    <p className='hand-written-text'>We didn't just want to make products. We <br /> wanted  to fix  the standard of care.</p>
                    <p className="txt">We saw the data: New mothers are the most <br /> underserved patients in the healthcare system.</p>
                </div>
                <div className="white-shade-bg"></div>
                <img src={FlowerShade} alt="" className='flower-shade1' />
                <img src={FlowerShade} alt="" className='flower-shade2' />
                <img src={Flower} alt="" className='flower1' />
                <img src={Flower} alt="" className='flower2' />
                <img src={Flower} alt="" className='flower4' />
                <img src={Flower} alt="" className='flower5' />
            </div>

            <div className="doctors-cards-section">
                <img src={Flower} alt="" className='doc-flower1' />
                <img src={Flower} alt="" className='doc-flower2' />
                <div className="doc-card-shade1"></div>
                <div className="doc-card-shade2"></div>
                <div className='doctor-card' >
                    <div className="name-section">
                        <img src={PfImg} alt="" />
                        <p className="name">
                            The Quality Specialist’s Reality <br />
                            <span>Dr. Varsha</span>
                        </p>
                    </div>
                    <p className="doc-desc">As a mother of two, she lived the chaos. She knew that in the haze of the Fourth Trimester, safety standards and ease of use aren't just "nice to haves"—they are survival tools.</p>
                </div>

                <div className='doctor-card two' >
                    <div className="name-section">
                        <img src={PfImg} alt="" />
                        <p className="name">
                            The Pharmacist’s Eye <br />
                            <span>Dr. Jewelline</span>
                        </p>
                    </div>
                    <p className="doc-desc">As a clinician, she saw the chemistry. She realized that standard postpartum products were chemically harsh, poorly designed, and treated as an afterthought in the medical world.</p>
                </div>
            </div>
        </div>

        <div ref={infrastructureRef} className={`about-infrastructure-section ${infrastructureVisible ? 'animate-in' : ''}`}>
            <img src={FlowerShade} alt="" className='image-shade' />
            <div className="container" style={{position: 'relative'}}>
                <img src={Flower} alt="" className='flower-img-1' />
                <img src={Flower} alt="" className='flower-img-2' />
                <img src={Flower} alt="" className='flower-img-3' />
                <p className="head-ing">The 4<sup>th</sup> Trimester Infrastructure</p>
                <p className="sub-head-ing">
                    We combined Jewelline's formulation expertise with Varsha's <br /> 
                    uncompromising quality standards to create a recovery system that is <br /> 
                    chemically safe, clinically sound, and deeply empathetic.
                </p>
                <div className="infrastructure-details-section">
                    <div className="section-deatails">
                        <div className="sec-det-item">
                            <p className="heading"><img src={Certificate} alt="" />Clinically Designed</p>
                            <p className="desc">Every product is crafted by healthcare professionals, ensuring safety, comfort, and effectiveness.</p>
                        </div>

                        <div className="sec-det-item">
                            <p className="heading"><img src={Shield} alt="" />Safe & Sustainable</p>
                            <p className="desc">We use eco-friendly materials and dermatologist-tested formulas to keep both moms and the planet happy.</p>
                        </div>

                        <div className="sec-det-item">
                            <p className="heading"><img src={Heart} alt="" />Proven by Moms</p>
                            <p className="desc">We work hand-in-hand with real moms to create products that meet the needs of modern motherhood.</p>
                        </div>
                    </div>

                    <div className="image-container">
                        <img src={RightImg} alt="" />
                    </div>
                </div>
            </div>
            
        </div>

        <div ref={drivesRef} className={`about-drives-us-section ${drivesVisible ? 'animate-in' : ''}`}>
            <img src={FlowerShade} alt="" className='flower-shade-10' />
            <img src={Flower} alt="" className='flower-10' />
            <img src={Flower} alt="" className='flower-11' />
            <h1>What Drives Us</h1>
            <h2>Redefining  the "After."</h2>
            <p>We believe dignity is a medical necessity. <br /> Whether you are relying on our Science (formulated for sensitive skin) or <br /> our Support (designed for real life), our goal is simple:</p>
            <h3>To ensure  that when you look in the mirror <img src={Clock} alt="" />  24 hours <br /> <span>after birth, you feel held, healed, and human.</span></h3>
        </div>
    </>
    
  )
}

export default About