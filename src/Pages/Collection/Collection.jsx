import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../Shop/Shop.css'
import './Collection.css'
import HeroImageLabel from '../../Components/HeroImageLabel/HeroImageLabel'
import HeroImage from '../../assets/hero-label.png'
import { Settings2 } from 'lucide-react'
import ProductTile from '../../Components/ProductTile/ProductTile'
import ProductTileSkeleton from '../../Components/ProductTile/ProductTileSkeleton'
import MomsReviewsSlider from '../../Components/MomsReviewsSlider/MomsReviewsSlider'
import MomsMomentsSlider from '../../Components/MomsMomentsSlider/MomsMomentsSlider'
import FaqSlider from '../../Components/FaqSlider/FaqSlider'
import MF1 from '../../assets/MF1.png'
import MF2 from '../../assets/MF2.png'
import EsImage1 from '../../assets/Hero/slider-img.png'
import ErrorComponent from '../../Components/ErrorComponent/ErrorComponent'
import SomeWentWrong from '../../assets/something-went-wrong.svg'

const Collection = () => {
    const { collectionHandle } = useParams();

    // ============ STATE MANAGEMENT ============
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [authToken, setAuthToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [totalProducts, setTotalProducts] = useState(0);
    const [collectionName, setCollectionName] = useState('');
    const [collectionFilters, setCollectionFilters] = useState([]);

    // Price Range State
    const [PRICE_MIN, setPRICE_MIN] = useState(0);
    const [PRICE_MAX, setPRICE_MAX] = useState(1000);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

    // Filter & Sorting State
    const [sortBy, setSortBy] = useState('FEATURED');
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [availabilityFilter, setAvailabilityFilter] = useState([]);

    // ============ CONSTANTS ============
    const espotsIndex = [3, 5, 14];
    const espotImages = [MF1, MF2, EsImage1];

    const sortOptions = [
        { id: 'FEATURED', label: 'Featured' },
        { id: 'BEST_SELLING', label: 'Best Selling' },
        { id: 'TITLE_ASC', label: 'Alphabetically, A-Z' },
        { id: 'TITLE_DESC', label: 'Alphabetically, Z-A' },
        { id: 'PRICE_ASC', label: 'Price, low to high' },
        { id: 'PRICE_DESC', label: 'Price, high to low' },
        { id: 'DATE_ASC', label: 'Date, old to new' },
        { id: 'DATE_DESC', label: 'Date, new to old' }
    ];

    // ============ PRICE RANGE HELPER ============
    const getProgressPercentage = () => {
        const range = PRICE_MAX - PRICE_MIN;
        if (range <= 0) {
            return { minPercent: 0, maxPercent: 100 };
        }
        
        const minPercent = ((minPrice - PRICE_MIN) / range) * 100;
        const maxPercent = ((maxPrice - PRICE_MIN) / range) * 100;
        
        return { 
            minPercent: Math.max(0, Math.min(100, minPercent)),
            maxPercent: Math.max(0, Math.min(100, maxPercent))
        };
    };

    // ============ PRICE FILTER HANDLERS ============
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

    // ============ AVAILABILITY FILTER ============
    const toggleAvailability = (id) => {
        setAvailabilityFilter(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    // ============ BUILD QUERY STRING ============
    const buildQueryString = (resetFilters = false, overrideSortBy = null) => {
        if (resetFilters) return '';
        
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
            params.append('available', availabilityFilter[0] === 'in_stock' ? 'true' : 'false');
        }
        
        // Add sort
        const sortValue = overrideSortBy || sortBy;
        if (sortValue && sortValue !== 'FEATURED') {
            params.append('sort', sortValue);
        }
        
        return params.toString();
    };

    // ============ UPDATE PRICE BOUNDS ============
    const updatePriceBounds = (collection) => {
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
                        return true;
                    }
                } catch (e) {
                    console.error('Error parsing price filter:', e);
                }
            }
        }
        return false;
    };

    // ============ FORMAT COLLECTION NAME ============
    const formatCollectionName = (handle) => {
        if (!handle) return 'Collection';
        return handle
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // ============ TRANSFORM PRODUCT DATA ============
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

    // ============ FETCH AUTHENTICATION TOKEN ============
    const fetchAuthToken = async () => {
        try {
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
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success && data.token) {
                setAuthToken(data.token);
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

    // ============ FETCH PRODUCTS ============
    const fetchCollectionProducts = async (token, page = 1, isLoadMore = false, resetFilters = false) => {
        try {
            if (isLoadMore) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }
            
            const queryString = resetFilters ? '' : buildQueryString(false);
            
            let url = page === 1 
                ? `${import.meta.env.VITE_API_BASE_URL}/collections/${collectionHandle}`
                : `${import.meta.env.VITE_API_BASE_URL}/collections/${collectionHandle}/pg-${page}`;
            
            if (queryString) {
                url += `?${queryString}`;
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

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            const collection = responseData.data?.collection || responseData.collection;
            const pagination = responseData.pagination;
            
            console.log('Collection data:', collection);
            console.log('Pagination:', pagination);
            
            // Update price bounds from API (only on first page, non-load-more)
            if (!isLoadMore && page === 1) {
                updatePriceBounds(collection);
            }
            
            // Store collection filters from API
            if (collection?.filters) {
                setCollectionFilters(collection.filters);
            }
            
            // Update collection name from API response
            if (collection?.title) {
                setCollectionName(collection.title);
            }
            
            // Parse products - products is an array of objects with cursor and node
            const products = collection?.products || [];
            
            if (products.length > 0) {
                // Extract the actual product data and transform
                const productData = products.map(item => {
                    const productNode = item.node || item;
                    return transformProduct({ node: productNode });
                });
                
                if (isLoadMore) {
                    setDisplayedProducts(prev => [...prev, ...productData]);
                } else {
                    setDisplayedProducts(productData);
                }
                
                setTotalProducts(pagination?.totalProducts || productData.length);
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
            setError(`Failed to load products: ${err.message}`);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // ============ FILTER HANDLERS ============
    const handleApplyFilter = async () => {
        setCurrentPage(1);
        setDisplayedProducts([]);
        await fetchCollectionProducts(authToken, 1, false);
    };

    const handleResetFilter = async () => {
        setMinPrice(PRICE_MIN);
        setMaxPrice(PRICE_MAX);
        setAvailabilityFilter([]);
        setSortBy('FEATURED');
        setCurrentPage(1);
        setDisplayedProducts([]);
        await fetchCollectionProducts(authToken, 1, false, true);
    };

    const handleSortChange = async (newSortId) => {
        setSortBy(newSortId);
        setShowSortDropdown(false);
        setCurrentPage(1);
        setDisplayedProducts([]);
        
        const queryString = buildQueryString(false, newSortId);
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
                const products = collection?.products || [];
                
                if (products.length > 0) {
                    const productData = products.map(item => {
                        const productNode = item.node || item;
                        return transformProduct({ node: productNode });
                    });
                    setDisplayedProducts(productData);
                    setTotalProducts(pagination?.totalProducts || productData.length);
                    setHasMore(pagination?.hasNextPage || false);
                } else {
                    setDisplayedProducts([]);
                }
            }
        } catch (err) {
            console.error('Error sorting products:', err);
            setError(`Failed to sort products: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = async () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        await fetchCollectionProducts(authToken, nextPage, true);
    };

    // ============ INITIALIZE ON MOUNT ============
    useEffect(() => {
        const initializeProducts = async () => {
            setCollectionName(formatCollectionName(collectionHandle));
            // Reset states when collection changes
            setDisplayedProducts([]);
            setCurrentPage(1);
            setAvailabilityFilter([]);
            setSortBy('FEATURED');
            setError(null);
            
            const token = await fetchAuthToken();
            if (token) {
                await fetchCollectionProducts(token);
            } else {
                setLoading(false);
            }
        };

        initializeProducts();
    }, [collectionHandle]);

    // ============ RENDER PRODUCTS WITH ESPOTS ============
    const renderProductsWithEspots = () => {
        const items = [];
        displayedProducts.forEach((product, index) => {
            items.push(
                <ProductTile data={product} key={product.id + '-' + index} />
            );
            
            const productPosition = index + 1;
            const espotIndexPosition = espotsIndex.indexOf(productPosition);
            
            if (espotIndexPosition !== -1 && productPosition <= displayedProducts.length) {
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

    // ============ CALCULATE PROGRESS ============
    const currentCount = displayedProducts.length;
    const progressPercentage = totalProducts > 0 ? (currentCount / totalProducts) * 100 : 100;

    // ============ HERO LABEL ============
    const HeroLabel = {
        image: HeroImage,
        text: 'Designed to Maximize Comfort for Expecting Moms',
        height: 280,
        pwidth: 487
    };

    // ============ RENDER ============
    return (
        <>
            <HeroImageLabel data={HeroLabel} />
            <div className="container" style={{marginBottom: '154px'}}>
                {/* FILTERS SECTION */}
                <div className="shop-filters-section">
                    <div className="quick-filters-section">
                        <h1 className="collection-title">{collectionName}</h1>
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
                        <button className="filter-btn-modal" data-bs-toggle="offcanvas" data-bs-target="#collectionFilterModal">
                            FILTER <Settings2 />
                        </button>
                    </div>
                </div>

                {/* PRODUCTS SECTION */}
                {loading ? (
                    <div className="products-list-container">
                        {[...Array(16)].map((_, index) => (
                            <ProductTileSkeleton key={index} />
                        ))}
                    </div>
                ) : error ? (
                    <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
                        <ErrorComponent data={{
                            title: "Something went wrong",
                            subtitle: "We're having trouble loading this page. Please try again.",
                            image: SomeWentWrong,
                            buttons: [
                                { label: "Retry", className: "button-pink-center", link: '' },
                                { label: "Go to HOME", className: "button-pink-border", link: '/' },
                                { label: "Contact Support", className: "button-pink-border", link: '/contact' },
                            ]
                        }} />
                    </div>
                ) : (
                    <>
                        <div className="products-list-container">
                            {renderProductsWithEspots()}
                        </div>

                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <p className='progress-bar-text'>
                                You've seen {currentCount} out of {totalProducts} items
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

                {/* FILTER MODAL */}
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="collectionFilterModal">
                    <div style={{flex: '1'}}>
                        <div className="heading"><Settings2 /> Filter by</div>
                        <div className="filters-items-container">
                            {/* Price Range Filter */}
                            <div className="filters-item-sec">
                                <h1 className="fil-heading">Price range</h1>
                                
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
                                            placeholder="$1000"
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
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{gap: '12px'}}>
                        <button 
                            className='button-pink-center' 
                            style={{width: '48%', height: '40px', boxShadow: 'none'}} 
                            onClick={handleApplyFilter} 
                            data-bs-dismiss="offcanvas"
                        >
                            Apply Filter
                        </button>
                        <button 
                            className='button-pink-border' 
                            style={{width: '48%', height: '40px', boxShadow: 'none'}} 
                            onClick={handleResetFilter}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            <MomsReviewsSlider />
            <MomsMomentsSlider />
            <FaqSlider />
        </>
    )
}

export default Collection
