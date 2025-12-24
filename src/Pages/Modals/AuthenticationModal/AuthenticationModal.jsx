import React, { useState } from 'react'
import './AuthenticationModal.css'
import { ChevronDown, X } from 'lucide-react'
import Google from '../../../assets/Google.svg'
import Facebook from '../../../assets/Facebook.svg'
import Apple from '../../../assets/Apple.svg'
import USFlag from '../../../assets/us-flag.svg'

const AuthenticationModal = () => {
  const [toggleAction, setToggleAction] = useState('left')
  const [loginAction, setLoginAction] = useState('email')
  const [displayOtp, setDisplayOtp] = useState(false)
  return (
    <div class="offcanvas offcanvas-end" tabindex="-1" id="AuthenticationModal" aria-labelledby="offcanvasRightLabel">
        <div className="mf-off-canvas-header">
            <p className="head-ing">Login</p>
            <button className="close-btn" data-bs-dismiss="offcanvas" aria-label="Close"><X /></button>
        </div>
        <div className="login-modal-body-con">
          <div className="tab-switching-container">
            <div className={`toggle-slider ${toggleAction == 'right' ? 'right' : ''} ${toggleAction == 'left' ? 'left' : ''}`}></div>
            <button onClick={()=>{setToggleAction('left'); setLoginAction('email'); setDisplayOtp(false)}}>Login with Email</button>
            <button onClick={()=>{setToggleAction('right'); setLoginAction('mobile'); setDisplayOtp(false)}}>Login with Mobile</button>
          </div>

          {
            loginAction == 'email' && !displayOtp ? (
              <div className="email-login-main-container">
                <div className="mf-input-container">
                  <label>Enter your email address</label>
                  <input type="text" placeholder='example@email.com' />
                </div>
                <button className='button-pink-center' style={{boxShadow: 'none', marginTop: '22px'}} >Continue</button>
              </div>
            ) : (<></>)
          }

          {
            loginAction == 'mobile' && !displayOtp ? (
              <div className="mobile-login-main-container">
                <div className="mf-input-container">
                  <label>Enter your mobile number</label>
                  <div className="dropdown-section">
                    <div className="country-sec">
                      <img src={USFlag} alt="" className='flag' />
                      <span className="country-code">+123</span>
                      <ChevronDown />
                    </div>
                    <input type="text" placeholder='example@email.com' style={{flex: '1', borderRadius: '0 8px 8px 0'}} />
                  </div>
                </div>
                <button className='button-pink-center' style={{boxShadow: 'none', marginTop: '22px'}} >Continue</button>
              </div>
            ) : (<></>)
          }

          {
            displayOtp ? (
              <div className='login-otp-section-container'>

              </div>
            ) : (<></>)
          }
          
        </div>
        <div className="login-modal-footer">
          <div className="login-alternate-button-section">
            <button><img src={Google} alt="" /> Sign in with Google</button>
            <button><img src={Facebook} alt="" /> Sign in with Facebook</button>
            <button><img src={Apple} alt="" /> Sign in with Apple</button>
          </div>
        </div>
    </div>
  )
}

export default AuthenticationModal