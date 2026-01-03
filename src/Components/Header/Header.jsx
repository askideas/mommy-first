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
                <NavLink to="/">Home</NavLink>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/pregnancy-care">Pregnancy Care </NavLink>
                <NavLink to="/postpartum-care">Postpartum Care</NavLink>
                <NavLink to="/bundles">Bundles</NavLink>
                <NavLink to="/gift-sets">Gift Sets 🎁</NavLink>
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