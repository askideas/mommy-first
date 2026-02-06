import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, useParams, NavLink } from 'react-router-dom'
import './SearchResults.css'
import ProductTile from '../../Components/ProductTile/ProductTile'
import ProductsLoader from '../../Components/ProductsLoader/ProductsLoader'
import { ChevronRight, Settings2 } from 'lucide-react'

const SearchResults = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { query: pathQuery } = useParams();
    const navigate = useNavigate();
    
    // Support both query params (?q=) and path params (/search/query)
    const urlQuery = searchParams.get('q') || pathQuery || '';
    const [searchQuery, setSearchQuery] = useState(urlQuery);

    const [searchResults, setSearchResults] = useState({
        products: [],
        events: [],
        journals: [],
        liveSessions: []
    });
    const [activeFilter, setActiveFilter] = useState('products');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authToken, setAuthToken] = useState(null);

    // Function to fetch authentication token
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

            const data = await response.json();
            
            if (data.success && data.token) {
                setAuthToken(data.token);
                return data.token;
            } else {
                throw new Error(data.message || 'Failed to get authentication token');
            }
        } catch (err) {
            console.error('Error fetching auth token:', err);
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
            priceRange: product.priceRange
        };
    };

    // Function to search products
    const searchProducts = async (query, token) => {
        if (!query.trim()) {
            setSearchResults({
                products: [],
                events: [],
                journals: [],
                liveSessions: []
            });
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/search/${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            console.log('Search response status:', response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Search response data:', data);
            
            const predictiveSearch = data.data?.predictiveSearch;
            
            if (predictiveSearch) {
                const products = predictiveSearch.products || [];
                const articles = predictiveSearch.articles || {};
                const events = articles.events || [];
                const journals = articles.journals || [];
                const liveSessions = articles['live-sessions'] || [];
                
                setSearchResults({
                    products,
                    events,
                    journals,
                    liveSessions
                });
                
                // Set active filter to first available category with results
                if (products.length > 0) {
                    setActiveFilter('products');
                } else if (events.length > 0) {
                    setActiveFilter('events');
                } else if (journals.length > 0) {
                    setActiveFilter('journals');
                } else if (liveSessions.length > 0) {
                    setActiveFilter('liveSessions');
                }
            } else {
                setSearchResults({
                    products: [],
                    events: [],
                    journals: [],
                    liveSessions: []
                });
            }
        } catch (err) {
            console.error('Error searching products:', err);
            setError(`Failed to load search results: ${err.message}`);
            setSearchResults({
                products: [],
                events: [],
                journals: [],
                liveSessions: []
            });
        } finally {
            setLoading(false);
        }
    };

    // Sync local searchQuery with URL query when URL changes
    useEffect(() => {
        const newUrlQuery = searchParams.get('q') || pathQuery || '';
        if (newUrlQuery !== searchQuery) {
            setSearchQuery(newUrlQuery);
        }
    }, [searchParams, pathQuery]);

    // Fetch token on component mount
    useEffect(() => {
        fetchAuthToken();
    }, []);

    // Debounced search effect - triggers search when user types
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!searchQuery.trim()) {
                setSearchResults({
                    products: [],
                    events: [],
                    journals: [],
                    liveSessions: []
                });
                setLoading(false);
                setError(null);
                // Don't update URL when input is empty, keep the existing URL
                return;
            }

            // Update URL with current search query only when there's a valid query
            setSearchParams({ q: searchQuery });

            let token = authToken;
            if (!token) {
                token = await fetchAuthToken();
            }
            
            if (token) {
                await searchProducts(searchQuery, token);
            } else {
                setError('Failed to authenticate');
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const getTotalResults = () => {
        return (searchResults?.products?.length || 0) + (searchResults?.events?.length || 0) + (searchResults?.journals?.length || 0) + (searchResults?.liveSessions?.length || 0);
    };

    const getActiveResults = () => {
        switch(activeFilter) {
            case 'products': return searchResults.products;
            case 'events': return searchResults.events;
            case 'journals': return searchResults.journals;
            case 'liveSessions': return searchResults.liveSessions;
            default: return [];
        }
    };

    return (
        <div className="search-results-page">
            <div className="container">
                {loading ? (
                    <ProductsLoader text={`Searching for "${searchQuery}"...`} />
                ) : error ? (
                    <div className="search-error-container">
                        <p>{error}</p>
                        <button className="back-to-shop-btn" onClick={() => navigate('/shop')}>
                            Back to Shop
                        </button>
                    </div>
                ) : getTotalResults() > 0 ? (
                    <>
                        <div className="breadcrumbs-search-results-section">
                            <NavLink to="/">Home</NavLink>
                            <ChevronRight />
                            <span>Search results</span>
                        </div>
                        <div className="search-results-header">
                            <h1 className="search-query-title">Search Results</h1>
                            <div className={`srp-input-container ${searchQuery.length > 0 ? '' : 'initial-stage-input'}`}>
                                <input 
                                    type="text" 
                                    value={searchQuery} 
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for products..."
                                />
                                {loading ? (
                                    <button className='clear-btn' disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    </button>
                                ) : searchQuery.trim() && (
                                    <button className='clear-btn' onClick={() => setSearchQuery('')}>Clear</button>
                                )}
                            </div>
                        </div>
                        <div className="search-results-filter">
                            <p className="results-found">You searched for '{searchQuery}'</p>
                            <div className="filters-section">
                                {searchResults.products.length > 0 && (
                                    <button 
                                        className={activeFilter === 'products' ? 'active' : ''}
                                        onClick={() => setActiveFilter('products')}
                                    >
                                        Products ({searchResults.products.length})
                                    </button>
                                )}
                                {searchResults.events.length > 0 && (
                                    <button 
                                        className={activeFilter === 'events' ? 'active' : ''}
                                        onClick={() => setActiveFilter('events')}
                                    >
                                        Events ({searchResults.events.length})
                                    </button>
                                )}
                                {searchResults.journals.length > 0 && (
                                    <button 
                                        className={activeFilter === 'journals' ? 'active' : ''}
                                        onClick={() => setActiveFilter('journals')}
                                    >
                                        Blog ({searchResults.journals.length})
                                    </button>
                                )}
                                {searchResults.liveSessions.length > 0 && (
                                    <button 
                                        className={activeFilter === 'liveSessions' ? 'active' : ''}
                                        onClick={() => setActiveFilter('liveSessions')}
                                    >
                                        Care Hub ({searchResults.liveSessions.length})
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="results-found-container">
                            <p>{getActiveResults().length} Results found</p>
                            <button className="srp-filter-btn-modal">FILTER <Settings2 /></button>
                        </div>
                        <div className="search-products-grid">
                            {/* Products */}
                            {activeFilter === 'products' && searchResults.products.map((product, index) => (
                                <div 
                                    key={product.id + '-' + index}
                                    onClick={() => navigate(`/shop/${product.handle}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <ProductTile 
                                        data={{
                                            id: product.id,
                                            name: product.title,
                                            title: product.title,
                                            handle: product.handle,
                                            vendor: product.vendor,
                                            productType: product.productType,
                                            price: parseFloat(product.priceRange?.minVariantPrice?.amount || '0').toFixed(2),
                                            currencyCode: product.priceRange?.minVariantPrice?.currencyCode || 'USD',
                                            image: product.images?.nodes?.[0]?.url || '',
                                            priceRange: product.priceRange
                                        }} 
                                    />
                                </div>
                            ))}
                            {/* Events */}
                            {activeFilter === 'events' && searchResults.events.map((event, index) => (
                                <div 
                                    className="search-result-card" 
                                    key={event.id + '-' + index}
                                    onClick={() => navigate(`/events/${event.handle}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="search-result-image">
                                        <img src={event.image?.url || ''} alt={event.title} />
                                    </div>
                                    <div className="search-result-content">
                                        <h3>{event.title}</h3>
                                        <p>{event.excerpt}</p>
                                    </div>
                                </div>
                            ))}
                            {/* Journals/Blogs */}
                            {activeFilter === 'journals' && searchResults.journals.map((journal, index) => (
                                <div 
                                    className="search-result-card" 
                                    key={journal.id + '-' + index}
                                    onClick={() => navigate(`/blogs/${journal.handle}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="search-result-image">
                                        <img src={journal.image?.url || ''} alt={journal.title} />
                                    </div>
                                    <div className="search-result-content">
                                        <h3>{journal.title}</h3>
                                        <p>{journal.excerpt}</p>
                                    </div>
                                </div>
                            ))}
                            {/* Live Sessions/Care Hub */}
                            {activeFilter === 'liveSessions' && searchResults.liveSessions.map((session, index) => (
                                <div 
                                    className="search-result-card" 
                                    key={session.id + '-' + index}
                                    onClick={() => navigate(`/carehub/${session.handle}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="search-result-image">
                                        <img src={session.image?.url || ''} alt={session.title} />
                                    </div>
                                    <div className="search-result-content">
                                        <h3>{session.title}</h3>
                                        <p>{session.excerpt}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="breadcrumbs-search-results-section">
                            <NavLink to="/">Home</NavLink>
                            <ChevronRight />
                            <span>Search results</span>
                        </div>
                        <div className="search-results-header">
                            <h1 className="search-query-title">Search Results</h1>
                            <div className={`srp-input-container ${searchQuery.length > 0 ? '' : 'initial-stage-input'}`}>
                                <input 
                                    type="text" 
                                    value={searchQuery} 
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for products..."
                                />
                                {loading ? (
                                    <button className='clear-btn' disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    </button>
                                ) : searchQuery.trim() && (
                                    <button className='clear-btn' onClick={() => setSearchQuery('')}>Clear</button>
                                )}
                            </div>
                        </div>

                        <div className="search-no-results-container">
                            <h2>No results found </h2>
                            <p>
                                We couldn't find any products matching your search. 
                                Try different keywords or browse our shop for more options.
                            </p>
                            <button className="back-to-shop-btn button-pink-center" onClick={() => navigate('/shop')}>
                                Browse All Products
                            </button>
                        </div>
                    </>
                    
                )}
            </div>
        </div>
    )
}

export default SearchResults
