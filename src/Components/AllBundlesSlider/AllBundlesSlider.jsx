import React, { useEffect, useRef, useState } from "react";
import "./AllBundlesSlider.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BundleTile from "../BundleTile/BundleTile";
import { useFadeUpAnimation } from "../../hooks/useFadeUpAnimation";

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

  // Animation refs
  const [headingAnimRef, headingVisible] = useFadeUpAnimation(0.1, true);
  const [sliderAnimRef, sliderVisible] = useFadeUpAnimation(0.1, true);

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
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const primaryUrl = `${baseUrl}/collections/bundles`;
      const fallbackUrl = `${baseUrl}/collections/bundles?limit=50`;

      console.log('Fetching bundles from:', primaryUrl);
      let response = await fetch(primaryUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit'
      });

      if (!response.ok && response.status === 404) {
        console.warn('Primary bundles endpoint returned 404, retrying fallback:', fallbackUrl);
        response = await fetch(fallbackUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          credentials: 'omit'
        });
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Bundles response:', responseData);

      const collection = responseData.data?.collection || responseData.collection;
      const productEdges = Array.isArray(collection?.products)
        ? collection.products
        : (collection?.products?.edges || []);

      if (productEdges.length > 0) {
        const getIndexValue = (edge) => {
          const product = edge?.node || edge || {};
          const indexField = product?.metafields?.find(m => m.key === 'index');
          const value = indexField?.value;
          return typeof value === 'number' ? value : Number(value);
        };

        const sortedBundles = productEdges.slice().sort((a, b) => {
          const aIndex = getIndexValue(a);
          const bIndex = getIndexValue(b);
          if (Number.isNaN(aIndex) && Number.isNaN(bIndex)) return 0;
          if (Number.isNaN(aIndex)) return 1;
          if (Number.isNaN(bIndex)) return -1;
          return aIndex - bIndex;
        });

        setBundlesData(sortedBundles);
        setError(null);
      } else {
        setBundlesData([]);
      }
    } catch (err) {
      console.error('Error fetching bundles:', err);
      setError(err.message);
    } finally {
      setLoading(false);
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
  }, []);

  return (
    <div className="all-bundles-slider-section">
      <div className="container">
        <div ref={headingAnimRef} className={`all-bundles-section-heading ${headingVisible ? 'animate-in' : ''}`}>
          <div className="head-ing">
            <h1>All Bundles, Add more anytime</h1>
            <h2>Choose based on how long you'd like your care to last.</h2>
          </div>
        </div>
      </div>

      <div
        ref={sliderAnimRef}
        className={`all-bundles-slider-container ${sliderVisible ? 'animate-in' : ''}`}
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
