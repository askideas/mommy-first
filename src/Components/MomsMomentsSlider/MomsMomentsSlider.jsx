import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './MomsMomentsSlider.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import M1 from '../../assets/Reviews/m1.svg';
import M2 from '../../assets/Reviews/m2.svg';
import M3 from '../../assets/Reviews/m3.svg';
import M4 from '../../assets/Reviews/m4.svg';
import M5 from '../../assets/Reviews/m5.svg';
import M6 from '../../assets/Reviews/m6.svg';
import M7 from '../../assets/Reviews/m7.svg';
import M8 from '../../assets/Reviews/m8.svg';

const MomsMomentsSlider = () => {
  const swiperRef = useRef(null);
  const headingRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const [containerMargin, setContainerMargin] = useState(0);
  const [slideHeight, setSlideHeight] = useState('auto');

  const moments = [
    {
      id: 1,
      image: M1,
      alt: 'Mom moment 1'
    },
    {
      id: 2,
      image: M2,
      alt: 'Mom moment 2'
    },
    {
      id: 3,
      image: M3,
      alt: 'Mom moment 3'
    },
    {
      id: 4,
      image: M4,
      alt: 'Mom moment 4'
    },
    {
      id: 5,
      image: M5,
      alt: 'Mom moment 5'
    },
    {
      id: 6,
      image: M6,
      alt: 'Mom moment 6'
    },
    {
      id: 7,
      image: M7,
      alt: 'Mom moment 7'
    },
    {
      id: 8,
      image: M8,
      alt: 'Mom moment 8'
    }
  ];

  const calculateLayout = () => {
    if (headingRef.current && sliderContainerRef.current) {
      // Calculate margin from screen left
      const headingRect = headingRef.current.getBoundingClientRect();
      const marginLeft = headingRect.left;
      setContainerMargin(marginLeft-50);

      // Get swiper wrapper height and set to slides
      setTimeout(() => {
        const swiperWrapper =
          sliderContainerRef.current.querySelector('.swiper-wrapper');
        if (swiperWrapper) {
          const wrapperHeight = swiperWrapper.offsetHeight;
          setSlideHeight(wrapperHeight);
        }
      }, 100);
    }
  };

  useEffect(() => {
    // Calculate on mount
    calculateLayout();

    // Calculate on resize
    const handleResize = () => {
      calculateLayout();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="moments-slider-section">
      <div className="container">
        <div className="moments-section-heading" ref={headingRef}>
          <div className="head-ing">
            <h1>Real moms. Real recovery moments.</h1>
            <h2>
              See how other moms used Mommy First during those first tender weeks at home.
            </h2>
          </div>
          <div className="slider-navigation">
            <button onClick={() => swiperRef.current?.slidePrev()}>
              <ArrowLeft />
            </button>
            <button onClick={() => swiperRef.current?.slideNext()}>
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div
        className="moments-slider-container"
        ref={sliderContainerRef}
        style={{ marginLeft: `${containerMargin}px` }}
      >
        <div className="moments-slider">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={5.5}
            slidesPerGroup={1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              calculateLayout();
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 3.5,
                spaceBetween: 14,
              },
              1024: {
                slidesPerView: 4.5,
                spaceBetween: 16,
              },
              1280: {
                slidesPerView: 6.5,
                spaceBetween: 16,
              },
            }}
            className="moments-swiper"
          >
            {moments.map((moment) => (
              <SwiperSlide
                key={moment.id}
                style={{
                  height: slideHeight !== 'auto' ? `${slideHeight}px` : 'auto',
                }}
              >
                <div className="moment-card">
                  <img src={moment.image} alt={moment.alt} className="moment-image" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MomsMomentsSlider;