import { X } from 'lucide-react'
import React, { useState, useEffect, useCallback } from 'react'
import './SearchModal.css'
import DefaultImg from '../../../assets/default.png'
import { useNavigate } from 'react-router-dom'
import NoResultsImagefrom from '../../../assets/search/no-results-search-icon.svg'

const SearchModal = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
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
            setSearchResults([]);
            setNoResults(false);
            return;
        }

        try {
            setLoading(true);
            setNoResults(false);
            
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`, {
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
            
            if (data.success && data.products && data.products.length > 0) {
                // Transform products to match expected format
                const transformedProducts = data.products.map(product => {
                    const firstVariant = product.variants?.edges?.[0]?.node;
                    const firstImage = product.images?.edges?.[0]?.node;
                    
                    return {
                        id: product.id,
                        title: product.title,
                        price: parseFloat(firstVariant?.price?.amount || '0').toFixed(2),
                        currency: firstVariant?.price?.currencyCode || 'USD',
                        image: firstImage?.url || DefaultImg
                    };
                });
                
                setSearchResults(transformedProducts);
                setNoResults(false);
            } else {
                setSearchResults([]);
                setNoResults(true);
            }
        } catch (err) {
            console.error('Error searching products:', err);
            setSearchResults([]);
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
        setSearchResults([]);
        setNoResults(false);
    };

    const handleProductClick = (productId) => {
        navigate(`/shop/${productId}`);
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
    <div class="offcanvas offcanvas-end" tabindex="-1" id="SearchModal" aria-labelledby="offcanvasRightLabel">
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
                ) : (searchQuery.trim() && (searchResults.length > 0 || noResults)) && (
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

            {/* Results Stage */}
            {!loading && searchQuery.trim() && searchResults.length > 0 && (
                <div className="search-results-container">
                    <p className="results-count">{searchResults.length} Result{searchResults.length > 1 ? 's' : ''} found</p>
                    <div className="results-list">
                        {searchResults.map((item, index) => (
                            <div 
                                className="reults-item" 
                                key={index}
                                onClick={() => handleProductClick(item.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="prd-img">
                                    <img 
                                        src={item.image || DefaultImg} 
                                        alt={item.title}
                                        onError={(e) => e.target.src = DefaultImg}
                                    />
                                </div>
                                <div className="content-details">
                                    <p className="prd-name">{item.title}</p>
                                    <p className="prd-price">${item.price} {item.currency}</p>
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

            {searchResults.length > 0 && (
                <div className="search-modal-footer">
                    <button className='button-pink-center' onClick={handleSeeAllResults}>
                        See all results...
                    </button>
                </div>
            )}
        </div>
    </div>
  )
}

export default SearchModal