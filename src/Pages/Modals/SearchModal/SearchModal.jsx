import { X } from 'lucide-react'
import React from 'react'
import './SearchModal.css'
import Prd1 from '../../../assets/products/prd1.svg'
import Prd2 from '../../../assets/products/prd2.svg'
import Prd3 from '../../../assets/products/prd3.svg'

const SearchModal = () => {
    const items = [
        {
        "id": 1,
        "title": "EasyCleanse Peri Bottle 12.2 OZ",
        "price": 13.99,
        "currency": "USD",
        "image": Prd1
        },
        {
        "id": 2,
        "title": "EasyCleanse Peri Bottle 12.2 OZ",
        "price": 13.99,
        "currency": "USD",
        "image": Prd2
        },
        {
        "id": 3,
        "title": "EasyCleanse Peri Bottle 12.2 OZ",
        "price": 13.99,
        "currency": "USD",
        "image": Prd3
        },
        {
        "id": 4,
        "title": "EasyCleanse Peri Bottle 12.2 OZ",
        "price": 13.99,
        "currency": "USD",
        "image": Prd1
        }
    ]
  return (
    <div class="offcanvas offcanvas-end" tabindex="-1" id="SearchModal" aria-labelledby="offcanvasRightLabel">
        <div className="mf-off-canvas-header">
            <p className="head-ing">Search</p>
            <button className="close-btn" data-bs-dismiss="offcanvas" aria-label="Close"><X /></button>
        </div>

        <div className="search-modal-body-container">
            <div className="search-bar-container">
                <input type="text" />
                <button className='clear-btn'>Clear</button>
            </div>

            <div className="search-results-container">
                <p className="results-count">4 Results found</p>
                <div className="results-list">
                    {
                        items.map((item, index)=> {
                            return (
                                <div className="reults-item" key={index}>
                                    <div className="prd-img">
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div className="content-details">
                                        <p className="prd-name">{item.title}</p>
                                        <p className="prd-price">${item.price}{item.currency}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>

            <div className="search-modal-footer">
                <button className='button-pink-center'>See all results...</button>
            </div>
        </div>
    </div>
  )
}

export default SearchModal