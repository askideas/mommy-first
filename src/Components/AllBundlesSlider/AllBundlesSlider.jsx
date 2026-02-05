import React, { useEffect, useRef, useState } from "react";
import "./AllBundlesSlider.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BundleTile from "../BundleTile/BundleTile";

export const AllBundlesSlider = () => {
  const headingRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [containerMargin, setContainerMargin] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  
  const [bundlesData, setBundlesData] = useState([]);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch authentication token
  const fetchAuthToken = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "clientId": import.meta.env.VITE_API_CLIENT_ID,
          "clientSecret": import.meta.env.VITE_API_CLIENT_SECRET
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success && result.token) {
        setAuthToken(result.token);
        return result.token;
      } else {
        throw new Error(result.message || 'Failed to get authentication token');
      }
    } catch (err) {
      console.error('Error fetching auth token:', err);
      setError(`Failed to authenticate: ${err.message}`);
      return null;
    }
  };

  // Fetch bundles from collections
  const fetchBundles = async (token) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/collections/bundles`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setBundlesData(result.data);
        setError(null);
      } else {
        throw new Error(result.message || 'Failed to fetch bundles');
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching bundles:', err);
      setError(err.message);
      setLoading(false);
    }
  };

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
    const initFetch = async () => {
      const token = await fetchAuthToken();
      if (token) {
        await fetchBundles(token);
      }
    };
    initFetch();

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
        </div>
      </div>

      <div
        className="all-bundles-slider-container"
        ref={sliderContainerRef}
        style={{ marginLeft: `${containerMargin}px` }}
      >
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px', width: '100%'}}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px', width: '100%'}}>
            <p style={{color: 'red'}}>{error}</p>
          </div>
        ) : (
          <div className="all-bundles-slider" ref={scrollContainerRef}>
            {bundlesData.map((bundle, index) => (
              <div key={bundle.id || index} className="bundle-slider-item">
                <BundleTile data={bundle} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBundlesSlider;
