import React, { useState, useRef, useEffect, useMemo } from 'react'
import './ProductDetails.css'
import { ChevronDown, ChevronRight, Eye, Heart, Minus, Plus, Loader2 } from 'lucide-react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'
import { getProductDetails } from '../../services/productService'
import { addToWishlist, removeFromWishlist } from '../../services/userService'
import ProductsLoader from '../../Components/ProductsLoader/ProductsLoader'
import ProductDetailsSkeleton from './ProductDetailsSkeleton'
import { toast } from 'react-toastify'
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
import ErrorComponent from '../../Components/ErrorComponent/ErrorComponent'
import SomeWentWrong from '../../assets/something-went-wrong.svg'
import { Offcanvas } from 'bootstrap'

// Helper to convert Shopify rich text JSON to HTML
const parseShopifyRichText = (richText) => {
    if (!richText) return '';
    
    let data = richText;
    if (typeof richText === 'string') {
        try {
            data = JSON.parse(richText);
        } catch (e) {
            return richText; // Return as-is if not valid JSON
        }
    }
    
    const renderNode = (node) => {
        if (!node) return '';
        
        if (node.type === 'text') {
            let text = node.value || '';
            if (node.bold) text = `<strong>${text}</strong>`;
            if (node.italic) text = `<em>${text}</em>`;
            if (node.underline) text = `<u>${text}</u>`;
            return text;
        }
        
        const children = node.children?.map(renderNode).join('') || '';
        
        switch (node.type) {
            case 'root':
                return children;
            case 'paragraph':
                return `<p>${children}</p>`;
            case 'heading':
                const level = node.level || 1;
                return `<h${level}>${children}</h${level}>`;
            case 'list':
                const tag = node.listType === 'ordered' ? 'ol' : 'ul';
                return `<${tag}>${children}</${tag}>`;
            case 'list-item':
                return `<li>${children}</li>`;
            case 'link':
                return `<a href="${node.url || '#'}" target="${node.target || '_self'}">${children}</a>`;
            default:
                return children;
        }
    };
    
    return renderNode(data);
};

