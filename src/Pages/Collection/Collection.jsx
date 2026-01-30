import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Collection.css'
import HeroImageLabel from '../../Components/HeroImageLabel/HeroImageLabel'
import HeroImage from '../../assets/hero-label.png'
import { Settings2 } from 'lucide-react'
import ProductTile from '../../Components/ProductTile/ProductTile'
import MomsReviewsSlider from '../../Components/MomsReviewsSlider/MomsReviewsSlider'
import MomsMomentsSlider from '../../Components/MomsMomentsSlider/MomsMomentsSlider'
import FaqSlider from '../../Components/FaqSlider/FaqSlider'
import MF1 from '../../assets/MF1.png'
import MF2 from '../../assets/MF2.png'
import EsImage1 from '../../assets/Hero/slider-img.png'

const Collection = () => {
    const { collectionHandle } = useParams();
    const PRODUCTS_PER_PAGE = 16;
    
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [authToken, setAuthToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [totalProducts, setTotalProducts] = useState(0);
    const [collectionName, setCollectionName] = useState('');

    const espotsIndex = [3, 5, 14];
    
    // Espot images data
    const espotImages = [MF1, MF2, EsImage1];

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

    // Function to format collection handle to display name
    const formatCollectionName = (handle) => {
        if (!handle) return 'Collection';
        return handle
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
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

    // Function to transform new API product data to match the expected format
    const transformProduct = (product) => {
        // New API already returns the data in a flat structure
        const firstVariant = product.variants?.[0];
        const firstImage = product.images?.[0];
        
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
            compareAtPrice: firstVariant?.compareAtPrice?.amount || null,
            availableForSale: product.availableForSale,
            image: firstImage?.url || '',
            images: product.images || [],
            variants: product.variants || [],
            priceRange: product.priceRange,
            bundleComponents: product.bundleComponents || null
        };
    };

    // Function to fetch products from collection with pagination
    const fetchCollectionProducts = async (token, page = 1, isLoadMore = false) => {
        try {
            console.log(`Fetching collection products page ${page} with token for collection: ${collectionHandle}...`);
            if (isLoadMore) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }
            
            // Use new collections endpoint
            const url = `${import.meta.env.VITE_API_BASE_URL}/collections/${collectionHandle}`;
            
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
            
            if (data.success && data.data) {
                const transformedProducts = data.data.map(transformProduct);
                console.log('Transformed products:', transformedProducts);
                
                if (isLoadMore) {
                    setDisplayedProducts(prev => [...prev, ...transformedProducts]);
                } else {
                    setDisplayedProducts(transformedProducts);
                }
                
                // Update collection name from API response
                if (data.collection?.title) {
                    setCollectionName(data.collection.title);
                }
                
                if (data.totalProducts) {
                    setTotalProducts(data.totalProducts);
                }
                
                // Collections endpoint returns all products, so no pagination
                setHasMore(false);
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
            // Set collection name from handle
            setCollectionName(formatCollectionName(collectionHandle));
            
            const token = await fetchAuthToken();
            if (token) {
                await fetchCollectionProducts(token);
            } else {
                setLoading(false);
            }
        };

        initializeProducts();
    }, [collectionHandle]);

    // Handle Load More button click
    const handleLoadMore = async () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        await fetchCollectionProducts(authToken, nextPage, true);
    };

    // Calculate current count and progress percentage
    const currentCount = displayedProducts.length;
    const TOTAL_PRODUCTS = totalProducts || currentCount;
    const progressPercentage = totalProducts > 0 ? (currentCount / totalProducts) * 100 : 100;

    // Function to render products with espots
    const renderProductsWithEspots = () => {
        const items = [];
        displayedProducts.forEach((product, index) => {
            items.push(
                <ProductTile data={product} key={product.id + '-' + index} />
            );
            
            const productPosition = index + 1;
            const espotIndexPosition = espotsIndex.indexOf(productPosition);
            
            if (espotIndexPosition !== -1 && productPosition <= currentCount) {
                items.push(
                    <div className="collection-espot-container" key={`espot-${productPosition}`}>
                        <img 
                            src={espotImages[espotIndexPosition % espotImages.length]} 
                            alt={`Espot ${espotIndexPosition + 1}`}
                            className="collection-espot-image"
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
                <div className="collection-filters-section">
                    <div className="collection-name-section">
                        <h1 className="collection-title">{collectionName}</h1>
                    </div>
                    <button className="collection-filter-btn-modal" data-bs-toggle="offcanvas" data-bs-target="#collectionFilterModal">
                        FILTER <Settings2 />
                    </button>
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
                        <div className="collection-products-list-container">
                            {renderProductsWithEspots()}
                        </div>

                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <p className='collection-progress-bar-text'>
                                You've seen {currentCount} out of {totalProducts > 0 ? TOTAL_PRODUCTS : currentCount} items
                            </p>
                            <div className="collection-progress-bar-con">
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

                <div className="offcanvas offcanvas-end" tabIndex="-1" id="collectionFilterModal" aria-labelledby="offcanvasRightLabel">
                    <div style={{flex: '1'}}>
                        <div className="collection-modal-heading"><Settings2 /> Filter by</div>
                        <div className="collection-filters-items-container">
                            {filters.map((item, index) => (
                                <div className="collection-filters-item-sec" key={index}>
                                    <h1 className="collection-fil-heading">{item.label}</h1>
                                    <div className="collection-filter-selection-con">
                                        {item.filters.map((filter, i) => (
                                            <button className="collection-filter-item" key={i}>{filter.label}</button>
                                        ))}
                                    </div>
                                </div>
                            ))}
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

export default Collection
