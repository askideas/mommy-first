import React from 'react'
import './Cart.css'
import { NavLink } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const Cart = () => {
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