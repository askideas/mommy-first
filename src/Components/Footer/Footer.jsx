import React, { useRef } from 'react'
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
import { useFadeUpAnimation } from '../../hooks/useFadeUpAnimation'

const Footer = () => {
  const menuRef = useRef(null)
  const socialRef = useRef(null)
  const copyrightRef = useRef(null)

  const [menuRefElement, menuVisible] = useFadeUpAnimation()
  const [socialRefElement, socialVisible] = useFadeUpAnimation()
  const [copyrightRefElement, copyrightVisible] = useFadeUpAnimation()

  const getFadeUpClass = (baseClass, isVisible) => {
    return isVisible ? `${baseClass} visible` : baseClass
  }
  return (
    <div className='footer-main-container'>
        <img src={Watermark} alt="" className='footer-watermark' />
        <div className="container">
            <div className="footer">
                
                <div ref={menuRefElement} className={getFadeUpClass('fade-up-animation menu-items-section', menuVisible)}>
                    <div className="menu-item-section" style={{animationDelay: '0.1s'}}>
                        <p className='menu-heading'>About</p>
                        <NavLink to="/about" >Our Story</NavLink>
                        <NavLink to="/stories" >Reviews</NavLink>
                        <NavLink to="/events" >Events</NavLink>
                        <NavLink to="/blogs" >News Room</NavLink>
                        <NavLink to="/donation" >Giving Back</NavLink>
                    </div>

                    <div className="menu-item-section" style={{animationDelay: '0.2s'}}>
                        <p className='menu-heading'>Shop</p>
                        <NavLink to="/shop" >Shop All</NavLink>
                        <NavLink tp="/bundles" >Exclusive Bundles <span className='flash-animation' style={{background: '#FF1F1F', color: '#ffffff'}}>Sale</span></NavLink>
                        <NavLink to="/collection/pregnancy-care" >Pregnancy Care</NavLink>
                        <NavLink to="/collection/postpartum-care" >Postpartum Care</NavLink>
                        <NavLink to="/collection/breast-care" >Breast Care</NavLink>
                        <NavLink to="/collection/baby-care" >Baby Care</NavLink>
                    </div>

                    <div className="menu-item-section" style={{animationDelay: '0.3s'}}>
                        <p className='menu-heading'>Community</p>
                        <NavLink to="/care-hub" >Care Hub <span className='flash-animation' style={{background: '#5ED34B', color: '#ffffff'}}>New</span></NavLink>
                        <NavLink>Care Guides</NavLink>
                        <NavLink>Live Sessions</NavLink>
                        <NavLink to="/blogs" >Blog</NavLink>
                        <NavLink to="/events" >Events</NavLink>
                        <NavLink>Education</NavLink>
                        <NavLink to="/donation" >Giving Back</NavLink>
                    </div>

                    <div className="menu-item-section" style={{animationDelay: '0.4s'}}>
                        <p className='menu-heading'>Help</p>
                        <NavLink to="/faqs" >FAQs</NavLink>
                        <NavLink>Order Tracking</NavLink>
                        <NavLink to="/returns-refunds">Returns & Reunds</NavLink>
                        <NavLink to="/contact">Contact Us</NavLink>
                    </div>

                    <div className="menu-item-section" style={{animationDelay: '0.5s'}}>
                        <p className='menu-heading'>Work With Us</p>
                        <NavLink>Wholesale</NavLink>
                        <NavLink>Retail Partners</NavLink>
                        <NavLink>Affiliates</NavLink>
                        <NavLink>Healthcare Providers</NavLink>
                        <NavLink to="tel:+97450330029">Call: +974 50330029</NavLink>
                        <button className='button-pink'>Send an Email <Mail className='icon'/></button>
                    </div>
                </div>

                <div ref={socialRefElement} className={getFadeUpClass('fade-up-animation footer-social-section', socialVisible)}>
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

                <div ref={copyrightRefElement} className={getFadeUpClass('fade-up-animation copy-right-section', copyrightVisible)}>
                    <span>© 2023-{new Date().getFullYear()} MommyFirst.  All rights Reserved.</span>
                    <span>NeoMedUSA LLC, Where Innovation Meets Healthcare, and the Fun Never Ends!</span>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Footer