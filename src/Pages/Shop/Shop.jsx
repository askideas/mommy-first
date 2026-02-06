import React, { useState, useEffect } from 'react'
import './Shop.css'
import HeroImageLabel from '../../Components/HeroImageLabel/HeroImageLabel'
import HeroImage from '../../assets/hero-label.png'
import { Settings2 } from 'lucide-react'
import ProductTile from '../../Components/ProductTile/ProductTile'
import ProductTileSkeleton from '../../Components/ProductTile/ProductTileSkeleton'
import MomsReviewsSlider from '../../Components/MomsReviewsSlider/MomsReviewsSlider'
import MomsMomentsSlider from '../../Components/MomsMomentsSlider/MomsMomentsSlider'
import FaqSlider from '../../Components/FaqSlider/FaqSlider'
import ProductsLoader from '../../Components/ProductsLoader/ProductsLoader'
import EsImage1 from '../../assets/Hero/slider-img.png'
import EsImage2 from '../../assets/Hero/hero1.png'
import EsImage3 from '../../assets/Hero/hero2.png'
import MF1 from '../../assets/MF1.png'
import MF2 from '../../assets/MF2.png'
import ErrorComponent from '../../Components/ErrorComponent/ErrorComponent'
import SomeWentWrong from '../../assets/something-went-wrong.svg'

