import React, { useState } from 'react'
import './SettingsSection.css'
import Settings from '../../assets/profile/settings.svg'
import { Mail, Phone, Lock, ChevronDown, Trash2 } from 'lucide-react'

const SettingsSection = () => {
    const [settingsData, setSettingsData] = useState({
        email: 'sarah.johnson@example.com',
        mobile: '+1 (555) 123-4567',
        password: '••••••••'
    })

    const [passwordInputs, setPasswordInputs] = useState({
        currentPassword: '',
        newPassword: '',
        repeatPassword: ''
    })

    const [emailInput, setEmailInput] = useState(settingsData.email)
    const [mobileInput, setMobileInput] = useState(settingsData.mobile)

    const handlePasswordChange = (e) => {
        const { name, value } = e.target
        setPasswordInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleUpdatePassword = () => {
        if (passwordInputs.currentPassword && passwordInputs.newPassword && passwordInputs.repeatPassword) {
            if (passwordInputs.newPassword === passwordInputs.repeatPassword) {
                alert('Password updated successfully')
                setPasswordInputs({ currentPassword: '', newPassword: '', repeatPassword: '' })
            } else {
                alert('New passwords do not match')
            }
        }
    }

    const handleUpdateEmail = () => {
        if (emailInput) {
            setSettingsData(prev => ({ ...prev, email: emailInput }))
            alert('Email updated successfully')
        }
    }

    const handleUpdateMobile = () => {
        if (mobileInput) {
            setSettingsData(prev => ({ ...prev, mobile: mobileInput }))
            alert('Mobile number updated successfully')
        }
    }

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            alert('Account deletion initiated')
        }
    }

    return (
        <div className="settings-section-container">
            <div className="settings-section-header">
                <p className='settings-heading'>
                    <img src={Settings} alt="Settings" />
                    <span>Settings</span>
                </p>
            </div>

            <div className="settings-section-body">
                <div className="settings-accordion" id="settingsAccordion">
                    {/* Email Address Section */}
                    <div className="settings-accordion-item">
                        <h2 className="settings-accordion-header">
                            <button 
                                className="settings-accordion-button collapsed" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#emailCollapse" 
                                aria-expanded="false" 
                                aria-controls="emailCollapse"
                            >
                                <div className="settings-item-left">
                                    <div className="settings-icon-box email-icon">
                                        <Mail size={20} />
                                    </div>
                                    <span className="settings-item-label">Email Address</span>
                                </div>
                                <button className='settings-chevron-icon' onClick={(e) => e.preventDefault()}>
                                    <ChevronDown size={20} />
                                </button>
                            </button>
                        </h2>
                        <div id="emailCollapse" className="settings-accordion-collapse collapse" data-bs-parent="#settingsAccordion">
                            <div className="settings-accordion-body">
                                <div className="settings-input-group">
                                    <input 
                                        type="email" 
                                        placeholder="Enter email address"
                                        value={emailInput}
                                        onChange={(e) => setEmailInput(e.target.value)}
                                        className="settings-input-field"
                                    />
                                </div>
                                <div className="settings-actions">
                                    <button className="settings-update-btn" onClick={handleUpdateEmail}>Update Email</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Number Section */}
                    <div className="settings-accordion-item">
                        <h2 className="settings-accordion-header">
                            <button 
                                className="settings-accordion-button collapsed" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#mobileCollapse" 
                                aria-expanded="false" 
                                aria-controls="mobileCollapse"
                            >
                                <div className="settings-item-left">
                                    <div className="settings-icon-box mobile-icon">
                                        <Phone size={20} />
                                    </div>
                                    <span className="settings-item-label">Mobile Number</span>
                                </div>
                                <button className='settings-chevron-icon' onClick={(e) => e.preventDefault()}>
                                    <ChevronDown size={20} />
                                </button>
                            </button>
                        </h2>
                        <div id="mobileCollapse" className="settings-accordion-collapse collapse" data-bs-parent="#settingsAccordion">
                            <div className="settings-accordion-body">
                                <div className="settings-input-group">
                                    <input 
                                        type="tel" 
                                        placeholder="Enter mobile number"
                                        value={mobileInput}
                                        onChange={(e) => setMobileInput(e.target.value)}
                                        className="settings-input-field"
                                    />
                                </div>
                                <div className="settings-actions">
                                    <button className="settings-update-btn" onClick={handleUpdateMobile}>Update Number</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className="settings-accordion-item">
                        <h2 className="settings-accordion-header">
                            <button 
                                className="settings-accordion-button collapsed" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#passwordCollapse" 
                                aria-expanded="false" 
                                aria-controls="passwordCollapse"
                            >
                                <div className="settings-item-left">
                                    <div className="settings-icon-box password-icon">
                                        <Lock size={20} />
                                    </div>
                                    <span className="settings-item-label">Password</span>
                                </div>
                                <button className='settings-chevron-icon' onClick={(e) => e.preventDefault()}>
                                    <ChevronDown size={20} />
                                </button>
                            </button>
                        </h2>
                        <div id="passwordCollapse" className="settings-accordion-collapse collapse" data-bs-parent="#settingsAccordion">
                            <div className="settings-accordion-body">
                                <div className="settings-password-grid">
                                    <div className="settings-input-group">
                                        <label className="settings-input-label">Current password</label>
                                        <input 
                                            type="password" 
                                            placeholder="Enter current password"
                                            name="currentPassword"
                                            value={passwordInputs.currentPassword}
                                            onChange={handlePasswordChange}
                                            className="settings-input-field"
                                        />
                                    </div>
                                    <div className="settings-input-group">
                                        <label className="settings-input-label">New password</label>
                                        <input 
                                            type="password" 
                                            placeholder="Enter new password"
                                            name="newPassword"
                                            value={passwordInputs.newPassword}
                                            onChange={handlePasswordChange}
                                            className="settings-input-field"
                                        />
                                    </div>
                                    <div className="settings-input-group">
                                        <label className="settings-input-label">Repeat new password</label>
                                        <input 
                                            type="password" 
                                            placeholder="Repeat new password"
                                            name="repeatPassword"
                                            value={passwordInputs.repeatPassword}
                                            onChange={handlePasswordChange}
                                            className="settings-input-field"
                                        />
                                    </div>
                                </div>
                                <div className="settings-actions">
                                    <button className="settings-update-btn" onClick={handleUpdatePassword}>Update Password</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="settings-section-footer">
                <div className="settings-delete-section">
                    <p className="settings-delete-label">Delete account</p>
                    <button className="settings-delete-btn" onClick={handleDeleteAccount}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SettingsSection
