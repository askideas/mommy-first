import React, { useState, useEffect } from 'react'
import './NewArrivals.css'
import Heading from '../Heading/Heading'
import { ChevronDown } from 'lucide-react'
import ProductTile from '../ProductTile/ProductTile'
import P1 from '../../assets/products/prd1.svg'
import P2 from '../../assets/products/prd2.svg'
import P3 from '../../assets/products/prd3.svg'
import P4 from '../../assets/products/prd4.svg'
import { useNavigate } from 'react-router-dom'

const NewArrivals = (props) => {
    const data = props.data
    const navigate = useNavigate()
    const [productsData, setProductsData] = useState([])
    const [authToken, setAuthToken] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const headingData = {
        'title': "NEW ARRIVALS",
        'subtitle': "Every Step, Wrapped in Comfort",
        'description': false
    }

    // console.log(data);
    

    // Fetch authentication token
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

            const result = await response.json();
            if (result.success && result.token) {
                setAuthToken(result.token);
                return result.token;
            } else {
                throw new Error(result.message || 'Failed to get authentication token');
            }
        } catch (err) {
            console.error('Error fetching auth token:', err);
            setError(`Failed to authenticate: ${err.message}`);
            return null;
        }
    };

    // Transform Shopify product data
    const transformProduct = (shopifyProduct) => {
        const firstVariant = shopifyProduct.variants?.edges?.[0]?.node;
        const firstImage = shopifyProduct.images?.edges?.[0]?.node;
        
        return {
            id: shopifyProduct.id,
            name: shopifyProduct.title,
            title: shopifyProduct.title,
            image: firstImage?.url || '',
            price: parseFloat(firstVariant?.price?.amount || '0').toFixed(2),
            label: shopifyProduct.tags?.[0] || '10K+ bought in past month',
            ...shopifyProduct
        };
    };

    // Fetch products from collection
    const fetchProductsFromCollection = async (token) => {
        try {
            setLoading(true);
            const url = `${import.meta.env.VITE_API_BASE_URL}/products?cid=${data && data.collections[0].collectionId ? data.collections[0].collectionId : 'new-arrivals'}`;
            
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

            const result = await response.json();
            console.log('New arrivals products:', result);

            if (result && result.products.length > 0) {
                const products = result.products
                const transformedProducts = products.slice(0, 4).map(transformProduct);
                setProductsData(transformedProducts); // Show only first 4 products

                setError(null);
            } else {
                throw new Error(result.message || 'Failed to fetch products');
            }
            setLoading(false);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err.message);
            setLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        const initFetch = async () => {
            const token = await fetchAuthToken();
            if (token) {
                await fetchProductsFromCollection(token);
            }
        };
        initFetch();
    }, []);

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
        <Heading data={headingData} />
        <div className="container">
            <div className="new-arrivals-filter-section">
                <div className="filters-section my-4 justify-content-start flex-fill">
                    <button className='filter-button active'>ALL</button>
                    <button className='filter-button'>MATERNITY </button>
                    <button className='filter-button'>Postpartum </button>
                    <button className='filter-button'>Wellness & Comfort </button>
                </div>
            </div> 

            <div className="newarrivals-products-container">
                {
                    displayProducts.map((item, index)=> {
                        return(
                            <ProductTile data={item} key={index} />
                        )
                    })
                }
            </div>
            
            <div className="d-flex flex-column justify-content-center align-items-center">
                <p className='progress-bar-text'>You've seen 4 out of 98 items</p>
                <div className="progress-bar-con">
                    <span></span>
                </div>
                <button className='button-label' onClick={()=> navigate('/shop')}>View more</button>
            </div>
            
        </div>
        
    </div>
  )
}

export default NewArrivals
