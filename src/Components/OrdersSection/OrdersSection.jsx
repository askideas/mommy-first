import React from 'react'
import './OrdersSection.css'
import Box from '../../assets/profile/cube.svg'

const OrdersSection = () => {
  return (
    <div className="orders-section-container">
        <div className="orders-section-header">
            <p className='heading'>
                <img src={Box} alt="" />
                <span>My Orders</span>
            </p>
        </div>
    </div>
  )
}

export default OrdersSection