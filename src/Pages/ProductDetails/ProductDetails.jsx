import React from 'react'
import './ProductDetails.css'
import { ChevronRight } from 'lucide-react'
import { NavLink, useParams } from 'react-router-dom'

const ProductDetails = () => {
    const { productid } = useParams();
  return (
    <div className="container">
        <div className="product-details-main-container">
            <div className="breadcrumbs-section">
                <NavLink to="/">Home</NavLink>
                <ChevronRight />
                <NavLink to="/shop">Shop</NavLink>
                <ChevronRight />
                <span>EasyCleanse Peri Bottle</span>
            </div>

            <div className="product-details-content-section">
                <div className="imgae-slider-container">

                </div>

                <div className="details-content-container">
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails