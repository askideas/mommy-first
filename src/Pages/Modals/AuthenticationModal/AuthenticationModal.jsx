import React, { useState } from 'react'
import './AuthenticationModal.css'
import { ChevronDown, X, Loader2 } from 'lucide-react'
import Google from '../../../assets/Google.svg'
import Facebook from '../../../assets/Facebook.svg'
import Apple from '../../../assets/Apple.svg'
import successImg from '../../../assets/login-success.png'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import {
  sendEmailOTP,
  verifyEmailOTP,
  sendMobileOTP,
  verifyMobileOTP,
  startGoogleAuth,
  startFacebookAuth,
  startAppleAuth,
  countryCodes
} from '../../../services/authService'

const AuthenticationModal = () => {
  const { login, isAuthenticated, user, customer } = useAuth()
  const navigate = useNavigate()
  
  // UI State
  const [toggleAction, setToggleAction] = useState('left')
  const [loginAction, setLoginAction] = useState('email')
  const [displayOtp, setDisplayOtp] = useState(false)
  const [successScreen, setSuccessScreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Form State
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0])
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [maskedContact, setMaskedContact] = useState('')

  // Reset form state
  const resetForm = () => {
    setToggleAction('left')
    setLoginAction('email')
    setDisplayOtp(false)
    setSuccessScreen(false)
    setIsLoading(false)
    setError('')
    setEmail('')
    setMobile('')
    setOtp(['', '', '', '', '', ''])
    setMaskedContact('')
  }

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

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

    const lastIndex = Math.min(pastedData.length, 5)
    const lastInput = document.getElementById(`otp-${lastIndex}`)
    if (lastInput) lastInput.focus()
  }

  // Send OTP Handler
  const handleSendOTP = async () => {
    setError('')
    setIsLoading(true)

    try {
      let response
      
      if (loginAction === 'email') {
        if (!email || !email.includes('@')) {
          setError('Please enter a valid email address')
          setIsLoading(false)
          return
        }
        response = await sendEmailOTP(email)
        if (response.success) {
          setMaskedContact(response.maskedEmail || email)
        }
      } else {
        if (!mobile || mobile.length < 6) {
          setError('Please enter a valid mobile number')
          setIsLoading(false)
          return
        }
        const fullPhone = `${selectedCountry.code}${mobile}`
        response = await sendMobileOTP(fullPhone)
        if (response.success) {
          setMaskedContact(response.maskedPhone || fullPhone)
        }
      }

      if (response.success) {
        setDisplayOtp(true)
        setError('')
      } else {
        setError(response.message || 'Failed to send OTP. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Verify OTP Handler
  const handleVerifyOTP = async () => {
    const otpCode = otp.join('')
    
    if (otpCode.length !== 6) {
      setError('Please enter the complete 6-digit code')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      let response
      
      if (loginAction === 'email') {
        response = await verifyEmailOTP(email, otpCode)
      } else {
        const fullPhone = `${selectedCountry.code}${mobile}`
        response = await verifyMobileOTP(fullPhone, otpCode)
      }

      if (response.success) {
        login(
          response.sessionToken, 
          response.refreshToken, 
          response.user, 
          response.customer, 
          response.isNewCustomer
        )
        setSuccessScreen(true)
        setError('')
      } else {
        setError(response.message || 'Invalid OTP. Please try again.')
      }
    } catch (err) {
      setError('Verification failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Resend OTP Handler
  const handleResendOTP = async () => {
    setOtp(['', '', '', '', '', ''])
    await handleSendOTP()
  }

  // Social Login Handlers
  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const redirectUrl = `${window.location.origin}/auth/callback?provider=google`
      const response = await startGoogleAuth(redirectUrl)
      
      if (response.success && response.authUrl) {
        window.location.href = response.authUrl
      } else {
        setError(response.message || 'Failed to start Google login')
        setIsLoading(false)
      }
    } catch (err) {
      setError('Failed to start Google login. Please try again.')
      setIsLoading(false)
    }
  }

  const handleFacebookLogin = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const redirectUrl = `${window.location.origin}/auth/callback?provider=facebook`
      const response = await startFacebookAuth(redirectUrl)
      
      if (response.success && response.authUrl) {
        window.location.href = response.authUrl
      } else {
        setError(response.message || 'Failed to start Facebook login')
        setIsLoading(false)
      }
    } catch (err) {
      setError('Failed to start Facebook login. Please try again.')
      setIsLoading(false)
    }
  }

  const handleAppleLogin = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const redirectUrl = `${window.location.origin}/auth/callback?provider=apple`
      const response = await startAppleAuth(redirectUrl)
      
      if (response.success && response.authUrl) {
        window.location.href = response.authUrl
      } else {
        setError(response.message || 'Failed to start Apple login')
        setIsLoading(false)
      }
    } catch (err) {
      setError('Failed to start Apple login. Please try again.')
      setIsLoading(false)
    }
  }

  const handleSuccessContinue = () => {
    closeModal()
    
    // Check if profile needs completion
    const storedIsNew = localStorage.getItem('isNewCustomer')
    const storedCustomer = localStorage.getItem('customer')
    const storedUser = localStorage.getItem('user')
    const profileCompleted = localStorage.getItem('profileCompleted')
    
    let needsCompletion = false
    
    // If already completed, no need to show modal
    if (profileCompleted === 'true') {
      navigate('/')
      return
    }
    
    // If new customer, needs completion
    if (storedIsNew === 'true') {
      needsCompletion = true
    }
    
    // If no customer data, needs completion
    if (!storedCustomer || storedCustomer === 'null') {
      needsCompletion = true
    }
    
    // Check for unverified email/phone or missing fields
    try {
      if (storedUser && storedCustomer && storedCustomer !== 'null') {
        const userData = JSON.parse(storedUser)
        const customerData = JSON.parse(storedCustomer)
        
        // Check verification status
        if (!userData.verifiedEmail && !userData.verifiedPhone) {
          needsCompletion = true
        }
        
        // Check for missing required fields
        if (!customerData.firstName || !customerData.lastName) {
          needsCompletion = true
        }
      }
    } catch (error) {
      console.error('Error checking profile completion:', error)
    }
    
    // Redirect based on completion status
    if (needsCompletion) {
      navigate('/profile#profile')
    } else {
      navigate('/')
    }
  }

  const closeModal = () => {
    const closeBtn = document.querySelector('#AuthenticationModal .close-btn')
    if (closeBtn) {
      closeBtn.click()
    }
    setTimeout(resetForm, 300)
  }

  // If user is already authenticated, show quick profile access
  // if (isAuthenticated && user) {
  //   return (
  //     <div className="offcanvas offcanvas-end" tabIndex="-1" id="AuthenticationModal" aria-labelledby="offcanvasRightLabel">
  //       <div className="mf-off-canvas-header">
  //         <p className="head-ing">Welcome back!</p>
  //         <button className="close-btn" data-bs-dismiss="offcanvas" aria-label="Close"><X /></button>
  //       </div>
  //       <div className="login-modal-body-con authenticated-view">
  //         <div className="user-welcome-section">
  //           <div className="user-avatar">
  //             {user.picture ? (
  //               <img src={user.picture} alt={customer?.fullName || user.name || 'User'} />
  //             ) : (
  //               <div className="avatar-placeholder">
  //                 {(customer?.fullName || user.name || user.email || 'U').charAt(0).toUpperCase()}
  //               </div>
  //             )}
  //           </div>
  //           <h3 className="user-name">Hi, {customer?.fullName || user.name || 'there'}! </h3>
  //           <p className="user-email">{customer?.email || user.email || customer?.phone || user.phone}</p>
  //           {customer?.ordersCount > 0 && (
  //             <p className="user-orders">You have {customer.ordersCount} order{customer.ordersCount > 1 ? 's' : ''}</p>
  //           )}
  //         </div>
  //         <Link 
  //           className='button-pink-center' 
  //           onClick={closeModal} 
  //           to='/profile#profile'
  //           style={{ textDecoration: 'none', marginTop: '24px' }}
  //         >
  //           Go to Profile
  //         </Link>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="AuthenticationModal" aria-labelledby="offcanvasRightLabel">
      {!successScreen && (
        <div className="mf-off-canvas-header">
          <p className="head-ing">Login</p>
          <button className="close-btn" data-bs-dismiss="offcanvas" aria-label="Close"><X /></button>
        </div>
      )}

      <div className="login-modal-body-con">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!displayOtp && !successScreen && (
          <div className="tab-switching-container">
            <div className={`toggle-slider ${toggleAction === 'right' ? 'right' : ''} ${toggleAction === 'left' ? 'left' : ''}`}></div>
            <button onClick={() => { setToggleAction('left'); setLoginAction('email'); setDisplayOtp(false); setError('') }}>
              Login with Email
            </button>
            <button onClick={() => { setToggleAction('right'); setLoginAction('mobile'); setDisplayOtp(false); setError('') }}>
              Login with Mobile
            </button>
          </div>
        )}

        {loginAction === 'email' && !displayOtp && !successScreen && (
          <div className="email-login-main-container">
            <div className="mf-input-container">
              <label>Enter your email address</label>
              <input
                type="email"
                placeholder='example@email.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <button
              className='button-pink-center'
              style={{ boxShadow: 'none', marginTop: '22px', height: '40px' }}
              onClick={handleSendOTP}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="spinner" /> : 'Continue'}
            </button>
          </div>
        )}

        {loginAction === 'mobile' && !displayOtp && !successScreen && (
          <div className="mobile-login-main-container">
            <div className="mf-input-container">
              <label>Enter your mobile number</label>
              <div className="dropdown-section">
                <div 
                  className="country-sec"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                >
                  <span className='flag'>{selectedCountry.flag}</span>
                  <span className="country-code">{selectedCountry.code}</span>
                  <ChevronDown />
                  
                  {showCountryDropdown && (
                    <div className="country-dropdown">
                      {countryCodes.map((country, index) => (
                        <div
                          key={index}
                          className="country-option"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCountry(country)
                            setShowCountryDropdown(false)
                          }}
                        >
                          <span className="flag">{country.flag}</span>
                          <span className="name">{country.country}</span>
                          <span className="code">{country.code}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="tel"
                  placeholder='1234567890'
                  style={{ flex: '1', borderRadius: '0 8px 8px 0' }}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  disabled={isLoading}
                />
              </div>
            </div>
            <button
              className='button-pink-center'
              style={{ boxShadow: 'none', marginTop: '22px', height: '40px' }}
              onClick={handleSendOTP}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="spinner" /> : 'Continue'}
            </button>
          </div>
        )}

        {displayOtp && !successScreen && (
          <div className='login-otp-section-container'>
            <button 
              className="back-btn"
              onClick={() => { setDisplayOtp(false); setOtp(['', '', '', '', '', '']); setError('') }}
            >
               Back
            </button>
            
            <h3 className='otp-heading'>
              Enter the 6 digit code sent to
            </h3>
            <p className='otp-contact'>
              {maskedContact}
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
                  disabled={isLoading}
                />
              ))}
            </div>

            <p className='otp-resend-text'>
              Code not received? <span className='resend-link' onClick={handleResendOTP}>Resend</span>
            </p>

            <button 
              className='button-pink-center otp-submit-btn' 
              style={{ height: '40px' }} 
              onClick={handleVerifyOTP}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="spinner" /> : 'Submit'}
            </button>
          </div>
        )}

        {successScreen && (
          <div className='login-sucess-screen-container'>
            <button className="close-btn d-none" data-bs-dismiss="offcanvas" aria-label="Close"><X /></button>
            <img src={successImg} alt="" />
            <p className="text">You're all set! <br /> Welcome to MommyFirst </p>
            <button className='button-pink-center' onClick={handleSuccessContinue}>
              Continue
            </button>
          </div>
        )}
      </div>

      {(loginAction === 'email' || loginAction === 'mobile') && !displayOtp && !successScreen && (
        <div className="login-modal-footer">
          <div className="login-alternate-button-section">
            <button onClick={handleGoogleLogin} disabled={isLoading}>
              <img src={Google} alt="" /> Sign in with Google
            </button>
            <button onClick={handleFacebookLogin} disabled={isLoading}>
              <img src={Facebook} alt="" /> Sign in with Facebook
            </button>
            <button onClick={handleAppleLogin} disabled={isLoading}>
              <img src={Apple} alt="" /> Sign in with Apple
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AuthenticationModal
