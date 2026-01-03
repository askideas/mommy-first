import React from 'react'
import './Cart.css'
import { NavLink } from 'react-router-dom'
import { ChevronRight, Minus, Plus } from 'lucide-react'
import DefaultImg from '../../assets/default.png'
import prdImg from '../../assets/products/prd1.svg'

const Cart = () => {

    const Items = [
      {
        "id": "EC-PB-12OZ-001",
        "productName": "EasyCleanse Peri Bottle",
        "size": "12.2 OZ",
        "image": prdImg,
        "originalPrice": 18.99,
        "salePrice": 13.99,
        "quantity": 2,
        "lineTotal": 13.99,
        "actions": {
          "increment": true,
          "decrement": true,
          "remove": true
        }
      },
      {
        "id": "EC-PB-12OZ-002",
        "productName": "EasyCleanse Peri Bottle",
        "size": "12.2 OZ",
        "image": prdImg,
        "originalPrice": 18.99,
        "salePrice": 13.99,
        "quantity": 2,
        "lineTotal": 13.99,
        "actions": {
          "increment": true,
          "decrement": true,
          "remove": true
        }
      },
      {
        "id": "EC-PB-12OZ-003",
        "productName": "EasyCleanse Peri Bottle",
        "size": "12.2 OZ",
        "image": prdImg,
        "originalPrice": 18.99,
        "salePrice": 13.99,
        "quantity": 2,
        "lineTotal": 13.99,
        "actions": {
          "increment": true,
          "decrement": true,
          "remove": true
        }
      },
      {
        "id": "EC-PB-12OZ-004",
        "productName": "EasyCleanse Peri Bottle",
        "size": "12.2 OZ",
        "image": prdImg,
        "originalPrice": 18.99,
        "salePrice": 13.99,
        "quantity": 2,
        "lineTotal": 13.99,
        "actions": {
          "increment": true,
          "decrement": true,
          "remove": true
        }
      }
    ]

  return (
    <div className="container mt-5">
        <div className="breadcrumbs-cart-section">
            <NavLink to="/">Home</NavLink>
            <ChevronRight />
            <span>Search results</span>
        </div>
        <h1 className="cart-heading">Review your cart</h1>
        <div className="cart-items-summary-main-container">
            <div className="cart-items-container">
                <div className="cart-items-header">
                    <p className="product">Product</p>
                    <p className="price">Price</p>
                    <p className="quantity">Quantity</p>
                    <p className="amount">Total</p>
                </div>
                <div className="cart-items-section">
                    {
                        Items.map((item, index)=> {
                            return (
                                <div className="cart-item-card-container" key={index}>
                                    <div className="prd-product">
                                        <div className="product-image">
                                            <img src={item.image} alt="" onError={(e) => e.target.src = DefaultImg} />
                                        </div>
                                        <div className="product-name">
                                            <p>{item.productName}</p>
                                            <button>Remove</button>
                                        </div>
                                    </div>
                                    <p className="prd-price">
                                        <span>$18.99</span> <br /> <span className='price'>$13.99</span>
                                    </p>
                                    <div className="prd-quantity">
                                        <div className="item-quantity">
                                            <button><Minus /></button>
                                            <p className="quantity-count">{item.quantity < 10 ? '0' : ''}{item.quantity}</p>
                                            <button><Plus /></button>
                                        </div>
                                    </div>
                                    <p className="prd-amount">
                                        <span>$18.99</span> <br /> <span className='price'>$13.99</span>
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="cart-summary">
                <div className="summary-header">
                    <div className="summary-items">
                        <div className="summary-item">
                            <span className='left'>Item(s) total</span>
                            <span className='right'>$123.99 USD</span>
                        </div>
                        
                        <div className="summary-item">
                            <span className='left active'>Savings</span>
                            <span className='right active'>$19.99 USD</span>
                        </div>

                        <div className="summary-item">
                            <span className='left'>Shipping</span>
                            <span className='right'>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0013 18.3333C14.6037 18.3333 18.3346 14.6023 18.3346 9.99996C18.3346 5.39759 14.6037 1.66663 10.0013 1.66663C5.39893 1.66663 1.66797 5.39759 1.66797 9.99996C1.66797 14.6023 5.39893 18.3333 10.0013 18.3333Z" fill="#5ED34B"/>
                                <path d="M5.90625 10L8.40625 12.5L13.4062 7.5" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                FREE
                            </span>
                        </div>
                    </div>
                    <div className="add-notes-container">
                        <p>Order note (if any)</p>
                        <textarea placeholder='Write here'></textarea>
                    </div>
                </div>
                <div className="summary-footer">
                    <p className="total-section">
                        <span>Total</span>
                        <span>$199.99 USD</span>
                    </p>
                    <p className='tax-description'>Taxes calculated at checkout</p>
                    <button className='button-pink-center checkout-btn'>Checkout<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0013 18.3333C14.6037 18.3333 18.3346 14.6023 18.3346 9.99996C18.3346 5.39759 14.6037 1.66663 10.0013 1.66663C5.39893 1.66663 1.66797 5.39759 1.66797 9.99996C1.66797 14.6023 5.39893 18.3333 10.0013 18.3333Z" fill="white"/>
                        <path d="M5.90625 10L8.40625 12.5L13.4062 7.5" stroke="#DC5F92" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart