import React from 'react'
import './ProductTile.css'
import { Heart } from 'lucide-react';

const ProductTile = (props) => {
    const product = props.data;
  return (
    <div className={`product-tile-container fade-up-animation-delay-${product.id}`}>
        <img src={product.image} alt="" className='prd-image'/>
        <div className="product-details-con">
            <p className="prd-name">{product.name}</p>
            <p className="prd-price">${product.price}USD</p>
            <div className='btn-section-con'>
                <button className='addtobag'>Add to Bag</button>
                <Heart className='wishlist' />
            </div>
        </div>
    </div>
  )
}

export default ProductTile