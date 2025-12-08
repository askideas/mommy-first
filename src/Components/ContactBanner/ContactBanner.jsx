import React from 'react'
import './ContactBanner.css'
import Bulb from '../../assets/contactbanner/light-bulb.svg'
import { Mail } from 'lucide-react'

const ContactBanner = () => {
  return (
    <div className="container">
      <div className="contact-banner-container">
        <img src={Bulb} alt="" />
        <p>
          <span>Got an idea, a question, or just want to say hi? </span>
          <span>Let's make amazing together.</span>
        </p>
        <button className='button-white'>Drop us a line <Mail className='icon'/></button>
      </div>
    </div>
  )
}

export default ContactBanner