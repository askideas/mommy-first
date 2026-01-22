import React, { useState, useEffect } from 'react'
import './ProfileSection.css'
import UserIcon from '../../assets/profile/user-square.svg'
import { ChevronDown, Loader2 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { updateNewUserProfile } from '../../services/userService'

const ProfileSection = () => {
    const { user, customer, updateCustomer, getCustomerMetafields } = useAuth()
    const [action, setAction] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const [customerData, setCustomerData] = useState(customer)
    
    // Get metafields from customer data (from API response)
    const customerMetafields = getCustomerMetafields()
    
    // Form state for editing
    const [formData, setFormData] = useState({
        firstName: customer?.firstName || '',
        lastName: customer?.lastName || '',
        nationality: customerMetafields?.nationality || '',
        gender: customerMetafields?.gender || '',
        birthday: customerMetafields?.dateOfBirth || '',
        dueDate: customerMetafields?.dueDate || ''
    })

    // Update form data when customer changes
    useEffect(() => {
        if (customer) {
            setCustomerData(customer)
            const metafields = getCustomerMetafields()
            setFormData(prev => ({
                ...prev,
                firstName: customer.firstName || prev.firstName,
                lastName: customer.lastName || prev.lastName,
                nationality: metafields?.nationality || prev.nationality,
                gender: metafields?.gender || prev.gender,
                birthday: metafields?.dateOfBirth || prev.birthday,
                dueDate: metafields?.dueDate || prev.dueDate
            }))
        }
    }, [customer])

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        setMessage({ type: '', text: '' })
    }

    const handleUpdate = async () => {
        // Validate required fields
        if (!formData.firstName.trim()) {
            setMessage({ type: 'error', text: 'First name is required' })
            return
        }

        setIsLoading(true)
        setMessage({ type: '', text: '' })

        try {
            const userId = customer?.id || customerData?.id

            if (!userId) {
                setMessage({ type: 'error', text: 'User ID not found. Please try logging in again.' })
                setIsLoading(false)
                return
            }

            // Update profile with metafields
            const response = await updateNewUserProfile(userId, {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                gender: formData.gender,
                dateOfBirth: formData.birthday,
                dueDate: formData.dueDate,
                nationality: formData.nationality
            })

            if (response.success) {
                // Update customer in context with new data including metafields
                const updatedCustomer = {
                    ...customerData,
                    ...response.data,
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim(),
                    fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
                    metafields: response.data?.metafields || {
                        custom: {
                            nationality: { value: formData.nationality, type: 'single_line_text_field' },
                            gender: { value: formData.gender, type: 'single_line_text_field' },
                            date_of_birth: { value: formData.birthday, type: 'date' },
                            due_date: { value: formData.dueDate, type: 'date' }
                        }
                    }
                }
                updateCustomer(updatedCustomer)
                setCustomerData(updatedCustomer)

                setMessage({ type: 'success', text: 'Profile updated successfully!' })
                
                // Switch back to view mode after a short delay
                setTimeout(() => {
                    setAction('')
                    setMessage({ type: '', text: '' })
                }, 1500)
            } else {
                setMessage({ type: 'error', text: response.message || 'Failed to update profile. Please try again.' })
            }
        } catch (err) {
            console.error('Profile update error:', err)
            setMessage({ type: 'error', text: 'Something went wrong. Please try again.' })
        } finally {
            setIsLoading(false)
        }
    }

    const handleEditClick = () => {
        // Reset form with current data when entering edit mode
        const metafields = getCustomerMetafields()
        setFormData({
            firstName: customerData?.firstName || customer?.firstName || '',
            lastName: customerData?.lastName || customer?.lastName || '',
            nationality: metafields?.nationality || '',
            gender: metafields?.gender || '',
            birthday: metafields?.dateOfBirth || '',
            dueDate: metafields?.dueDate || ''
        })
        setMessage({ type: '', text: '' })
        setAction('edit')
    }

    const handleCancelEdit = () => {
        setAction('')
        setMessage({ type: '', text: '' })
    }

    return (
        <div className="profile-section-container">
            <div className="profile-section-header">
                <p className='heading'>
                    <img src={UserIcon} alt="" />
                    <span>Profile</span>
                </p>
                <p className="profile-completion">Profile completion <span>20%</span></p>
            </div>

            <div className="profile-section-body">
                {
                    action == 'edit' ? (
                        <div className="profile-edit-section">
                            <div className="personal-info">
                                <h1 className="heading">Personal Information</h1>
                                <div className="row w-100 m-0">
                                    <div className="col-4" style={{paddingLeft: 0}}>
                                        <div className="profile-input-group">
                                            <label>First Name</label>
                                            <input 
                                                type="text" 
                                                placeholder='Enter first name' 
                                                value={formData.firstName}
                                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="profile-input-group">
                                            <label>Last Name</label>
                                            <input 
                                                type="text" 
                                                placeholder='Enter last name' 
                                                value={formData.lastName}
                                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="profile-drop-down">
                                            <label>Nationality</label>
                                            <div className="dropdown">
                                                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {formData.nationality || 'Select Nationality'} <ChevronDown />
                                                </a>

                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#" onClick={() => handleInputChange('nationality', 'India')}>India</a></li>
                                                    <li><a className="dropdown-item" href="#" onClick={() => handleInputChange('nationality', 'USA')}>USA</a></li>
                                                    <li><a className="dropdown-item" href="#" onClick={() => handleInputChange('nationality', 'UK')}>UK</a></li>
                                                    <li><a className="dropdown-item" href="#" onClick={() => handleInputChange('nationality', 'UAE')}>UAE</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4" style={{paddingLeft: 0}}>
                                        <div className="profile-drop-down">
                                            <label>Gender</label>
                                            <div className="dropdown">
                                                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {formData.gender || 'Gender'} <ChevronDown />
                                                </a>

                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#" onClick={() => handleInputChange('gender', 'Female')}>Female</a></li>
                                                    <li><a className="dropdown-item" href="#" onClick={() => handleInputChange('gender', 'Male')}>Male</a></li>
                                                    <li><a className="dropdown-item" href="#" onClick={() => handleInputChange('gender', 'Other')}>Other</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-4">
                                        <div className="profile-input-group">
                                            <label>Birthday</label>
                                            <input 
                                                type="date" 
                                                placeholder='DD/MM/YYYY' 
                                                value={formData.birthday}
                                                onChange={(e) => handleInputChange('birthday', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="Pregnancy-info">
                                <h1 className="heading">Pregnancy Information <span>OPTIONAL</span> </h1>
                                <div className="row w-100 m-0">
                                    <div className="col-4" style={{paddingLeft: 0}}>
                                        <div className="profile-input-group">
                                            <label>Due date</label>
                                            <input 
                                                type="date" 
                                                placeholder='DD/MM/YYYY' 
                                                value={formData.dueDate}
                                                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="profile-detaisl-view-section">
                            <div className="personal-info">
                                <h1 className="heading">Personal Information</h1>
                                <div className="row w-100 m-0">
                                    <div className="col-4" style={{paddingLeft: 0}}>
                                        <div className="profile-input-group">
                                            <label>First Name</label>
                                            <p className="profile-value">{customerData?.firstName || customer?.firstName || 'Not set'}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="profile-input-group">
                                            <label>Last Name</label>
                                            <p className="profile-value">{customerData?.lastName || customer?.lastName || 'Not set'}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="profile-drop-down">
                                            <label>Nationality</label>
                                            <p className="profile-value">{customerMetafields?.nationality || 'Not set'}</p>
                                        </div>
                                    </div>
                                    <div className="col-4" style={{paddingLeft: 0}}>
                                        <div className="profile-drop-down">
                                            <label>Gender</label>
                                            <p className="profile-value">{customerMetafields?.gender || 'Not set'}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="profile-input-group">
                                            <label>Birthday</label>
                                            <p className="profile-value">{customerMetafields?.dateOfBirth || 'Not set'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="Pregnancy-info">
                                <h1 className="heading">Pregnancy Information </h1>
                                <div className="row w-100 m-0">
                                    <div className="col-4" style={{paddingLeft: 0}}>
                                        <div className="profile-input-group">
                                            <label>Due date</label>
                                            <p className="profile-value">{customerMetafields?.dueDate || 'Not set'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Account Info */}
                            <div className="account-info">
                                <h1 className="heading">Account Information</h1>
                                <div className="row w-100 m-0">
                                    <div className="col-4" style={{paddingLeft: 0}}>
                                        <div className="profile-input-group">
                                            <label>Email</label>
                                            <p className="profile-value">{customerData?.email || customer?.email || user?.email || 'Not set'}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="profile-input-group">
                                            <label>Phone</label>
                                            <p className="profile-value">{customerData?.phone || customer?.phone || user?.phone || 'Not set'}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="profile-input-group">
                                            <label>Total Orders</label>
                                            <p className="profile-value">{customerData?.ordersCount || customer?.ordersCount || 0}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            <div className="profile-section-footer">
                <p className={`notification-message ${message.type}`}>
                    {message.text}
                </p>
                {
                    action == 'edit' ? (
                        <div className="footer-buttons">
                            <button className='button-outline' onClick={handleCancelEdit} disabled={isLoading}>
                                CANCEL
                            </button>
                            <button className='button-pink-center' onClick={handleUpdate} disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="spinner" size={16} />
                                        UPDATING...
                                    </>
                                ) : (
                                    'UPDATE'
                                )}
                            </button>
                        </div>
                    ) : (
                        <button className='button-pink-center' onClick={handleEditClick}>EDIT</button>
                    )
                }
            </div>
        </div>
    )
}

export default ProfileSection