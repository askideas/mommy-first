import React from 'react'
import './MiniCartModal.css'
import { X } from 'lucide-react'

const MiniCartModal = () => {
  return (
    <div class="offcanvas offcanvas-end" tabindex="-1" id="MiniCartModal" aria-labelledby="offcanvasRightLabel">
        <div className="mf-off-canvas-header">
            <p className="head-ing">Cart <span className="cart-items-count">03</span></p>
            <button className="close-btn" data-bs-dismiss="offcanvas" aria-label="Close"><X /></button>
        </div>
        <div className="mini-cart-modal-body">
          Items
        </div>
        <div className="minicart-modal-footer">
          <p className="price-container">
            <span>Sub total</span>
            <span className="price">$199.99 USD</span>
          </p>
          <div className="button-container">
            <button className='button-pink-center' style={{width: '48%', height: '40px', boxShadow: 'none'}}>Check out</button>
            <button className='button-pink-border' style={{width: '48%', height: '40px', boxShadow: 'none'}}>View cart</button>
          </div>
        </div>
    </div>
  )
}

export default MiniCartModal