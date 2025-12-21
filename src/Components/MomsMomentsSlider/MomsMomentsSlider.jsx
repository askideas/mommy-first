import React, { useEffect, useRef, useState } from 'react';
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
  const headingRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [containerMargin, setContainerMargin] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

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
    if (headingRef.current) {
      const headingRect = headingRef.current.getBoundingClientRect();
      const marginLeft = headingRect.left;
      setContainerMargin(marginLeft - 50);
    }
  };

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollPrev(scrollLeft > 0);
      setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 184; // moment card width
      const gap = 16;
      const scrollAmount = cardWidth + gap;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 184;
      const gap = 16;
      const scrollAmount = cardWidth + gap;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    calculateLayout();
    updateScrollButtons();

    const handleResize = () => {
      calculateLayout();
      updateScrollButtons();
    };

    window.addEventListener('resize', handleResize);

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateScrollButtons);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', updateScrollButtons);
      }
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
            <button onClick={scrollPrev} disabled={!canScrollPrev}>
              <ArrowLeft />
            </button>
            <button onClick={scrollNext} disabled={!canScrollNext}>
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
        <div className="moments-slider" ref={scrollContainerRef}>
          {moments.map((moment) => (
            <div key={moment.id} className="moment-card">
              <img src={moment.image} alt={moment.alt} className="moment-image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MomsMomentsSlider;