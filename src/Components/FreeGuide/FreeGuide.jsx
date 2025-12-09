import React from 'react'
import './FreeGuide.css'
import Image from '../../assets/free-guide.svg'
import FreeTag from '../../assets/free-guide/free-tag.svg'
import Divider from '../../assets/free-guide/divider.svg'
import { ArrowRight, Clock } from 'lucide-react'

const FreeGuide = () => {
  return (
    <div className="container">
        <div className="free-guide-container">
            <div className="content-container-sec">
                <img src={Image} alt="" className='section-image'/>
                <div className="contents-sec">
                    <img src={FreeTag} alt="" />
                    <div className="heading-sec">
                        <h1>Free Guide for</h1>
                        <img src={Divider} alt="" />
                        <h1 className='second'>New Moms</h1>
                        <p>Get our doctor-approved “6-Week<br/> Recovery Playbook” when you sign up.</p>
                        <button className='button-white'>Get My Free Guide <ArrowRight /></button>
                    </div>
                    <div className="label-con flash-animation">
                        <div className="text"><Clock className='icon' />Limited deal</div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default FreeGuide