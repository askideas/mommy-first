import React, { useState, useEffect } from 'react'
import './Cart.css'
import { NavLink } from 'react-router-dom'
import { ChevronRight, Minus, Plus, Heart, Loader2, Trash2, ShoppingBag } from 'lucide-react'
import DefaultImg from '../../assets/default.png'
import prdImg from '../../assets/products/prd1.svg'
import { shopProducts } from '../../data/productsData'
import ProductTile from '../../Components/ProductTile/ProductTile'
import SkeletonLoader from '../../Components/SkeletonLoader/SkeletonLoader'
import MF1 from '../../assets/MF1.png'
import { useCart } from '../../contexts/CartContext'
import { goToCheckout, getCheckoutUrlForAuthenticatedCustomer } from '../../services/cartService'
import { useAuth } from '../../contexts/AuthContext'
import EmptyCartImg from '../../assets/empty-cart.svg'
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal'
import CartItemSkeleton from '../Modals/MiniCartModal/CartItemSkeleton'

const Cart = () => {
    const {
        cart,
        items,
        isLoading,
        isUpdating,
        fetchCart,
        updateCartItems,
        removeFromCart
    } = useCart()

    const [updatingLineId, setUpdatingLineId] = useState(null)
    const [message, setMessage] = useState({ type: '', text: '' })
    const [orderNote, setOrderNote] = useState('')
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [itemToRemove, setItemToRemove] = useState(null)
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)
    const { isAuthenticated, getShopifyCustomerAccessToken } = useAuth()

    // Recommended products state
    const [recommendedProducts, setRecommendedProducts] = useState([])
    const [recommendedLoading, setRecommendedLoading] = useState(true)
    const [authToken, setAuthToken] = useState(null)

    // Fetch authentication token
    const fetchAuthToken = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientId: import.meta.env.VITE_API_CLIENT_ID,
                    clientSecret: import.meta.env.VITE_API_CLIENT_SECRET
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success && data.token) {
                setAuthToken(data.token);
                return data.token;
            } else {
                throw new Error(data.message || 'Failed to get authentication token');
            }
        } catch (err) {
            console.error('Error fetching auth token:', err);
            return null;
        }
    };

    // Transform product data to match expected format
    const transformProduct = (productEdge) => {
        const product = productEdge?.node || productEdge || {};
        const firstVariant = product.variants?.nodes?.[0] || product.variants?.[0];
        const firstImage = product.images?.nodes?.[0] || product.images?.[0];
        
        return {
            id: product.id,
            name: product.title,
            title: product.title,
            description: product.description,
            handle: product.handle,
            productType: product.productType,
            vendor: product.vendor,
            tags: product.tags,
            image: firstImage?.url || '',
            price: parseFloat(firstVariant?.price?.amount || product.priceRange?.minVariantPrice?.amount || '0').toFixed(2),
            currencyCode: firstVariant?.price?.currencyCode || product.priceRange?.minVariantPrice?.currencyCode || 'USD',
            compareAtPrice: firstVariant?.compareAtPrice?.amount || product.compareAtPriceRange?.minVariantPrice?.amount || null,
            availableForSale: product.availableForSale,
            images: product.images?.nodes || product.images || [],
            variants: product.variants?.nodes || product.variants || [],
            priceRange: product.priceRange,
            label: product.tags?.[0] || '10K+ bought in past month'
        };
    };

    // Fetch recommended products from collection
    const fetchRecommendedProducts = async (token) => {
        try {
            setRecommendedLoading(true);
            const url = `${import.meta.env.VITE_API_BASE_URL}/collections/recommended-products-in-cart`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                credentials: 'omit'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            const collection = responseData.data?.collection || responseData.collection;
            const productEdges = Array.isArray(collection?.products)
                ? collection.products
                : (collection?.products?.edges || []);

            if (productEdges.length > 0) {
                const transformedProducts = productEdges
                    .map(edge => edge.node ? transformProduct(edge) : transformProduct({ node: edge }))
                    .slice(0, 3); // Show only 3 products
                setRecommendedProducts(transformedProducts);
            } else {
                setRecommendedProducts([]);
            }
        } catch (err) {
            console.error('Error fetching recommended products:', err);
            setRecommendedProducts([]);
        } finally {
            setRecommendedLoading(false);
        }
    };

    // Fetch cart on mount
    useEffect(() => {
        fetchCart()
    }, [])

    // Fetch recommended products on mount
    useEffect(() => {
        const initFetch = async () => {
            let token = authToken;
            if (!token) {
                token = await fetchAuthToken();
            }
            if (token) {
                await fetchRecommendedProducts(token);
            }
        };
        initFetch();
    }, [])

    // Auto-close message after 1500ms
    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => {
                setMessage({ type: '', text: '' })
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [message.text])

    const handleQuantityChange = async (lineId, newQuantity) => {
        if (newQuantity < 0) return

        // Show confirmation modal when trying to decrease quantity to 0
        if (newQuantity === 0) {
            setItemToRemove(lineId)
            setShowConfirmModal(true)
            return
        }

        setUpdatingLineId(lineId)
        setMessage({ type: '', text: '' })

        try {
            // Update quantity
            const response = await updateCartItems([{ lineId, quantity: newQuantity }])

            console.log('Update response:', response)

            if (!response.success) {
                setMessage({ type: 'error', text: response.message || 'Failed to update cart' })
            }
        } catch (error) {
            console.error('Error updating cart:', error)
            setMessage({ type: 'error', text: 'Something went wrong' })
        } finally {
            setUpdatingLineId(null)
        }
    }

    const handleRemoveItem = async (lineId) => {
        setItemToRemove(lineId)
        setShowConfirmModal(true)
    }

    const confirmRemoveItem = async () => {
        if (!itemToRemove) return

        setUpdatingLineId(itemToRemove)
        setMessage({ type: '', text: '' })
        setShowConfirmModal(false)

        try {
            const response = await removeFromCart([itemToRemove])
            console.log('Remove response:', response)

            if (response.success) {
                setMessage({ type: 'success', text: 'Item removed from cart' })
            } else {
                setMessage({ type: 'error', text: response.message || 'Failed to remove item' })
            }
        } catch (error) {
            console.error('Error removing item:', error)
            setMessage({ type: 'error', text: 'Something went wrong' })
        } finally {
            setUpdatingLineId(null)
            setItemToRemove(null)
        }
    }

    const handleCheckout = async () => {
        setIsCheckoutLoading(true)
        try {
            if (cart && isAuthenticated) {
                const response = await getCheckoutUrlForAuthenticatedCustomer(cart.cartId, getShopifyCustomerAccessToken())
                if (response.success) {
                    goToCheckout(response.checkoutUrl)
                }
            } else {
                goToCheckout(cart.checkoutUrl)
            }
        } catch (error) {
            console.error('Checkout error:', error)
        } finally {
            setIsCheckoutLoading(false)
        }
    }

    // Format currency
    const formatCurrency = (amount, currencyCode = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode
        }).format(amount || 0)
    }

    // Calculate savings (if original price vs sale price exists)
    const calculateSavings = () => {
        // This would need product comparison data from API
        // For now, return 0
        return 0
    }

    if (isLoading) {
        return (
            <div className="container mt-5">
                <div className="breadcrumbs-cart-section">
                    <NavLink to="/">Home</NavLink>
                    <ChevronRight />
                    <span>Cart</span>
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
                            {[...Array(3)].map((_, index) => (
                                <CartItemSkeleton key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!cart || items.length === 0) {
        return (
            <div className="container mt-5">
                <div className="breadcrumbs-cart-section">
                    <NavLink to="/">Home</NavLink>
                    <ChevronRight />
                    <span>Cart</span>
                </div>
                <div className="empty-cart">
                    <img src={EmptyCartImg} alt="" />
                    <h2>Your cart is currently empty.</h2>
                    <p>Not sure where to start?</p>
                    <NavLink to="/shop" className="button-pink-center">
                        Continue Shopping
                    </NavLink>
                </div>

                <hr />

                <div className="cart-recommended-products-section">
                    <h2 className="recommended-heading">Recommended products</h2>
                    <div className="recommended-products-grid">
                        {recommendedLoading ? (
                            <>
                                {[...Array(3)].map((_, index) => (
                                    <SkeletonLoader key={index} />
                                ))}
                            </>
                        ) : recommendedProducts.length > 0 ? (
                            recommendedProducts.map((product, index) => (
                                <ProductTile data={product} key={product.id || index} />
                            ))
                        ) : (
                            shopProducts.slice(0, 3).map((product, index) => (
                                <ProductTile data={product} key={product.id + '-' + index} />
                            ))
                        )}
                        <div className="espot-card">
                            <img src={MF1} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mt-5">
            <ConfirmationModal
                isOpen={showConfirmModal}
                onClose={() => {
                    setShowConfirmModal(false)
                    setItemToRemove(null)
                }}
                onConfirm={confirmRemoveItem}
                title="Remove from Cart"
                message="Are you sure you want to remove this item from your cart?"
                confirmText="Yes, Remove"
                cancelText="Cancel"
                isLoading={updatingLineId === itemToRemove}
            />
            <div className="breadcrumbs-cart-section">
                <NavLink to="/">Home</NavLink>
                <ChevronRight />
                <span>Cart</span>
            </div>
            <h1 className="cart-heading">Review your cart</h1>

            {message.text && (
                <div className={`cart-message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="cart-items-summary-main-container">
                <div className="cart-items-container">
                    <div className="cart-items-header">
                        <p className="product">Product</p>
                        <p className="price">Price</p>
                        <p className="quantity">Quantity</p>
                        <p className="amount">Total</p>
                    </div>
                    <div className="cart-items-section">
                        {items.map((item, index) => {
                            const isItemUpdating = updatingLineId === item.lineId
                            const variantPrice = item.variant?.price?.amount || 0
                            const currencyCode = item.variant?.price?.currencyCode || 'USD'
                            const lineCost = item.lineCost?.amount || (variantPrice * item.quantity)
                            const productImage = item.variant?.image?.url || item.product?.featuredImage?.url || DefaultImg
                            const productTitle = item.product?.title || 'Product'
                            const variantTitle = item.variant?.title || ''

                            return (
                                <div className={`cart-item-card-container ${isItemUpdating ? 'updating' : ''}`} key={item.lineId || index}>
                                    <div className="prd-product">
                                        <div className="product-image">
                                            <img
                                                src={productImage}
                                                alt={productTitle}
                                                onError={(e) => e.target.src = DefaultImg}
                                            />
                                        </div>
                                        <div className="product-name">
                                            <p>{productTitle}</p>
                                            {variantTitle && variantTitle !== 'Default Title' && (
                                                <span className="variant-title">{variantTitle}</span>
                                            )}
                                            <button
                                                onClick={() => handleRemoveItem(item.lineId)}
                                                disabled={isUpdating}
                                                className="remove-btn"
                                            >
                                                {isItemUpdating ? <Loader2 className="spinner" size={14} /> : <Trash2 size={14} />}
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <p className="prd-price">
                                        <span className='price'>{formatCurrency(variantPrice, currencyCode)}</span>
                                    </p>
                                    <div className="prd-quantity">
                                        <div className="item-quantity">
                                            <button
                                                onClick={() => handleQuantityChange(item.lineId, item.quantity - 1)}
                                                disabled={isUpdating}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <p className="quantity-count">
                                                {isItemUpdating ? (
                                                    <Loader2 className="spinner" size={14} />
                                                ) : (
                                                    item.quantity < 10 ? `0${item.quantity}` : item.quantity
                                                )}
                                            </p>
                                            <button
                                                onClick={() => handleQuantityChange(item.lineId, item.quantity + 1)}
                                                disabled={isUpdating}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="prd-amount">
                                        <span className='price'>{formatCurrency(lineCost, currencyCode)}</span>
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="cart-summary">
                    <div className="summary-header">
                        <div className="summary-items">
                            <div className="summary-item">
                                <span className='left'>Item(s) total ({cart?.totalQuantity || 0} items)</span>
                                <span className='right'>
                                    {formatCurrency(
                                        cart?.cost?.subtotal?.amount,
                                        cart?.cost?.subtotal?.currencyCode
                                    )}
                                </span>
                            </div>

                            {cart?.cost?.totalTax?.amount > 0 && (
                                <div className="summary-item">
                                    <span className='left'>Tax</span>
                                    <span className='right'>
                                        {formatCurrency(
                                            cart?.cost?.totalTax?.amount,
                                            cart?.cost?.totalTax?.currencyCode
                                        )}
                                    </span>
                                </div>
                            )}

                            <div className="summary-item">
                                <span className='left'>Shipping</span>
                                <span className='right'>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0013 18.3333C14.6037 18.3333 18.3346 14.6023 18.3346 9.99996C18.3346 5.39759 14.6037 1.66663 10.0013 1.66663C5.39893 1.66663 1.66797 5.39759 1.66797 9.99996C1.66797 14.6023 5.39893 18.3333 10.0013 18.3333Z" fill="#5ED34B" />
                                        <path d="M5.90625 10L8.40625 12.5L13.4062 7.5" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    FREE
                                </span>
                            </div>
                        </div>
                        <div className="add-notes-container">
                            <p>Order note (if any)</p>
                            <textarea
                                placeholder='Write here'
                                value={orderNote}
                                onChange={(e) => setOrderNote(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="summary-footer">
                        <p className="total-section">
                            <span>Total</span>
                            <span>
                                {formatCurrency(
                                    cart?.cost?.total?.amount,
                                    cart?.cost?.total?.currencyCode
                                )}
                            </span>
                        </p>
                        <p className='tax-description'>Taxes calculated at checkout</p>
                        <button
                            className='button-pink-center checkout-btn'
                            onClick={handleCheckout}
                            disabled={isUpdating || isCheckoutLoading || items.length === 0}
                        >
                            {(isUpdating || isCheckoutLoading) ? (
                                <>
                                    <Loader2 className="spinner" size={16} />
                                    {isCheckoutLoading ? 'Processing...' : 'Updating...'}
                                </>
                            ) : (
                                <>
                                    Checkout
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0013 18.3333C14.6037 18.3333 18.3346 14.6023 18.3346 9.99996C18.3346 5.39759 14.6037 1.66663 10.0013 1.66663C5.39893 1.66663 1.66797 5.39759 1.66797 9.99996C1.66797 14.6023 5.39893 18.3333 10.0013 18.3333Z" fill="white" />
                                        <path d="M5.90625 10L8.40625 12.5L13.4062 7.5" stroke="#DC5F92" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <hr />

            <div className="cart-recommended-products-section">
                <h2 className="recommended-heading">Recommended products</h2>
                <div className="recommended-products-grid">
                    {recommendedLoading ? (
                        <>
                            {[...Array(3)].map((_, index) => (
                                <SkeletonLoader key={index} />
                            ))}
                        </>
                    ) : recommendedProducts.length > 0 ? (
                        recommendedProducts.map((product, index) => (
                            <ProductTile data={product} key={product.id || index} />
                        ))
                    ) : (
                        shopProducts.slice(0, 3).map((product, index) => (
                            <ProductTile data={product} key={product.id + '-' + index} />
                        ))
                    )}
                    <div className="espot-card">
                        <img src={MF1} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart