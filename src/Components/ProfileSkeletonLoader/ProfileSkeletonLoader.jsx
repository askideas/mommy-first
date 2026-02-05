import React from 'react'
import './ProfileSkeletonLoader.css'

const ProfileSkeletonLoader = ({ type = 'default' }) => {
  if (type === 'profile') {
    return (
      <div className="profile-skeleton-container">
        <div className="profile-skeleton-header">
          <div className="skeleton-icon"></div>
          <div className="skeleton-heading"></div>
        </div>
        <div className="profile-skeleton-body">
          <div className="profile-skeleton-row">
            <div className="skeleton-label"></div>
            <div className="skeleton-value"></div>
          </div>
          <div className="profile-skeleton-row">
            <div className="skeleton-label"></div>
            <div className="skeleton-value"></div>
          </div>
          <div className="profile-skeleton-row">
            <div className="skeleton-label"></div>
            <div className="skeleton-value"></div>
          </div>
          <div className="profile-skeleton-row">
            <div className="skeleton-label"></div>
            <div className="skeleton-value"></div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'address') {
    return (
      <div className="profile-skeleton-container">
        <div className="profile-skeleton-header">
          <div className="skeleton-icon"></div>
          <div className="skeleton-heading"></div>
        </div>
        <div className="profile-skeleton-body">
          <div className="address-skeleton-card">
            <div className="skeleton-address-header"></div>
            <div className="skeleton-address-line"></div>
            <div className="skeleton-address-line small"></div>
          </div>
          <div className="address-skeleton-card">
            <div className="skeleton-address-header"></div>
            <div className="skeleton-address-line"></div>
            <div className="skeleton-address-line small"></div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'babies') {
    return (
      <div className="profile-skeleton-container">
        <div className="profile-skeleton-header">
          <div className="skeleton-icon"></div>
          <div className="skeleton-heading"></div>
        </div>
        <div className="profile-skeleton-body">
          <div className="babies-skeleton-card">
            <div className="skeleton-baby-icon"></div>
            <div className="skeleton-baby-info">
              <div className="skeleton-baby-name"></div>
              <div className="skeleton-baby-details"></div>
            </div>
          </div>
          <div className="babies-skeleton-card">
            <div className="skeleton-baby-icon"></div>
            <div className="skeleton-baby-info">
              <div className="skeleton-baby-name"></div>
              <div className="skeleton-baby-details"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'sessions') {
    return (
      <div className="profile-skeleton-container">
        <div className="profile-skeleton-header">
          <div className="skeleton-icon"></div>
          <div className="skeleton-heading"></div>
        </div>
        <div className="profile-skeleton-body">
          <div className="session-skeleton-card">
            <div className="skeleton-session-icon"></div>
            <div className="skeleton-session-details">
              <div className="skeleton-session-name"></div>
              <div className="skeleton-session-info"></div>
            </div>
            <div className="skeleton-session-meta">
              <div className="skeleton-date"></div>
              <div className="skeleton-status"></div>
            </div>
          </div>
          <div className="session-skeleton-card">
            <div className="skeleton-session-icon"></div>
            <div className="skeleton-session-details">
              <div className="skeleton-session-name"></div>
              <div className="skeleton-session-info"></div>
            </div>
            <div className="skeleton-session-meta">
              <div className="skeleton-date"></div>
              <div className="skeleton-status"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'orders') {
    return (
      <div className="profile-skeleton-container">
        <div className="profile-skeleton-header">
          <div className="skeleton-icon"></div>
          <div className="skeleton-heading"></div>
        </div>
        <div className="profile-skeleton-body">
          <div className="order-skeleton-card">
            <div className="skeleton-order-id"></div>
            <div className="skeleton-order-details"></div>
            <div className="skeleton-order-price"></div>
          </div>
          <div className="order-skeleton-card">
            <div className="skeleton-order-id"></div>
            <div className="skeleton-order-details"></div>
            <div className="skeleton-order-price"></div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'wishlist') {
    return (
      <div className="profile-skeleton-container">
        <div className="profile-skeleton-header">
          <div className="skeleton-icon"></div>
          <div className="skeleton-heading"></div>
        </div>
        <div className="profile-skeleton-body">
          <div className="wishlist-skeleton-grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="wishlist-skeleton-card" key={index}>
                <div className="skeleton-wishlist-image"></div>
                <div className="skeleton-wishlist-title"></div>
                <div className="skeleton-wishlist-price"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default ProfileSkeletonLoader
