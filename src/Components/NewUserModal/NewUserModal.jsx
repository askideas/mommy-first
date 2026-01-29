import React, { useState } from 'react'
import './NewUserModal.css'
import { ChevronDown, Loader2 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { updateNewUserProfile } from '../../services/userService'
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
        dueDate: existingMetafields?.dueDate || ''
    })
    
    const [showGenderDropdown, setShowGenderDropdown] = useState(false)

    const genderOptions = ['Female', 'Male', 'Other']

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

            // Update profile with metafields
            const response = await updateNewUserProfile(userId, {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: user?.email || customer?.email,
                phone: user?.phone || customer?.phone,
                gender: formData.gender,
                dateOfBirth: formData.dateOfBirth,
                dueDate: formData.dueDate
            })

            if (response.success) {
                // Update customer in context with new data including metafields
                const updatedCustomer = {
                    ...(customer || {}),
                    ...response.data,
                    id: userId,
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim(),
                    fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
                    email: user?.email || customer?.email,
                    phone: user?.phone || customer?.phone,
                    metafields: response.data?.metafields || {
                        custom: {
                            gender: { value: formData.gender, type: 'single_line_text_field' },
                            date_of_birth: { value: formData.dateOfBirth, type: 'date' },
                            due_date: { value: formData.dueDate, type: 'date' }
                        }
                    }
                }
                updateCustomer(updatedCustomer)
                
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
