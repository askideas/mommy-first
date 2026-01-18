import React, { useState, useEffect } from 'react'
import './StoriesHome.css'
import Star from '../../assets/Reviews/star.svg'
import M1 from '../../assets/Reviews/m1.svg'
import M2 from '../../assets/Reviews/m2.svg'
import M3 from '../../assets/Reviews/m3.svg'
import M4 from '../../assets/Reviews/m4.svg'
import M5 from '../../assets/Reviews/m5.svg'
import M6 from '../../assets/Reviews/m6.svg'
import M7 from '../../assets/Reviews/m7.svg'
import M8 from '../../assets/Reviews/m8.svg'
import M9 from '../../assets/Reviews/m9.svg'
import M10 from '../../assets/Reviews/m10.svg'
import M11 from '../../assets/Reviews/m11.svg'
import M12 from '../../assets/Reviews/m12.svg'
import M13 from '../../assets/Reviews/m13.svg'
import Shade from '../../assets/Reviews/shade.svg'
import { useNavigate } from 'react-router-dom'

const StoriesHome = (props) => {
    const data = props.data
    const INTERVAL_FAST = 2000;
    const INTERVAL_MEDIUM = 2500;
    const INTERVAL_SLOW = 3000;
    const navigate = useNavigate();
    const SlideStack = ({ images = [], start = 0, interval = 2500 }) => {
        const [index, setIndex] = useState(start % images.length)

        useEffect(() => {
            setIndex(start % images.length)
            const id = setInterval(() => {
                setIndex((i) => (i + 1) % images.length)
            }, interval)
            return () => clearInterval(id)
        }, [images.length, interval, start])

        return (
            <div className="slide-wrapper">
                {images.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`slide-${i}`}
                        className={i === index ? 'visible' : 'hidden'}
                    />
                ))}
            </div>
        )
    }

    const fetchImages = (images)=> {
        const Images = []
        images.map((item,index)=> Images.push(item.url))
        return Images;
    }

    const rHeading = data && data.reviewData && data.reviewData.heading ? data.reviewData.heading : 'Read Reviews,<br/>Shop with confidence';
    const rLabel = data && data.reviewData && data.reviewData.label ? data.reviewData.label : 'Love from Moms'
    const rdesc1 = data && data.reviewData && data.reviewData.descriptionOne ? data.reviewData.descriptionOne : 'Love from Moms'
    const rdesc2 = data && data.reviewData && data.reviewData.descriptionTwo ? data.reviewData.descriptionTwo : 'Love from Moms'
    const rbuttonLabel = data && data.reviewData && data.reviewData.buttonLabel ? data.reviewData.buttonLabel : 'Love from Moms'
    const rimages = data && data.reviewData && data.reviewData.images ? fetchImages(data.reviewData.images) : [M1,M2,M3,M4,M5,M6,M7,M8,M9,M10,M11,M12,M13];
  return (
    <div className="container">
        <div className="stories-home-container">
            <div className="star-section">
                <img src={Star} alt="" />
                <img src={Star} alt="" />
                <img src={Star} alt="" />
                <img src={Star} alt="" />
                <img src={Star} alt="" />
            </div>
            <h1 className="star-heading" dangerouslySetInnerHTML={{ __html: rHeading }}></h1>
            <div className="gallery-container">
                {/* keep same gallery-item structure; each item has a shade then a slide stack */}
                <div className="gallery-item one">
                    <div className="shade"></div>
                    <SlideStack images={rimages} start={0} interval={INTERVAL_MEDIUM} />
                    <SlideStack images={rimages} start={1} interval={INTERVAL_SLOW} />
                </div>

                <div className="gallery-item two">
                    <div className="shade"></div>
                    <SlideStack images={rimages} start={3} interval={INTERVAL_FAST} />
                    <SlideStack images={rimages} start={5} interval={INTERVAL_MEDIUM} />
                </div>

                <div className="gallery-item three">
                    <div className="shade"></div>
                    <SlideStack images={rimages} start={7} interval={INTERVAL_SLOW} />
                </div>

                <div className="gallery-item four">
                    <div className="shade"></div>
                    <SlideStack images={rimages} start={2} interval={INTERVAL_FAST} />
                </div>

                <div className="gallery-item five">
                    <div className="shade"></div>
                    <SlideStack images={rimages} start={9} interval={INTERVAL_MEDIUM} />
                </div>

                <div className="gallery-item four">
                    <div className="shade"></div>
                    <SlideStack images={rimages} start={4} interval={INTERVAL_SLOW} />
                </div>

                <div className="gallery-item three">
                    <div className="shade"></div>
                    <SlideStack images={rimages} start={11} interval={INTERVAL_FAST} />
                </div>

                <div className="gallery-item two">
                    <div className="shade"></div>
                    <SlideStack images={rimages} start={6} interval={INTERVAL_SLOW} />
                    <SlideStack images={rimages} start={8} interval={INTERVAL_MEDIUM} />
                </div>

                <div className="gallery-item one">
                    <div className="shade"></div>
                    <SlideStack images={rimages} start={10} interval={INTERVAL_FAST} />
                    <SlideStack images={rimages} start={12} interval={INTERVAL_MEDIUM} />
                </div>
            </div>

            <div className="reviews-text-container">
                <img src={Shade} className="shade-con" alt="" />
                <div className="label">{rLabel}</div>
                <div className="review-text">{rdesc1}</div>
                <div className="review-text">{rdesc2}</div>
                <div className="reviewr-name">Jessica <br /> <span>Fort Worth, Texas</span></div>
                <div className="progress-bar">
                    <span></span>
                </div>
                <button className='button-label' onClick={()=> navigate('/stories')}>{rbuttonLabel}</button>
            </div>
        </div>
    </div>
  )
}

export default StoriesHome