import React from 'react'
import './Donation.css'
import Heading from '../../Components/Heading/Heading'
import HeroImg from '../../assets/Donation/heroimg.png'
import Postpartum from '../../assets/Donation/postpartum.png'
import Discussion from '../../assets/Donation/discussion.png'

const Donation = () => {
    const headingData = {
        'title': "DONATION",
        'subtitle': "Giving Back to Mothers",
        'description': false
    }
  return (
    <>
        <Heading data={headingData} />
        <div className="container">
            <div className="donation-hero-section">
                <h1>Caring for Mothers, Together</h1>
                <img src={HeroImg} alt="" />
                <p>As Mommy First grows, so does our responsibility to support mothers everywhere. We believe postpartum care should be accessible to all women, especially those who need it most. Giving back is an essential part of our mission, and we are proud to support charitable and nonprofit organizations dedicated to maternal health, education, and postpartum well-being.</p>
            </div>

            <div className="donation-content-container">
                <h1>Supporting Our Moms and Their Precious Families</h1>
                <p>Motherhood is powerful, but it can also be overwhelming. We stand beside mothers and their families by supporting organizations that uplift and protect maternal mental health during pregnancy, postpartum, and beyond.</p>
                <p>For every Mommy First <strong>Witch Hazel Combo</strong> purchased, <strong>$1.00 is donated to support maternal mental health initiatives through Postpartum Support International</strong>  helping fund education, advocacy, and access to emotional support resources for families worldwide.</p>
                <p>Every purchase truly makes a difference.</p>
                <hr />
                
                <h1>Supporting Postpartum Support International</h1>
                <img src={Postpartum} className='postpartum-img' alt="" />
                <p>Postpartum Support International (PSI) is a global nonprofit dedicated to helping families affected by perinatal mood and anxiety disorders.</p>
                <ul>
                    <label>PSI provides:</label>
                    <li>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0078 21.9998C17.5307 21.9998 22.0078 17.5226 22.0078 11.9998C22.0078 6.47691 17.5307 1.99976 12.0078 1.99976C6.48497 1.99976 2.00781 6.47691 2.00781 11.9998C2.00781 17.5226 6.48497 21.9998 12.0078 21.9998Z" fill="#5ED34B"/>
                            <path d="M7.08594 12L10.0859 15L16.0859 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Education and advocacy for maternal mental health</span>
                    </li>
                    <li>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0078 21.9998C17.5307 21.9998 22.0078 17.5226 22.0078 11.9998C22.0078 6.47691 17.5307 1.99976 12.0078 1.99976C6.48497 1.99976 2.00781 6.47691 2.00781 11.9998C2.00781 17.5226 6.48497 21.9998 12.0078 21.9998Z" fill="#5ED34B"/>
                            <path d="M7.08594 12L10.0859 15L16.0859 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Professional training for healthcare providers</span>
                    </li>
                    <li>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0078 21.9998C17.5307 21.9998 22.0078 17.5226 22.0078 11.9998C22.0078 6.47691 17.5307 1.99976 12.0078 1.99976C6.48497 1.99976 2.00781 6.47691 2.00781 11.9998C2.00781 17.5226 6.48497 21.9998 12.0078 21.9998Z" fill="#5ED34B"/>
                            <path d="M7.08594 12L10.0859 15L16.0859 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Connections to local and global support resources</span>
                    </li>
                    <li>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0078 21.9998C17.5307 21.9998 22.0078 17.5226 22.0078 11.9998C22.0078 6.47691 17.5307 1.99976 12.0078 1.99976C6.48497 1.99976 2.00781 6.47691 2.00781 11.9998C2.00781 17.5226 6.48497 21.9998 12.0078 21.9998Z" fill="#5ED34B"/>
                            <path d="M7.08594 12L10.0859 15L16.0859 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Compassionate support for families navigating anxiety, depression, and emotional challenges related to pregnancy, childbirth, and early parenting</span>
                    </li>
                    <li>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0078 21.9998C17.5307 21.9998 22.0078 17.5226 22.0078 11.9998C22.0078 6.47691 17.5307 1.99976 12.0078 1.99976C6.48497 1.99976 2.00781 6.47691 2.00781 11.9998C2.00781 17.5226 6.48497 21.9998 12.0078 21.9998Z" fill="#5ED34B"/>
                            <path d="M7.08594 12L10.0859 15L16.0859 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Education and advocacy for maternal mental health</span>
                    </li>
                </ul>
                <p>Through our ongoing support of PSI, Mommy First helps extend vital resources to families during one of the most vulnerable and important seasons of life.</p>
                <hr />

                <div className="discussion-container">
                    <img src={Discussion} alt="" />
                    <div className="contents">
                        <h1>Small Actions. Meaningful Impact.</h1>
                        <p>Every product purchased and every act of care helps move us closer to a world where no mother feels alone during her postpartum journey.</p>
                        <p>Together, we are creating access, awareness, and <br /> support - one mama at a time.</p>
                        <p>Mommy First is an independent supporter of Postpartum <br /> Support International. Donations are made directly <br /> through PSI’s official donation channels.</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Donation