import React, { useState, useEffect } from 'react'
import './NewUserModal.css'
import { ChevronDown, Loader2 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { updateNewUserProfile, getUserDetails } from '../../services/userService'
import { countryCodes } from '../../services/authService'
import ProfileImg from '../../assets/profile/pf-def.png'
import { useNavigate } from 'react-router-dom'

const NewUserModal = ({ isOpen, onClose, onSuccess }) => {
    const navigate = useNavigate()
    const { user, customer, updateCustomer, clearNewCustomerFlag, getCustomerMetafields } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    
    // Get existing metafields from customer (handle null customer)
    const existingMetafields = customer ? getCustomerMetafields() : {}
    
    // Form state - use firstName and lastName separately, fallback to user data if customer is null
    const [formData, setFormData] = useState({
        firstName: customer?.firstName || user?.givenName || '',
        lastName: customer?.lastName || user?.familyName || '',
        gender: existingMetafields?.gender || '',
        dateOfBirth: existingMetafields?.dateOfBirth || '',
        dueDate: existingMetafields?.dueDate || '',
        mobile: ''
    })
    
    const [showGenderDropdown, setShowGenderDropdown] = useState(false)
    const [showCountryDropdown, setShowCountryDropdown] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]) // Default to India

    const genderOptions = ['Female', 'Male', 'Other']

    // Update form data when customer/user changes (ensures latest data is shown)
    useEffect(() => {
        if (customer || user) {
            const metafields = customer ? getCustomerMetafields() : {}
            setFormData({
                firstName: customer?.firstName || user?.givenName || '',
                lastName: customer?.lastName || user?.familyName || '',
                gender: metafields?.gender || '',
                dateOfBirth: metafields?.dateOfBirth || '',
                dueDate: metafields?.dueDate || '',
                mobile: ''
            })
        }
    }, [customer, user])

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

        setIsLoading(true)
        setError('')

        try {
            // Get userId from customer or user object
            const userId = customer?.id || user?.userId
            
            if (!userId) {
                setError('User ID not found. Please try logging in again.')
                setIsLoading(false)
                return
            }

            // Build the payload with metafields in array format (like ProfileSection)
            const updatePayload = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim()
            }

            // Add phone with country code if mobile is provided
            if (formData.mobile) {
                updatePayload.phone = `${selectedCountry.code}${formData.mobile}`
            }

            // Build metafields as an array with namespace, key, value, type
            const metafieldsArray = []

            if (formData.gender) {
                metafieldsArray.push({
                    namespace: 'custom',
                    key: 'gender',
                    value: formData.gender,
                    type: 'single_line_text_field'
                })
            }

            if (formData.dateOfBirth) {
                metafieldsArray.push({
                    namespace: 'custom',
                    key: 'date_of_birth',
                    value: formData.dateOfBirth,
                    type: 'date'
                })
            }

            if (formData.dueDate) {
                metafieldsArray.push({
                    namespace: 'custom',
                    key: 'due_date',
                    value: formData.dueDate,
                    type: 'date'
                })
            }

            // Add metafields array to payload if any exist
            if (metafieldsArray.length > 0) {
                updatePayload.metafields = metafieldsArray
            }

            console.log('Updating new user profile payload:', JSON.stringify(updatePayload, null, 2))

            // Update profile with metafields
            const response = await updateNewUserProfile(userId, updatePayload)

            console.log('Update response:', response)

            // Check if update was successful (handle different response formats)
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
                        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
                        email: user?.email || customer?.email,
                        phone: updatePayload.phone || user?.phone || customer?.phone
                    }
                    updateCustomer(updatedCustomer)
                }
                
                // Clear new customer flag (this also sets profileCompleted)
                clearNewCustomerFlag()
                
                onSuccess && onSuccess(updatedCustomer)
                
                // Redirect to home page after profile completion
                navigate('/')
            } else {
                setError(response.message || 'Failed to update profile. Please try again.')
            }
        } catch (err) {
            console.error('Profile update error:', err)
            setError('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="new-user-modal-overlay">
            <div className="new-user-modal-container">
                {/* Profile Image */}
                {/* <div className="new-user-modal-profile-image">
                    {user?.picture ? (
                        <img src={user.picture} alt={customer?.fullName || user?.name || 'Profile'} />
                    ) : (
                        <img src={ProfileImg} alt="Profile" />
                    )}
                </div> */}

                {/* Modal Content */}
                <div className="new-user-modal-content">
                    <div className="new-user-modal-header">
                        <h2 className="new-user-modal-title">Just a moment <span>❤️</span></h2>
                        <p className="new-user-modal-subtitle">A few details to care for you better.</p>
                    </div>

                    <div className="new-user-modal-form">
                        {/* First Name and Last Name Row */}
                        <div className="new-user-form-row">
                            <div className="new-user-form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter first name"
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                />
                            </div>
                            
                            <div className="new-user-form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter last name"
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="new-user-form-row">
                            {/* Gender */}
                            <div className="new-user-form-group">
                                <label>Gender</label>
                                <div className="new-user-dropdown">
                                    <button 
                                        className="new-user-dropdown-toggle"
                                        onClick={() => setShowGenderDropdown(!showGenderDropdown)}
                                        type="button"
                                    >
                                        <span className={formData.gender ? 'selected' : 'placeholder'}>
                                            {formData.gender || 'Choose'}
                                        </span>
                                        <ChevronDown size={18} />
                                    </button>
                                    {showGenderDropdown && (
                                        <div className="new-user-dropdown-menu">
                                            {genderOptions.map((option) => (
                                                <button
                                                    key={option}
                                                    className="new-user-dropdown-item"
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

                            {/* Date of Birth */}
                            <div className="new-user-form-group">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    placeholder="DD/MM"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Due Date */}
                        <div className="new-user-form-group full-width">
                            <label>
                                Due date 
                                <span className="optional-badge">OPTIONAL</span>
                            </label>
                            <input
                                type="date"
                                placeholder="DD/MM/YYYY"
                                value={formData.dueDate}
                                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                            />
                        </div>

                        {/* Mobile Number */}
                        <div className="new-user-form-group full-width">
                            <label>
                                Mobile Number 
                                <span className="optional-badge">OPTIONAL</span>
                            </label>
                            <div className="new-user-mobile-input">
                                <div 
                                    className="new-user-country-selector"
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
                                        <div className="new-user-country-dropdown">
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
                                    value={formData.mobile}
                                    onChange={(e) => handleInputChange('mobile', e.target.value.replace(/\D/g, ''))}
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && <p className="new-user-error-message">{error}</p>}

                        {/* Submit Button */}
                        <button 
                            className="new-user-submit-btn"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="spinner" size={18} />
                                    Saving...
                                </>
                            ) : (
                                'CONTINUE'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewUserModal
