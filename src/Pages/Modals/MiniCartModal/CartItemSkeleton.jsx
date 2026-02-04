import React from 'react'
import './CartItemSkeleton.css'

const CartItemSkeleton = () => {
  return (
    <div className="cart-item-skeleton">
      <div className="skeleton-cart-image"></div>
      <div className="skeleton-cart-details">
        <div className="skeleton-cart-name"></div>
        <div className="skeleton-cart-variant"></div>
        <div className="skeleton-cart-bottom">
          <div className="skeleton-cart-quantity"></div>
          <div className="skeleton-cart-price"></div>
        </div>
      </div>
    </div>
  )
}

export default CartItemSkeleton
