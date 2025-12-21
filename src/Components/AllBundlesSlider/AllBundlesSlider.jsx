import React, { useEffect, useRef, useState } from "react";
import "./AllBundlesSlider.css";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Prd1 from "../../assets/BundleRecom/bundle-item-1.png";
import Prd2 from "../../assets/BundleRecom/bundle-item-2.png";

export const AllBundlesSlider = () => {
  const headingRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [containerMargin, setContainerMargin] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const bundles = [
    {
      id: 1,
      daysOfCare: "5-7 Days of Care",
      price: "$49.99",
      title: "The First Week Healing System",
      items: [
        "2x Pad Liners",
        "8 Underwear",
        "1 Ice Pack",
        "1 Peri bottle",
        "8 Cooling Pads",
        "Witch Hazel Perineal Care Foam",
      ],
      image: Prd1,
      cSectionCompatible: true,
    },
    {
      id: 2,
      daysOfCare: "5-7 Days of Care",
      price: "$49.99",
      title: "Refill Essentials",
      items: [
        "2x Pad Liners",
        "8 Underwear",
        "1 Ice Pack",
        "8 Cooling Pads",
        "Witch Hazel Perineal Care Foam",
      ],
      image: Prd2,
      cSectionCompatible: true,
    },
    {
      id: 3,
      daysOfCare: "5-7 Days of Care",
      price: "$49.99",
      title: "The 2 Weeks Full Recovery Set",
      items: [
        "2x Pad Liners",
        "8 Underwear",
        "1 Peri bottle",
        "8 Cooling Pads",
        "Witch Hazel Perineal Care Foam",
      ],
      image: Prd1,
      cSectionCompatible: true,
    },
    {
      id: 4,
      daysOfCare: "5-7 Days of Care",
      price: "$49.99",
      title: "21 Days Total Postpartum Care System",
      items: [
        "2x Pad Liners",
        "8 Underwear",
        "8 Cooling Pads",
        "Witch Hazel Perineal Care Foam",
      ],
      image: Prd2,
      cSectionCompatible: true,
    },
    {
      id: 5,
      daysOfCare: "5-7 Days of Care",
      price: "$49.99",
      title: "The First Week Healing System",
      items: [
        "2x Pad Liners",
        "8 Underwear",
        "1 Ice Pack",
        "1 Peri bottle",
        "8 Cooling Pads",
        "Witch Hazel Perineal Care Foam",
      ],
      image: Prd1,
      cSectionCompatible: true,
    },
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
      const cardWidth = 366; // bundle card width
      const gap = 24;
      const scrollAmount = cardWidth + gap;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 366;
      const gap = 24;
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

    window.addEventListener("resize", handleResize);

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateScrollButtons);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', updateScrollButtons);
      }
    };
  }, []);

  return (
    <div className="all-bundles-slider-section">
      <div className="container">
        <div className="all-bundles-section-heading" ref={headingRef}>
          <div className="head-ing">
            <h1>All Bundles, Add more anytime</h1>
            <h2>Choose based on how long you'd like your care to last.</h2>
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
        className="all-bundles-slider-container"
        ref={sliderContainerRef}
        style={{ marginLeft: `${containerMargin}px` }}
      >
        <div className="all-bundles-slider" ref={scrollContainerRef}>
          {bundles.map((bundle) => (
            <div key={bundle.id} className="bundle-card">
              <div className="d-flex flex-column h-100">
                <div style={{ flex: "1" }}>
                  <div className="bundle-header">
                    <span className="days-badge">
                      <span className="badge-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-clock-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                        </svg>
                      </span>
                      {bundle.daysOfCare}
                    </span>
                    <span className="price-badge">{bundle.price}</span>
                  </div>

                  <h3 className="bundle-title">{bundle.title}</h3>

                  <div className="bundle-items">
                    {bundle.items.map((item, index) => (
                      <span key={index} className="item-tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="bundle-image-container">
                    <img
                      src={bundle.image}
                      alt={bundle.title}
                      className="bundle-image"
                    />
                  </div>

                  {bundle.cSectionCompatible && (
                    <div className="c-section-badge">
                      <Check size={16} />
                      <span>C-Section compatible</span>
                    </div>
                  )}

                  <button
                    className="button-pink-center"
                    style={{ boxShadow: "0px 8.1px 14.76px 0px #FF96C14F" }}
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBundlesSlider;
