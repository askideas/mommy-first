import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, useParams } from 'react-router-dom'
import './SearchResults.css'
import ProductTile from '../../Components/ProductTile/ProductTile'

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const { query: pathQuery } = useParams();
    const navigate = useNavigate();
    
    // Support both query params (?q=) and path params (/search/query)
    const searchQuery = searchParams.get('q') || pathQuery || '';

    const [products, setProducts] = useState([]);
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
            label: shopifyProduct.tags?.[0] || '',
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

    // Function to search products
    const searchProducts = async (query, token) => {
        if (!query.trim()) {
            setProducts([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`, {
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
            
            if (data.success && data.products) {
                const transformedProducts = data.products.map(transformProduct);
                setProducts(transformedProducts);
            } else {
                setProducts([]);
            }
        } catch (err) {
            console.error('Error searching products:', err);
            setError(`Failed to load search results: ${err.message}`);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Initialize search when component mounts or query changes
    useEffect(() => {
        const initializeSearch = async () => {
            if (!searchQuery) {
                navigate('/shop');
                return;
            }

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
        };

        initializeSearch();
    }, [searchQuery]);

    return (
        <div className="search-results-page">
            <div className="container">
                {loading ? (
                    <div className="search-loading-container">
                        <p>Searching for "{searchQuery}"...</p>
                    </div>
                ) : error ? (
                    <div className="search-error-container">
                        <p>{error}</p>
                        <button className="back-to-shop-btn" onClick={() => navigate('/shop')}>
                            Back to Shop
                        </button>
                    </div>
                ) : products.length > 0 ? (
                    <>
                        <div className="search-results-header">
                            <h1 className="search-query-title">Search results for "{searchQuery}"</h1>
                            <p className="search-results-count">
                                {products.length} product{products.length > 1 ? 's' : ''} found
                            </p>
                        </div>
                        <div className="search-products-grid">
                            {products.map((product, index) => (
                                <ProductTile data={product} key={product.id + '-' + index} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="search-no-results-container">
                        <h2>No results found for "{searchQuery}"</h2>
                        <p>
                            We couldn't find any products matching your search. 
                            Try different keywords or browse our shop for more options.
                        </p>
                        <button className="back-to-shop-btn" onClick={() => navigate('/shop')}>
                            Browse All Products
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchResults
