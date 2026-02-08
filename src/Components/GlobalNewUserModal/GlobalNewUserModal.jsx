import React, { useState, useEffect } from 'react'
import './GlobalNewUserModal.css'
import { ChevronDown, Loader2 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { updateNewUserProfile, getUserDetails } from '../../services/userService'
import { countryCodes } from '../../services/authService'
import { toast } from 'react-toastify'

const GlobalNewUserModal = () => {
    const { user, customer, isAuthenticated, isNewCustomer, updateCustomer, clearNewCustomerFlag } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [showGenderDropdown, setShowGenderDropdown] = useState(false)
    const [showCountryDropdown, setShowCountryDropdown] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]) // Default to India
    
    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: ''
    })

    const genderOptions = ['Female', 'Male', 'Other']

    // Check if should show modal when auth state changes
    useEffect(() => {
        if (isAuthenticated && isNewCustomer && customer) {
            setIsOpen(true)
        }
    }, [isAuthenticated, isNewCustomer, customer])

    // Update form data when customer/user changes (ensures latest data is shown)
    useEffect(() => {
        if (customer || user) {
            setFormData({
                firstName: customer?.firstName || user?.givenName || '',
                lastName: customer?.lastName || user?.familyName || '',
                email: customer?.email || user?.email || '',
                phone: customer?.phone || '',
                gender: ''
            })
        }
    }, [customer, user])

    // Determine which contact field to show
    const hasEmail = !!(customer?.email || user?.email)
    const hasPhone = !!customer?.phone
    const showPhoneField = hasEmail && !hasPhone
    const showEmailField = hasPhone && !hasEmail

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        setError('')
    }

    const handleGenderSelect = (gender) => {
        setFormData(prev => ({ ...prev, gender }))
        setShowGenderDropdown(false)
        setError('')
    }

    const handleSubmit = async () => {
        // Validate form
        if (!formData.firstName.trim()) {
            setError('Please enter your first name')
            return
        }
        if (!formData.lastName.trim()) {
            setError('Please enter your last name')
            return
        }
        if (showPhoneField && !formData.phone.trim()) {
            setError('Please enter your phone number')
            return
        }
        if (showEmailField && !formData.email.trim()) {
            setError('Please enter your email address')
            return
        }
        if (!formData.gender) {
            setError('Please select your gender')
            return
        }

        setIsLoading(true)
        setError('')

        try {
            // Get userId from customer
            const userId = customer?.id || user?.userId
            
            if (!userId) {
                setError('User ID not found. Please try logging in again.')
                setIsLoading(false)
                // Close modal on error
                closeModal()
                return
            }

            // Build update payload based on API documentation
            const updatePayload = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim()
            }

            // Add email if showing email field
            if (showEmailField && formData.email.trim()) {
                updatePayload.email = formData.email.trim()
            }

            // Add phone with country code if showing phone field
            if (showPhoneField && formData.phone.trim()) {
                updatePayload.phone = `${selectedCountry.code}${formData.phone.trim()}`
            }

            console.log('Updating profile payload:', JSON.stringify(updatePayload, null, 2))

            // Call PUT /user/:userId API
            const response = await updateNewUserProfile(userId, updatePayload)

            console.log('Update response:', response)

            if (response.success || response.data) {
                // Re-fetch user details to get the latest data (like ProfileSection does)
                const userDetailsResponse = await getUserDetails(userId)
                console.log('Re-fetched user details:', userDetailsResponse)

                let updatedCustomer = null

                if (userDetailsResponse.success && userDetailsResponse.data) {
                    updatedCustomer = userDetailsResponse.data
                    updateCustomer(updatedCustomer)
                } else {
                    // Fallback: construct customer object if re-fetch fails
                    updatedCustomer = {
                        ...(customer || {}),
                        ...response.data,
                        id: userId,
                        firstName: formData.firstName.trim(),
                        lastName: formData.lastName.trim(),
                        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim()
                    }
                    
                    if (showEmailField && formData.email.trim()) {
                        updatedCustomer.email = formData.email.trim()
                    }
                    if (showPhoneField && formData.phone.trim()) {
                        updatedCustomer.phone = updatePayload.phone
                    }
                    
                    updateCustomer(updatedCustomer)
                }
                
                // Clear new customer flag
                clearNewCustomerFlag()
                
                toast.success('Profile updated successfully!', {
                    autoClose: 2000,
                    hideProgressBar: true
                })
                
                // Close modal
                closeModal()
            } else {
                toast.error(response.message || 'Failed to update profile. Please try again.', {
                    autoClose: 2000,
                    hideProgressBar: true
                })
                // Close modal on failure as well
                closeModal()
            }
        } catch (err) {
            console.error('Profile update error:', err)
            toast.error('Something went wrong. Please try again.', {
                autoClose: 2000,
                hideProgressBar: true
            })
            // Close modal on error
            closeModal()
        } finally {
            setIsLoading(false)
        }
    }

    const closeModal = () => {
        setIsOpen(false)
        clearNewCustomerFlag()
    }

    if (!isOpen) return null

    return (
        <div className="global-new-user-modal-overlay">
            <div className="global-new-user-modal-container">
                {/* Modal Content */}
                <div className="global-new-user-modal-content">
                    <div className="global-new-user-modal-header">
                        <h2 className="global-new-user-modal-title">Just a moment <span>❤️</span></h2>
                        <p className="global-new-user-modal-subtitle">A few details to care for you better.</p>
                    </div>

                    <div className="global-new-user-modal-form">
                        {/* First Name and Last Name Row */}
                        <div className="global-new-user-form-row">
                            <div className="global-new-user-form-group">
                                <label>First Name <span className="required">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter first name"
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                />
                            </div>
                            
                            <div className="global-new-user-form-group">
                                <label>Last Name <span className="required">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter last name"
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Email or Phone Field based on existing data */}
                        {showPhoneField && (
                            <div className="global-new-user-form-group full-width">
                                <label>Phone Number <span className="required">*</span></label>
                                <div className="global-new-user-mobile-input">
                                    <div 
                                        className="global-new-user-country-selector"
                                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                    >
                                        <img 
                                            src={`https://flagcdn.com/24x18/${selectedCountry.iso.toLowerCase()}.png`}
                                            alt={selectedCountry.country}
                                            className="country-flag"
                                        />
                                        <span className="country-code">{selectedCountry.code}</span>
                                        <ChevronDown size={16} />
                                        
                                        {showCountryDropdown && (
                                            <div className="global-new-user-country-dropdown">
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
                                                        <img 
                                                            src={`https://flagcdn.com/24x18/${country.iso.toLowerCase()}.png`}
                                                            alt={country.country}
                                                            className="country-flag"
                                                        />
                                                        <span className="country-name">{country.country}</span>
                                                        <span className="country-code">{country.code}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="1234567890"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, ''))}
                                    />
                                </div>
                            </div>
                        )}

                        {showEmailField && (
                            <div className="global-new-user-form-group full-width">
                                <label>Email Address <span className="required">*</span></label>
                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                />
                            </div>
                        )}

                        {/* Gender Dropdown */}
                        <div className="global-new-user-form-group full-width">
                            <label>Gender <span className="required">*</span></label>
                            <div className="global-new-user-dropdown">
                                <button 
                                    className="global-new-user-dropdown-toggle"
                                    onClick={() => setShowGenderDropdown(!showGenderDropdown)}
                                    type="button"
                                >
                                    <span className={formData.gender ? 'selected' : 'placeholder'}>
                                        {formData.gender || 'Choose gender'}
                                    </span>
                                    <ChevronDown size={18} style={{ transform: showGenderDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
                                </button>
                                {showGenderDropdown && (
                                    <div className="global-new-user-dropdown-menu">
                                        {genderOptions.map((option) => (
                                            <button
                                                key={option}
                                                className={`global-new-user-dropdown-item ${formData.gender === option ? 'active' : ''}`}
                                                onClick={() => handleGenderSelect(option)}
                                                type="button"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && <p className="global-new-user-error-message">{error}</p>}

                        {/* Submit Button */}
                        <button 
                            className="global-new-user-submit-btn"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="spinner" size={18} />
                                    Saving...
                                </>
                            ) : (
                                'SAVE DETAILS'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlobalNewUserModal
