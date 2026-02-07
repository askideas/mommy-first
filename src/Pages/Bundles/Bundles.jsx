import React, { useEffect, useState } from 'react'
import './Bundles.css'
import BG from '../../assets/BundlesHome/bg-image.png'
import Badge from '../../assets/BundlesHome/badge.png'
import WebExc from '../../assets/BundlesHome/web-exc.png'
import Calendar from '../../assets/BundlesHome/calendar.svg'
import Shield from '../../assets/BundlesHome/shield-tick.svg'
import Certificate from '../../assets/BundlesHome/certificate.svg'
import Heart from '../../assets/BundlesHome/heart-rounded.svg'
import Family from '../../assets/BundlesHome/family.svg'
import Baby from '../../assets/BundlesHome/baby.svg'
import Pregnant from '../../assets/BundlesHome/pregnant.svg'
import BoughtTogether from '../../Components/BoughtTogether/BoughtTogether'
import AllBundlesSlider from '../../Components/AllBundlesSlider/AllBundlesSlider'
import MomsReviewsSlider from '../../Components/MomsReviewsSlider/MomsReviewsSlider'
import MomsMomentsSlider from '../../Components/MomsMomentsSlider/MomsMomentsSlider'
import FaqSlider from '../../Components/FaqSlider/FaqSlider'
import BundlesRecommendedModal from '../../Components/BundlesRecommendedModal/BundlesRecommendedModal'
import BundleTile from '../../Components/BundleTile/BundleTile'

import Pads from '../../assets/BundlesHome/pad.svg'
import Coolingpad from '../../assets/BundlesHome/coolingpad.svg'
import Soft from '../../assets/BundlesHome/soft.svg'
import PeriBottle from '../../assets/BundlesHome/peribottle.svg'
import Underwear from '../../assets/BundlesHome/underwear.svg'

