import React, { useEffect } from 'react'
import './Header.css'
import Logo from '../../assets/logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import Search from '../../assets/search.svg'
import Profile from '../../assets/profile.svg'
import CartIcon from '../../assets/cart.svg'
import Hamburger from '../../assets/hamburger.svg'
import { Heart } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'

const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated, wishlistHandles } = useAuth();
    const { totalQuantity } = useCart();

    // Add scroll event to toggle 'active' class
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 0) {
                header?.classList.add('active');
            } else {
                header?.classList.remove('active');
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
    <div className='header container-fluid'>
        <div className='row w-100 m-0'>
            <div className="logo-container flash-animation">
                <img src={Logo} alt="Mommy FIrst" onClick={()=>navigate('/')} />
            </div>
            <div className="menu-container">
                <div className='menu-item-div'><NavLink to="/">Home</NavLink></div>
                <div className='menu-item-div'><NavLink to="/shop">Shop</NavLink></div>
                <div className='menu-item-div'><NavLink to="/bundles">Bundles </NavLink><span className='flash-animation' style={{background: '#FF1F1F'}} >SALE</span></div>
                <div className='menu-item-div'><NavLink to="/care-hub">Care Hub </NavLink><span className='flash-animation' style={{background: '#5ED34B'}} >NEW</span></div>
                <div className='menu-item-div'><NavLink to="/about">Story</NavLink></div>
            </div>
            <div className="menu-action-icons-container">
                <img src={Search} alt="" data-bs-toggle="offcanvas" data-bs-target="#SearchModal" style={{cursor: 'pointer'}} />
                <img 
                    src={Profile} 
                    alt="" 
                    onClick={handleProfileClick}
                    data-bs-toggle={isAuthenticated ? undefined : "offcanvas"} 
                    data-bs-target={isAuthenticated ? undefined : "#AuthenticationModal"} 
                    style={{cursor: 'pointer'}} 
                />
                <div className="wishlist-icon-wrapper" onClick={()=>navigate('/wishlist')} style={{cursor: 'pointer'}}>
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
                </div>
                <img src={Hamburger} alt="" data-bs-toggle="offcanvas" data-bs-target="#MegaMenuModal" style={{cursor: 'pointer'}} />
            </div>
        </div>
    </div>
  )
}

export default Header