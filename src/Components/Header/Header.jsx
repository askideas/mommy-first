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
        <div className='row w-100'>
            <div className="logo-container">
                <img src={Logo} alt="Mommy FIrst" className='flash-animation' />
            </div>
            <div className="menu-container">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/pregnancy-care">Pregnancy Care </NavLink>
                <NavLink to="/postpartum-care">Postpartum Care</NavLink>
                <NavLink to="/gift-sets">Gift Sets 🎁</NavLink>
            </div>
            <div className="menu-action-icons-container">
                <NavLink to="/"><img src={Search} alt="" /></NavLink>
                <NavLink to="/"><img src={Profile} alt="" /></NavLink>
                <NavLink to="/"><img src={Cart} alt="" /></NavLink>
                <NavLink to="/"><img src={Hamburger} alt="" /></NavLink>
            </div>
        </div>
    </div>
  )
}

export default Header