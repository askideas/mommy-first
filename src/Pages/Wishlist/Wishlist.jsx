import React from 'react'
import './Wishlist.css'
import HeroImage from '../../assets/hero-label.png'
import HeroImageLabel from '../../Components/HeroImageLabel/HeroImageLabel';
import { shopProducts } from '../../data/productsData'
import ProductTile from '../../Components/ProductTile/ProductTile';

const Wishlist = () => {
    const HeroLabel = {
        image: HeroImage,
        text: 'Designed to Maximize Comfort for Expecting Moms',
        height: 280,
        pwidth: 487
    };
  return (
    <div className="wishlist-page-container">
        <HeroImageLabel data={HeroLabel} />
        <div className="container">
            <div className="wishlist-items-main-container">
                <div className="wishlist-items">
                    {
                        shopProducts.map((product, index)=> {
                            return (
                                <ProductTile data={product} key={product.id + '-' + index} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Wishlist