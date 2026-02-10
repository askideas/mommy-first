import React, { useEffect } from 'react'
import './Header.css'
import Logo from '../../assets/logo.svg'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import Search from '../../assets/search.svg'
import Profile from '../../assets/profile.svg'
import CartIcon from '../../assets/cart.svg'
import Hamburger from '../../assets/hamburger.svg'
import { Heart, Home, Search as SearchIcon, User, Gift, X } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, wishlistHandles } = useAuth();
    const { totalQuantity, cartNotification, hideCartNotification } = useCart();

    // Add scroll event to toggle 'active' class
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 0) {
                header?.classList.add('movedown');
                setTimeout(() => {
                    header?.classList.add('decreasewidth');
                }, 200);
            } else {
                header?.classList.remove('movedown');
                setTimeout(() => {
                    header?.classList.remove('decreasewidth');
                }, 200);
            }
        };
        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle profile icon click - redirect to profile if logged in, otherwise open login modal
    const handleProfileClick = () => {
        if (isAuthenticated) {
            navigate('/profile#profile');
        }
        // If not authenticated, the data-bs-toggle will open the login modal
    };

  return (
    <>
        <div className='header container-fluid'>
            <div className='row w-100 m-0'>
                <div className="logo-container flash-animation">
                    <img src={Logo} alt="Mommy FIrst" onClick={()=>navigate('/')} />
                </div>
                <div className="menu-container d-none d-lg-flex">
                    <div className='menu-item-div'><NavLink to="/">Home</NavLink></div>
                    <div className='menu-item-div'><NavLink to="/shop">Shop</NavLink></div>
                    <div className='menu-item-div'><NavLink to="/bundles">Bundles </NavLink><span className='flash-animation' style={{background: '#FF1F1F'}} >SALE</span></div>
                    <div className='menu-item-div'><NavLink to="/care-hub">Care Hub </NavLink><span className='flash-animation' style={{background: '#5ED34B'}} >NEW</span></div>
                    <div className='menu-item-div'><NavLink to="/about">Story</NavLink></div>
                </div>
                <div className="menu-action-icons-container">
                    <img src={Search} alt="" className='d-none d-lg-flex' data-bs-toggle="offcanvas" data-bs-target="#SearchModal" style={{cursor: 'pointer'}} />
                    <img 
                        src={Profile} 
                        alt=""
                        className='d-none d-lg-flex'
                        onClick={handleProfileClick}
                        data-bs-toggle={isAuthenticated ? undefined : "offcanvas"} 
                        data-bs-target={isAuthenticated ? undefined : "#AuthenticationModal"} 
                        style={{cursor: 'pointer'}} 
                    />
                    <div className="wishlist-icon-wrapper d-none d-lg-flex" onClick={()=>navigate('/wishlist')} style={{cursor: 'pointer'}}>
                        <Heart className="icon" />
                        {wishlistHandles.length > 0 && (
                            <span className="wishlist-count-badge">{wishlistHandles.length > 99 ? '99+' : wishlistHandles.length}</span>
                        )}
                    </div>
                    <div className="cart-icon-wrapper" data-bs-toggle="offcanvas" data-bs-target="#MiniCartModal" style={{cursor: 'pointer'}}>
                        <img src={CartIcon} alt="" />
                        {totalQuantity > 0 && (
                            <span className="cart-count-badge">{totalQuantity > 99 ? '99+' : totalQuantity}</span>
                        )}
                        {cartNotification && (
                            <div className="cart-notification-popup" key={cartNotification.timestamp || Date.now()}>
                                {cartNotification.image && (
                                    <div className="cart-notification-image">
                                        <img src={cartNotification.image} alt="" />
                                    </div>
                                )}
                                <div className="cart-notification-content">
                                    <span className="cart-notification-title">Added to cart</span>
                                    <span className="cart-notification-product">{cartNotification.name}</span>
                                </div>
                                <button className="cart-notification-close" onClick={(e) => { e.stopPropagation(); hideCartNotification(); }}>
                                    <X size={14} />
                                </button>
                            </div>
                        )}
                    </div>
                    <img src={Hamburger} alt="" data-bs-toggle="offcanvas" data-bs-target="#MegaMenuModal" style={{cursor: 'pointer'}} />
                </div>
            </div>
        </div>

        <div className="bottom-bar-container d-lg-none">
            <div className="bottom-bar-item" onClick={() => navigate('/')}>
                <div className={`bottom-bar-icon ${location.pathname === '/' ? 'active' : ''}`}>
                    <Home size={22} />
                </div>
                <span className={location.pathname === '/' ? 'active' : ''}>Home</span>
            </div>
            
            <div className="bottom-bar-item" data-bs-toggle="offcanvas" data-bs-target="#SearchModal">
                <div className="bottom-bar-icon">
                    <SearchIcon size={22} />
                </div>
                <span>Search</span>
            </div>
            
            <div className="bottom-bar-center-item" onClick={() => navigate('/bundles')}>
                <div className={`bottom-bar-center-circle ${location.pathname === '/bundles' ? 'active' : ''}`}>
                    <Gift size={28} />
                </div>
                <span className={location.pathname === '/bundles' ? 'active' : ''}>Bundles</span>
            </div>
            
            <div className="bottom-bar-item" onClick={() => navigate('/wishlist')}>
                <div className={`bottom-bar-icon ${location.pathname === '/wishlist' ? 'active' : ''}`}>
                    <Heart size={22} />
                    {wishlistHandles.length > 0 && (
                        <span className="bottom-bar-badge">{wishlistHandles.length > 99 ? '99+' : wishlistHandles.length}</span>
                    )}
                </div>
                <span className={location.pathname === '/wishlist' ? 'active' : ''}>Wishlist</span>
            </div>
            
            <div 
                className="bottom-bar-item" 
                onClick={handleProfileClick}
                data-bs-toggle={isAuthenticated ? undefined : "offcanvas"} 
                data-bs-target={isAuthenticated ? undefined : "#AuthenticationModal"}
            >
                <div className={`bottom-bar-icon ${location.pathname === '/profile' ? 'active' : ''}`}>
                    <User size={22} />
                </div>
                <span className={location.pathname === '/profile' ? 'active' : ''}>Profile</span>
            </div>
        </div>
    </>
    
  )
}

export default Header