import React from 'react'
import './WishlistProductTile.css'
import { Heart, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WishlistProductTile = (props) => {
    const product = props.data;
    const navigate = useNavigate()
  return (
    <div className={`wishlist-product-tile-container`} onClick={()=>navigate(`/shop/${product.id}`)}>
        <p className={`wpt-label ${product.label ? '' : 'd-none'}`}>{product.label}</p>
        <img src={product.image} alt="" className='wishlist-prd-image'/>
        <div className="wishlist-product-details-con">
            <p className="wishlist-prd-name">{product.name}</p>
            <p className="wishlist-prd-price">${product.price}USD</p>
            <div className='wishlist-btn-section-con'>
                <button className='button-pink-border wishlist-add-to-bag'>Add to Bag</button>
                <button className='button-pink-center remove-item' ><X /></button>
            </div>
        </div>
    </div>
  )
}

export default WishlistProductTile
