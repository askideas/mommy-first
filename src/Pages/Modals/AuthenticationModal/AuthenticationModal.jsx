import React, { useState } from 'react'
import './AuthenticationModal.css'
import { ChevronDown, X } from 'lucide-react'
import Google from '../../../assets/Google.svg'
import Facebook from '../../../assets/Facebook.svg'
import Apple from '../../../assets/Apple.svg'
import USFlag from '../../../assets/us-flag.svg'
import successImg from '../../../assets/login-success.png'
import { Link, useNavigate } from 'react-router-dom'

const AuthenticationModal = () => {
  const [toggleAction, setToggleAction] = useState('left')
  const [loginAction, setLoginAction] = useState('email')
  const [displayOtp, setDisplayOtp] = useState(false)
  const [email, setEmail] = useState('example@email.com')
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [suceessScreen, setSuccessScreen] = useState(false)
  const navigate = useNavigate()

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  // Handle OTP backspace
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  // Handle paste
  const handleOtpPaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char
    })
    setOtp(newOtp)

    // Focus last filled input or first empty
    const lastIndex = Math.min(pastedData.length, 5)
    const lastInput = document.getElementById(`otp-${lastIndex}`)
    if (lastInput) lastInput.focus()
  }

  return (
    <div class="offcanvas offcanvas-end" tabindex="-1" id="AuthenticationModal" aria-labelledby="offcanvasRightLabel">
      {
        !suceessScreen ? (
          <div className="mf-off-canvas-header">
            <p className="head-ing">Login</p>
            <button className="close-btn" data-bs-dismiss="offcanvas" aria-label="Close"><X /></button>
        </div>
        ) : (<></>)
      }
        
      <div className="login-modal-body-con">
        {
          !displayOtp && !suceessScreen ? (
            <div className="tab-switching-container">
              <div className={`toggle-slider ${toggleAction == 'right' ? 'right' : ''} ${toggleAction == 'left' ? 'left' : ''}`}></div>
              <button onClick={()=>{setToggleAction('left'); setLoginAction('email'); setDisplayOtp(false)}}>Login with Email</button>
              <button onClick={()=>{setToggleAction('right'); setLoginAction('mobile'); setDisplayOtp(false)}}>Login with Mobile</button>
            </div>
          ) : (
            <></>
          )
        }

        {
          loginAction == 'email' && !displayOtp ? (
            <div className="email-login-main-container">
              <div className="mf-input-container">
                <label>Enter your email address</label>
                <input 
                  type="text" 
                  placeholder='example@email.com' 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button 
                className='button-pink-center' 
                style={{boxShadow: 'none', marginTop: '22px', height: '40px'}}
                onClick={() => setDisplayOtp(true)}
              >
                Continue
              </button>
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
                  <input 
                    type="text" 
                    placeholder='1234567890' 
                    style={{flex: '1', borderRadius: '0 8px 8px 0'}}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
              </div>
              <button 
                className='button-pink-center' 
                style={{boxShadow: 'none', marginTop: '22px', height: '40px'}}
                onClick={() => setDisplayOtp(true)}
              >
                Continue
              </button>
            </div>
          ) : (<></>)
        }

        {
          displayOtp ? (
            <div className='login-otp-section-container'>
              <h3 className='otp-heading'>
                Enter the 6 digit code sent to
              </h3>
              <p className='otp-contact'>
                {loginAction === 'example@email.com' ? email : `+123 ${mobile}`}
              </p>
              
              <div className='otp-inputs-container'>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type='text'
                    maxLength='1'
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={index === 0 ? handleOtpPaste : undefined}
                    className='otp-input'
                  />
                ))}
              </div>

              <p className='otp-resend-text'>
                Code not received? <span className='resend-link'>Resend</span>
              </p>

              <button className='button-pink-center otp-submit-btn' style={{height: '40px'}} onClick={()=>{setToggleAction(''); setLoginAction(''); setDisplayOtp(false); setSuccessScreen(true)}}>
                Submit
              </button>
            </div>
          ) : (<></>)
        }

        {
          suceessScreen ? (
            <div className='login-sucess-screen-container'>
              <img src={successImg} alt="" />
              <p className="text">You’re all set! <br /> Welcome to MommyFirst 👋</p>
              <Link className='button-pink-center' to='/shop'>Continue Shopping</Link>
            </div>
          ) : (<></>)
        }
        
      </div>

      {
        loginAction == 'email' || loginAction == 'mobile' ? (
          <div className="login-modal-footer">
            <div className="login-alternate-button-section">
              <button><img src={Google} alt="" /> Sign in with Google</button>
              <button><img src={Facebook} alt="" /> Sign in with Facebook</button>
              <button><img src={Apple} alt="" /> Sign in with Apple</button>
            </div>
          </div>
        ) : (<></>)
      }
        
    </div>
  )
}

export default AuthenticationModal