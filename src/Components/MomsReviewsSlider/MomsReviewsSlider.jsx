import { ArrowLeft, ArrowRight } from 'lucide-react'
import React, { useRef, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import './MomsReviewsSlider.css'
import star from '../../assets/Reviews/star.svg'
import m1 from '../../assets/Reviews/m1.svg'
import m2 from '../../assets/Reviews/m2.svg'
import m3 from '../../assets/Reviews/m3.svg'
import m4 from '../../assets/Reviews/m4.svg'
import m5 from '../../assets/Reviews/m5.svg'

const MomsReviewsSlider = () => {
    const swiperRef = useRef(null)
    const headingRef = useRef(null)
    const sliderContainerRef = useRef(null)
    const [containerMargin, setContainerMargin] = useState(0)
    const [slideHeight, setSlideHeight] = useState('auto')
    
    const reviews = [
    {
      "id": 1,
      "rating": 5,
      "review": "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
      "author": {
        "name": "Jessica",
        "tag": "first-time mom",
        "avatar": m1
      }
    },
    {
      "id": 2,
      "rating": 5,
      "review": "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as I got home and it was so much less scary.",
      "author": {
        "name": "Maria",
        "tag": "vaginal birth",
        "avatar": m2
      }
    },
    {
      "id": 3,
      "rating": 5,
      "review": "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads.",
      "author": {
        "name": "Jessica",
        "tag": "first-time mom",
        "avatar": m3
      }
    },
    {
      "id": 4,
      "rating": 5,
      "review": "The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
      "author": {
        "name": "Jessica",
        "tag": "first-time mom",
        "avatar": m4
      }
    },
    {
      "id": 5,
      "rating": 5,
      "review": "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as I got home and going to the bathroom felt so much less scary.",
      "author": {
        "name": "Maria",
        "tag": "vaginal birth",
        "avatar": m5
      }
    }
  ]

  const calculateLayout = () => {
    if (headingRef.current && sliderContainerRef.current) {
      // Calculate margin from screen left
      const headingRect = headingRef.current.getBoundingClientRect()
      const marginLeft = headingRect.left
      setContainerMargin(marginLeft)

      // Get swiper wrapper height and set to slides
      setTimeout(() => {
        const swiperWrapper = sliderContainerRef.current.querySelector('.swiper-wrapper')
        if (swiperWrapper) {
          const wrapperHeight = swiperWrapper.offsetHeight
          setSlideHeight(wrapperHeight)
        }
      }, 100)
    }
  }

  useEffect(() => {
    // Calculate on mount
    calculateLayout()

    // Calculate on resize
    const handleResize = () => {
      calculateLayout()
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
        <div className="container">
            <div className="momsreview-section-heading" ref={headingRef}>
                <div className="head-ing">
                    <h1>What real moms are saying.</h1>
                    <h2>Postpartum is hard enough. The right support makes a bigger difference than anyone tells you.</h2>
                </div>
                <div className="slider-navigation">
                    <button onClick={() => swiperRef.current?.slidePrev()}><ArrowLeft /></button>
                    <button onClick={() => swiperRef.current?.slideNext()}><ArrowRight /></button>
                </div>
            </div>
        </div>

        <div 
            className="reviews-slider-container" 
            ref={sliderContainerRef}
            style={{ marginLeft: `${containerMargin}px` }}
        >
            <div className="moms-review-slider">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={4.5}
                    slidesPerGroup={1}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper
                        calculateLayout()
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 16,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 16,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1280: {
                            slidesPerView: 4.5,
                            spaceBetween: 20,
                        },
                    }}
                    className="reviews-swiper"
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id} style={{ height: slideHeight !== 'auto' ? `${slideHeight}px` : 'auto' }}>
                            <div className="review-card">
                                <div className="review-stars">
                                    {[...Array(review.rating)].map((_, index) => (
                                        <img key={index} src={star} alt="star" className="star-icon" />
                                    ))}
                                </div>
                                <p className="review-text">"{review.review}"</p>
                                <div className="review-author">
                                    <img src={review.author.avatar} alt={review.author.name} className="author-avatar" />
                                    <div className="author-info">
                                        <p className="author-name">
                                            {review.author.name}, <span className="author-tag">{review.author.tag}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    </>
    
  )
}

export default MomsReviewsSlider