import React from 'react'
import './BundleTile.css'
import BundleTileImg from '../../assets/BundleRecom/bundle-item-1.png'
import HightLightImg from '../../assets/BundlesHome/badge.png'

const BundleTile = (props) => {
    const data = props.data;

    // Extract price from API response
    const price = data.priceRange?.minVariantPrice?.amount || data.variants?.[0]?.price?.amount || '0';
    const currencyCode = data.priceRange?.minVariantPrice?.currencyCode || 'USD';
    
    // Extract image from API response
    const image = data.images?.[0]?.url || BundleTileImg;
    
    // Parse tags from metafields
    const tagsMetafield = data.metafields?.find(m => m.key === 'tags');
    const contents = tagsMetafield ? tagsMetafield.value.split(',') : [];
    const bundleDuration = data.metafields?.find(m => m.key === 'duration');
    const isBestValue = data.metafields?.find(m => m.key === 'best_value');
    
    // Default highlights
    const highlights = [
        "Easy and Secure checkout",
        "Loved by moms",
        "FREE shipping",
        "Hassle free return policy"
    ];
    
    return (
        <div className={`bundles-best-value-section-tile ${isBestValue.value ? 'activeTile' : ''}`}>
            {
                isBestValue.value ? (
                    <div className="image-highlist">
                        <img src={HightLightImg} alt="" />
                        <span>Best Value</span>
                    </div>
                ) : (<></>)
            }
            
            <p className="heading-label-sec">
                <span className="bundle-name">{data.title}</span>
                <span className="days-label">{bundleDuration.value || ''}</span>
            </p>

            <p className="bundle-description">{data.description || data.descriptionHtml?.replace(/<[^>]*>/g, '') || ''}</p>

            <img src={image} alt={data.title} className="bundle-tile-image" />

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
                <span className="price-label">Retail value ${data.retailValue || parseFloat(price).toFixed(2)} | Save ${data.savings || '0.00'}</span>
            </p>

            <button className="button-pink-center">ADD TO BAG</button>

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