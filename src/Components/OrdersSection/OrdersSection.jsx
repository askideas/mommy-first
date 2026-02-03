import React, { useEffect, useState } from 'react'
import './OrdersSection.css'
import Box from '../../assets/profile/cube.svg'
import { useAuth } from '../../contexts/AuthContext'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const OrdersSection = () => {
  const { customer } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (customer?.id) {
      fetchOrders()
    }
  }, [customer?.id])

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

  const fetchOrders = async () => {
    if (!customer?.id) {
      console.log('No customer ID available')
      return
    }

    setIsLoading(true)
    try {
      // Get auth token
      const token = await fetchAuthToken()
      if (!token) {
        console.error('Failed to get auth token')
        return
      }

      console.log('Fetching orders for customer ID:', customer.id)
      
      // Fetch orders
      const response = await fetch(`${API_BASE_URL}/orders/customer/${customer.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      console.log('Orders API Response:', data)

    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="orders-section-container">
        <div className="orders-section-header">
            <p className='heading'>
                <img src={Box} alt="" />
                <span>My Orders</span>
            </p>
        </div>
        {isLoading && <p style={{padding: '20px'}}>Loading orders...</p>}
    </div>
  )
}

export default OrdersSection