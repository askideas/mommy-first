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
import EsImage1 from '../../assets/Hero/slider-img.png'
import EsImage2 from '../../assets/Hero/hero1.png'
import EsImage3 from '../../assets/Hero/hero2.png'
import MF1 from '../../assets/MF1.png'
import MF2 from '../../assets/MF2.png'

const Shop = () => {
    const PRODUCTS_PER_PAGE = 16;
    const TOTAL_PRODUCTS = shopProducts.length; // 124 products
    
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [currentCount, setCurrentCount] = useState(PRODUCTS_PER_PAGE);

    const espotsIndex = [3, 5, 14];
    
    // Espot images data - you can replace these URLs with your actual espot images
    const espotImages = [ MF1, MF2, EsImage1 ]

    const filters = [
        {
            id: 'stage',
            label: 'Stage',
            filters: [
            { id: 'new_moms', label: 'New Moms' },
            { id: 'experienced_moms', label: 'Experienced Moms' },
            { id: 'working_moms', label: 'Working Moms' },
            { id: 'travel_friendly', label: 'Travel friendly' },
            { id: 'pregnancy', label: 'Pregnancy' }
            ]
        },
        {
            id: 'price_range',
            label: 'Price range',
            filters: [
            { id: 'low_to_high', label: 'Low to High' },
            { id: 'high_to_low', label: 'High to Low' }
            ]
        },
        {
            id: 'sort_by',
            label: 'Sort by',
            filters: [
            { id: 'best_sellers', label: 'Best Sellers' },
            { id: 'new_arrivals', label: 'New Arrivals' },
            { id: 'customer_rating', label: 'Customer Rating' }
            ]
        },
        {
            id: 'availability',
            label: 'Availability',
            filters: [
            { id: 'in_stock', label: 'In Stock' },
            { id: 'out_of_stock', label: 'Out of Stock' }
            ]
        }
    ];

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

    // Function to render products with espots
    const renderProductsWithEspots = () => {
        const items = [];
        displayedProducts.forEach((product, index) => {
            // Add product
            items.push(
                <ProductTile data={product} key={product.id + '-' + index} />
            );
            
            // Check if we need to insert an espot after this product
            const productPosition = index + 1; // 1-indexed position
            const espotIndexPosition = espotsIndex.indexOf(productPosition);
            
            if (espotIndexPosition !== -1 && productPosition <= currentCount) {
                items.push(
                    <div className="espot-container" key={`espot-${productPosition}`}>
                        <img 
                            src={espotImages[espotIndexPosition % espotImages.length]} 
                            alt={`Espot ${espotIndexPosition + 1}`}
                            className="espot-image"
                        />
                    </div>
                );
            }
        });
        return items;
    };

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
                <button className="filter-btn-modal" data-bs-toggle="offcanvas" data-bs-target="#shopFilterModal">FILTER <Settings2 /></button>
            </div>

            <div className="products-list-container">
                {renderProductsWithEspots()}
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

            <div class="offcanvas offcanvas-end" tabindex="-1" id="shopFilterModal" aria-labelledby="offcanvasRightLabel">
                <div style={{flex: '1'}}>
                    <div className="heading"><Settings2 /> Filter by</div>
                    <div className="filters-items-container">
                        {
                            filters.map((item, index)=> {
                                return (
                                    <div className="filters-item-sec" key={index}>
                                        <h1 className="fil-heading">{item.label}</h1>
                                        <div className="filter-selection-con">
                                            {
                                                item.filters.map((filter, i)=> {
                                                    return (
                                                        <button className="filter-item" key={i}>{filter.label}</button>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <button className='button-pink-center' style={{width: '48%', height: '40px', boxShadow: 'none'}}>Apply Filter</button>
                    <button className='button-pink-border' style={{width: '48%', height: '40px', boxShadow: 'none'}} data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                </div>
            </div>

        </div>

        <MomsReviewsSlider />
        <MomsMomentsSlider />
        <FaqSlider />
    </>
  )
}

export default Shop