import React from 'react'
import './BundleTile.css'
import BundleTileImg from '../../assets/BundleRecom/bundle-item-1.png'

const BundleTile = (props) => {
    const data = props.data;
    return (
        <div className="bundles-best-value-section-tile">
            {/* <div className="image-highlist">
                <img src={HightLightImg} alt="" />
                <span>Best Value</span>
            </div> */}

            <p className="heading-label-sec">
                <span className="bundle-name">{data.title}</span>
                <span className="days-label">{data.duration}</span>
            </p>

            <p className="bundle-description">{data.description}</p>

            <img src={BundleTileImg} alt="" className="bundle-tile-image" />

            <div className="bundle-items">
                {
                    data.contents.map((item, index) => {
                        return (
                            <span key={index}>{item.quantity} {item.label}</span>
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
                <span className="price">${data.price}</span>
                <span className="price-label">Retail value ${data.retailValue} | Save ${data.savings}</span>
            </p>

            <button className="button-pink-center">ADD TO BAG</button>

            <div className="feature-of-bundle">
                {
                    data.highlights.map((item,index) => {
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