import React from 'react'
import './Contact.css'
import { Clock } from 'lucide-react'

const Contact = () => {
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
                <button className='button-pink-center'>FREQUENTLY ASKED QUESTIONS</button>
            </div>

            <div className="contact-details-section">
                <h2 className="sub-heading">The Recovery Concierge Whether you are building your hospital bag or need <br /> help sizing your kit, our team is on standby to help you prepare.</h2>
                <p className="desc">If you are currently in labor or experiencing a medical emergency, please contact your healthcare provider immediately.</p>
            </div>

            <div className='contact-return-text-changes'>
                <h1>Returns & Exchanges</h1>
                <h2>The Perfect Fit Promise Wrong size? Damaged box? Don't stress. We prfioritize <br /> exchanges and replacements to get you the right care, fast.</h2>
                <button className="button-pink-center">LOGIN TO YOUR ACCOUNT</button>
            </div>
        </div>
    </>
  )
}

export default Contact