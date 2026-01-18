import React, { useState, useRef } from 'react'
import './HeroSection.css'
import Heading from '../Heading/Heading'
import Hero1 from '../../assets/Hero/hero1.png'
import Hero2 from '../../assets/Hero/hero2.png'
import Hero3 from '../../assets/Hero/sd-img2.png'
import Hero4 from '../../assets/Hero/sd-img3.png'
import HeroShade from '../../assets/Hero/hero-shade.png'
import HeroShade1 from '../../assets/Hero/hero-shade1.png'
import HeroShade3 from '../../assets/Hero/hero-shade-3.png'
import HeroImage2 from '../../assets/Hero/hero-img-2.png'
import SliderSample from '../../assets/Hero/slider-img.png'
import { Swiper, SwiperSlide } from 'swiper/react'
import MF1 from '../../assets/MF1.png'
import MF2 from '../../assets/MF2.png'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { ArrowRight } from 'lucide-react'

const HeroSection = ({ data, loading }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const swiperRef = useRef(null)
    
    // Default slider images
    const defaultSliderImages = [SliderSample, Hero3, Hero4]
    
    const headingData = {
        'title': "WHAT'S NEW",
        'subtitle': false,
        'description': false
    }

    // Use data from props if available, otherwise use default images
    // Ensure HeroSlider is always an array
    const HeroSlider = Array.isArray(data?.slider) ? data.slider : defaultSliderImages
    
    // Get left and right section data from props with safe defaults
    const leftside = {
        label: data?.leftside?.labelText || "FLASH SALE - Ships in 24 Hours",
        heading: data?.leftside?.description || "Witch Hazel Foam + Liners Combo",
        image: data?.leftside?.backgroundImage || Hero1,
        buttonText: data?.leftside?.buttonText || "Shop"
    }
    
    const rightside = {
        heading: data?.rightside?.heading || "Exclusive",
        subHeading: data?.rightside?.subHeading || "Bundle Deals",
        buttonText: data?.rightside?.buttonText || "Shop All Brands",
        image: data?.rightside?.backgroundImage || Hero2,
        productImage: data?.rightside?.productImage || HeroImage2
    }

    console.log('HeroSection received data:', data)

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.realIndex)
    }

    const handlePaginationClick = (index) => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideToLoop(index)
        }
    }
  return (
    <div className='mt-5'>
      <Heading data={headingData} />
      <div className="container">
        <div className="hero-section-container d-flex justify-content-center align-items-center">

          <div className="left-side-container">
            <img src={leftside.image} alt="" className='bg-image' />
            <img src={HeroShade1} alt="" className='hero-shade' />
            <div className="hero-section-content-container">
              <p className="label flash-animation">{leftside.label}</p>
              <p className="headinf-sec" dangerouslySetInnerHTML={{ __html: leftside.heading?.replace(/\n/g, '<br />') || 'Witch Hazel Foam + <br /> Liners Combo' }}></p>
              <button>{leftside.buttonText || 'Shop'} <ArrowRight /></button>
            </div>
          </div>

          <div className="hero-image-slider-container">
            <img src={HeroShade} alt="" className='hero-shade' />
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              spaceBetween={0}
              effect={'fade'}
              fadeEffect={{ crossFade: true }}
              slidesPerView={1}
              speed={1200}
              navigation={false}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
              onSlideChange={handleSlideChange}
            >
              {
                HeroSlider.map((item, index)=> {
                  return (
                    <SwiperSlide key={index}>
                      <img src={item} alt="Hero Slide 1" className='hero-slide-image' style={{ width: '100%', height: 'auto' }} />
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
            <div className="hero-slider-pagination">
              {
                HeroSlider.map((item, index)=> {
                  return (
                    <button 
                      key={index}
                      className={activeIndex === index ? 'active' : ''}
                      onClick={() => handlePaginationClick(index)}
                    >
                      Shop <ArrowRight />
                    </button>
                  )
                })
              }
            </div>
          </div>

          <div className="right-side-container">
            <img src={rightside.image || Hero2} alt="" className='bg-image' />
            <img src={HeroShade3} alt="" className='hero-shade' />
            <div className="hero-section-content-container">
              <p className="heading">
                {rightside.heading || 'Exclusive'} <br /> <span>{rightside.subHeading || 'Bundle Deals'}</span>
              </p>
              <img src={rightside.productImage || HeroImage2} alt="" className='img-bg' />
              <button>{rightside.buttonText || 'Shop All Brands'} <ArrowRight /></button>
            </div>
          </div>

        </div>
      </div>
    </div>
    
  )
}

export default HeroSection