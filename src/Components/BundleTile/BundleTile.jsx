import React, { useState } from 'react'
import './BundleTile.css'
import BundleTileImg from '../../assets/BundleRecom/bundle-item-1.png'
import HightLightImg from '../../assets/BundlesHome/badge.png'
import { Loader2, Check } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { toast } from 'react-toastify'

const BundleTile = (props) => {
    const data = props.data;
    console.log(data);
    
    const product = data?.node || data || {};
    const { addToCart } = useCart()
    const [isAdding, setIsAdding] = useState(false)
    const [isAdded, setIsAdded] = useState(false)
    const [error, setError] = useState('')

    // Extract price from API response
    const price = product.priceRange?.minVariantPrice?.amount
        || product.variants?.nodes?.[0]?.price?.amount
        || product.variants?.[0]?.price?.amount
        || '0';
    const currencyCode = product.priceRange?.minVariantPrice?.currencyCode || 'USD';
    
    // Extract image from API response
    const image = product.images?.nodes?.[0]?.url
        || product.images?.[0]?.url
        || BundleTileImg;
    
    // Parse tags from metafields
    const rawMetafields = product.metafields ?? data?.metafields ?? data?.node?.metafields;
    const metafields = Array.isArray(rawMetafields?.nodes)
        ? rawMetafields.nodes
        : Array.isArray(rawMetafields?.edges)
            ? rawMetafields.edges.map(edge => edge.node)
            : Array.isArray(rawMetafields)
                ? rawMetafields
                : [];
    const tagsMetafield = metafields.find(m => m.key === 'tags');
    const contents = tagsMetafield?.value
        ? String(tagsMetafield.value).split(',').map(item => item.trim()).filter(Boolean)
        : [];
    const bundleDuration = metafields.find(m => m.key === 'duration');
    const isBestValue = metafields.find(m => m.key === 'best_value');
    const isBestValueActive = isBestValue?.value === true || isBestValue?.value === 'true';
    
    // Default highlights
    const highlights = [
        "Easy and Secure checkout",
        "Loved by moms",
        "FREE shipping",
        "Hassle free return policy"
    ];

    const handleAddToCart = async (e) => {
        e.stopPropagation() // Prevent any parent click handlers
        
        if (isAdding || isAdded) return
        
        setIsAdding(true)
        setError('')

        try {
            // Get the first variant ID from the bundle/product
            const variantId = product.variants?.nodes?.[0]?.id
                || product.variants?.[0]?.id
                || `gid://shopify/ProductVariant/${product.id}`
            
            const items = [{
                variantId: variantId,
                quantity: 1
            }]

            console.log('Adding bundle to cart:', items)
            const response = await addToCart(items)
            console.log('Add to cart response:', response)

            if (response.success) {
                setIsAdded(true)
                toast.success('Bundle added to cart!', {
                    autoClose: 1500,
                    hideProgressBar: true
                })
                // Reset after 2 seconds
                setTimeout(() => {
                    setIsAdded(false)
                }, 2000)
            } else {
                setError(response.message || 'Failed to add')
                toast.error(response.message || 'Failed to add bundle', {
                    autoClose: 1500,
                    hideProgressBar: true
                })
                setTimeout(() => setError(''), 3000)
            }
        } catch (err) {
            console.error('Add to cart error:', err)
            setError('Something went wrong')
            toast.error('Something went wrong', {
                autoClose: 1500,
                hideProgressBar: true
            })
            setTimeout(() => setError(''), 3000)
        } finally {
            setIsAdding(false)
        }
    }
    
    return (
        <div className={`bundles-best-value-section-tile ${isBestValueActive ? 'activeTile' : ''}`}>
            {
            isBestValueActive ? (
                    <div className="image-highlist">
                        <img src={HightLightImg} alt="" />
                        <span>Best Value</span>
                    </div>
                ) : (<></>)
            }
            
            <p className="heading-label-sec">
                <span className="bundle-name">{product.title}</span>
                <span className="days-label">{bundleDuration?.value ? String(bundleDuration.value) : ''}</span>
            </p>

            <p className="bundle-description">{product.description || product.descriptionHtml?.replace(/<[^>]*>/g, '') || ''}</p>

            <img src={image} alt={product.title} className="bundle-tile-image" />

            <div className="bundle-items">
                {
                    contents.map((item, index) => {
                        return (
                            <span key={index}>{item}</span>
                        )
                    })
                }
            </div>

            <svg className="line-separator" width="295" height="1" viewBox="0 0 295 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="0.5" x2="294.667" y2="0.5" stroke="#F2B8C6"/>
                <line y1="0.5" x2="294.667" y2="0.5" stroke="url(#paint0_linear_14742_6974)"/>
                <defs>
                <linearGradient id="paint0_linear_14742_6974" x1="0" y1="1.5" x2="294.667" y2="1.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="white"/>
                <stop offset="0.490385" stop-color="#EAA4B9"/>
                <stop offset="0.971154" stop-color="white"/>
                </linearGradient>
                </defs>
            </svg>

            <p className="bundle-price">
                <span className="price">${parseFloat(price).toFixed(2)}</span>
                <span className="price-label">Retail value ${product.retailValue || parseFloat(price).toFixed(2)} | Save ${product.savings || '0.00'}</span>
            </p>

            <button 
                className={`button-pink-center ${isAdded ? 'added' : ''} ${error ? 'error' : ''}`}
                onClick={handleAddToCart}
                disabled={isAdding}
            >
                {isAdding ? (
                    <><Loader2 className="spinner" size={16} /> Adding...</>
                ) : isAdded ? (
                    <><Check size={16} /> Added!</>
                ) : error ? (
                    error
                ) : (
                    'ADD TO BAG'
                )}
            </button>

            <div className="feature-of-bundle">
                {
                    highlights.map((item,index) => {
                        return (
                            <p key={index}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="#5ED34B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>{item}</span>
                            </p>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default BundleTile