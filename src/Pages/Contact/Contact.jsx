import React from 'react'
import './Contact.css'
import { Clock, Mail, Smartphone } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
  return (
    <>
        <div className="container">
            <div className="contact-page-heading-container">
                <h2>contact us</h2>
                <h1>We’re Here for You.</h1>
                <p className='description' ><Clock />We usually respond the same day.</p>
            </div>

            <div className="faqs-section">
                <h1>Have a question?</h1>
                <h2>You might find your answer in our <br /> FAQ before getting in touch.</h2>
                <button className='button-pink-center' onClick={()=>navigate('/faqs')}>FREQUENTLY ASKED QUESTIONS</button>
            </div>

            <div className="contact-details-section">
                <h2 className="sub-heading">The Recovery Concierge Whether you are building your hospital bag or need <br /> help sizing your kit, our team is on standby to help you prepare.</h2>
                <p className="desc">If you are currently in labor or experiencing a medical emergency, please contact your healthcare provider immediately.</p>
            </div>

            <div className='contact-section-details-con'>
                <div className="row w-100 m-0 p-0">
                    <div className="col-4 email-details-section">
                        <p className="heading"><Mail />  Email</p>
                        <p className="response-txt"><Clock /> Response time: within 8 hours.</p>

                        <p className="email-item">
                            <span className="active">For general enquires</span>
                            <span className="txt-mail">care@themommyfirst.com</span>
                        </p>

                        <p className="email-item">
                            <span className="active">For order queries</span>
                            <span className="txt-mail">orders@themommyfirst.com</span>
                        </p>

                        <p className="email-item">
                            <span className="active">For support</span>
                            <span className="txt-mail">support@themommyfirst.com</span>
                        </p>

                        <p className="description-txt">For assistance outside these hours, please email customer support.</p>
                    </div>

                    <div className="col-4 mobile-details-section">
                        <p className="heading"><Smartphone />  Phone</p>
                        <p className="response-txt"><Clock /> Mon - Sat 9:00 AM - 5:00 PM - EST</p>
                        <p className="mobile-number">(845) 300-9289</p>

                        <p className="heading margin-more"><Smartphone />  WhatsApp</p>
                        <p className="response-txt"><Clock /> Response time: within 4 hours.</p>
                        <p className="mobile-number">(845) 300-9289</p>

                        <p className="description-txt">For assistance outside these hours, please email customer support.</p>
                    </div>

                    <div className="col-4 contact-det-sec">
                        <h1>Global Infrastructure. <br /> Local Care.</h1>
                        <h2>Partner with the leader in premium postpartum solutions.</h2>
                        <button className='button-pink-center' onClick={()=>navigate('/enquiries')} >BUSINESS ENQUIRIES</button>
                    </div>
                </div>
            </div>

            <div className='contact-return-text-changes'>
                <h1>Returns & Exchanges</h1>
                <h2>The Perfect Fit Promise Wrong size? Damaged box? Don't stress. We prfioritize <br /> exchanges and replacements to get you the right care, fast.</h2>
                {
                    isAuthenticated ? (
                        <button className="button-pink-center" onClick={()=>navigate('/profile/#orders')}>Returns & Exchanges</button>
                    ) : (
                        <button className="button-pink-center" data-bs-toggle="offcanvas"
                        data-bs-target="#AuthenticationModal" >LOGIN TO YOUR ACCOUNT</button>
                    )
                }
                
            </div>
        </div>
    </>
  )
}

export default Contact