import React, { useState, useEffect } from 'react'
import './NewArrivals.css'
import Heading from '../Heading/Heading'
import { useFadeUpAnimation, getFadeUpClass } from '../../hooks/useFadeUpAnimation'
import ProductTile from '../ProductTile/ProductTile'
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader'
import P1 from '../../assets/products/prd1.svg'
import P2 from '../../assets/products/prd2.svg'
import P3 from '../../assets/products/prd3.svg'
import P4 from '../../assets/products/prd4.svg'
import { useNavigate } from 'react-router-dom'

const NewArrivals = (props) => {
    const navigate = useNavigate()
    const [productsData, setProductsData] = useState([])
    const [authToken, setAuthToken] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeCollection, setActiveCollection] = useState('new-arrivals')

    // Animation refs
    const [headingRef, headingVisible] = useFadeUpAnimation(0.2)
    const [filterRef, filterVisible] = useFadeUpAnimation(0.2)
    const [productsRef, productsVisible] = useFadeUpAnimation(0.2)
    const [progressRef, progressVisible] = useFadeUpAnimation(0.2)

    const headingData = {
        'title': "NEW ARRIVALS",
        'subtitle': "Every Step, Wrapped in Comfort",
        'description': false
    }

    // Fetch authentication token
    const fetchAuthToken = async () => {
        try {
            console.log('Fetching auth token...');
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
                const errorText = await response.text();
                console.error('Auth error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
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

    // Transform product data to match expected format
    const transformProduct = (productEdge) => {
        const product = productEdge?.node || productEdge || {};
        const firstVariant = product.variants?.nodes?.[0] || product.variants?.[0];
        const firstImage = product.images?.nodes?.[0] || product.images?.[0];
        
        return {
            id: product.id,
            name: product.title,
            title: product.title,
            description: product.description,
            handle: product.handle,
            productType: product.productType,
            vendor: product.vendor,
            tags: product.tags,
            image: firstImage?.url || '',
            price: parseFloat(firstVariant?.price?.amount || product.priceRange?.minVariantPrice?.amount || '0').toFixed(2),
            currencyCode: firstVariant?.price?.currencyCode || product.priceRange?.minVariantPrice?.currencyCode || 'USD',
            compareAtPrice: firstVariant?.compareAtPrice?.amount || product.compareAtPriceRange?.minVariantPrice?.amount || null,
            availableForSale: product.availableForSale,
            images: product.images?.nodes || product.images || [],
            variants: product.variants?.nodes || product.variants || [],
            priceRange: product.priceRange,
            label: product.tags?.[0] || '10K+ bought in past month'
        };
    };

    // Fetch products from collection
    const fetchProductsFromCollection = async (token, collectionHandle = 'new-arrivals') => {
        try {
            setLoading(true);
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

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            const collection = responseData.data?.collection || responseData.collection;
            const productEdges = Array.isArray(collection?.products)
                ? collection.products
                : (collection?.products?.edges || []);

            if (productEdges.length > 0) {
                const transformedProducts = productEdges
                    .map(edge => edge.node ? transformProduct(edge) : transformProduct({ node: edge }))
                    .slice(0, 4);
                setProductsData(transformedProducts);
                setError(null);
            } else {
                setProductsData([]);
            }
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        const initFetch = async () => {
            let token = authToken;
            if (!token) {
                token = await fetchAuthToken();
            }
            if (token) {
                await fetchProductsFromCollection(token, activeCollection);
            } else {
                setLoading(false);
            }
        };
        initFetch();
    }, [activeCollection, authToken]);

    // Handle filter button click
    const handleFilterClick = (collection) => {
        setActiveCollection(collection);
    };

    // Fallback products if API fails
    const fallbackProducts = [
        {
            'id': 1,
            'image': P1,
            'name': 'EasyCleanse Peri Bottle',
            'price': '13.99',
            'label': '10K+ bought in past month'
        },
        {
            'id': 2,
            'image': P2,
            'name': 'High-Waisted Maternity Underwear',
            'price': '13.99',
            'label': '10K+ bought in past month'
        },
        {
            'id': 3,
            'image': P3,
            'name': 'Witch Hazel Foam +Liner Combo',
            'price': '13.99',
            'label': '10K+ bought in past month'
        },
        {
            'id': 4,
            'image': P4,
            'name': 'EasyCleanse Peri Bottle',
            'price': '13.99',
            'label': '10K+ bought in past month'
        }
    ]

    const displayProducts = productsData.length > 0 ? productsData : fallbackProducts

  return (
    <div style={{marginBottom: '154px'}}>
        <div ref={headingRef} className={getFadeUpClass('fade-up-animation', headingVisible)}>
            <Heading data={headingData} />
        </div>
        <div className="container">
            <div ref={filterRef} className={getFadeUpClass('fade-up-animation', filterVisible)}>
                <div className="new-arrivals-filter-section">
                    <div className="filters-section my-4 justify-content-start flex-fill">
                        <button 
                            className={`filter-button ${activeCollection === 'new-arrivals' ? 'active' : ''}`} 
                            data-collection="new-arrivals"
                            onClick={() => handleFilterClick('new-arrivals')}
                        >
                            ALL
                        </button>
                        <button 
                            className={`filter-button ${activeCollection === 'maternity' ? 'active' : ''}`} 
                            data-collection="maternity"
                            onClick={() => handleFilterClick('maternity')}
                        >
                            MATERNITY
                        </button>
                        <button 
                            className={`filter-button ${activeCollection === 'postpartum' ? 'active' : ''}`} 
                            data-collection="postpartum"
                            onClick={() => handleFilterClick('postpartum')}
                        >
                            POSTPARTUM
                        </button>
                        <button 
                            className={`filter-button ${activeCollection === 'wellness-comfort' ? 'active' : ''}`} 
                            data-collection="wellness-comfort"
                            onClick={() => handleFilterClick('wellness-comfort')}
                        >
                            WELLNESS & COMFORT
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="newarrivals-products-container">
                    <SkeletonLoader count={4} />
                </div>
            ) : (
                <>
                    <div ref={productsRef} className={getFadeUpClass('fade-up-animation', productsVisible)}>
                        <div className="newarrivals-products-container">
                            {
                                displayProducts.map((item, index)=> {
                                    return(
                                        <ProductTile data={item} key={index} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    
                    <div ref={progressRef} className={getFadeUpClass('fade-up-animation', progressVisible)}>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <p className='progress-bar-text'>You've seen 4 out of 98 items</p>
                            <div className="progress-bar-con">
                                <span></span>
                            </div>
                            <button className='button-label' onClick={()=> navigate('/shop')}>View more</button>
                        </div>
                    </div>
                </>
            )}
            
        </div>
        
    </div>
  )
}

export default NewArrivals
