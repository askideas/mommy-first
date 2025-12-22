import React from 'react'
import './MegaMenuModal.css'
import { X } from 'lucide-react'
import Facebook from '../../../assets/Footer/facebook.svg'
import XIcon from '../../../assets/Footer/x.svg'
import Instagram from '../../../assets/Footer/instagram.svg'
import LinkedIn from '../../../assets/Footer/linkedin.svg'
import Youtube from '../../../assets/Footer/youtube.svg'
import Tiktok from '../../../assets/Footer/tiktok.svg'
import { NavLink } from 'react-router-dom'

const MegaMenuModal = () => {
  return (
    <div class="offcanvas offcanvas-end" tabindex="-1" id="MegaMenuModal" aria-labelledby="offcanvasRightLabel">
        <div className="mf-off-canvas-header">
            <p className="head-ing">Menu</p>
            <button className="close-btn" data-bs-dismiss="offcanvas" aria-label="Close"><X /></button>
        </div>
        <div className="megamenu-body-con">
            <div className="mega-menu-content">

            </div>
            <div className="footer-section">
                <p className="follow">Follow us on</p>
                <div className="social-media-icons">
                    <NavLink><img src={Facebook} alt="" /></NavLink>
                    <NavLink><img src={XIcon} alt="" /></NavLink>
                    <NavLink><img src={Instagram} alt="" /></NavLink>
                    <NavLink><img src={LinkedIn} alt="" /></NavLink>
                    <NavLink><img src={Youtube} alt="" /></NavLink>
                    <NavLink><img src={Tiktok} alt="" /></NavLink>
                </div>
                <p className="copy-right">© 2023-2025 MommyFirst.  All rights Reserved. <br/> NeoMedUSA LLC, Where Innovation Meets Healthcare, and the Fun Never Ends!</p>
            </div>
        </div>
    </div>
  )
}

export default MegaMenuModal