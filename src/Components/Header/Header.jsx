import React from 'react'
import './Header.css'
import Logo from '../../assets/logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import Search from '../../assets/search.svg'
import Profile from '../../assets/profile.svg'
import Cart from '../../assets/cart.svg'
import Hamburger from '../../assets/hamburger.svg'
import { Heart } from 'lucide-react'

const Header = () => {
    const navigate = useNavigate();
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
                <img src={Profile} alt="" data-bs-toggle="offcanvas" data-bs-target="#AuthenticationModal" style={{cursor: 'pointer'}} />
                <Heart className="icon" onClick={()=>navigate('/wishlist')} />
                <img src={Cart} alt="" data-bs-toggle="offcanvas" data-bs-target="#MiniCartModal" style={{cursor: 'pointer'}} />
                <img src={Hamburger} alt="" data-bs-toggle="offcanvas" data-bs-target="#MegaMenuModal" style={{cursor: 'pointer'}} />
            </div>
        </div>
    </div>
  )
}

export default Header