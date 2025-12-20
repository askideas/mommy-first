import React from 'react'
import './Shop.css'
import HeroImageLabel from '../../Components/HeroImageLabel/HeroImageLabel'
import HeroImage from '../../assets/hero-label.png'
import { Settings2 } from 'lucide-react'
import P1 from '../../assets/products/prd1.svg'
import P2 from '../../assets/products/prd2.svg'
import P3 from '../../assets/products/prd3.svg'
import P4 from '../../assets/products/prd4.svg'
import ProductTile from '../../Components/ProductTile/ProductTile'
import MomsReviewsSlider from '../../Components/MomsReviewsSlider/MomsReviewsSlider'
import MomsMomentsSlider from '../../Components/MomsMomentsSlider/MomsMomentsSlider'
import FaqSlider from '../../Components/FaqSlider/FaqSlider'

const Shop = () => {
    const HeroLabel = {
        image: HeroImage,
        text: 'Designed to Maximize Comfort for Expecting Moms',
        height: 280,
        pwidth: 487
    }

    const products = [
        {
            id: 1,
            image: P1,
            name: 'EasyCleanse Peri Bottle',
            price: '13.99',
            label: '10K+ bought in past month'
        },
        {
            id: 2,
            image: P2,
            name: 'High-Waisted Maternity Underwear',
            price: '13.99',
            label: '10K+ bought in past month'
        },
        {
            id: 3,
            image: P3,
            name: 'Witch Hazel Foam + Liner Combo',
            price: '13.99',
            label: false
        },
        {
            id: 4,
            image: P4,
            name: 'EasyCleanse Peri Bottle',
            price: '13.99',
            label: '10K+ bought in past month'
        },
        {
            id: 5,
            image: P1,
            name: 'EasyCleanse Peri Bottle',
            price: '13.99',
            label: '10K+ bought in past month'
        },
        {
            id: 6,
            image: P2,
            name: 'High-Waisted Maternity Underwear',
            price: '13.99',
            label: '10K+ bought in past month'
        },
        {
            id: 7,
            image: P3,
            name: 'Witch Hazel Foam + Liner Combo',
            price: '13.99',
            label: '10K+ bought in past month'
        },
        {
            id: 8,
            image: P4,
            name: 'EasyCleanse Peri Bottle',
            price: '13.99',
            label: '10K+ bought in past month'
        },
        {
            id: 1,
            image: P1,
            name: 'EasyCleanse Peri Bottle',
            price: '13.99',
            label: '10K+ bought in past month'
        },
        {
            id: 2,
            image: P2,
            name: 'High-Waisted Maternity Underwear',
            price: '13.99',
            label: '10K+ bought in past month'
        },
        {
            id: 3,
            image: P3,
            name: 'Witch Hazel Foam + Liner Combo',
            price: '13.99',
            label: '10K+ bought in past month'
        },
        {
            id: 4,
            image: P4,
            name: 'EasyCleanse Peri Bottle',
            price: '13.99',
            label: '10K+ bought in past month'
        }
    ];

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
                    products.map((item, index)=> {
                        return(
                            <ProductTile data={item} key={index} />
                        )
                    })
                }
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center">
                <p className='progress-bar-text'>You’ve seen 4 out of 98 items</p>
                <div className="progress-bar-con">
                    <span></span>
                </div>
                <button className='button-label'>Load more</button>
            </div>

        </div>

        <MomsReviewsSlider />
        <MomsMomentsSlider />
        <FaqSlider />
    </>
  )
}

export default Shop