const Shop = () => {
    const PRODUCTS_PER_PAGE = 24;
    
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [authToken, setAuthToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadingCollections, setLoadingCollections] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [totalProducts, setTotalProducts] = useState(0);
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [collections, setCollections] = useState([]);
    const [sortBy, setSortBy] = useState('TITLE_ASC');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [availabilityFilter, setAvailabilityFilter] = useState([]);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [collectionFilters, setCollectionFilters] = useState([]);
    const [appliedFilters, setAppliedFilters] = useState({});
    const [PRICE_MIN, setPRICE_MIN] = useState(0);
    const [PRICE_MAX, setPRICE_MAX] = useState(1000);

    const handleMinPriceChange = (value) => {
        const numValue = Number(value);
        if (numValue <= maxPrice && numValue >= PRICE_MIN) {
            setMinPrice(numValue);
        }
    };

    const handleMaxPriceChange = (value) => {
        const numValue = Number(value);
        if (numValue >= minPrice && numValue <= PRICE_MAX) {
            setMaxPrice(numValue);
        }
    };

    const getProgressPercentage = () => {
        const minPercent = ((minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
        const maxPercent = ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
        return { minPercent, maxPercent };
    };

    const espotsIndex = [3, 5, 14];
    
    // Espot images data - you can replace these URLs with your actual espot images
    const espotImages = [ MF1, MF2, EsImage1 ]

    const sortOptions = [
        { id: 'TITLE_ASC', label: 'Alphabetically, A-Z' },
        { id: 'TITLE_DESC', label: 'Alphabetically, Z-A' },
        { id: 'PRICE_ASC', label: 'Price, low to high' },
        { id: 'PRICE_DESC', label: 'Price, high to low' },
        { id: 'DATE_ASC', label: 'Date, old to new' },
        { id: 'DATE_DESC', label: 'Date, new to old' }
    ];

    const filters = [
        {
            id: 'stage',
            label: 'Stage',
            type: 'checkbox',
            filters: [
            { id: 'new_moms', label: 'New Moms' },
            { id: 'experienced_moms', label: 'Experienced Moms' },
            { id: 'working_moms', label: 'Working Moms' },
            { id: 'travel_friendly', label: 'Travel friendly' },
            { id: 'pregnancy', label: 'Pregnancy' }
            ]
        },
        {
            id: 'availability',
            label: 'Availability',
            type: 'checkbox',
            filters: [
            { id: 'in_stock', label: 'In Stock' },
            { id: 'out_of_stock', label: 'Out of Stock' }
            ]
        }
    ];

    const toggleAvailability = (id) => {
        setAvailabilityFilter(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleApplyFilter = async () => {
        // Build filters object and fetch products with filters
        setCurrentPage(1);
        setDisplayedProducts([]);
        await fetchProducts(authToken, 1, false, selectedCollection || 'all');
    };

    const handleResetFilter = async () => {
        setMinPrice(0);
        setMaxPrice(1000);
        setAvailabilityFilter([]);
        setSortBy('TITLE_ASC');
        setCurrentPage(1);
        setDisplayedProducts([]);
        await fetchProducts(authToken, 1, false, selectedCollection || 'all', true);
    };

    // Build query string for API request
    const buildQueryString = (resetFilters = false, overrideSortBy = null) => {
        // On reset, return empty string to get default API behavior
        if (resetFilters) {
            return '';
        }
        const params = new URLSearchParams();
        // Add price filters
        if (minPrice > PRICE_MIN) {
            params.append('price_min', minPrice);
        }
        if (maxPrice < PRICE_MAX) {
            params.append('price_max', maxPrice);
        }
        // Add availability filter
        if (availabilityFilter.length === 1) {
            if (availabilityFilter.includes('in_stock')) {
                params.append('available', 'true');
            } else if (availabilityFilter.includes('out_of_stock')) {
                params.append('available', 'false');
            }
        }
        // Add sort (use override if provided, otherwise use state)
        const sortValue = overrideSortBy || sortBy;
        if (sortValue) {
            params.append('sort', sortValue);
        }
        return params.toString();
    };

    // Handle sort change
    const handleSortChange = async (newSortId) => {
        setSortBy(newSortId);
        setShowSortDropdown(false);
        setCurrentPage(1);
        setDisplayedProducts([]);
        // Build query string with new sort value
        const queryString = buildQueryString(false, newSortId);
        const collectionHandle = selectedCollection || 'all';
        let url = `${import.meta.env.VITE_API_BASE_URL}/collections/${collectionHandle}`;
        if (queryString) url += `?${queryString}`;
        try {
            setLoading(true);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                credentials: 'omit'
            });
            if (response.ok) {
                const responseData = await response.json();
                const collection = responseData.data?.collection || responseData.collection;
                const pagination = responseData.pagination;
                const productEdges = Array.isArray(collection?.products)
                    ? collection.products
                    : (collection?.products?.edges || []);
                if (collection?.filters) {
                    const priceFilter = collection.filters.find(f => f.id === 'filter.v.price');
                    if (priceFilter && priceFilter.values?.[0]?.input) {
                        try {
                            const priceInput = JSON.parse(priceFilter.values[0].input);
                            if (typeof priceInput.price?.min === 'number' && typeof priceInput.price?.max === 'number') {
                                setPRICE_MIN(priceInput.price.min);
                                setPRICE_MAX(priceInput.price.max);
                                setMinPrice(priceInput.price.min);
                                setMaxPrice(priceInput.price.max);
                            }
                        } catch (e) {
                            console.error('Error parsing price filter:', e);
                        }
                    }
                }
                if (productEdges.length > 0) {
                    const transformedProducts = productEdges.map(
                        edge => edge.node ? transformProduct(edge) : transformProduct({ node: edge })
                    );
                    setDisplayedProducts(transformedProducts);
                    setTotalProducts(pagination?.totalProducts || transformedProducts.length);
                    setHasMore(pagination?.hasNextPage || false);
                } else {
                    setDisplayedProducts([]);
                }
            }
        } catch (err) {
            console.error('Error sorting products:', err);
        } finally {
            setLoading(false);
        }
    };

    const HeroLabel = {
        image: HeroImage,
        text: 'Designed to Maximize Comfort for Expecting Moms',
        height: 280,
        pwidth: 487,
    };
    // Function to fetch collections
    const fetchCollections = async (token) => {
        try {
            setLoadingCollections(true);
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/collections`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                credentials: 'omit'
            });
            const result = await response.json();
            console.log('Collections response:', result);

            const collectionEdges = result.data?.collections?.edges || [];
            
            if (collectionEdges.length > 0) {
                // Transform and filter collections that have display_in_shop_page = true
                const filteredCollections = collectionEdges
                    .map(edge => edge.node)
                    .filter(collection => {
                        const displayMetafield = collection.metafields?.find(
                            m => m.key === 'display_in_shop_page'
                        );
                        return displayMetafield?.value === true || displayMetafield?.value === 'true';
                    });
                console.log('Filtered collections for shop page:', filteredCollections);
                setCollections(filteredCollections);
            }
        } catch (err) {
            console.error('Error fetching collections:', err);
        } finally {
            setLoadingCollections(false);
        }
    }

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

    // Function to transform new API product data to match the expected format
    const transformProduct = (edge) => {
        const product = edge.node;
        const firstVariant = product.variants?.nodes?.[0];
        const firstImage = product.images?.nodes?.[0];
        
        return {
            id: product.id,
            name: product.title,
            title: product.title,
            description: product.description,
            handle: product.handle,
            productType: product.productType,
            vendor: product.vendor,
            tags: product.tags,
            label: product.tags?.[0] || '',
            price: parseFloat(firstVariant?.price?.amount || product.priceRange?.minVariantPrice?.amount || '0').toFixed(2),
            currencyCode: firstVariant?.price?.currencyCode || product.priceRange?.minVariantPrice?.currencyCode || 'USD',
            compareAtPrice: firstVariant?.compareAtPrice?.amount || product.compareAtPriceRange?.minVariantPrice?.amount || null,
            availableForSale: product.availableForSale,
            image: firstImage?.url || '',
            images: product.images?.nodes || [],
            variants: product.variants?.nodes || [],
            priceRange: product.priceRange,
            bundleComponents: product.bundleComponents || null
        };
    };

    // Function to fetch products from Shopify with pagination
    const fetchProducts = async (token, page = 1, isLoadMore = false, collectionHandle = 'all', resetFilters = false) => {
        try {
            console.log(`Fetching products page ${page} with token for collection: ${collectionHandle}...`);
            if (isLoadMore) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }
            
            // Build query string with filters (skip on initial load or reset)
            const queryString = resetFilters ? '' : buildQueryString(false);
            
            // Always use collections endpoint with 'all' as default, add page index for pagination
            let url = page === 1 
                ? `${import.meta.env.VITE_API_BASE_URL}/collections/${collectionHandle}`
                : `${import.meta.env.VITE_API_BASE_URL}/collections/${collectionHandle}/pg-${page}`;
            
            // Append query string if exists
            if (queryString) {
                url += `?${queryString}`;
            }
            
            console.log('Fetching URL:', url);
            
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
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Products response:', responseData);
            console.log('Response data structure:', JSON.stringify(responseData, null, 2).substring(0, 500));
            
            const collection = responseData.data?.collection || responseData.collection;
            const pagination = responseData.pagination;
            console.log('Collection:', collection);
            console.log('Collection products:', collection?.products);
            
            // Fix product parsing: products is an array, not edges
            const productEdges = Array.isArray(collection?.products)
                ? collection.products
                : (collection?.products?.edges || []);
            
            // Store collection filters for filter modal
            if (collection?.filters) {
                setCollectionFilters(collection.filters);
                // Update price range from API if available
                const priceFilter = collection.filters.find(f => f.id === 'filter.v.price');
                if (priceFilter && priceFilter.values?.[0]?.input) {
                    try {
                        const priceInput = JSON.parse(priceFilter.values[0].input);
                        if (typeof priceInput.price?.min === 'number' && typeof priceInput.price?.max === 'number') {
                            setMinPrice(priceInput.price.min);
                            setMaxPrice(priceInput.price.max);
                        }
                    } catch (e) {
                        console.error('Error parsing price filter:', e);
                    }
                }
            }
            
            // Store applied filters
            if (responseData.appliedFilters) {
                setAppliedFilters(responseData.appliedFilters);
            }
            
            if (productEdges.length > 0) {
                // Support both edge.node and direct product objects
                const transformedProducts = productEdges.map(
                    edge => edge.node ? transformProduct(edge) : transformProduct({ node: edge })
                );
                console.log('Transformed products:', transformedProducts);
                
                if (isLoadMore) {
                    // Append to existing products
                    setDisplayedProducts(prev => [...prev, ...transformedProducts]);
                } else {
                    // Set initial products
                    setDisplayedProducts(transformedProducts);
                }
                
                // Update total products count from pagination
                if (pagination?.totalProducts) {
                    setTotalProducts(pagination.totalProducts);
                }
                
                // Check if there are more products to load using pagination info
                setHasMore(pagination?.hasNextPage || false);
                
                setError(null);
            } else {
                if (!isLoadMore) {
                    setDisplayedProducts([]);
                    setTotalProducts(0);
                }
                setHasMore(false);
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
                await fetchCollections(token);
                await fetchProducts(token, 1, false, 'all');
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
        await fetchProducts(authToken, nextPage, true, selectedCollection || 'all');
    };

    // Handle quick filter click
    const handleQuickFilterClick = async (handle) => {
        setActiveFilter(handle);
        setSelectedCollection(handle === 'ALL' ? null : handle);
        setCurrentPage(1);
        setDisplayedProducts([]);
        await fetchProducts(authToken, 1, false, handle === 'ALL' ? 'all' : handle);
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
                    <button 
                        className={`filter-button ${activeFilter === 'ALL' ? 'active' : ''}`}
                        onClick={() => handleQuickFilterClick('ALL')}
                        disabled={loadingCollections}
                    >
                        ALL
                    </button>
                    {loadingCollections ? (
                        // Show skeleton loaders while fetching collections
                        [...Array(4)].map((_, index) => (
                            <div 
                                key={index}
                                className="filter-button skeleton-loader"
                                style={{
                                    width: '120px',
                                    height: '40px',
                                    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'shimmer 1.5s infinite',
                                    borderRadius: '8px',
                                    cursor: 'not-allowed'
                                }}
                            />
                        ))
                    ) : (
                        collections.map((collection) => (
                            <button 
                                key={collection.id}
                                className={`filter-button ${activeFilter === collection.handle ? 'active' : ''}`}
                                onClick={() => handleQuickFilterClick(collection.handle)}
                            >
                                {collection.title.toUpperCase()}
                            </button>
                        ))
                    )}
                </div>
                <div className="d-flex align-items-center" style={{gap: '12px'}}>
                    <div className="sort-dropdown-container">
                        <button 
                            className="sort-dropdown-btn" 
                            onClick={() => setShowSortDropdown(!showSortDropdown)}
                        >
                            Sort by: {sortOptions.find(opt => opt.id === sortBy)?.label}
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{marginLeft: '8px'}}>
                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        {showSortDropdown && (
                            <div className="sort-dropdown-menu">
                                {sortOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        className={`sort-dropdown-item ${sortBy === option.id ? 'active' : ''}`}
                                        onClick={() => handleSortChange(option.id)}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button className="filter-btn-modal" data-bs-toggle="offcanvas" data-bs-target="#shopFilterModal">FILTER <Settings2 /></button>
                </div>
            </div>

            {loading ? (
                <div className="products-list-container">
                    {[...Array(16)].map((_, index) => (
                        <ProductTileSkeleton key={index} />
                    ))}
                </div>
            ) : error ? (
                <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
                    <ErrorComponent data={
                        {
                            "title": "Something went wrong",
                            "subtitle": "We’re having trouble loading this page. Please try again.",
                            "image": SomeWentWrong,
                            "buttons": [
                                {
                                    label: "Retry",
                                    className: "button-pink-center",
                                    link:''
                                },
                                {
                                    label: "Go to HOME",
                                    className: "button-pink-border",
                                    link:'/'
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

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="shopFilterModal" aria-labelledby="offcanvasRightLabel">
                <div style={{flex: '1'}}>
                    <div className="heading"><Settings2 /> Filter by</div>
                    <div className="filters-items-container">
                        {/* Price Range Filter */}
                        <div className="filters-item-sec">
                            <h1 className="fil-heading">Price range</h1>
                            
                            {/* Range Slider */}
                            <div className="price-range-slider-container">
                                <div className="price-range-slider">
                                    <div 
                                        className="price-range-progress"
                                        style={{
                                            left: `${getProgressPercentage().minPercent}%`,
                                            right: `${100 - getProgressPercentage().maxPercent}%`
                                        }}
                                    ></div>
                                    <input
                                        type="range"
                                        min={PRICE_MIN}
                                        max={PRICE_MAX}
                                        value={minPrice}
                                        onChange={(e) => handleMinPriceChange(e.target.value)}
                                        className="price-range-input price-range-min"
                                    />
                                    <input
                                        type="range"
                                        min={PRICE_MIN}
                                        max={PRICE_MAX}
                                        value={maxPrice}
                                        onChange={(e) => handleMaxPriceChange(e.target.value)}
                                        className="price-range-input price-range-max"
                                    />
                                </div>
                            </div>

                            {/* Price Inputs */}
                            <div className="price-range-inputs">
                                <div className="price-input-group">
                                    <label>Min Price</label>
                                    <input 
                                        type="number" 
                                        placeholder="$0"
                                        value={minPrice}
                                        onChange={(e) => handleMinPriceChange(e.target.value)}
                                        className="price-input"
                                        min={PRICE_MIN}
                                        max={maxPrice}
                                    />
                                </div>
                                <div className="price-input-group">
                                    <label>Max Price</label>
                                    <input 
                                        type="number" 
                                        placeholder="$100"
                                        value={maxPrice}
                                        onChange={(e) => handleMaxPriceChange(e.target.value)}
                                        className="price-input"
                                        min={minPrice}
                                        max={PRICE_MAX}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Availability Filter */}
                        <div className="filters-item-sec">
                            <h1 className="fil-heading">Availability</h1>
                            <div className="filter-selection-con">
                                <button 
                                    className={`filter-item ${availabilityFilter.includes('in_stock') ? 'active' : ''}`}
                                    onClick={() => toggleAvailability('in_stock')}
                                >
                                    In Stock
                                </button>
                                <button 
                                    className={`filter-item ${availabilityFilter.includes('out_of_stock') ? 'active' : ''}`}
                                    onClick={() => toggleAvailability('out_of_stock')}
                                >
                                    Out of Stock
                                </button>
                            </div>
                        </div>

                        {/* Other Filters */}
                        {/* {
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
                        } */}
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center" style={{gap: '12px'}}>
                    <button className='button-pink-center' style={{width: '48%', height: '40px', boxShadow: 'none'}} onClick={handleApplyFilter} data-bs-dismiss="offcanvas">Apply Filter</button>
                    <button className='button-pink-border' style={{width: '48%', height: '40px', boxShadow: 'none'}} onClick={handleResetFilter}>Reset</button>
                </div>
            </div>

        </div>

        <MomsReviewsSlider />
        <MomsMomentsSlider />
        <FaqSlider />
    </>
  )
}

export default Shop;