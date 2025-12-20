import React from 'react'
import './ProductTile.css'
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductTile = (props) => {
    const product = props.data;
    const navigate = useNavigate()
  return (
    <div className={`product-tile-container`} onClick={()=>navigate(`/shop/${product.id}`)}>
        <p className={`pt-label ${product.label ? '' : 'd-none'}`}>{product.label}</p>
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