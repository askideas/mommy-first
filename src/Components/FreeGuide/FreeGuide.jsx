import React from 'react'
import './FreeGuide.css'
import Image from '../../assets/free-guide.svg'
import FreeTag from '../../assets/free-guide/free-tag.svg'
import Divider from '../../assets/free-guide/divider.svg'
import { ArrowRight, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const FreeGuide = (props) => {
    const data = props.data;
    const navigate = useNavigate()
  return (
    <div className="container">
        <div className="free-guide-container" onClick={()=>navigate('/care-hub')}>
            <div className="content-container-sec">
                <img src={Image} alt="" className='section-image'/>
                <div className="contents-sec">
                    <img src={FreeTag} alt="" />
                    <div className="heading-sec">
                        <h1>{data && data.guideData && data.guideData.headingOne ? data.guideData.headingOne : 'Free Guide for'}</h1>
                        <img src={Divider} alt="" />
                        <h1 className='second'>{data && data.guideData && data.guideData.headingTwo ? data.guideData.headingTwo : 'New Moms'}</h1>
                        <p dangerouslySetInnerHTML={{ __html:  data && data.guideData && data.guideData.description ? data.guideData.description : 'Get our doctor-approved “6-Week<br/> Recovery Playbook” when you sign up.'}}></p>
                        <button className='button-white'>{data && data.guideData && data.guideData.buttonLabel ? data.guideData.buttonLabel : 'Get My Free Guide'} <ArrowRight /></button>
                    </div>
                    <div className="label-con flash-animation">
                        <div className="text"><Clock className='icon' />{data && data.guideData && data.guideData.flashLabelText ? data.guideData.flashLabelText : 'Limited deal'} </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default FreeGuide