import React, { useState, useRef, useEffect } from 'react'
import './ProductDetails.css'
import { ChevronDown, ChevronRight, Eye, Heart, Minus, Plus } from 'lucide-react'
import { NavLink, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { getProductDetails } from '../../services/productService'
import Star from '../../assets/star.svg'
import WayToPay from '../../assets/ways-to-pay.png'
import BoughtTogether from '../../Components/BoughtTogether/BoughtTogether'
import MomsReviewsSlider from '../../Components/MomsReviewsSlider/MomsReviewsSlider'
import MomsMomentsSlider from '../../Components/MomsMomentsSlider/MomsMomentsSlider'
import pdp1 from '../../assets/products/pdp1.png'
import pdp2 from '../../assets/products/pdp2.png'
import pdp3 from '../../assets/products/pdp3.png'
import pdp4 from '../../assets/products/pdp4.png'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import DefaultImg from '../../assets/default.png'
import 'swiper/css'
import 'swiper/css/navigation'
import AllBundlesSlider from '../../Components/AllBundlesSlider/AllBundlesSlider'

const ProductDetails = () => {
    const { productHandle } = useParams();
    const { getSessionToken } = useAuth();
    const [authToken, setAuthToken] = useState(null);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZooming, setIsZooming] = useState(false);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const contentSectionRef = useRef(null);

    useEffect(() => {
        const fetchAuthToken = async () => {
            // Try context/localStorage first
            let token = getSessionToken();
            if (!token) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/token`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            clientId: import.meta.env.VITE_API_CLIENT_ID,
                            clientSecret: import.meta.env.VITE_API_CLIENT_SECRET
                        })
                    });
                    const data = await response.json();
                    if (data.success && data.token) {
                        token = data.token;
                        setAuthToken(token);
                    }
                } catch (err) {
                    console.error('Error fetching auth token:', err);
                }
            } else {
                setAuthToken(token);
            }
        };
        fetchAuthToken();
    }, [getSessionToken]);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const token = authToken;
            if (!token) {
                setLoading(false);
                return;
            }
            const res = await getProductDetails(productHandle, token);
            if (res.success) {
                setProduct(res.data); // Changed from res.product to res.data (new API structure)
            }
            setLoading(false);
        };
        if (authToken) fetchProduct();
    }, [productHandle, authToken]);

    const productImages = product?.images?.map(img => img.url) || [pdp1, pdp2, pdp3, pdp4]; // Updated to match new API structure

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPosition({ x, y });
    };

    const handleMouseEnter = () => {
        setIsZooming(true);
    };

    const handleMouseLeave = () => {
        setIsZooming(false);
    };

    console.log("sfdlk;gjsd;lfg"+productHandle);
    

    if (loading) {
        return <div className="productDetailsPageContent"><div className="container"><p>Loading product details...</p></div></div>;
    }

    if (!product) {
        return <div className="productDetailsPageContent"><div className="container"><p>Product not found.</p></div></div>;
    }
    

  return (
    <div className='productDetailsPageContent'>
        <div className="container">
            <div className="product-details-main-container">
                <div className="breadcrumbs-section">
                    <NavLink to="/">Home</NavLink>
                    <ChevronRight />
                    <NavLink to="/shop">Shop</NavLink>
                    <ChevronRight />
                    <span>{product.title}</span>
                </div>

                <div className="product-details-content-section" ref={contentSectionRef}>
                    <div className="imgae-slider-container">
                        <Swiper
                            spaceBetween={10}
                            navigation={true}
                            loop={true}
                            modules={[Navigation]}
                            className="main-swiper"
                        >
                            {productImages.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <div 
                                        className="image-zoom-container"
                                        onMouseMove={handleMouseMove}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <img 
                                            src={image} 
                                            alt={`Product ${index + 1}`}
                                            className="main-product-image"
                                            style={{
                                                transform: isZooming ? 'scale(2)' : 'scale(1)',
                                                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                                transition: 'transform 0.1s ease-out'
                                            }}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="details-content-container">
                        <div className="details-header-section">
                            <div className="stock-details-container">
                                <p className="stock-details">In Stock</p>
                                <p className="views-text"><Eye/> 79 People are viewing this right now</p>
                                <button className="share">
                                    Share
                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5279 6.6802C12.6906 6.5407 12.772 6.47096 12.8018 6.38796C12.828 6.31511 12.828 6.23542 12.8018 6.16257C12.772 6.07957 12.6906 6.00983 12.5279 5.87033L6.88075 1.02991C6.60059 0.789782 6.46052 0.669716 6.34192 0.666774C6.23886 0.664218 6.14041 0.709499 6.07527 0.789417C6.00033 0.881375 6.00033 1.06587 6.00033 1.43485V4.29835C4.57721 4.54732 3.27472 5.26844 2.3068 6.35118C1.25154 7.53161 0.667815 9.05923 0.666992 10.6426V11.0506C1.36655 10.2078 2.24 9.52627 3.2275 9.05255C4.09812 8.63488 5.03927 8.38748 6.00033 8.32228V11.1157C6.00033 11.4847 6.00033 11.6692 6.07527 11.7611C6.14041 11.841 6.23886 11.8863 6.34192 11.8838C6.46052 11.8808 6.60059 11.7607 6.88075 11.5206L12.5279 6.6802Z" stroke="#DC5F92" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <button className="wishlist"><Heart /></button>
                            </div>

                            <div className="product name-section">
                                <p className="prd-name">{product.title}</p>
                                <div className='ratings-view'>
                                    <div className="stars">
                                        <img src={Star} alt="" className='star' />
                                        <img src={Star} alt="" className='star' />
                                        <img src={Star} alt="" className='star' />
                                        <img src={Star} alt="" className='star' />
                                        <img src={Star} alt="" className='star' />
                                    </div>
                                    <p className="text-rating"><span>4.9/5</span> <span>Out of 2,698 Reviews</span></p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="details-body-section">
                            <div className="product-short-description">
                                <p>{product.description}</p>
                            </div>

                            {/* <div className="product-price-section">
                                <p className="list-price">$29.99 USD</p>
                                <p className="sale-price">$19.99 USD <span className='offer' >SAVE 55%</span></p>
                            </div> */}

                            {/* Variants rendering (if available) */}
                            {product.variants?.length > 0 && (
                                <div className="product-variations-container">
                                    <p className="var-heading">Choose Variant</p>
                                    <div className="variations-list">
                                        {product.variants.map((variant, idx) => (
                                            <button key={variant.id} className={`variation-item${idx === 0 ? ' active' : ''}`}>{variant.title}</button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="d-flex justify-content-start align-items-center" style={{columnGap: '24px'}}>
                                <div className="product-quantity-section">
                                    <p className="qty-heading">Select Quantity</p>
                                    <div className="item-quantity">
                                        <button><Minus /></button>
                                        <p className="quantity-count">02</p>
                                        <button><Plus /></button>
                                    </div>
                                </div>

                                <div className="product-price-con">
                                    <span className="heading">Price</span>
                                    <span className='strike-price'>{product.variants?.[0]?.compareAtPrice?.amount ? `$${product.variants[0].compareAtPrice.amount} ${product.variants[0].compareAtPrice.currencyCode}` : ''}</span>
                                    <span className="price">{product.variants?.[0]?.price?.amount ? `$${product.variants[0].price.amount} ${product.variants[0].price.currencyCode}` : ''}</span>
                                </div>
                            </div>
                            
                            {/* Example: You can parse product.description for sections, or use metafields if available for accordion content. Keeping static for now. */}
                            <div className="accordion accordion-flush" id="productDetailsAccordian">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                            Description
                                            <Plus />
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#productDetailsAccordian">
                                    <div className="accordion-body">{product.description}</div>
                                    </div>
                                </div>
                                {/* Add more sections as needed, e.g. Usage, Composition, etc. */}
                            </div>
                        </div>
                        
                        <div className="details-footer-section">
                            {/* <div className="mf-features-section">
                                <div className="feature">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0003 18.3333C14.6027 18.3333 18.3337 14.6023 18.3337 9.99996C18.3337 5.39759 14.6027 1.66663 10.0003 1.66663C5.39795 1.66663 1.66699 5.39759 1.66699 9.99996C1.66699 14.6023 5.39795 18.3333 10.0003 18.3333Z" fill="#5ED34B"/>
                                        <path d="M5.9082 10L8.4082 12.5L13.4082 7.5" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span>FREE Shipping</span>
                                </div>

                                <div className="feature">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0003 18.3333C14.6027 18.3333 18.3337 14.6023 18.3337 9.99996C18.3337 5.39759 14.6027 1.66663 10.0003 1.66663C5.39795 1.66663 1.66699 5.39759 1.66699 9.99996C1.66699 14.6023 5.39795 18.3333 10.0003 18.3333Z" fill="#5ED34B"/>
                                        <path d="M5.9082 10L8.4082 12.5L13.4082 7.5" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span>Hassle FREE Returns</span>
                                </div>

                                <div className="feature">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0003 18.3333C14.6027 18.3333 18.3337 14.6023 18.3337 9.99996C18.3337 5.39759 14.6027 1.66663 10.0003 1.66663C5.39795 1.66663 1.66699 5.39759 1.66699 9.99996C1.66699 14.6023 5.39795 18.3333 10.0003 18.3333Z" fill="#5ED34B"/>
                                        <path d="M5.9082 10L8.4082 12.5L13.4082 7.5" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span>Secure Payments</span>
                                </div>
                            </div> */}

                            <div className="add-to-cart-func-container">
                                <button className="button-pink-center add-to-cart">Add to cart</button>
                                <button className='button-pink-border buy-now-btn'>Buy Now | $19.99 USD <span className='offer' >SAVE 55%</span></button>
                            </div>

                            {/* <div className="ways-to-pay">
                                <p className="way-heading">Ways to pay</p>
                                <img src={WayToPay} alt="" />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <BoughtTogether />

        <div className="container">
            <div className="product-all-images-container">
                {productImages.slice(0, 10).map((image, index) => (
                    <div key={index} className={`grid-image-item item-${index + 1}`}>
                        <img src={image} alt={`Product view ${index + 1}`} onError={DefaultImg} />
                    </div>
                ))}
            </div>
        </div>
        
        <AllBundlesSlider />
        <MomsReviewsSlider />
        <MomsMomentsSlider />
    </div>
    
  )
}

export default ProductDetails