const Bundles = () => {
    const [bundlesData, setBundlesData] = useState([])
    const [authToken, setAuthToken] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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
                console.log(bundlesData);
                
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

    console.log(bundlesData);
  

  return (
    <>
        <div className="bundles-page">
            <div className="container">
                {/* Heading Section */}
                {/* <div className="bundles-heading-section">
                <h1 className="bundles-main-title">Your Recovery, Simplified</h1>
                <p className="bundles-subtitle">
                    Curated bundles designed to take the guesswork out of<br />
                    postpartum care — premium, practical, and priced to save
                </p>
                </div> */}

                {/* Hero Banner Section */}
                <div className="bundles-hero-container">
                <img src={BG} alt="" className='bg-image' />
                <img src={WebExc} alt="Website Exclusive" className='website-exclusive' />
                <div className="badge-con">
                    <img src={Badge} alt="" />
                    <span className="badge-text">3 Bundles</span>
                </div>
                <div className="hero-content-section">
                    <p className="hero-sec-label-txt">Premium postpartum recovery bundles 2-21 days</p>
                    <h2 className="hero-main-text">
                        Everything you actually use<br />
                        organised for the first <span>2–21 days</span>
                    </h2>
                    <p className="hero-sub-text">
                    Pads, cooling relief, witch hazel soothing, soft supportive underwear, and a peri <br /> bottle for gentle cleansing—bundled so you can come home ready.
                    </p>
                </div>
                </div>

                {/* Stats/Features Section */}
                <div className="bundles-stats-container">
                    <div className="bundle-stat-item">
                        <img src={Calendar} alt="Calendar" />
                        <div className="stat-text-container">
                        <h3 className="stat-heading">2–21</h3>
                        <p className="stat-subheading">days of care</p>
                        </div>
                    </div>

                    <div className="bundle-stat-item">
                        <img src={Shield} alt="Shield" />
                        <div className="stat-text-container">
                        <p className="stat-subheading">One less thing</p>
                        <p className="stat-subheading">to worry about</p>
                        </div>
                    </div>

                    <div className="bundle-stat-item">
                        <img src={Certificate} alt="Certificate" />
                        <div className="stat-text-container">
                        <h3 className="stat-heading">OB/GYN</h3>
                        <p className="stat-subheading">Approved Essentials</p>
                        </div>
                    </div>

                    <div className="bundle-stat-item">
                        <img src={Heart} alt="Heart" />
                        <div className="stat-text-container">
                        <h3 className="stat-heading">10,000+</h3>
                        <p className="stat-subheading">Trusted MOMS</p>
                        </div>
                    </div>
                </div>

                {/* Description Text */}
                <p className="bundles-description-text">
                Postpartum bleeding can last up to 6 weeks. Soreness often lingers 2–3 weeks.<br />
                Our systems remove the guesswork with 2–21 days of care in one box.
                </p>
                
                <div className="d-flex justify-content-center align-items-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 26L24 36L34 26M14 12L24 22L34 12" stroke="#D87AA1" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                
                {/* CTA Button */}
                {/* <div className="bundles-cta-container">
                    <button className="button-pink-center" data-bs-toggle="offcanvas" data-bs-target="#bundlesuggestionsmodal" style={{width: 'fit-content'}}>
                        Not sure which bundle?
                    </button>
                </div> */}
            </div>
        </div>

        <div className="container">
            <div className="why-bundles-section-con">
                <h1 className="heading">Why bundles (vs. piecing it together)?</h1>
                <div className="why-bundles-cards-section">
                    <div className="card-item">
                        <img src={Pregnant} alt="" />
                        <h1>Prepared <br /> before birth</h1>
                        <p>Pack what you need for the <br /> hospital bag, keep the rest <br /> waiting at home.</p>
                    </div>

                    <div className="card-item">
                        <img src={Baby} alt="" />
                        <h1>Designed by real <br /> postpartum needs</h1>
                        <p>Soothing, cooling, and <br /> support—together.</p>
                    </div>

                    <div className="card-item">
                        <img src={Family} alt="" />
                        <h1>Less stress on <br /> partners</h1>
                        <p>Everything is already waiting <br /> at home.</p>
                    </div>
                </div>
                <p className="description">You’ll need comfort + soothing + gentle cleansing—not just “pads.” <br /> This system keeps everything consistent and ready.</p>
                <div className="d-flex justify-content-center align-items-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 26L24 36L34 26M14 12L24 22L34 12" stroke="#D87AA1" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>

        <div className="bundles-list-container-section">
            <div className="container">
                <h1 className="head-ing-sec">Now, select a bundle that fits <br /> your recovery timeline.</h1>
                
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
                        <p style={{color: 'red'}}>{error}</p>
                    </div>
                ) : (
                    <div className="list-of-bundles">
                        {
                            bundlesData.map((bundle, index) => {
                                return (
                                    <BundleTile data={bundle} key={bundle.id || index} />
                                )
                            })
                        }
                    </div>
                )}

                <div className="need-help-section">
                    <h1>Need help choosing a bundle?</h1>
                    <p>Answer two quick questions and we’ll match you with the bundle that fits your <br /> stage of recovery and how many days of care you want covered.</p>
                    <button className='button-pink-center' data-bs-toggle="offcanvas" data-bs-target="#bundlesuggestionsmodal">Find My Bundle</button>
                </div>

                <div className="d-flex justify-content-center align-items-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 26L24 36L34 26M14 12L24 22L34 12" stroke="#D87AA1" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>

        <div className="container">
            <div className="whats-inside-section-container">
                <h1 className="heading-sec">What’s inside every Mommy <br /> First recovery bundle</h1>
                <p className="desc-tion">The essentials most moms reach for repeatedly especially during the first days at home.</p>
                <div className="whats-inside-list">
                    <div className="whats-inside-item">
                        <img src={Pads} alt="" />
                        <h1>Postpartum Pads</h1>
                        <p>Reliable coverage for postpartum bleeding - so you can rest, not worry.</p>
                    </div>

                    <div className="whats-inside-item">
                        <img src={Coolingpad} alt="" />
                        <h1>Cooling Pads</h1>
                        <p>Cooling relief to help reduce discomfort and support those tender first days.</p>
                    </div>

                    <div className="whats-inside-item">
                        <img src={Soft} alt="" />
                        <h1>Witch Hazel Liners + Foam</h1>
                        <p>Soothing, cooling comfort to help reduce itch and burn during recovery.</p>
                    </div>

                    <div className="whats-inside-item">
                        <img src={PeriBottle} alt="" />
                        <h1>Peri Bottle + Travel Bag</h1>
                        <p>Gentle cleansing after the bathroom - one of the most-used postpartum tools.</p>
                    </div>

                    <div className="whats-inside-item">
                        <img src={Underwear} alt="" />
                        <h1>Soft Underwear</h1>
                        <p>Gentle, supportive underwear that helps keep everything comfortably in place.</p>
                    </div>
                </div>
            </div>
        </div>

        <BundlesRecommendedModal />
        {/* <BoughtTogether />
        <AllBundlesSlider /> */}
        <MomsReviewsSlider />
        <MomsMomentsSlider />
        <FaqSlider />
    </>
    
  )
}

export default Bundles