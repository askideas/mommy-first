import React from 'react'
import './BundlesHome.css'
import Heading from '../Heading/Heading'
import { useFadeUpAnimation, getFadeUpClass } from '../../hooks/useFadeUpAnimation'
import { BundlesHomeSkeleton } from '../HomeSkeletonLoader/HomeSkeletonLoader'
import BG from '../../assets/BundlesHome/bg-image.png'
import Badge from '../../assets/BundlesHome/badge.png'
import ClockImg from '../../assets/BundlesHome/clock.png'
import Bleed from '../../assets/BundlesHome/bleed.png'
import FeelStore from '../../assets/BundlesHome/feel-store.png'
import WebExc from '../../assets/BundlesHome/web-exc.png'
import Calendar from '../../assets/BundlesHome/calendar.svg'
import Shield from '../../assets/BundlesHome/shield-tick.svg'
import Certificate from '../../assets/BundlesHome/certificate.svg'
import Heart from '../../assets/BundlesHome/heart-rounded.svg'
import { ArrowRight, ChevronDown, Clock, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BundlesRecommendedModal from '../BundlesRecommendedModal/BundlesRecommendedModal'

const BundlesHome = (props) => {
  const { data, loading } = props;
  const navigate = useNavigate();
  
  // Animation refs for each element group
  const [headingRef, headingVisible] = useFadeUpAnimation(0.2)
  const [containerRef, containerVisible] = useFadeUpAnimation(0.2)
  const [badgeRef, badgeVisible] = useFadeUpAnimation(0.2)
  const [contentRef, contentVisible] = useFadeUpAnimation(0.2)
  const [detailsRef, detailsVisible] = useFadeUpAnimation(0.2)
  const [descriptionRef, descriptionVisible] = useFadeUpAnimation(0.2)
  const [buttonRef, buttonVisible] = useFadeUpAnimation(0.2)
  
  const headingData = {
      'title': data && data.heading && data.heading.heading ? data && data.heading && data.heading.heading : 'PREMIUM BUNDLES',
      'subtitle': data && data.heading && data.heading.subheading ? data && data.heading && data.heading.subheading : "Your Recovery, Simplified.",
      'description': data && data.heading && data.heading.description ? [`${data && data.heading && data.heading.description}`] : ['Curated bundles designed to take the guesswork out ofpostpartum care — premium, practical, and priced to save.']
  }

  const content = {
    description : data && data.content && data.content.description ? data && data.content && data.content.description : 'Postpartum bleeding can last up to 6 weeks. Soreness often lingers 2–3 weeks.</br>Our systems remove the guesswork with 2–21 days of care in one box.',
    sections : [
      {
        label : data && data.content && data.content.sections ? data && data.content && data.content.sections[0].label : '',
        value : data && data.content && data.content.sections ? data && data.content && data.content.sections[0].value : '',
      },
      {
        label : data && data.content && data.content.sections ? data && data.content && data.content.sections[1].label : '',
        value : data && data.content && data.content.sections ? data && data.content && data.content.sections[1].value : '',
      },
      {
        label : data && data.content && data.content.sections ? data && data.content && data.content.sections[2].label : '',
        value : data && data.content && data.content.sections ? data && data.content && data.content.sections[2].value : '',
      },
      {
        label : data && data.content && data.content.sections ? data && data.content && data.content.sections[3].label : '',
        value : data && data.content && data.content.sections ? data && data.content && data.content.sections[3].value : '',
      }
    ]
  }

  if (loading) {
    return <BundlesHomeSkeleton />
  }

  return (
    <div className="container" style={{marginBottom: '154px'}}>
        <div ref={headingRef} className={getFadeUpClass('fade-up-animation', headingVisible)}>
          <Heading data={headingData} />
        </div>

        <div ref={containerRef} onClick={()=>navigate(data && data.image && data.image.link)} className={getFadeUpClass('fade-up-animation', containerVisible)} style={{cursor: 'pointer'}}>
          <div className="bundles-home-container">
            <img src={data && data.image && data.image.image ? data && data.image && data.image.image : BG} alt="" className='bg-image' />
            <img src={WebExc} alt="" className='website-exclusive' />
            <div className="badge-con">
              <img src={Badge} alt="" />
              <span className="badge-text">5 Bundles</span>
            </div>
            <div className="badge-content-section">
              <p>Curated postpartum bundles that match</p>
              <p>how l<img src={ClockImg} alt="" className='clock' />ng you actually</p>
              <div className='images-flash-container'>
                <img src={Bleed} alt="" className='flash-animation' />
                <span>and</span>
                <img src={FeelStore} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-100">
          <div ref={detailsRef} className={getFadeUpClass('fade-up-animation', detailsVisible)}>
            <div className="bundles-details-container">
              <div className="bundle-details-item" style={{ animationDelay: '0s' }}>
                <img src={Calendar} alt="" />
                <div className="text-container">
                  <h1 className="heading">{content.sections[0].label}</h1>
                  <h1 className="sub-heading">{content.sections[0].value}</h1>
                </div>
              </div>

              <div className="bundle-details-item" style={{ animationDelay: '0.1s' }}>
                <img src={Shield} alt="" />
                <div className="text-container">
                  <h1 className="heading">{content.sections[1].label}</h1>
                  <h1 className="sub-heading">{content.sections[1].value}</h1>
                </div>
              </div>

              <div className="bundle-details-item" style={{ animationDelay: '0.2s' }}>
                <img src={Certificate} alt="" />
                <div className="text-container">
                  <h1 className="heading">{content.sections[2].label}</h1>
                  <h1 className="sub-heading">{content.sections[2].value}</h1>
                </div>
              </div>

              <div className="bundle-details-item" style={{ animationDelay: '0.3s' }}>
                <img src={Heart} alt="" />
                <div className="text-container">
                  <h1 className="heading">{content.sections[3].label}</h1>
                  <h1 className="sub-heading">{content.sections[3].value}</h1>
                </div>
              </div>
            </div>
          </div>

          <div ref={descriptionRef} className={getFadeUpClass('fade-up-animation', descriptionVisible)} style={{ animationDelay: '0.4s' }}>
            <p className="description-item" dangerouslySetInnerHTML={{ __html: content.description }}></p>
          </div>

          <div ref={buttonRef} className="w-100 d-flex justify-content-center align-items-center" style={{ animationDelay: '0.5s' }}>
            <div className={getFadeUpClass('fade-up-animation', buttonVisible)}>
              <button className="button-pink-full" data-bs-toggle="offcanvas" data-bs-target="#bundlesuggestionsmodal">Shop Postpartum Bundles <ArrowRight style={{width: '20px', height: '20px'}} /></button>
            </div>
          </div>
        </div>

        <BundlesRecommendedModal />
        
    </div>
  )
}

export default BundlesHome