const ProductDetails = () => {
    const { productHandle } = useParams();
    const navigate = useNavigate();
    const { user, customer, addToWishlistHandles, removeFromWishlistHandles, wishlistHandles, isAuthenticated } = useAuth();
    const { addToCart, showCartNotification } = useCart();
    const [authToken, setAuthToken] = useState(null);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZooming, setIsZooming] = useState(false);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const contentSectionRef = useRef(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [isWishlisting, setIsWishlisting] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (id) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    useEffect(() => {
        const fetchAuthToken = async () => {
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
                    setAuthToken(data.token);
                } else {
                    console.error('Failed to get auth token:', data.message);
                }
            } catch (err) {
                console.error('Error fetching auth token:', err);
            }
        };
        fetchAuthToken();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const token = authToken;
            if (!token) {
                console.log('No auth token available');
                setLoading(false);
                return;
            }
            const res = await getProductDetails(productHandle, token);
            console.log('Product fetch response:', res);
            if (res.success) {
                setProduct(res.data);
                // Set first variant as default
                if (res.data?.variants?.length > 0) {
                    setSelectedVariant(res.data.variants[0]);
                }
            } else {
                console.error('Failed to fetch product:', res.message);
            }
            setLoading(false);
        };
        if (authToken) fetchProduct();
    }, [productHandle, authToken]);

    // Check if product is in wishlist
    useEffect(() => {
        if (customer && product?.handle) {
            const wishlistItems = wishlistHandles;
            setIsInWishlist(wishlistItems.includes(product.handle));
        } else {
            setIsInWishlist(false);
        }
    }, [customer, product, wishlistHandles]);

    const productImages = product?.images?.map(img => img.url) || [pdp1, pdp2, pdp3, pdp4];
    const boughtInPast = product?.metafields?.find(m => m.key === 'bought_in_past');
    const boughtTogetherMetafield = product?.metafields?.find(m => m.key === 'bought_together');
    const boughtTogetherData = useMemo(() => {
        if (!boughtTogetherMetafield?.productDetails) return null;
        const boughtTogetherProduct = boughtTogetherMetafield.productDetails;
        return {
            currentProduct: {
                id: product?.id,
                variantId: selectedVariant?.id,
                title: product?.title,
                image: product?.images?.[0]?.url,
                price: selectedVariant?.price
            },
            boughtTogetherProduct: {
                ...boughtTogetherProduct,
                variantId: boughtTogetherProduct.variantId
            }
        };
    }, [product, selectedVariant, boughtTogetherMetafield]);
    const shortDescriptionMetafield = product?.metafields?.find(m => m.key === 'short_description');
    const shortDescriptionHtml = parseShopifyRichText(shortDescriptionMetafield?.value) || null;
    const usageDescription = parseShopifyRichText(product?.metafields?.find(m => m.key === 'usage')?.value) || null;
    const compositionDescription = parseShopifyRichText(product?.metafields?.find(m => m.key === 'composition')?.value) || null;
    const careUseInfo = parseShopifyRichText(product?.metafields?.find(m => m.key === 'care_use_information')?.value) || null;
    const viewCount = useMemo(() => {
        const minViewCount = parseInt(product?.metafields?.find(m => m.key === 'minimum_view_count')?.value) || 800;
        const maxViewCount = parseInt(product?.metafields?.find(m => m.key === 'maximum_view_count')?.value) || 1200;
        return Math.floor(Math.random() * (maxViewCount - minViewCount + 1)) + minViewCount;
    }, [product?.id]);

    const handleVariantSelect = (variant) => {
        setSelectedVariant(variant);
        setQuantity(1); // Reset quantity when variant changes
    };

    const handleQuantityIncrease = () => {
        // Allow increase up to a reasonable limit since API doesn't provide quantityAvailable
        const maxQuantity = 99;
        if (quantity < maxQuantity) {
            setQuantity(quantity + 1);
        } else {
            toast.error('Max quantity reached', {
                autoClose: 1500,
                hideProgressBar: true
            });
        }
    };

    const handleQuantityDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = async () => {
        if (isAdding) return false;
        
        if (!selectedVariant) {
            toast.error('Please select a variant', {
                autoClose: 1500,
                hideProgressBar: true
            });
            return false;
        }
        
        if (!selectedVariant.availableForSale) {
            toast.error('This variant is out of stock', {
                autoClose: 1500,
                hideProgressBar: true
            });
            return false;
        }
        
        setIsAdding(true);
        
        try {
            const items = [{
                variantId: selectedVariant.id,
                quantity: quantity
            }];

            console.log('Adding to cart:', items);
            const response = await addToCart(items);
            console.log('Add to cart response:', response);

            if (response.success) {
                showCartNotification(product?.title || 'Product', product?.images?.[0]?.url);
                return true;
            } else {
                toast.error(response.message || 'Failed to add to cart', {
                    autoClose: 1500,
                    hideProgressBar: true
                });
                return false;
            }
        } catch (err) {
            console.error('Add to cart error:', err);
            toast.error('Something went wrong', {
                autoClose: 1500,
                hideProgressBar: true
            });
            return false;
        } finally {
            setIsAdding(false);
        }
    };

    const handleBuyNow = async () => {
        const added = await handleAddToCart();
        if (added) {
            // Small delay to ensure toast is visible before navigation
            setTimeout(() => {
                navigate('/cart');
            }, 500);
        }
    };

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

    const productUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleShare = () => {
        setShowShareModal(true);
        setCopied(false);
    };

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(productUrl);
            setCopied(true);
            toast.success('Link copied to clipboard!', {
                autoClose: 1500,
                hideProgressBar: true
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy link', {
                autoClose: 1500,
                hideProgressBar: true
            });
        }
    };

    const handleWhatsAppShare = () => {
        const text = `Check out *${product?.title}* on Mommy First!\n\n`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text + productUrl)}`, '_blank');
    };

    const handleInstagramShare = () => {
        // Instagram doesn't have direct URL sharing, copy link instead
        handleCopyUrl();
        toast.info('Link copied! You can paste it on Instagram', {
            autoClose: 2000,
            hideProgressBar: true
        });
    };

    const handleGmailShare = () => {
        const subject = `Check out ${product?.title} on Mommy First!`;
        const body = `I found this amazing product and thought you might like it:\n\n${product?.title}\n\n${productUrl}`;
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    };

    const handleWishlist = async () => {
        // Check if user is logged in
        if (!user || !customer) {
            // Open login modal using Bootstrap Offcanvas API
            const modalElement = document.getElementById('AuthenticationModal');
            if (modalElement) {
                const offcanvas = Offcanvas.getOrCreateInstance(modalElement);
                offcanvas.show();
            }
            return;
        }

        if (isWishlisting) return;

        setIsWishlisting(true);

        try {
            const userId = customer.id;
            const handle = product.handle;

            let response;
            if (isInWishlist) {
                // Remove from wishlist
                response = await removeFromWishlist(userId, handle);
            } else {
                // Add to wishlist
                response = await addToWishlist(userId, handle);
            }

            if (response.success) {
                setIsInWishlist(!isInWishlist);
                
                // Update wishlist handles in AuthContext
                if (isInWishlist) {
                    removeFromWishlistHandles(handle);
                } else {
                    addToWishlistHandles(handle);
                }
                
                toast.success(!isInWishlist ? 'Added to wishlist!' : 'Removed from wishlist', {
                    autoClose: 1500,
                    hideProgressBar: true
                });
            } else {
                console.error('Wishlist error:', response.message);
                toast.error(response.message || 'Failed to update wishlist', {
                    autoClose: 1500,
                    hideProgressBar: true
                });
            }
        } catch (err) {
            console.error('Wishlist error:', err);
            toast.error('Something went wrong', {
                autoClose: 1500,
                hideProgressBar: true
            });
        } finally {
            setIsWishlisting(false);
        }
    };

    if (loading) {
        return (
            <div className="productDetailsPageContent">
                <div className="container">
                    <ProductDetailsSkeleton />
                </div>
            </div>
        );
    }

    if (!product) {
        return <div className="productDetailsPageContent">
                <div className="container">
                    <ErrorComponent data={
                        {
                            "title": "We can’t find the product",
                            "subtitle": "The link may be broken, or the page may have been moved.",
                            "image": SomeWentWrong,
                            "buttons": [
                                {
                                    label: "Go to HOME",
                                    className: "button-pink-center",
                                    link:'/'
                                },
                                {
                                    label: "SHOP",
                                    className: "button-pink-border",
                                    link:'/shop'
                                },
                                {
                                    label: "Contact Support",
                                    className: "button-pink-border",
                                    link:'/contact'
                                },
                            ]
                        }
                    } />
                </div>
            </div>;
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
                                <p className={`stock-details ${selectedVariant && !selectedVariant.availableForSale ? 'out-of-stock' : ''}`}>
                                    {selectedVariant && !selectedVariant.availableForSale ? 'Out of Stock' : 'In Stock'}
                                </p>
                                <p className="views-text"><Eye/> {viewCount} People are viewing this right now</p>
                                <button className="share" onClick={handleShare}>
                                    Share
                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5279 6.6802C12.6906 6.5407 12.772 6.47096 12.8018 6.38796C12.828 6.31511 12.828 6.23542 12.8018 6.16257C12.772 6.07957 12.6906 6.00983 12.5279 5.87033L6.88075 1.02991C6.60059 0.789782 6.46052 0.669716 6.34192 0.666774C6.23886 0.664218 6.14041 0.709499 6.07527 0.789417C6.00033 0.881375 6.00033 1.06587 6.00033 1.43485V4.29835C4.57721 4.54732 3.27472 5.26844 2.3068 6.35118C1.25154 7.53161 0.667815 9.05923 0.666992 10.6426V11.0506C1.36655 10.2078 2.24 9.52627 3.2275 9.05255C4.09812 8.63488 5.03927 8.38748 6.00033 8.32228V11.1157C6.00033 11.4847 6.00033 11.6692 6.07527 11.7611C6.14041 11.841 6.23886 11.8863 6.34192 11.8838C6.46052 11.8808 6.60059 11.7607 6.88075 11.5206L12.5279 6.6802Z" stroke="#DC5F92" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                {isWishlisting ? (
                                    <button className="wishlist" disabled>
                                        <Loader2 className="spinner" size={20} style={{ animation: 'spin 1s linear infinite' }} />
                                    </button>
                                ) : (
                                    <button 
                                        className={`wishlist ${isInWishlist ? 'active' : ''}`}
                                        onClick={handleWishlist}
                                    >
                                        <Heart fill={isInWishlist ? 'currentColor' : 'none'} />
                                    </button>
                                )}
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
                            {shortDescriptionHtml && <div className="product-short-description">
                                <div dangerouslySetInnerHTML={{ __html: shortDescriptionHtml }} />
                            </div>}

                            <p className="stock-left-and-bough-in-past">
                                {selectedVariant?.availableForSale && 
                                 selectedVariant?.availableQuantity >= 1 && 
                                 selectedVariant?.availableQuantity <= 10 && (
                                    <span className="stockleft">Only {selectedVariant.availableQuantity} left</span>
                                )}
                                {boughtInPast?.value && (
                                    <span className="bought-in-past">{boughtInPast.value} bought in past month</span>
                                )}
                            </p>

                            {/* Variants rendering */}
                            {product.variants?.length > 0 && (
                                <div className="product-variations-container">
                                    <p className="var-heading">Choose Variant</p>
                                    <div className="variations-list">
                                        {product.variants.map((variant) => (
                                            <button 
                                                key={variant.id} 
                                                className={`variation-item${selectedVariant?.id === variant.id ? ' active' : ''}${!variant.availableForSale ? ' out-of-stock' : ''}`}
                                                onClick={() => handleVariantSelect(variant)}
                                            >
                                                {variant.title}
                                                {!variant.availableForSale && <span className="oos-label">Out of Stock</span>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="d-flex justify-content-start align-items-center" style={{columnGap: '24px'}}>
                                <div className="product-quantity-section">
                                    <p className="qty-heading">Select Quantity</p>
                                    <div className="item-quantity">
                                        <button onClick={handleQuantityDecrease} disabled={quantity <= 1}><Minus /></button>
                                        <p className="quantity-count">{String(quantity).padStart(2, '0')}</p>
                                        <button onClick={handleQuantityIncrease}><Plus /></button>
                                    </div>
                                </div>

                                <div className="product-price-con">
                                    <span className="heading">Price</span>
                                    <span className='strike-price'>
                                        {selectedVariant?.compareAtPrice?.amount ? `$${selectedVariant.compareAtPrice.amount} ${selectedVariant.compareAtPrice.currencyCode}` : ''}
                                    </span>
                                    <span className="price">
                                        {selectedVariant?.price?.amount ? `$${selectedVariant.price.amount} ${selectedVariant.price.currencyCode}` : ''}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Example: You can parse product.description for sections, or use metafields if available for accordion content. Keeping static for now. */}
                            <div className="accordion accordion-flush" id="productDetailsAccordian">
                                {product.descriptionHtml && <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button 
                                            className={`accordion-button ${openAccordion !== 'description' ? 'collapsed' : ''}`} 
                                            type="button" 
                                            onClick={() => toggleAccordion('description')}
                                            aria-expanded={openAccordion === 'description'}
                                            aria-controls="flush-collapseOne"
                                        >
                                            Description
                                            {openAccordion === 'description' ? <Minus /> : <Plus />}
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className={`accordion-collapse collapse ${openAccordion === 'description' ? 'show' : ''}`}>
                                        <div className="accordion-body" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></div>
                                    </div>
                                </div>}

                                {usageDescription && <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button 
                                            className={`accordion-button ${openAccordion !== 'usage' ? 'collapsed' : ''}`} 
                                            type="button" 
                                            onClick={() => toggleAccordion('usage')}
                                            aria-expanded={openAccordion === 'usage'}
                                            aria-controls="flush-collapseTwo"
                                        >
                                            Usage
                                            {openAccordion === 'usage' ? <Minus /> : <Plus />}
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" className={`accordion-collapse collapse ${openAccordion === 'usage' ? 'show' : ''}`}>
                                        <div className="accordion-body" dangerouslySetInnerHTML={{ __html: usageDescription }}></div>
                                    </div>
                                </div>}

                                {compositionDescription && <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button 
                                            className={`accordion-button ${openAccordion !== 'composition' ? 'collapsed' : ''}`} 
                                            type="button" 
                                            onClick={() => toggleAccordion('composition')}
                                            aria-expanded={openAccordion === 'composition'}
                                            aria-controls="flush-collapseThree"
                                        >
                                            Composition
                                            {openAccordion === 'composition' ? <Minus /> : <Plus />}
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" className={`accordion-collapse collapse ${openAccordion === 'composition' ? 'show' : ''}`}>
                                        <div className="accordion-body" dangerouslySetInnerHTML={{ __html: compositionDescription }}></div>
                                    </div>
                                </div>}

                                {careUseInfo && <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button 
                                            className={`accordion-button ${openAccordion !== 'careUse' ? 'collapsed' : ''}`} 
                                            type="button" 
                                            onClick={() => toggleAccordion('careUse')}
                                            aria-expanded={openAccordion === 'careUse'}
                                            aria-controls="flush-collapseFour"
                                        >
                                            Care & Use Information
                                            {openAccordion === 'careUse' ? <Minus /> : <Plus />}
                                        </button>
                                    </h2>
                                    <div id="flush-collapseFour" className={`accordion-collapse collapse ${openAccordion === 'careUse' ? 'show' : ''}`}>
                                        <div className="accordion-body" dangerouslySetInnerHTML={{ __html: careUseInfo }}></div>
                                    </div>
                                </div>}
                                
                            </div>
                        </div>
                        
                        <div className="details-footer-section">
                            <div className="add-to-cart-func-container">
                                <button 
                                    className={`button-pink-center add-to-cart ${selectedVariant && !selectedVariant.availableForSale ? 'disabled' : ''}`}
                                    onClick={handleAddToCart}
                                    disabled={isAdding || (selectedVariant && !selectedVariant.availableForSale)}
                                >
                                    {isAdding ? (
                                        <>
                                            <Loader2 className="spinner" style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} />
                                            Adding...
                                        </>
                                    ) : selectedVariant && !selectedVariant.availableForSale ? (
                                        'Out of Stock'
                                    ) : (
                                        'Add to cart'
                                    )}
                                </button>
                                <button 
                                    className={`button-pink-border buy-now-btn ${selectedVariant && !selectedVariant.availableForSale ? 'd-none' : ''}`}
                                    onClick={handleBuyNow} 
                                    disabled={isAdding || (selectedVariant && !selectedVariant.availableForSale)}
                                >
                                    {isAdding ? (
                                        <>
                                            <Loader2 className="spinner" style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} />
                                            Processing...
                                        </>
                                    ) : selectedVariant && !selectedVariant.availableForSale ? (
                                        'Out of Stock'
                                    ) : (
                                        <>
                                            Buy Now | {selectedVariant?.price?.amount ? `$${selectedVariant.price.amount} ${selectedVariant.price.currencyCode}` : '$0.00'}
                                            {selectedVariant?.compareAtPrice?.amount && (
                                                <span className='offer'>SAVE {Math.round(((selectedVariant.compareAtPrice.amount - selectedVariant.price.amount) / selectedVariant.compareAtPrice.amount) * 100)}%</span>
                                            )}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {boughtTogetherData && <BoughtTogether data={boughtTogetherData} />}

        <div className="container">
            <div className="product-all-images-container">
                {productImages.slice(0, 10).map((image, index) => (
                    <div key={index} className={`grid-image-item item-${index + 1}`}>
                        <img src={image} alt={`Product view ${index + 1}`} onError={DefaultImg} />
                    </div>
                ))}
            </div>
        </div>
        
        {/* <AllBundlesSlider /> */}
        <MomsReviewsSlider />
        <MomsMomentsSlider />

        {/* Share Modal */}
        {showShareModal && (
            <div className="share-modal-overlay" onClick={() => setShowShareModal(false)}>
                <div className="share-modal" onClick={(e) => e.stopPropagation()}>
                    <button className="share-modal-close" onClick={() => setShowShareModal(false)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <h3 className="share-modal-title">Share this product</h3>
                    
                    <div className="share-url-container">
                        <input 
                            type="text" 
                            value={productUrl} 
                            readOnly 
                            className="share-url-input"
                        />
                        <button className="share-copy-btn" onClick={handleCopyUrl}>
                            {copied ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                            )}
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>

                    <div className="share-social-container">
                        <p className="share-social-label">Share via</p>
                        <div className="share-social-icons">
                            <button className="share-social-btn whatsapp" onClick={handleWhatsAppShare} title="Share on WhatsApp">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                            </button>
                            <button className="share-social-btn instagram" onClick={handleInstagramShare} title="Share on Instagram">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </button>
                            <button className="share-social-btn gmail" onClick={handleGmailShare} title="Share via Gmail">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
    
  )
}

export default ProductDetails
