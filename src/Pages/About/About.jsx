import React from 'react'
import './About.css'
import Flower from '../../assets/About/flower.svg'
import FlowerShade from '../../assets/About/flower-shade.svg'
import Us from '../../assets/About/us.png'
import PfImg from '../../assets/About/pf-img.png'

const About = () => {
  return (
    <div className="container">
        <div className="about-page-heading-container">
            <p className="heading">Who we are!</p>
            <img src={Flower} alt="" className='flower' />
            <p className="sub-heading">The Science of Safety. <br />
                <span>The Heart of a Mother.</span>
            </p>
            <p className="description">Born in New York from the partnership of a Clinical Pharmacist who saw the <br /> medical gap, and a Clinical Quality Specialist who lived through it.</p>
            
            <p className='about-desc'><span className='bold'>Mommy First™</span> was founded in <img src={Us} alt="" className='flag' /><span className='bold'>New York</span> by  <br />
            <span className='active' >Dr. Jewelline</span> (Clinical Pharmacist) and <br />
            <span className='active' >Dr. Varsha</span> (Medical Graduate & Clinical Quality Specialist) <br /> 
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
    </div>
  )
}

export default About