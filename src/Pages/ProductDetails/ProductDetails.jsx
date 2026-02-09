import React, { useState, useRef, useEffect } from 'react'
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
    const { addToCart } = useCart();
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
    const shortDescriptionMetafield = product?.metafields?.find(m => m.key === 'short_description');
    const shortDescriptionHtml = parseShopifyRichText(shortDescriptionMetafield?.value) || null;
    const usageDescription = parseShopifyRichText(product?.metafields?.find(m => m.key === 'usage')?.value) || null;
    const compositionDescription = parseShopifyRichText(product?.metafields?.find(m => m.key === 'composition')?.value) || null;
    const careUseInfo = parseShopifyRichText(product?.metafields?.find(m => m.key === 'care_use_information')?.value) || null;

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
                toast.success('Added to cart successfully!', {
                    autoClose: 1500,
                    hideProgressBar: true
                });
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

    const handleWishlist = async () => {
        // Check if user is logged in
        if (!user || !customer) {
            // Open login modal
            const loginButton = document.querySelector('[data-bs-target="#AuthenticationModal"]');
            if (loginButton) {
                loginButton.click();
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
                                <p className="views-text"><Eye/> 79 People are viewing this right now</p>
                                <button className="share">
                                    Share
                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5279 6.6802C12.6906 6.5407 12.772 6.47096 12.8018 6.38796C12.828 6.31511 12.828 6.23542 12.8018 6.16257C12.772 6.07957 12.6906 6.00983 12.5279 5.87033L6.88075 1.02991C6.60059 0.789782 6.46052 0.669716 6.34192 0.666774C6.23886 0.664218 6.14041 0.709499 6.07527 0.789417C6.00033 0.881375 6.00033 1.06587 6.00033 1.43485V4.29835C4.57721 4.54732 3.27472 5.26844 2.3068 6.35118C1.25154 7.53161 0.667815 9.05923 0.666992 10.6426V11.0506C1.36655 10.2078 2.24 9.52627 3.2275 9.05255C4.09812 8.63488 5.03927 8.38748 6.00033 8.32228V11.1157C6.00033 11.4847 6.00033 11.6692 6.07527 11.7611C6.14041 11.841 6.23886 11.8863 6.34192 11.8838C6.46052 11.8808 6.60059 11.7607 6.88075 11.5206L12.5279 6.6802Z" stroke="#DC5F92" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
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
                                        data-bs-toggle={isAuthenticated ? undefined : "offcanvas"}
                                        data-bs-target={isAuthenticated ? undefined : "#AuthenticationModal"}
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
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                            Description
                                            <Plus />
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#productDetailsAccordian">
                                        <div className="accordion-body" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></div>
                                    </div>
                                </div>}

                                {usageDescription && <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                            Usage
                                            <Plus />
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#productDetailsAccordian">
                                        <div className="accordion-body" dangerouslySetInnerHTML={{ __html: usageDescription }}></div>
                                    </div>
                                </div>}

                                {compositionDescription && <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                            Composition
                                            <Plus />
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#productDetailsAccordian">
                                        <div className="accordion-body" dangerouslySetInnerHTML={{ __html: compositionDescription }}></div>
                                    </div>
                                </div>}

                                {careUseInfo && <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                            Care & Use Information
                                            <Plus />
                                        </button>
                                    </h2>
                                    <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#productDetailsAccordian">
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
                                    className={`button-pink-border buy-now-btn ${selectedVariant && !selectedVariant.availableForSale ? 'disabled' : ''}`}
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

                            {/* <div className="ways-to-pay">
                                <p className="way-heading">Ways to pay</p>
                                <img src={WayToPay} alt="" />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <BoughtTogether /> */}

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
