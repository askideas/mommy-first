import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./FaqSlider.css";
import { ArrowLeft, ArrowRight } from "lucide-react";

const FaqSlider = () => {
  const swiperRef = useRef(null);
  const headingRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const [containerMargin, setContainerMargin] = useState(0);
  const [slideHeight, setSlideHeight] = useState("auto");

  const Faqs = [
    {
      id: 1,
      question: "When should I order my bundle?",
      answer:
        "We recommend ordering while you're still pregnant, around 32–36 weeks, so you can pack what you need in your hospital bag and have the rest waiting for you at home.",
    },
    {
      id: 2,
      question: "Do I still need this if my hospital gives me supplies?",
      answer:
        "Most hospitals only cover the first 1–2 days. Bleeding and soreness last much longer. Our systems are designed to support the days and weeks after you're back home.",
    },
    {
      id: 3,
      question: "Do I still need this if my hospital gives me supplies?",
      answer:
        "Most hospitals only cover the first 1–2 days. Bleeding and soreness last much longer. Our systems are designed to support the days and weeks after you're back home.",
    },
    {
      id: 4,
      question: "Will this work if I had a C-section?",
      answer:
        "Yes. You'll still bleed postpartum, and many moms prefer soft, high-coverage underwear and gentle cleansing with the peri bottle. Cooling pads can be used carefully for general comfort (not directly on the incision).",
    },
    {
      id: 5,
      question: "When should I order my bundle?",
      answer:
        "We recommend ordering while you're still pregnant, around 32–36 weeks, so you can pack what you need in your hospital bag and have the rest waiting for you at home.",
    },
    {
      id: 6,
      question: "Do I still need this if my hospital gives me supplies?",
      answer:
        "Most hospitals only cover the first 1–2 days. Bleeding and soreness last much longer. Our systems are designed to support the days and weeks after you're back home.",
    },
    {
      id: 7,
      question: "Do I still need this if my hospital gives me supplies?",
      answer:
        "Most hospitals only cover the first 1–2 days. Bleeding and soreness last much longer. Our systems are designed to support the days and weeks after you're back home.",
    },
    {
      id: 8,
      question: "Will this work if I had a C-section?",
      answer:
        "Yes. You'll still bleed postpartum, and many moms prefer soft, high-coverage underwear and gentle cleansing with the peri bottle. Cooling pads can be used carefully for general comfort (not directly on the incision).",
    },
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
          sliderContainerRef.current.querySelector(".swiper-wrapper");
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

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="faq-slider-section">
      <div className="container">
        <div className="faqslider-section-heading" ref={headingRef}>
          <div className="head-ing">
            <h1>Postpartum questions moms ask us the most.</h1>
            <h2>
              Because “Why did no one tell me this?” shouldn’t be part of your recovery story.
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
        className="faq-slider-container"
        ref={sliderContainerRef}
        style={{ marginLeft: `${containerMargin}px` }}
      >
        <div className="faq-slider">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={3.5}
            slidesPerGroup={1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              calculateLayout();
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 1.5,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 3.5,
                spaceBetween: 20,
              },
            }}
            className="faq-swiper"
          >
            {Faqs.map((faq) => (
              <SwiperSlide
                key={faq.id}
                style={{
                  height: slideHeight !== "auto" ? `${slideHeight}px` : "auto",
                }}
              >
                <div className="faq-card">
                  <h3 className="faq-question">{faq.question}</h3>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default FaqSlider;
