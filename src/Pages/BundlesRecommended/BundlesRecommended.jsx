import { Check, CircleCheck, Clock, SquareX, X, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './BundlesRecommended.css'
import BoxImg from '../../assets/BundleRecom/box-img.png'
import LabelImg from '../../assets/BundleRecom/label.png'
import BundleTileImg from '../../assets/BundleRecom/bundle-item-1.png'
import MomsReviewsSlider from '../../Components/MomsReviewsSlider/MomsReviewsSlider'
import BoughtTogether from '../../Components/BoughtTogether/BoughtTogether'
import FaqSlider from '../../Components/FaqSlider/FaqSlider'
import MomsMomentsSlider from '../../Components/MomsMomentsSlider/MomsMomentsSlider'
import AllBundlesSlider from '../../Components/AllBundlesSlider/AllBundlesSlider'
import HightLightImg from '../../assets/BundlesHome/badge.png'
import BundleTile from '../../Components/BundleTile/BundleTile'
import { useCart } from '../../contexts/CartContext'
import { toast } from 'react-toastify'

const BundlesRecommended = () => {
    const location = useLocation()
    const [movement, setMovement] = useState('')
    const [bundlesData, setBundlesData] = useState([])
    const [authToken, setAuthToken] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isAdding, setIsAdding] = useState(false)
    const [isAdded, setIsAdded] = useState(false)
    const { addToCart } = useCart()

    // Get bundle handle from URL hash (e.g., #bundle-handle)
    const bundleHandle = location.hash ? location.hash.substring(1) : ''

    useEffect(() => {
      setTimeout(() => {
        setMovement('moved')
      }, 2500);
    }, [])

    // Fetch authentication token
    const fetchAuthToken = async () => {
        try {
            console.log('Fetching auth token...');
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientId: import.meta.env.VITE_API_CLIENT_ID,
                    clientSecret: import.meta.env.VITE_API_CLIENT_SECRET
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Auth error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success && data.token) {
                setAuthToken(data.token);
                console.log('Token received successfully');
                return data.token;
            } else {
                throw new Error(data.message || 'Failed to get authentication token');
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
            console.log(responseData);
            
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

    // Fetch data on component mount
    useEffect(() => {
        const initFetch = async () => {
            const token = await fetchAuthToken();
            if (token) {
                await fetchBundles(token);
            }
        };
        initFetch();
    }, []);

    // Find the best value bundle based on URL hash
    const bestValueBundle = bundlesData.find(bundle => {
        const product = bundle?.node || bundle || {};
        return product.handle === bundleHandle;
    });

    // Get remaining bundles (excluding the best value one)
    const remainingBundles = bundlesData.filter(bundle => {
        const product = bundle?.node || bundle || {};
        return product.handle !== bundleHandle;
    });

    // Extract data from best value bundle for display
    const getBundleDisplayData = (bundle) => {
        if (!bundle) return null;
        const product = bundle?.node || bundle || {};
        
        // Extract price
        const price = product.priceRange?.minVariantPrice?.amount
            || product.variants?.nodes?.[0]?.price?.amount
            || product.variants?.[0]?.price?.amount
            || '0';
        
        // Extract compare at price (retail value)
        const compareAtPrice = product.compareAtPriceRange?.minVariantPrice?.amount
            || product.variants?.nodes?.[0]?.compareAtPrice?.amount
            || product.variants?.[0]?.compareAtPrice?.amount
            || null;
        
        // Extract image
        const image = product.images?.nodes?.[0]?.url
            || product.images?.[0]?.url
            || BundleTileImg;
        
        // Parse metafields
        const rawMetafields = product.metafields ?? bundle?.metafields ?? bundle?.node?.metafields;
        const metafields = Array.isArray(rawMetafields?.nodes)
            ? rawMetafields.nodes
            : Array.isArray(rawMetafields?.edges)
                ? rawMetafields.edges.map(edge => edge.node)
                : Array.isArray(rawMetafields)
                    ? rawMetafields
                    : [];
        
        const tagsMetafield = metafields.find(m => m.key === 'tags');
        const contents = tagsMetafield?.value
            ? String(tagsMetafield.value).split(',').map(item => item.trim()).filter(Boolean)
            : [];
        const durationMetafield = metafields.find(m => m.key === 'duration');
        const duration = durationMetafield?.value || '';
        
        const savings = compareAtPrice ? (parseFloat(compareAtPrice) - parseFloat(price)).toFixed(2) : null;
        
        return {
            title: product.title,
            handle: product.handle,
            price: parseFloat(price).toFixed(2),
            compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice).toFixed(2) : null,
            savings,
            image,
            contents,
            duration,
            variantId: product.variants?.nodes?.[0]?.id || product.variants?.[0]?.id
        };
    };

    const bestValueData = getBundleDisplayData(bestValueBundle);

    // Handle Add to Cart for best value bundle
    const handleAddToCart = async () => {
        if (isAdding || isAdded || !bestValueData?.variantId) return;
        
        setIsAdding(true);

        try {
            const items = [{
                variantId: bestValueData.variantId,
                quantity: 1
            }];

            const response = await addToCart(items);

            if (response.success) {
                setIsAdded(true);
                toast.success('Bundle added to cart!', {
                    autoClose: 1500,
                    hideProgressBar: true
                });
                setTimeout(() => {
                    setIsAdded(false);
                }, 2000);
            } else {
                toast.error(response.message || 'Failed to add bundle', {
                    autoClose: 1500,
                    hideProgressBar: true
                });
            }
        } catch (err) {
            console.error('Add to cart error:', err);
            toast.error('Something went wrong', {
                autoClose: 1500,
                hideProgressBar: true
            });
        } finally {
            setIsAdding(false);
        }
    };
    
  return (
    <>
        <div className="container">
            <div className="bundles-recommended-container-hero-section">
                <div className="heading-section-bundles">
                    <h1>Your recommended bundle, just for you!</h1>
                    <h2>Take a breath. We're always here to help you find the bundle that fits your needs.</h2>
                    <button className='button-pink-border'>CONTINUE SHOPPING</button>
                </div>

                {loading ? (
                    <div className="bundles-best-value-section skeleton-best-value">
                        <div className="skeleton-badge"></div>
                        <div className="skeleton-title-row">
                            <div className="skeleton-title"></div>
                            <div className="skeleton-duration"></div>
                        </div>
                        <div className="skeleton-desc"></div>
                        <div className="skeleton-image"></div>
                        <div className="skeleton-items">
                            <div className="skeleton-item"></div>
                            <div className="skeleton-item"></div>
                            <div className="skeleton-item"></div>
                            <div className="skeleton-item"></div>
                            <div className="skeleton-item"></div>
                            <div className="skeleton-item"></div>
                        </div>
                        <div className="skeleton-divider"></div>
                        <div className="skeleton-price-row">
                            <div className="skeleton-price"></div>
                            <div className="skeleton-savings"></div>
                        </div>
                        <div className="skeleton-button"></div>
                        <div className="skeleton-features">
                            <div className="skeleton-feature"></div>
                            <div className="skeleton-feature"></div>
                            <div className="skeleton-feature"></div>
                            <div className="skeleton-feature"></div>
                        </div>
                    </div>
                ) : error ? (
                    <div className="bundles-best-value-section" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px'}}>
                        <p style={{color: 'red'}}>{error}</p>
                    </div>
                ) : bestValueData ? (
                <div className="bundles-best-value-section">
                    <div className="image-highlist">
                        <img src={HightLightImg} alt="" />
                        <span>Best Value</span>
                    </div>

                    <p className="heading-label-sec">
                        <span className="bundle-name">{bestValueData.title}</span>
                        {bestValueData.duration && <span className="days-label">{bestValueData.duration}</span>}
                    </p>

                    <p className="bundle-description">Best for core support for the hardest days at home</p>

                    <img src={bestValueData.image} alt={bestValueData.title} className="bundle-tile-image" />

                    <div className="bundle-items">
                        {bestValueData.contents.map((item, index) => (
                            <span key={index}>{item}</span>
                        ))}
                    </div>

                    <svg className="line-separator" width="295" height="1" viewBox="0 0 295 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="0.5" x2="294.667" y2="0.5" stroke="#F2B8C6"/>
                        <line y1="0.5" x2="294.667" y2="0.5" stroke="url(#paint0_linear_14742_6974)"/>
                        <defs>
                        <linearGradient id="paint0_linear_14742_6974" x1="0" y1="1.5" x2="294.667" y2="1.5" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white"/>
                        <stop offset="0.490385" stopColor="#EAA4B9"/>
                        <stop offset="0.971154" stopColor="white"/>
                        </linearGradient>
                        </defs>
                    </svg>

                    <p className="bundle-price">
                        <span className="price">${bestValueData.price}</span>
                        {bestValueData.compareAtPrice && bestValueData.savings && (
                            <span className="price-label">Retail value ${bestValueData.compareAtPrice} | Save ${bestValueData.savings}</span>
                        )}
                    </p>

                    <button 
                        className="button-pink-center" 
                        onClick={handleAddToCart}
                        disabled={isAdding || isAdded}
                    >
                        {isAdding ? (
                            <><Loader2 className="animate-spin" size={16} /> Adding...</>
                        ) : isAdded ? (
                            <><Check size={16} /> Added!</>
                        ) : (
                            'ADD TO BAG'
                        )}
                    </button>

                    <div className="feature-of-bundle">
                        <p>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="#5ED34B" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Secure checkout</span>
                        </p>
                        <p>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="#5ED34B" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Loved by moms</span>
                        </p>
                        <p>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="#5ED34B" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>FREE shipping</span>
                        </p>
                        <p>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="#5ED34B" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Hassle free returns</span>
                        </p>
                    </div>

                </div>
                ) : (
                    <div className="bundles-best-value-section" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px'}}>
                        <p>No bundle found for the selected handle. Please try a different bundle.</p>
                    </div>
                )}

                <div className="optional-bundles-to-items-container">
                    <div className="close-container">
                        <div className="label-div">Optional</div>
                        <SquareX className='close-btn' onClick={()=> setMovement('')} />
                    </div>
                    <p className="head-ing">Hospital-bag <br /> add-on </p>
                    <img src={BoxImg} alt="" className='box-img' />
                    <p className="description">This is the #1 combination chosen by moms preparing for birth.</p>
                    <div className="labels">
                        <p className="label">24 Pad Liners</p>
                        <p className="label">8 Underwear</p>
                        <p className="label">8 Cooling Pads</p>
                        <p className="label"> Witch Hazel Perineal Foam</p>
                    </div>
                    <div className="btns-con">
                        <button className="button-pink-center" style={{width: '78px', height: '36px', fontSize: '14px', boxShadow: 'none'}}>Add +</button>
                        <button className="button-pink-border" style={{width: '78px', height: '36px', fontSize: '14px', padding: '4px', boxShadow: 'none'}}>Remove</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="more-bundles-container">
            <div className="container">
                <div className="heading-sec">
                    <h1>More Bundles, Add more anytime</h1>
                    <h2>Choose based on how long you'd like your care to last.</h2>
                </div>

                {loading ? (
                    <div className="bundles-more-section">
                        {[...Array(2)].map((_, index) => (
                            <div key={index} className="bundle-tile-skeleton">
                                <div className="skeleton-tile-image"></div>
                                <div className="skeleton-tile-content">
                                    <div className="skeleton-tile-title"></div>
                                    <div className="skeleton-tile-duration"></div>
                                    <div className="skeleton-tile-items">
                                        <div className="skeleton-tile-item"></div>
                                        <div className="skeleton-tile-item"></div>
                                        <div className="skeleton-tile-item"></div>
                                    </div>
                                    <div className="skeleton-tile-price"></div>
                                    <div className="skeleton-tile-button"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="d-flex justify-content-center align-items-center" style={{minHeight: '200px'}}>
                        <p style={{color: 'red'}}>{error}</p>
                    </div>
                ) : remainingBundles.length > 0 ? (
                    <div className="bundles-more-section bundles-recommended-more-bundles">
                        {remainingBundles.map((bundle, index) => (
                            <BundleTile data={bundle} key={bundle?.node?.id || bundle?.id || index} />
                        ))}
                    </div>
                ) : (
                    <div className="d-flex justify-content-center align-items-center" style={{minHeight: '200px'}}>
                        <p>No additional bundles available.</p>
                    </div>
                )}
            </div>
            
        </div>

        {/* <BoughtTogether />
        <AllBundlesSlider /> */}
        <MomsReviewsSlider />
        <MomsMomentsSlider />
        <FaqSlider />

    </>
  )
}

export default BundlesRecommended