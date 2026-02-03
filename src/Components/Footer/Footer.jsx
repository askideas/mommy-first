import React from 'react'
import './Footer.css'
import { NavLink } from 'react-router-dom'
import { Mail } from 'lucide-react'
import Facebook from '../../assets/Footer/facebook.svg'
import X from '../../assets/Footer/x.svg'
import Instagram from '../../assets/Footer/instagram.svg'
import LinkedIn from '../../assets/Footer/linkedin.svg'
import Youtube from '../../assets/Footer/youtube.svg'
import Tiktok from '../../assets/Footer/tiktok.svg'
import AppleStore from '../../assets/Footer/apple-store.svg'
import PlayStore from '../../assets/Footer/play-store.svg'
import Watermark from '../../assets/Footer/m-water-mark.svg'

const Footer = () => {
  return (
    <div className='footer-main-container'>
        <img src={Watermark} alt="" className='footer-watermark' />
        <div className="container">
            <div className="footer">
                
                <div className="menu-items-section">
                    <div className="menu-item-section">
                        <p className='menu-heading'>About</p>
                        <NavLink to="/about" target='_blank'>Our Story</NavLink>
                        <NavLink to="/stories" target='_blank'>Reviews</NavLink>
                        <NavLink to="/events" target='_blank'>Events</NavLink>
                        <NavLink to="/blogs" target='_blank'>News Room</NavLink>
                        <NavLink to="/donation" target='_blank'>Giving Back</NavLink>
                    </div>

                    <div className="menu-item-section">
                        <p className='menu-heading'>Shop</p>
                        <NavLink to="/shop" target='_blank'>Shop All</NavLink>
                        <NavLink tp="/bundles" target='_blank'>Exclusive Bundles <span className='flash-animation' style={{background: '#FF1F1F', color: '#ffffff'}}>Sale</span></NavLink>
                        <NavLink to="/collections/pregnancy-care" target='_blank'>Pregnancy Care</NavLink>
                        <NavLink to="/collections/postpartum-care" target='_blank'>Postpartum Care</NavLink>
                        <NavLink to="/collections/breast-care" target='_blank'>Breast Care</NavLink>
                        <NavLink to="/collections/baby-care" target='_blank'>Baby Care</NavLink>
                    </div>

                    <div className="menu-item-section">
                        <p className='menu-heading'>Community</p>
                        <NavLink to="/care-hub" target='_blank'>Care Hub <span className='flash-animation' style={{background: '#5ED34B', color: '#ffffff'}}>New</span></NavLink>
                        <NavLink>Care Guides</NavLink>
                        <NavLink>Live Sessions</NavLink>
                        <NavLink to="/blogs" target='_blank'>Blog</NavLink>
                        <NavLink to="/events" target='_blank'>Events</NavLink>
                        <NavLink>Education</NavLink>
                        <NavLink to="/donation" target='_blank'>Giving Back</NavLink>
                    </div>

                    <div className="menu-item-section">
                        <p className='menu-heading'>Help</p>
                        <NavLink to="/faqs" target='_blank'>FAQs</NavLink>
                        <NavLink>Order Tracking</NavLink>
                        <NavLink to="/returns-refunds">Returns & Reunds</NavLink>
                        <NavLink to="/contact">Contact Us</NavLink>
                    </div>

                    <div className="menu-item-section">
                        <p className='menu-heading'>Work With Us</p>
                        <NavLink>Wholesale</NavLink>
                        <NavLink>Retail Partners</NavLink>
                        <NavLink>Affiliates</NavLink>
                        <NavLink>Healthcare Providers</NavLink>
                        <NavLink to="tel:+97450330029">Call: +974 50330029</NavLink>
                        <button className='button-pink'>Send an Email <Mail className='icon'/></button>
                    </div>
                </div>

                <div className="footer-social-section">
                    <div className="social-con">
                        <p className="social-heading">Follow us on</p>
                        <div className="icons-section">
                            <NavLink><img src={Facebook} alt="" /></NavLink>
                            <NavLink><img src={X} alt="" /></NavLink>
                            <NavLink><img src={Instagram} alt="" /></NavLink>
                            <NavLink><img src={LinkedIn} alt="" /></NavLink>
                            <NavLink><img src={Youtube} alt="" /></NavLink>
                            <NavLink><img src={Tiktok} alt="" /></NavLink>
                        </div>
                    </div>

                    <div className="download-section">
                        <p className="download-heading">Available soon</p>
                        <img src={AppleStore} alt="" style={{marginRight: '10px'}}/>
                        <img src={PlayStore} alt="" />
                    </div>
                </div>

                <div className="copy-right-section">
                    <span>© 2023-2025 MommyFirst.  All rights Reserved.</span>
                    <span>NeoMedUSA LLC, Where Innovation Meets Healthcare, and the Fun Never Ends!</span>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Footer