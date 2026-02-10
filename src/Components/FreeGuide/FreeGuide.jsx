import React from 'react'
import './FreeGuide.css'
import { FreeGuideSkeleton } from '../HomeSkeletonLoader/HomeSkeletonLoader'
import Image from '../../assets/free-guide.svg'
import FreeTag from '../../assets/free-guide/free-tag.svg'
import Divider from '../../assets/free-guide/divider.svg'
import { ArrowRight, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const FreeGuide = (props) => {
    const { data, loading } = props;
    const navigate = useNavigate()

    if (loading) {
        return <FreeGuideSkeleton />
    }

  return (
    <div className="container">
        <div className="free-guide-container" onClick={()=>navigate(data && data.guideData && data.guideData.url)}>
            <div className="content-container-sec">
                <img src={data && data.guideData && data.guideData.backgroundImage ? data.guideData.backgroundImage :''} alt="" className='section-image'/>
                <div className="contents-sec">
                    <img src={FreeTag} alt="" />
                    <div className="heading-sec">
                        <h1>{data && data.guideData && data.guideData.headingOne ? data.guideData.headingOne : 'Free Guide for'}</h1>
                        <img src={Divider} alt="" />
                        <h1 className='second'>{data && data.guideData && data.guideData.headingTwo ? data.guideData.headingTwo : 'New Moms'}</h1>
                        <p dangerouslySetInnerHTML={{ __html:  data && data.guideData && data.guideData.description ? data.guideData.description : 'Get our doctor-approved “6-Week<br/> Recovery Playbook” when you sign up.'}}></p>
                        <button className='button-white mt-3'>{data && data.guideData && data.guideData.buttonLabel ? data.guideData.buttonLabel : 'Get My Free Guide'} <ArrowRight /></button>
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