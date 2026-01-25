import React from 'react'
import './AFMarketing.css'
import Heading from '../../Components/Heading/Heading'
import HeroImg from '../../assets/af-marketing/hero-img.png'
import Trophy from '../../assets/af-marketing/trophy.svg'
import Bottle from '../../assets/af-marketing/bottle.svg'
import Pad from '../../assets/af-marketing/pad.svg'
import Box from '../../assets/af-marketing/box.svg'
import Percentage from '../../assets/af-marketing/percentage.svg'
import Folder from '../../assets/af-marketing/folder.svg'
import Help from '../../assets/af-marketing/help.svg'

const AFMarketing = () => {
    const headingData = {
        'title': 'affiliate program',
        'subtitle': "Elevate the Fourth Trimester. <br/> Join the Mommy First™ Pro-Circle.",
        'description': ' A postpartum affiliate program for doulas, midwives, and maternal health professionals <br/> promoting alcohol-free postpartum recovery products and advanced cooling solutions.'
    }
  return (
    <div className="af-marketing-container-section">
        <div className="container">
            <div className="af-marketing-hero-section">
                <img src={HeroImg} alt="" className="hero-img" />
                <Heading data={headingData} />
                <button className='button-pink-center apply-btn-af-mar'>Apply for the Pro-Circle Affiliate Program</button>
            </div>

            <div className="why-partner-section">
                <p className="head"><img src={Trophy} alt="" />Why Partner With Mommy First™</p>
                <div className="why-partner-items">
                    <div className="why-partner-item">
                        <img src={Bottle} alt="" />
                        <h1>The No-Sting Standard™ – Alcohol-Free Postpartum Care</h1>
                        <p>Our Witch Hazel Combo sets a new benchmark in alcohol-free postpartum recovery, delivering cooling comfort without the irritation caused by legacy hospital products.</p>
                    </div>

                    <div className="why-partner-item">
                        <img src={Pad} alt="" />
                        <h1>The No-Slosh Standard™ – Advanced Postpartum Ice Pads</h1>
                        <p>Our ultra-thin postpartum ice pads use patented gel technology to eliminate bulk, leakage, and discomfort—ideal for extended wear during the fourth trimester.</p>
                    </div>

                    <div className="why-partner-item">
                        <img src={Box} alt="" />
                        <h1>Exclusive Postpartum Recovery Kits (High AOV)</h1>
                        <p>Affiliates earn commission on DTC-exclusive postpartum recovery kits, engineered for the 40-day fourth trimester recovery window—driving higher average order value and repeat purchases.</p>
                    </div>
                </div>
                <button className='button-pink-center apply-for-pro-circle'>Apply for the Pro-Circle Affiliate Program</button>
            </div>

            <div className="apply-acces-earn-sec">
                <p className="pink">Apply <span></span></p>
                <p className="dark-pink">ACCESS</p>
                <p className="earn"><span></span>EARN</p>
            </div>

            <div className="af-benifits-prof">
                <div className="benefits-section">
                    <p className="head">
                        <img src={Percentage} alt="" /> Affiliate Program Benefits 
                    </p>
                    <p className="label">Commission & Tracking</p>
                    <p className="shade-item">15% commission on all net sales</p>
                    <p className="shade-item">30-day cookie window to support longer postpartum decision cycles</p>
                    <p className="shade-item">Reliable tracking powered by impact.com</p>
                </div>

                <div className="professional-section">
                    <p className="head">
                        <img src={Folder} alt="" /> Affiliate Marketing Assets for Professionals 
                    </p>
                    <p className="label">Approved partners receive access to a professional affiliate asset vault, including:</p>
                    <p className="shade-item">High-conversion lifestyle and clinical visuals</p>
                    <p className="shade-item">Evidence-based postpartum education guides</p>
                    <p className="shade-item">Ready-to-share patient and client resources</p>
                </div>
            </div>

            <div className="af-whos-this-for">
                <p className="head">
                    <img src={Help} alt="" /> Who This Affiliate Program Is For?
                </p>
                <p className="label">This maternal health affiliate program is designed for:</p>
                <p className="shade-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0078 21.9998C17.5307 21.9998 22.0078 17.5226 22.0078 11.9998C22.0078 6.47691 17.5307 1.99976 12.0078 1.99976C6.48497 1.99976 2.00781 6.47691 2.00781 11.9998C2.00781 17.5226 6.48497 21.9998 12.0078 21.9998Z" fill="#5ED34B"/>
                        <path d="M7.08594 12L10.0859 15L16.0859 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Doulas & birth workers</span>
                </p>
                <p className="shade-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0078 21.9998C17.5307 21.9998 22.0078 17.5226 22.0078 11.9998C22.0078 6.47691 17.5307 1.99976 12.0078 1.99976C6.48497 1.99976 2.00781 6.47691 2.00781 11.9998C2.00781 17.5226 6.48497 21.9998 12.0078 21.9998Z" fill="#5ED34B"/>
                        <path d="M7.08594 12L10.0859 15L16.0859 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Midwives & women’s health practitioners</span>
                </p>
                <p className="shade-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0078 21.9998C17.5307 21.9998 22.0078 17.5226 22.0078 11.9998C22.0078 6.47691 17.5307 1.99976 12.0078 1.99976C6.48497 1.99976 2.00781 6.47691 2.00781 11.9998C2.00781 17.5226 6.48497 21.9998 12.0078 21.9998Z" fill="#5ED34B"/>
                        <path d="M7.08594 12L10.0859 15L16.0859 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Postpartum educators & recovery coaches</span>
                </p>
                <p className="shade-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0078 21.9998C17.5307 21.9998 22.0078 17.5226 22.0078 11.9998C22.0078 6.47691 17.5307 1.99976 12.0078 1.99976C6.48497 1.99976 2.00781 6.47691 2.00781 11.9998C2.00781 17.5226 6.48497 21.9998 12.0078 21.9998Z" fill="#5ED34B"/>
                        <path d="M7.08594 12L10.0859 15L16.0859 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Maternal health content creators</span>
                </p>
                <p className="shade-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0078 21.9998C17.5307 21.9998 22.0078 17.5226 22.0078 11.9998C22.0078 6.47691 17.5307 1.99976 12.0078 1.99976C6.48497 1.99976 2.00781 6.47691 2.00781 11.9998C2.00781 17.5226 6.48497 21.9998 12.0078 21.9998Z" fill="#5ED34B"/>
                        <path d="M7.08594 12L10.0859 15L16.0859 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Pregnancy & postpartum-focused platforms</span>
                </p>
                <button className='button-pink-center mt-5'>Apply for the Pro-Circle Affiliate Program</button>
            </div>
        </div>
    </div>
  )
}

export default AFMarketing