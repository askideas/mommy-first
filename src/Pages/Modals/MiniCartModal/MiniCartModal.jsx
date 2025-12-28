import React from 'react'
import './MiniCartModal.css'
import { Minus, Plus, X } from 'lucide-react'
import Prd1 from '../../../assets/products/prd1.svg'
import Prd2 from '../../../assets/products/prd1.svg'
import Prd3 from '../../../assets/products/prd1.svg'

const MiniCartModal = () => {
  const cartItems = [
    {
      id: 1,
      name: "EasyCleanse Peri Bottle 12.2 OZ",
      price: {
        amount: 13.99,
        currency: "USD"
      },
      image: Prd1,
      quantity: 2
    },
    {
      id: 2,
      name: "Witch Hazel Foam + Liner Combo",
      price: {
        amount: 13.99,
        currency: "USD"
      },
      image: Prd2,
      quantity: 10
    },
    {
      id: 3,
      name: "EasyCleanse Peri Bottle 12.2 OZ",
      price: {
        amount: 13.99,
        currency: "USD"
      },
      image: Prd3,
      quantity: 2
    }
  ];

  return (
    <div class="offcanvas offcanvas-end" tabindex="-1" id="MiniCartModal" aria-labelledby="offcanvasRightLabel">
        <div className="mf-off-canvas-header">
            <p className="head-ing">Cart <span className="cart-items-count">03</span></p>
            <button className="close-btn" data-bs-dismiss="offcanvas" aria-label="Close"><X /></button>
        </div>
        <div className="mini-cart-modal-body">
          <div className="cart-items-list">
            {
              cartItems.map((item, index)=> {
                return (
                  <div className="cart-item" key={index}>
                    <div className="image-container">
                      <img src={item.image} alt="" />
                    </div>

                    <div className="item-details-sec">
                      <p className="item-name">{item.name}</p>
                      <p className="item-price">${item.price.amount} {item.price.currency}</p>
                    </div>

                    <div className="items-actions-container">
                      <div className="item-quantity">
                        <button><Minus /></button>
                        <p className="quantity-count">{item.quantity < 10 ? '0' : ''}{item.quantity}</p>
                        <button><Plus /></button>
                      </div>
                      <button className="remove-item-btn">Remove</button>
                    </div>
                  </div>
                )
              })
            }
            
          </div>
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