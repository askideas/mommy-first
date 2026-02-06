import { X } from 'lucide-react'
import React, { useState, useEffect, useCallback } from 'react'
import './SearchModal.css'
import DefaultImg from '../../../assets/default.png'
import { useNavigate } from 'react-router-dom'
import NoResultsImagefrom from '../../../assets/search/no-results-search-icon.svg'
import SearchResultSkeleton from './SearchResultSkeleton'

const SearchModal = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({
        products: [],
        events: [],
        journals: [],
        liveSessions: []
    });
    const [activeFilter, setActiveFilter] = useState('products');
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const navigate = useNavigate();

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

    // Function to search products
    const searchProducts = async (query, token) => {
        if (!query.trim()) {
            setSearchResults({
                products: [],
                events: [],
                journals: [],
                liveSessions: []
            });
            setNoResults(false);
            return;
        }

        try {
            setLoading(true);
            setNoResults(false);
            
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/search/${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            const predictiveSearch = data.data?.predictiveSearch;
            
            if (predictiveSearch) {
                const products = predictiveSearch.products || [];
                const articles = predictiveSearch.articles || {};
                const events = articles.events || [];
                const journals = articles.journals || [];
                const liveSessions = articles['live-sessions'] || [];
                
                const hasResults = products.length > 0 || events.length > 0 || journals.length > 0 || liveSessions.length > 0;
                
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
                
                setNoResults(!hasResults);
            } else {
                setSearchResults({
                    products: [],
                    events: [],
                    journals: [],
                    liveSessions: []
                });
                setNoResults(true);
            }
        } catch (err) {
            console.error('Error searching products:', err);
            setSearchResults({
                products: [],
                events: [],
                journals: [],
                liveSessions: []
            });
            setNoResults(true);
        } finally {
            setLoading(false);
        }
    };

    // Debounced search effect
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim()) {
                let token = authToken;
                if (!token) {
                    token = await fetchAuthToken();
                }
                if (token) {
                    searchProducts(searchQuery, token);
                }
            } else {
                setSearchResults([]);
                setNoResults(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Fetch token on component mount
    useEffect(() => {
        fetchAuthToken();
    }, []);

    const handleClear = () => {
        setSearchQuery('');
        setSearchResults({
            products: [],
            events: [],
            journals: [],
            liveSessions: []
        });
        setNoResults(false);
        setActiveFilter('products');
    };

    const getTotalResults = () => {
        return (searchResults?.products?.length || 0) + (searchResults?.events?.length || 0) + (searchResults?.journals?.length || 0) + (searchResults?.liveSessions?.length || 0);
    };

    const handleBlogClick = (handle) => {
        navigate(`/blogs/${handle}`);
        const modalElement = document.getElementById('SearchModal');
        const modal = window.bootstrap.Offcanvas.getInstance(modalElement);
        if (modal) modal.hide();
    };

    const handleEventClick = (handle) => {
        navigate(`/events/${handle}`);
        const modalElement = document.getElementById('SearchModal');
        const modal = window.bootstrap.Offcanvas.getInstance(modalElement);
        if (modal) modal.hide();
    };

    const handleProductClick = (handle) => {
        navigate(`/shop/${handle}`);
        // Close modal
        const modalElement = document.getElementById('SearchModal');
        const modal = window.bootstrap.Offcanvas.getInstance(modalElement);
        if (modal) modal.hide();
    };

    const handleSeeAllResults = () => {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        // Close modal
        const modalElement = document.getElementById('SearchModal');
        const modal = window.bootstrap.Offcanvas.getInstance(modalElement);
        if (modal) modal.hide();
    };
  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="SearchModal" aria-labelledby="offcanvasRightLabel">
        <div className="mf-off-canvas-header">
            <p className="head-ing">Search</p>
            <button className="close-btn" data-bs-dismiss="offcanvas" aria-label="Close"><X /></button>
        </div>

        <div className="search-modal-body-container">
            <div className={`search-bar-container ${searchQuery.length > 0 ? '' : 'initial-stage-input'}`}>
                <input 
                    type="text" 
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {/* Show loader while loading, clear button only in stage 2 (results) and stage 3 (no results) */}
                {loading ? (
                    <button className='clear-btn' disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </button>
                ) : (searchQuery.trim() && (getTotalResults() > 0 || noResults)) && (
                    <button className='clear-btn' onClick={handleClear}>Clear</button>
                )}
            </div>

            {/* Initial Stage - No search query */}
            {!searchQuery.trim() && !loading && (
                <div className="search-initial-state">
                    <div className="quick-search-terms-con">
                        <p className="quick-search-heading">Quick search for</p>
                        <div className="quick-search-btn-con">
                            <button onClick={(e) => setSearchQuery('Peri bottle')}>Peri bottle</button>
                            <button onClick={(e) => setSearchQuery('Postpartum care kit')}>Postpartum care kit</button>
                            <button onClick={(e) => setSearchQuery('C-Section Kit')}>C-Section kit</button>
                            <button onClick={(e) => setSearchQuery('Cooling Pad')}>Cooling Pad</button>
                            <button onClick={(e) => setSearchQuery('Underwear')}>Underwear</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading Stage - Show skeleton loaders */}
            {loading && searchQuery.trim() && (
                <div className="search-results-container left">
                    <div className="search-results-filter left">
                        <p className="results-found">Searching for '{searchQuery}'...</p>
                        <div className="filters-section left">
                            <button className='active'>Products</button>
                        </div>
                    </div>
                    <div className="results-list">
                        {[...Array(5)].map((_, index) => (
                            <SearchResultSkeleton key={index} />
                        ))}
                    </div>
                </div>
            )}

            {/* Results Stage */}
            {!loading && searchQuery.trim() && getTotalResults() > 0 && (
                <div className="search-results-container left">
                    <div className="search-results-filter left">
                        <p className="results-found">You searched for '{searchQuery}'</p>
                        <div className="filters-section left">
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
                    <div className="results-list">
                        {/* Products */}
                        {activeFilter === 'products' && searchResults.products.map((item, index) => (
                            <div 
                                className="reults-item" 
                                key={index}
                                onClick={() => handleProductClick(item.handle)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="prd-img">
                                    <img 
                                        src={item.images?.nodes?.[0]?.url || DefaultImg} 
                                        alt={item.title}
                                        onError={(e) => e.target.src = DefaultImg}
                                    />
                                </div>
                                <div className="content-details">
                                    <p className="prd-name">{item.title}</p>
                                    <p className="prd-price">${parseFloat(item.priceRange?.minVariantPrice?.amount || '0').toFixed(2)} {item.priceRange?.minVariantPrice?.currencyCode || 'USD'}</p>
                                </div>
                            </div>
                        ))}
                        {/* Events */}
                        {activeFilter === 'events' && searchResults.events.map((item, index) => (
                            <div 
                                className="reults-item" 
                                key={index}
                                onClick={() => handleEventClick(item.handle)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="prd-img">
                                    <img 
                                        src={item.image?.url || DefaultImg} 
                                        alt={item.title}
                                        onError={(e) => e.target.src = DefaultImg}
                                    />
                                </div>
                                <div className="content-details">
                                    <p className="prd-name">{item.title}</p>
                                    <p className="prd-excerpt">{item.excerpt}</p>
                                </div>
                            </div>
                        ))}
                        {/* Journals/Blogs */}
                        {activeFilter === 'journals' && searchResults.journals.map((item, index) => (
                            <div 
                                className="reults-item" 
                                key={index}
                                onClick={() => handleBlogClick(item.handle)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="prd-img">
                                    <img 
                                        src={item.image?.url || DefaultImg} 
                                        alt={item.title}
                                        onError={(e) => e.target.src = DefaultImg}
                                    />
                                </div>
                                <div className="content-details">
                                    <p className="prd-name">{item.title}</p>
                                    <p className="prd-excerpt">{item.excerpt}</p>
                                </div>
                            </div>
                        ))}
                        {/* Live Sessions/Care Hub */}
                        {activeFilter === 'liveSessions' && searchResults.liveSessions.map((item, index) => (
                            <div 
                                className="reults-item" 
                                key={index}
                                onClick={() => handleBlogClick(item.handle)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="prd-img">
                                    <img 
                                        src={item.image?.url || DefaultImg} 
                                        alt={item.title}
                                        onError={(e) => e.target.src = DefaultImg}
                                    />
                                </div>
                                <div className="content-details">
                                    <p className="prd-name">{item.title}</p>
                                    <p className="prd-excerpt">{item.excerpt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* No Results Stage */}
            {!loading && searchQuery.trim() && noResults && (
                <div className="search-no-results-con">
                    <img src={NoResultsImagefrom} alt="" />
                    <h1>No  result found</h1>
                    <p>We can’t find any item matching your search</p>
                </div>
            )}

            {getTotalResults() > 0 && (
                <div className="search-modal-footer">
                    <button className='button-pink-center' data-bs-dismiss="offcanvas" onClick={handleSeeAllResults}>
                        See all results...
                    </button>
                </div>
            )}
        </div>
    </div>
  )
}

export default SearchModal