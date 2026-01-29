import React, { useState } from 'react'
import './ShopifyAuthenticationModal.css'
import { X, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import {
    shopifyLogin,
    shopifyRegister,
    startGoogleAuth,
    startFacebookAuth,
    startAppleAuth
} from '../../../services/authService'
import successImg from '../../../assets/login-success.png'
import Google from '../../../assets/Google.svg'
import Facebook from '../../../assets/Facebook.svg'
import Apple from '../../../assets/Apple.svg'

const ShopifyAuthenticationModal = () => {
    const { login, isAuthenticated, user, customer } = useAuth()
    const navigate = useNavigate()

    // UI State
    const [activeTab, setActiveTab] = useState('login') // 'login' or 'register'
    const [successScreen, setSuccessScreen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    // Reset form state
    const resetForm = () => {
        setActiveTab('login')
        setSuccessScreen(false)
        setIsLoading(false)
        setError('')
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (error) setError('')
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        const { email, password } = formData

        if (!email || !password) {
            setError('Please fill in all fields')
            setIsLoading(false)
            return
        }

        try {
            const response = await shopifyLogin(email, password)

            if (response.success) {
                // Response: { success, message, accessToken: { accessToken, expiresAt }, customer: null/object }
                // login(sessionToken, refreshToken, userData, customerData, isNew)

                const token = response.accessToken?.accessToken || response.accessToken
                const customerData = response.customer

                // If customer data is null in simpler API, fallback to basic user data from input
                // Ideally, fetch customer data separately if null, but for this step we use what we have

                login(
                    token, // sessionToken
                    token, // refreshToken (using same for now)
                    {
                        email: customerData?.email || email,
                        name: customerData ? `${customerData.firstName} ${customerData.lastName}`.trim() : email.split('@')[0]
                    },
                    customerData,
                    false // isNew
                )
                setSuccessScreen(true)
            } else {
                setError(response.message || 'Invalid credentials')
            }
        } catch (err) {
            setError('Login failed. Please try again.')
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        const { email, password, firstName, lastName } = formData

        if (!email || !password || !firstName || !lastName) {
            setError('Please fill in all fields')
            setIsLoading(false)
            return
        }

        try {
            const response = await shopifyRegister({ email, password, firstName, lastName })

            if (response.success) {
                // Auto login after registration if customer data is returned
                if (response.customer) {
                    // For registration, we might not get an access token immediately unless we login
                    // So let's try to login immediately
                    const loginResponse = await shopifyLogin(email, password)
                    if (loginResponse.success) {
                        const token = loginResponse.accessToken?.accessToken || loginResponse.accessToken
                        login(
                            token,
                            token,
                            { email: loginResponse.customer?.email || email, name: `${loginResponse.customer?.firstName} ${loginResponse.customer?.lastName}`.trim() },
                            loginResponse.customer,
                            true // isNew
                        )
                        setSuccessScreen(true)
                    } else {
                        setError('Account created, but auto-login failed. Please login.')
                        setActiveTab('login')
                    }
                } else {
                    // If manual verification needed
                    setError('Account created! Please check your email.')
                    setActiveTab('login')
                }
            } else {
                const errorMsg = response.errors ?
                    Object.values(response.errors).flat().join(', ') :
                    (response.message || 'Registration failed')
                setError(errorMsg)
            }
        } catch (err) {
            setError('Registration failed. Please try again.')
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSuccessContinue = () => {
        closeModal()
        navigate('/profile#profile')
    }

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

    const closeModal = () => {
        const closeBtn = document.querySelector('#AuthenticationModal .close-btn')
        if (closeBtn) {
            closeBtn.click()
        }
        setTimeout(resetForm, 300)
    }

    // If user is already authenticated, show quick profile access
    if (isAuthenticated && user) {
        return (
            <div className="offcanvas offcanvas-end shopify-auth-modal" tabIndex="-1" id="AuthenticationModal" aria-labelledby="offcanvasRightLabel">
                <div className="mf-off-canvas-header">
                    <p className="head-ing">Welcome back!</p>
                    <button className="close-btn" data-bs-dismiss="offcanvas" aria-label="Close"><X /></button>
                </div>
                <div className="login-modal-body-con authenticated-view">
                    <div className="user-welcome-section">
                        <div className="user-avatar">
                            <div className="avatar-placeholder">
                                {(customer?.firstName?.charAt(0) || user.name?.charAt(0) || user.email?.charAt(0) || 'U').toUpperCase()}
                            </div>
                        </div>
                        <h3 className="user-name">Hi, {customer?.firstName || user.name || 'there'}! </h3>
                        <p className="user-email">{customer?.email || user.email}</p>
                    </div>
                    <Link
                        className='button-pink-center'
                        onClick={closeModal}
                        to='/profile#profile'
                        style={{ textDecoration: 'none', marginTop: '24px' }}
                    >
                        Go to Profile
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="offcanvas offcanvas-end shopify-auth-modal" tabIndex="-1" id="AuthenticationModal" aria-labelledby="offcanvasRightLabel">
            {!successScreen && (
                <div className="mf-off-canvas-header">
                    <p className="head-ing">{activeTab === 'login' ? 'Login' : 'Create Account'}</p>
                    <button className="close-btn" data-bs-dismiss="offcanvas" aria-label="Close"><X /></button>
                </div>
            )}

            <div className="login-modal-body-con">
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {!successScreen && (
                    <div className="tab-switching-container">
                        <div className={`toggle-slider ${activeTab === 'register' ? 'right' : 'left'}`}></div>
                        <button
                            className={activeTab === 'login' ? 'active' : ''}
                            onClick={() => { setActiveTab('login'); setError(''); }}
                        >
                            Login
                        </button>
                        <button
                            className={activeTab === 'register' ? 'active' : ''}
                            onClick={() => { setActiveTab('register'); setError(''); }}
                        >
                            Register
                        </button>
                    </div>
                )}

                {activeTab === 'login' && !successScreen && (
                    <form onSubmit={handleLogin} className="email-login-main-container">
                        <div className="mf-input-container">
                            <label>Email address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder='example@email.com'
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="mf-input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder='Enter your password'
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            type="submit"
                            className='button-pink-center'
                            style={{ boxShadow: 'none', height: '40px' }}
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="spinner" /> : 'Login'}
                        </button>
                    </form>
                )}

                {activeTab === 'register' && !successScreen && (
                    <form onSubmit={handleRegister} className="mobile-login-main-container">
                        <div className="row-fields">
                            <div className="mf-input-container">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder='Jane'
                                    required
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="mf-input-container">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder='Doe'
                                    required
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div className="mf-input-container">
                            <label>Email address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder='example@email.com'
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="mf-input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder='Choose a strong password'
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            type="submit"
                            className='button-pink-center'
                            style={{ boxShadow: 'none', height: '40px' }}
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="spinner" /> : 'Create Account'}
                        </button>
                    </form>
                )}

                {successScreen && (
                    <div className='login-sucess-screen-container'>
                        <button className="close-btn d-none" data-bs-dismiss="offcanvas" aria-label="Close"><X /></button>
                        <img src={successImg} alt="" />
                        <p className="text">You're all set! <br /> Welcome to MommyFirst </p>
                        <Link className='button-pink-center' onClick={handleSuccessContinue} to='/profile#profile'>
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>

            {false && (
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

export default ShopifyAuthenticationModal
