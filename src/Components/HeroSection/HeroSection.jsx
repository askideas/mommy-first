import React from 'react'
import './HeroSection.css'
import Heading from '../Heading/Heading'
import Hero1 from '../../assets/Hero/hero1.png'
import Hero2 from '../../assets/Hero/hero2.png'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const HeroSection = () => {
    const headingData = {
        'title': "WHAT'S NEW",
        'subtitle': false,
        'description': false
    }
  return (
    <>
      <Heading data={headingData} />
      <div className="container">
        <div className="hero-section-container d-flex justify-content-center align-items-center">

          <div className="left-side-container">
            <img src={Hero1} alt="" className='bg-image' />
          </div>

          <div className="hero-image-slider-container">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
            >
              <SwiperSlide>
                <img src={Hero1} alt="Hero Slide 1" style={{ width: '100%', height: 'auto' }} />
              </SwiperSlide>
              <SwiperSlide>
                <img src={Hero2} alt="Hero Slide 2" style={{ width: '100%', height: 'auto' }} />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="right-side-container">
            <img src={Hero2} alt="" className='bg-image' />
          </div>

        </div>
      </div>
    </>
    
  )
}

export default HeroSection