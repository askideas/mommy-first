import React from 'react'
import './Header.css'
import Logo from '../../assets/logo.svg'
import { NavLink } from 'react-router-dom'
import Search from '../../assets/search.svg'
import Profile from '../../assets/profile.svg'
import Cart from '../../assets/cart.svg'
import Hamburger from '../../assets/hamburger.svg'

const Header = () => {
  return (
    <div className='header container-fluid'>
        <div className='row w-100 m-0'>
            <div className="logo-container flash-animation">
                <img src={Logo} alt="Mommy FIrst" />
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
                <NavLink to="/"><img src={Search} alt="" /></NavLink>
                <img src={Profile} alt="" data-bs-toggle="offcanvas" data-bs-target="#AuthenticationModal" style={{cursor: 'pointer'}} />
                <img src={Cart} alt="" data-bs-toggle="offcanvas" data-bs-target="#MiniCartModal" style={{cursor: 'pointer'}} />
                <img src={Hamburger} alt="" data-bs-toggle="offcanvas" data-bs-target="#MegaMenuModal" style={{cursor: 'pointer'}} />
            </div>
        </div>
    </div>
  )
}

export default Header