import React, { useEffect } from 'react'
import './MiniCartModal.css'
import { Minus, Plus, X, Loader2, ShoppingBag, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../../contexts/CartContext'
import { goToCheckout } from '../../../services/cartService'
import DefaultImg from '../../../assets/default.png'

const MiniCartModal = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    items, 
    totalQuantity, 
    isLoading, 
    isUpdating,
    fetchCart,
    updateCartItems,
    removeFromCart 
  } = useCart();

  // Fetch cart when modal opens
  useEffect(() => {
    const modalElement = document.getElementById('MiniCartModal');
    
    const handleShow = () => {
      fetchCart();
    };

    if (modalElement) {
      modalElement.addEventListener('show.bs.offcanvas', handleShow);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener('show.bs.offcanvas', handleShow);
      }
    };
  }, [fetchCart]);

  const handleQuantityChange = async (lineId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;
    
    await updateCartItems([{ lineId, quantity: newQuantity }]);
  };

  const handleRemoveItem = async (lineId) => {
    await removeFromCart([lineId]);
  };

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      // Close the modal first
      const closeBtn = document.querySelector('#MiniCartModal .close-btn');
      if (closeBtn) closeBtn.click();
      
      goToCheckout(cart.checkoutUrl);
    }
  };

  const handleViewCart = () => {
    // Close modal is handled by data-bs-dismiss
    navigate('/cart');
  };

  // Format currency
  const formatCurrency = (amount, currencyCode = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode
    }).format(amount || 0);
  };

  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="MiniCartModal" aria-labelledby="offcanvasRightLabel">
        <div className="mf-off-canvas-header">
            <p className="head-ing">
              Cart 
              <span className="cart-items-count">
                {totalQuantity < 10 ? `0${totalQuantity}` : totalQuantity}
              </span>
            </p>
            <button className="close-btn" data-bs-dismiss="offcanvas" aria-label="Close"><X /></button>
        </div>
        
        <div className="mini-cart-modal-body">
          {isLoading ? (
            <div className="minicart-loading">
              <Loader2 className="spinner" size={32} />
              <p>Loading cart...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="minicart-empty">
              <ShoppingBag size={60} strokeWidth={1} />
              <p>Your cart is empty</p>
              <button 
                className="button-pink-border" 
                data-bs-dismiss="offcanvas"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map((item, index) => {
                const productImage = item.variant?.image?.url || item.product?.featuredImage?.url || DefaultImg;
                const productTitle = item.product?.title || 'Product';
                const variantTitle = item.variant?.title || '';
                const price = item.variant?.price?.amount || 0;
                const currencyCode = item.variant?.price?.currencyCode || 'USD';

                return (
                  <div className={`cart-item ${isUpdating ? 'updating' : ''}`} key={item.lineId || index}>
                    <div className="image-container">
                      <img 
                        src={productImage} 
                        alt={productTitle}
                        onError={(e) => e.target.src = DefaultImg}
                      />
                    </div>

                    <div className="item-details-sec">
                      <p className="item-name">{productTitle}</p>
                      {variantTitle && variantTitle !== 'Default Title' && (
                        <p className="item-variant">{variantTitle}</p>
                      )}
                      <p className="item-price">{formatCurrency(price, currencyCode)}</p>
                    </div>

                    <div className="items-actions-container">
                      <div className="item-quantity">
                        <button 
                          onClick={() => handleQuantityChange(item.lineId, item.quantity, -1)}
                          disabled={isUpdating || item.quantity <= 1}
                        >
                          <Minus size={12} />
                        </button>
                        <p className="quantity-count">
                          {isUpdating ? (
                            <Loader2 className="spinner" size={12} />
                          ) : (
                            item.quantity < 10 ? `0${item.quantity}` : item.quantity
                          )}
                        </p>
                        <button 
                          onClick={() => handleQuantityChange(item.lineId, item.quantity, 1)}
                          disabled={isUpdating}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button 
                        className="remove-item-btn"
                        onClick={() => handleRemoveItem(item.lineId)}
                        disabled={isUpdating}
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="minicart-modal-footer">
          <p className="price-container">
            <span>Sub total</span>
            <span className="price">
              {formatCurrency(
                cart?.cost?.subtotal?.amount,
                cart?.cost?.subtotal?.currencyCode
              )}
            </span>
          </p>
          <div className="button-container">
            <button 
              className='button-pink-center' 
              style={{width: '48%', height: '40px', boxShadow: 'none'}}
              onClick={handleCheckout}
              disabled={items.length === 0 || isUpdating}
            >
              {isUpdating ? <Loader2 className="spinner" size={14} /> : 'Check out'}
            </button>
            <button 
              className='button-pink-border' 
              style={{width: '48%', height: '40px', boxShadow: 'none'}} 
              data-bs-dismiss="offcanvas" 
              onClick={handleViewCart}
            >
              View cart
            </button>
          </div>
        </div>
    </div>
  )
}

export default MiniCartModal