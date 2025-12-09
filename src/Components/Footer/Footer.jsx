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
                        <NavLink>Story</NavLink>
                        <NavLink>Contact Us</NavLink>
                        <NavLink>Events</NavLink>
                        <NavLink>Reviews</NavLink>
                        <NavLink>Careers</NavLink>
                        <NavLink>Business Enquiries</NavLink>
                    </div>

                    <div className="menu-item-section">
                        <p className='menu-heading'>The Journal</p>
                        <NavLink>Pregnancy care</NavLink>
                        <NavLink>Postpartum care</NavLink>
                        <NavLink>Breast care</NavLink>
                        <NavLink>Baby care</NavLink>
                        <NavLink>Mom care</NavLink>
                        <NavLink>Milestones</NavLink>
                        <NavLink>Wellness & Comfort</NavLink>
                    </div>

                    <div className="menu-item-section">
                        <p className='menu-heading'>Products</p>
                        <NavLink>New & Noteworthy <span className='flash-animation' style={{background: '#5ED34B', color: '#ffffff'}}>New</span></NavLink>
                        <NavLink>Pregnancy care</NavLink>
                        <NavLink>Postpartum care</NavLink>
                        <NavLink>Exclusive Bundles <span className='flash-animation' style={{background: '#FF1F1F', color: '#ffffff'}}>Sale</span></NavLink>
                        <NavLink>Recovery Essentials</NavLink>
                        <NavLink>Mega Recovery Kits</NavLink>
                        <NavLink>Breast Care</NavLink>
                    </div>

                    <div className="menu-item-section">
                        <p className='menu-heading'>Help</p>
                        <NavLink>FAQs</NavLink>
                        <NavLink>Privacy Policy</NavLink>
                        <NavLink>Terms & Conditions</NavLink>
                        <NavLink>Shipping & Delivery</NavLink>
                        <NavLink>Order Tracking</NavLink>
                        <NavLink>Contact Us</NavLink>
                    </div>

                    <div className="menu-item-section">
                        <p className='menu-heading'>GCC Distribution</p>
                        <NavLink>Call: +974 50330029</NavLink>
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