import React, { useState, useEffect } from 'react'
import './Wishlist.css'
import HeroImage from '../../assets/hero-label.png'
import HeroImageLabel from '../../Components/HeroImageLabel/HeroImageLabel';
import { shopProducts } from '../../data/productsData'
import WishlistProductTile from '../../Components/WishlistProductTile/WishlistProductTile';

const Wishlist = () => {
    const PRODUCTS_PER_PAGE = 16;
    const TOTAL_PRODUCTS = shopProducts.length;
    
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [currentCount, setCurrentCount] = useState(PRODUCTS_PER_PAGE);

    const HeroLabel = {
        image: HeroImage,
        text: 'Designed to Maximize Comfort for Expecting Moms',
        height: 280,
        pwidth: 487
    };

    // Initialize with first 16 products
    useEffect(() => {
        setDisplayedProducts(shopProducts.slice(0, PRODUCTS_PER_PAGE));
    }, []);

    // Handle Load More button click
    const handleLoadMore = () => {
        const newCount = Math.min(currentCount + PRODUCTS_PER_PAGE, TOTAL_PRODUCTS);
        setDisplayedProducts(shopProducts.slice(0, newCount));
        setCurrentCount(newCount);
    };

    // Calculate progress percentage
    const progressPercentage = (currentCount / TOTAL_PRODUCTS) * 100;

  return (
    <div className="wishlist-page-container">
        <HeroImageLabel data={HeroLabel} />
        <div className="container">
            <div className="wishlist-items-main-container">
                <div className="wishlist-items">
                    {
                        displayedProducts.map((product, index)=> {
                            return (
                                <WishlistProductTile data={product} key={product.id + '-' + index} />
                            )
                        })
                    }
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <p className='wishlist-progress-bar-text'>
                        You've seen {currentCount} out of {TOTAL_PRODUCTS} items
                    </p>
                    <div className="wishlist-progress-bar-con">
                        <span style={{ width: `${progressPercentage}%` }}></span>
                    </div>
                    {currentCount < TOTAL_PRODUCTS && (
                        <button 
                            className='button-label' 
                            onClick={handleLoadMore}
                        >
                            Load more
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Wishlist