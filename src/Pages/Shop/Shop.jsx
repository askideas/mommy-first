import React, { useState, useEffect } from 'react'
import './Shop.css'
import HeroImageLabel from '../../Components/HeroImageLabel/HeroImageLabel'
import HeroImage from '../../assets/hero-label.png'
import { Settings2 } from 'lucide-react'
import ProductTile from '../../Components/ProductTile/ProductTile'
import MomsReviewsSlider from '../../Components/MomsReviewsSlider/MomsReviewsSlider'
import MomsMomentsSlider from '../../Components/MomsMomentsSlider/MomsMomentsSlider'
import FaqSlider from '../../Components/FaqSlider/FaqSlider'
import EsImage1 from '../../assets/Hero/slider-img.png'
import EsImage2 from '../../assets/Hero/hero1.png'
import EsImage3 from '../../assets/Hero/hero2.png'
import MF1 from '../../assets/MF1.png'
import MF2 from '../../assets/MF2.png'

const Shop = () => {
    const PRODUCTS_PER_PAGE = 16;
    
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [authToken, setAuthToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [totalProducts, setTotalProducts] = useState(0);
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [selectedCollection, setSelectedCollection] = useState(null);

    const espotsIndex = [3, 5, 14];
    
    // Espot images data - you can replace these URLs with your actual espot images
    const espotImages = [ MF1, MF2, EsImage1 ]

    // Quick filter buttons configuration
    const quickFilters = [
        { id: 'ALL', label: 'ALL', collectionId: null },
        { id: 'MATERNITY', label: 'MATERNITY 🤰', collectionId: 'maternity-care' },
        { id: 'POSTPARTUM', label: 'Postpartum 🤱', collectionId: 'postpartum-care' },
        { id: 'WELLNESS', label: 'Wellness & Comfort 🌿', collectionId: 'wellness-comfort' }
    ];

    const filters = [
        {
            id: 'stage',
            label: 'Stage',
            filters: [
            { id: 'new_moms', label: 'New Moms' },
            { id: 'experienced_moms', label: 'Experienced Moms' },
            { id: 'working_moms', label: 'Working Moms' },
            { id: 'travel_friendly', label: 'Travel friendly' },
            { id: 'pregnancy', label: 'Pregnancy' }
            ]
        },
        {
            id: 'price_range',
            label: 'Price range',
            filters: [
            { id: 'low_to_high', label: 'Low to High' },
            { id: 'high_to_low', label: 'High to Low' }
            ]
        },
        {
            id: 'sort_by',
            label: 'Sort by',
            filters: [
            { id: 'best_sellers', label: 'Best Sellers' },
            { id: 'new_arrivals', label: 'New Arrivals' },
            { id: 'customer_rating', label: 'Customer Rating' }
            ]
        },
        {
            id: 'availability',
            label: 'Availability',
            filters: [
            { id: 'in_stock', label: 'In Stock' },
            { id: 'out_of_stock', label: 'Out of Stock' }
            ]
        }
    ];

    const HeroLabel = {
        image: HeroImage,
        text: 'Designed to Maximize Comfort for Expecting Moms',
        height: 280,
        pwidth: 487
    };

    // Function to fetch authentication token
    const fetchAuthToken = async () => {
        try {
            console.log('Fetching auth token...');
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

            console.log('Auth response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Auth error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Auth response data:', data);
            
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

    // Function to transform Shopify product data to match the expected format
    const transformProduct = (shopifyProduct) => {
        const firstVariant = shopifyProduct.variants?.edges?.[0]?.node;
        const firstImage = shopifyProduct.images?.edges?.[0]?.node;
        
        return {
            id: shopifyProduct.id,
            name: shopifyProduct.title,
            title: shopifyProduct.title,
            description: shopifyProduct.description,
            handle: shopifyProduct.handle,
            productType: shopifyProduct.productType,
            vendor: shopifyProduct.vendor,
            tags: shopifyProduct.tags,
            label: shopifyProduct.tags?.[0] || '', // Use first tag as label
            price: parseFloat(firstVariant?.price?.amount || '0').toFixed(2),
            currencyCode: firstVariant?.price?.currencyCode || 'INR',
            compareAtPrice: firstVariant?.compareAtPrice?.amount || null,
            availableForSale: shopifyProduct.availableForSale,
            image: firstImage?.url || '',
            images: shopifyProduct.images?.edges?.map(edge => ({
                id: edge.node.id,
                url: edge.node.url,
                altText: edge.node.altText,
                width: edge.node.width,
                height: edge.node.height
            })) || [],
            variants: shopifyProduct.variants?.edges?.map(edge => ({
                id: edge.node.id,
                title: edge.node.title,
                price: edge.node.price?.amount || '0',
                currencyCode: edge.node.price?.currencyCode || 'INR',
                compareAtPrice: edge.node.compareAtPrice?.amount || null,
                availableForSale: edge.node.availableForSale,
                quantityAvailable: edge.node.quantityAvailable,
                selectedOptions: edge.node.selectedOptions,
                image: edge.node.image?.url || ''
            })) || [],
            priceRange: shopifyProduct.priceRange
        };
    };

    // Function to fetch products from Shopify with pagination
    const fetchProducts = async (token, page = 1, isLoadMore = false, collectionId = null) => {
        try {
            console.log(`Fetching products page ${page} with token${collectionId ? ` for collection: ${collectionId}` : ''}...`);
            if (isLoadMore) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }
            
            // Construct URL based on page number and collection
            let url = page === 1 
                ? `${import.meta.env.VITE_API_BASE_URL}/products`
                : `${import.meta.env.VITE_API_BASE_URL}/products/pg-${page}`;
            
            // Add collection ID as query parameter if provided
            if (collectionId) {
                url += `?cid=${collectionId}`;
            }
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                credentials: 'omit'
            });

            console.log('Products response status:', response.status);
            console.log('Response headers:', [...response.headers.entries()]);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Products response:', data);
            
            if (data.success && data.products) {
                const transformedProducts = data.products.map(transformProduct);
                console.log('Transformed products:', transformedProducts);
                
                if (isLoadMore) {
                    // Append to existing products
                    setDisplayedProducts(prev => [...prev, ...transformedProducts]);
                } else {
                    // Set initial products
                    setDisplayedProducts(transformedProducts);
                }
                
                // Update total products count if available
                if (data.totalProductCount) {
                    setTotalProducts(data.totalProductCount);
                }
                
                // Check if there are more products to load using hasNextPage from API
                setHasMore(data.hasNextPage || false);
                
                setError(null);
            } else {
                throw new Error('Failed to fetch products');
            }
        } catch (err) {
            console.error('Error fetching products:', err);
            console.error('Error name:', err.name);
            console.error('Error message:', err.message);
            setError(`Failed to load products: ${err.message}`);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // Initialize: Fetch token and then products
    useEffect(() => {
        const initializeProducts = async () => {
            const token = await fetchAuthToken();
            if (token) {
                await fetchProducts(token);
            } else {
                setLoading(false);
            }
        };

        initializeProducts();
    }, []);

    // Handle Load More button click
    const handleLoadMore = async () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        await fetchProducts(authToken, nextPage, true, selectedCollection);
    };

    // Handle quick filter click
    const handleQuickFilterClick = async (filter) => {
        setActiveFilter(filter.id);
        setSelectedCollection(filter.collectionId);
        setCurrentPage(1);
        setDisplayedProducts([]);
        await fetchProducts(authToken, 1, false, filter.collectionId);
    };

    // Calculate current count and progress percentage
    const currentCount = displayedProducts.length;
    const TOTAL_PRODUCTS = totalProducts || currentCount;
    const progressPercentage = totalProducts > 0 ? (currentCount / totalProducts) * 100 : 100;

    // Function to render products with espots
    const renderProductsWithEspots = () => {
        const items = [];
        displayedProducts.forEach((product, index) => {
            // Add product
            items.push(
                <ProductTile data={product} key={product.id + '-' + index} />
            );
            
            // Check if we need to insert an espot after this product
            const productPosition = index + 1; // 1-indexed position
            const espotIndexPosition = espotsIndex.indexOf(productPosition);
            
            if (espotIndexPosition !== -1 && productPosition <= currentCount) {
                items.push(
                    <div className="espot-container" key={`espot-${productPosition}`}>
                        <img 
                            src={espotImages[espotIndexPosition % espotImages.length]} 
                            alt={`Espot ${espotIndexPosition + 1}`}
                            className="espot-image"
                        />
                    </div>
                );
            }
        });
        return items;
    };

  return (
    <>
        <HeroImageLabel data={HeroLabel} />
        <div className="container" style={{marginBottom: '154px'}}>
            <div className="shop-filters-section">
                <div className="quick-filters-section">
                    {quickFilters.map((filter) => (
                        <button 
                            key={filter.id}
                            className={`filter-button ${activeFilter === filter.id ? 'active' : ''}`}
                            onClick={() => handleQuickFilterClick(filter)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
                <button className="filter-btn-modal" data-bs-toggle="offcanvas" data-bs-target="#shopFilterModal">FILTER <Settings2 /></button>
            </div>

            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
                    <p>Loading products...</p>
                </div>
            ) : error ? (
                <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
                    <p style={{color: 'red'}}>{error}</p>
                </div>
            ) : (
                <>
                    <div className="products-list-container">
                        {renderProductsWithEspots()}
                    </div>

                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <p className='progress-bar-text'>
                            You've seen {currentCount} out of {totalProducts > 0 ? TOTAL_PRODUCTS : currentCount} items
                        </p>
                        <div className="progress-bar-con">
                            <span style={{ width: `${progressPercentage}%` }}></span>
                        </div>
                        {hasMore && (
                            <button 
                                className='button-label' 
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                                {loadingMore && (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                )}
                                {!loadingMore && 'Load more'}
                            </button>
                        )}
                    </div>
                </>
            )}

            <div class="offcanvas offcanvas-end" tabindex="-1" id="shopFilterModal" aria-labelledby="offcanvasRightLabel">
                <div style={{flex: '1'}}>
                    <div className="heading"><Settings2 /> Filter by</div>
                    <div className="filters-items-container">
                        {
                            filters.map((item, index)=> {
                                return (
                                    <div className="filters-item-sec" key={index}>
                                        <h1 className="fil-heading">{item.label}</h1>
                                        <div className="filter-selection-con">
                                            {
                                                item.filters.map((filter, i)=> {
                                                    return (
                                                        <button className="filter-item" key={i}>{filter.label}</button>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <button className='button-pink-center' style={{width: '48%', height: '40px', boxShadow: 'none'}}>Apply Filter</button>
                    <button className='button-pink-border' style={{width: '48%', height: '40px', boxShadow: 'none'}} data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                </div>
            </div>

        </div>

        <MomsReviewsSlider />
        <MomsMomentsSlider />
        <FaqSlider />
    </>
  )
}

export default Shop