import React, { useState, useRef } from 'react'
import './HeroSection.css'
import Heading from '../Heading/Heading'
import Hero1 from '../../assets/Hero/hero1.png'
import Hero2 from '../../assets/Hero/hero2.png'
import HeroShade from '../../assets/Hero/hero-shade.png'
import HeroShade1 from '../../assets/Hero/hero-shade1.png'
import HeroShade3 from '../../assets/Hero/hero-shade-3.png'
import HeroImage2 from '../../assets/Hero/hero-img-2.png'
import SliderSample from '../../assets/Hero/slider-img.png'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { ArrowRight } from 'lucide-react'

const HeroSection = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const swiperRef = useRef(null)
    
    const headingData = {
        'title': "WHAT'S NEW",
        'subtitle': false,
        'description': false
    }

    const HeroSlider = [SliderSample,Hero1,Hero2,SliderSample]

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
            <img src={Hero1} alt="" className='bg-image' />
            <img src={HeroShade1} alt="" className='hero-shade' />
            <div className="hero-section-content-container">
              <p className="label flash-animation">FLASH SALE - Ships in 24 Hours</p>
              <p className="headinf-sec">Witch Hazel Foam + <br /> Liners Combo</p>
              <button>Shop <ArrowRight /></button>
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
                    <SwiperSlide>
                      <img src={item} alt="Hero Slide 1" style={{ width: '100%', height: 'auto' }} />
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
            <img src={Hero2} alt="" className='bg-image' />
            <img src={HeroShade3} alt="" className='hero-shade' />
            <div className="hero-section-content-container">
              <p className="heading">
                Exclusive <br /> <span>Bundle Deals</span>
              </p>
              <img src={HeroImage2} alt="" className='img-bg' />
              <button>Shop All Brands <ArrowRight /></button>
            </div>
          </div>

        </div>
      </div>
    </div>
    
  )
}

export default HeroSection