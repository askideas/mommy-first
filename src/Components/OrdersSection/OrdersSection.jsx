import React, { useEffect, useState, useCallback } from 'react'
import './OrdersSection.css'
import Box from '../../assets/profile/cube.svg'
import { useAuth } from '../../contexts/AuthContext'
import { ChevronRight, Loader2 } from 'lucide-react'
import DefaultImg from '../../assets/default.png'
import ProfileSkeletonLoader from '../ProfileSkeletonLoader/ProfileSkeletonLoader'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const OrdersSection = () => {
  const { customer } = useAuth()
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [stage, setStage] = useState('list');
  const [detailsIndex, setDetailsIndex] = useState(0)
  const [trackingItemIndex, setTrackingItemIndex] = useState(null)
  const [selectedReturnItems, setSelectedReturnItems] = useState({})
  const [cancelReason, setCancelReason] = useState('')

  const fetchAuthToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: import.meta.env.VITE_API_CLIENT_ID,
          clientSecret: import.meta.env.VITE_API_CLIENT_SECRET
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      if (result.success && result.token) {
        return result.token
      } else {
        throw new Error(result.message || 'Failed to get authentication token')
      }
    } catch (error) {
      console.error('Error fetching auth token:', error)
      return null
    }
  }

  const fetchOrders = useCallback(async () => {
    if (!customer?.id) {
      console.log('No customer ID available')
      return
    }

    setIsLoading(true)
    try {
      const token = await fetchAuthToken()
      if (!token) {
        console.error('Failed to get auth token')
        return
      }

      console.log('Fetching orders for customer ID:', customer.id)
      
      const response = await fetch(`${API_BASE_URL}/orders/customer/${customer.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      console.log('Orders API Response:', data)

      if (data.success && data.data) {
        setOrders(data.data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setIsLoading(false)
    }
  }, [customer?.id])

  useEffect(() => {
    if (customer?.id) {
      fetchOrders()
    }
  }, [customer?.id, fetchOrders])

  function handleViewDetails (index, stage) {
    setDetailsIndex(index)
    setStage(stage)
  }

  function handleTrackPackage (orderIndex, itemIndex) {
    setDetailsIndex(orderIndex)
    setTrackingItemIndex(itemIndex)
    setStage('tracking')
  }

  function handleReturnClick (orderIndex) {
    setDetailsIndex(orderIndex)
    setSelectedReturnItems({})
    setCancelReason('')
    setStage('return')
  }

  function handleReturnItemToggle (itemIndex) {
    setSelectedReturnItems(prev => ({
      ...prev,
      [itemIndex]: !prev[itemIndex]
    }))
  }

  function handleRequestReturn () {
    const selectedItems = Object.keys(selectedReturnItems).filter(key => selectedReturnItems[key])
    console.log('Return requested for items:', selectedItems)
    console.log('Cancel reason:', cancelReason)
    // Handle return submission here
  }
  
  return (
    <div className="orders-section-container">
        <div className="orders-section-header">
          {
            stage == 'list' && (
              <p className='heading'>
                  <img src={Box} alt="" />
                  <span>My Orders</span>
              </p>
            )
          }

          {
            stage == 'details' && (
              <p className='heading'>
                  <span onClick={() => handleViewDetails(0, 'list')} style={{cursor: 'pointer'}}>My Orders</span>
                  <ChevronRight />
                  <span>Order details</span>
              </p>
            )
          }

          {
            stage == 'tracking' && (
              <p className='heading'>
                  <span onClick={() => handleViewDetails(0, 'list')} style={{cursor: 'pointer'}}>My Orders</span>
                  <ChevronRight />
                  <span>Track package</span>
              </p>
            )
          }

          {
            stage == 'return' && (
              <p className='heading'>
                  <span onClick={() => handleViewDetails(0, 'list')} style={{cursor: 'pointer'}}>My Orders</span>
                  <ChevronRight />
                  <span onClick={() => handleTrackPackage(detailsIndex, 0)} style={{cursor: 'pointer'}}>Track package</span>
                  <ChevronRight />
                  <span>Cancel order</span>
              </p>
            )
          }
        </div>

        {isLoading && (
          <ProfileSkeletonLoader type="orders" />
        )}

        {
          !isLoading && stage == 'list' && (
            <div className="list-of-orders-container">
              {
                orders && orders.map((order, index)=> {
                  return(
                    <div className="order-details-card-section" key={index}>
                      <div className="heading-section">
                        <span className='delivery-date'>Delivery date here</span>
                        <span className='view-order-details' onClick={() => handleViewDetails(index, 'details')}>View order details</span>
                      </div>

                      <div className="line-items-container">
                        {
                          order.line_items.map((item,index)=> {
                            return (
                              <div className="order-line-item" key={index}>
                                <div className="line-item-details">
                                  <img src={item.image ? item.image.src : 'null'} alt="" onError={(e) => e.target.src = DefaultImg} />
                                  <p className="name">{item.title}</p>
                                </div>
                                <div className="button-section">
                                  <button className="button-pink-border" onClick={() => handleViewDetails(index, 'tracking')}>TRACK PACKAGE</button>
                                </div>
                              </div>
                            )
                            
                          })
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          )
        }

        {
          !isLoading && orders && stage == 'details' && ( 
            <div className="order-details-section-container">
                <div className="heading-section">
                  <span className='delivery-date'>Delivery date here</span>
                  <span className='view-order-details'><span>Order ID</span> #{orders[detailsIndex].id}</span>
                </div>

                <div className="order-summary-section">
                  <div className="shipping-section">
                    <p className="label">Ship to</p>

                    <p className="item">{orders[detailsIndex].shipping_address.first_name} {orders[detailsIndex].shipping_address.last_name}</p>
                    <p className="item">{orders[detailsIndex].shipping_address.address1}</p>
                    <p className="item">{orders[detailsIndex].shipping_address.address2}</p>
                    <p className="item">{orders[detailsIndex].shipping_address.country}, {orders[detailsIndex].shipping_address.city} {orders[detailsIndex].shipping_address.zip}</p>
                  </div>

                  <div className="payment-method">
                    <p className="label">Payment Method</p>
                  </div>

                  <div className="summary-details">
                    <p className="label">Order Summary</p>
                    <p className="item">
                      <span>Item(s) total</span>
                      <span>${orders[detailsIndex].subtotal_price}</span>
                    </p>

                    <p className="item">
                      <span>Shipping & Handling</span>
                      <span>${orders[detailsIndex].total_shipping}</span>
                    </p>

                    <p className="item">
                      <span>Tax</span>
                      <span>${orders[detailsIndex].total_tax}</span>
                    </p>

                    <p className="item">
                      <span>Discount</span>
                      <span>- ${orders[detailsIndex].total_discounts}</span>
                    </p>

                    <p className="item grand-total">
                      <span>Grand Total</span>
                      <span>${orders[detailsIndex].total_price}</span>
                    </p>
                  </div>
                </div>

                <div className="line-items-container">
                  {
                    orders[detailsIndex].line_items.map((item,index)=> {
                      return (
                        <div className="order-line-item" key={index}>
                          <div className="line-item-details">
                            <img src={item.image ? item.image.src : 'null'} alt="" onError={(e) => e.target.src = DefaultImg} />
                            <p className="name">{item.title}</p>
                          </div>
                          <div className="button-section">
                            <button className="button-pink-border" onClick={() => handleTrackPackage(detailsIndex, 'tracking')}>TRACK PACKAGE</button>
                          </div>
                        </div>
                      )
                      
                    })
                  }
                </div>
            </div>
          )
        }

        {
          !isLoading && orders && stage == 'tracking' && ( 
            <div className="tracking-section-container">
                {/* Progress Tracker */}
                <div className="tracking-progress-section">
                  <div className="progress-steps">
                    <div className="step completed">
                      <div className="step-circle">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M8 13.5L4.5 10M4.5 10L2 12.5M8 13.5L18 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="step-label">Ordered</p>
                    </div>

                    <div className="step-line completed"></div>

                    <div className="step active">
                      <div className="step-circle"></div>
                      <p className="step-label">Shipped</p>
                    </div>

                    <div className="step-line"></div>

                    <div className="step">
                      <div className="step-circle"></div>
                      <p className="step-label">Out for delivery</p>
                    </div>

                    <div className="step-line"></div>

                    <div className="step">
                      <div className="step-circle"></div>
                      <p className="step-label">Delivered</p>
                    </div>
                  </div>
                </div>

                {/* Delivery Status */}
                <div className="delivery-status-box">
                  <p className="status-message">Arriving tomorrow</p>
                  
                  <div className="tracking-items-container">
                    {
                      orders[detailsIndex].line_items.map((item, index) => {
                        return (
                          <div className="tracking-item" key={index}>
                            <img src={item.image ? item.image.src : DefaultImg} alt="" onError={(e) => e.target.src = DefaultImg} />
                            <div className="item-details">
                              <p className="item-title">{item.title}</p>
                            </div>
                            <button className="button-pink-border" onClick={() => handleViewDetails(detailsIndex, 'return')}>Return</button>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>

                {/* Order Information */}
                <div className="tracking-order-info">
                  <div className="order-date-section">
                    <p>Ordered placed on <strong>{new Date(orders[detailsIndex].created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
                    <p className="order-id">Order ID <strong>#{orders[detailsIndex].id}</strong></p>
                  </div>

                  <div className="order-details-grid">
                    <div className="shipping-section">
                      <p className="label">Shipping address</p>
                      <p className="item">{orders[detailsIndex].shipping_address.first_name} {orders[detailsIndex].shipping_address.last_name}</p>
                      <p className="item">{orders[detailsIndex].shipping_address.address1}</p>
                      {orders[detailsIndex].shipping_address.address2 && <p className="item">{orders[detailsIndex].shipping_address.address2}</p>}
                      <p className="item">{orders[detailsIndex].shipping_address.city}, {orders[detailsIndex].shipping_address.province} {orders[detailsIndex].shipping_address.zip}</p>
                    </div>

                    <div className="payment-method">
                      <p className="label">Payment Method</p>
                      <p className="item">Pay Over Time with Tabby 4 payments at 0% Interest</p>
                    </div>

                    <div className="summary-details">
                      <p className="label">Order Summary</p>
                      <p className="item">
                        <span>Item(s) total</span>
                        <span>${orders[detailsIndex].subtotal_price}</span>
                      </p>
                      <p className="item">
                        <span>Shipping & Handling</span>
                        <span>${orders[detailsIndex].total_shipping}</span>
                      </p>
                      <p className="item grand-total">
                        <span>Total</span>
                        <span>${orders[detailsIndex].total_price}</span>
                      </p>
                      <p className="item grand-total-label">
                        <span>Grand Total</span>
                        <span>${orders[detailsIndex].total_price}</span>
                      </p>
                    </div>
                  </div>
                </div>
            </div>
          )
        }

        {
          !isLoading && orders && stage == 'return' && (
            <div className="return-section-wrapper">
              <div className="return-section-container">
                <div className="order-info-section">
                  <p>Ordered placed on <strong>{new Date(orders[detailsIndex].created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
                  <p className="order-id">Order ID <strong>#{orders[detailsIndex].id}</strong></p>
                </div>

                <div className="return-items-section">
                  <div className="return-items-list">
                    {
                      orders[detailsIndex].line_items.map((item, index) => (
                        <div className="return-item-row" key={index}>
                          <div className="checkbox-wrapper">
                            <input 
                              type="checkbox" 
                              id={`item-${index}`}
                              checked={selectedReturnItems[index] || false}
                              onChange={() => handleReturnItemToggle(index)}
                            />
                          </div>
                          <img src={item.image ? item.image.src : DefaultImg} alt="" onError={(e) => e.target.src = DefaultImg} />
                          <p className="item-name">{item.title}</p>
                        </div>
                      ))
                    }
                  </div>
                </div>

                <div className="return-reason-section">
                  <div className="reason-header">
                    <p className="reason-label">Cancel reason</p>
                    <span className="optional-badge">OPTIONAL</span>
                  </div>
                  <textarea 
                    className="reason-textarea"
                    placeholder="Write here"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                </div>

                <div className="return-warning-box">
                  <p className="warning-text">Your order is being prepared for shipment. We'll try to cancel selected items, but it's not guaranteed.</p>
                  <button className="warning-close" onClick={() => {}}>×</button>
                </div>

                <div className="return-action-section">
                  <button className="button-request-return" onClick={handleRequestReturn}>REQUEST RETURN</button>
                </div>
              </div>
            </div>
          )
        }
    </div>
  )
}

export default OrdersSection