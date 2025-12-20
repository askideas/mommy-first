import React, { useState, useEffect } from 'react'
import './Shop.css'
import HeroImageLabel from '../../Components/HeroImageLabel/HeroImageLabel'
import HeroImage from '../../assets/hero-label.png'
import { Settings2 } from 'lucide-react'
import ProductTile from '../../Components/ProductTile/ProductTile'
import MomsReviewsSlider from '../../Components/MomsReviewsSlider/MomsReviewsSlider'
import MomsMomentsSlider from '../../Components/MomsMomentsSlider/MomsMomentsSlider'
import FaqSlider from '../../Components/FaqSlider/FaqSlider'
import { shopProducts } from '../../data/productsData'

const Shop = () => {
    const PRODUCTS_PER_PAGE = 16;
    const TOTAL_PRODUCTS = shopProducts.length; // 124 products
    
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
    <>
        <HeroImageLabel data={HeroLabel} />
        <div className="container" style={{marginBottom: '154px'}}>
            <div className="shop-filters-section">
                <div className="quick-filters-section">
                    <button className='filter-button active'>ALL</button>
                    <button className='filter-button'>MATERNITY 🤰</button>
                    <button className='filter-button'>Postpartum 🤱</button>
                    <button className='filter-button'>Wellness & Comfort 🌿</button>
                </div>
                <button className="filter-btn-modal">FILTER <Settings2 /></button>
            </div>

            <div className="products-list-container">
                {
                    displayedProducts.map((item, index)=> {
                        return(
                            <ProductTile data={item} key={item.id + '-' + index} />
                        )
                    })
                }
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center">
                <p className='progress-bar-text'>
                    You've seen {currentCount} out of {TOTAL_PRODUCTS} items
                </p>
                <div className="progress-bar-con">
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

        <MomsReviewsSlider />
        <MomsMomentsSlider />
        <FaqSlider />
    </>
  )
}

export default Shop