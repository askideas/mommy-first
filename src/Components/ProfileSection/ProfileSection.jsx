import React, { useState, useEffect } from 'react'
import './ProfileSection.css'
import UserIcon from '../../assets/profile/user-square.svg'
import { ChevronDown, Loader2 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { updateNewUserProfile, getUserDetails } from '../../services/userService'
import ProfileSkeletonLoader from '../ProfileSkeletonLoader/ProfileSkeletonLoader'
import { toast } from 'react-toastify'

const ProfileSection = () => {
    const { user, customer, updateCustomer } = useAuth()
    const [action, setAction] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [customerData, setCustomerData] = useState(customer)
    
    // Helper function to extract metafield values from API response structure
    const extractMetafields = (data) => {
        const metafields = data?.metafields?.custom || {}
        return {
            gender: metafields.gender?.value || ''
        }
    }
    
    // Get metafields from customer data
    const customerMetafields = extractMetafields(customerData || customer)
    
    // Form state for editing
    const [formData, setFormData] = useState({
        firstName: customer?.firstName || '',
        lastName: customer?.lastName || '',
        gender: customerMetafields?.gender || ''
    })

    // Fetch user details on mount
    useEffect(() => {
        const fetchUserDetails = async () => {
            const userId = customer?.id || user?.userId
            if (userId) {
                setIsFetching(true)
                try {
                    const response = await getUserDetails(userId)
                    if (response.success && response.data) {
                        setCustomerData(response.data)
                        const metafields = extractMetafields(response.data)
                        setFormData({
                            firstName: response.data.firstName || '',
                            lastName: response.data.lastName || '',
                            gender: metafields.gender || ''
                        })
                        updateCustomer(response.data)
                    }
                } catch (error) {
                    console.error('Error fetching user details:', error)
                } finally {
                    setIsFetching(false)
                }
            }
        }
        
        fetchUserDetails()
    }, [customer?.id])

    // Update form data when customer changes
    useEffect(() => {
        if (customer) {
            setCustomerData(customer)
            const metafields = extractMetafields(customer)
            setFormData(prev => ({
                ...prev,
                firstName: customer.firstName || prev.firstName,
                lastName: customer.lastName || prev.lastName,
                gender: metafields?.gender || prev.gender
            }))
        }
    }, [customer])

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleUpdate = async () => {
        // Validate required fields
        if (!formData.firstName.trim()) {
            toast.error('First name is required')
            return
        }

        setIsLoading(true)

        try {
            const userId = customer?.id || customerData?.id || user?.userId

            if (!userId) {
                toast.error('User ID not found. Please try logging in again.')
                setIsLoading(false)
                return
            }

            // Build the exact payload format for API
            const updatePayload = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim()
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

            // Add metafields array to payload if any exist
            if (metafieldsArray.length > 0) {
                updatePayload.metafields = metafieldsArray
            }

            console.log('Updating profile for userId:', userId)
            console.log('Update payload:', JSON.stringify(updatePayload, null, 2))

            // Update profile with metafields
            const response = await updateNewUserProfile(userId, updatePayload)

            console.log('Update response:', response)

            // Check if update was successful (handle different response formats)
            if (response.success || response.data) {
                // Re-fetch user details to get the latest data
                const userDetailsResponse = await getUserDetails(userId)
                console.log('Re-fetched user details:', userDetailsResponse)

                if (userDetailsResponse.success && userDetailsResponse.data) {
                    const updatedCustomer = userDetailsResponse.data
                    updateCustomer(updatedCustomer)
                    setCustomerData(updatedCustomer)

                    // Update form data with new values
                    const metafields = extractMetafields(updatedCustomer)
                    setFormData({
                        firstName: updatedCustomer.firstName || '',
                        lastName: updatedCustomer.lastName || '',
                        gender: metafields.gender || ''
                    })
                }

                toast.success('Profile updated successfully!')
                
                // Switch back to view mode after a short delay
                setTimeout(() => {
                    setAction('')
                }, 500)
            } else {
                toast.error(response.message || 'Failed to update profile. Please try again.')
            }
        } catch (err) {
            console.error('Profile update error:', err)
            toast.error('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleEditClick = () => {
        // Reset form with current data when entering edit mode
        const metafields = extractMetafields(customerData || customer)
        setFormData({
            firstName: customerData?.firstName || customer?.firstName || '',
            lastName: customerData?.lastName || customer?.lastName || '',
            gender: metafields?.gender || ''
        })
        setAction('edit')
    }

    // Calculate profile completion percentage
    const calculateProfileCompletion = () => {
        const fields = [
            customerData?.firstName || customer?.firstName,
            customerData?.lastName || customer?.lastName,
            customerMetafields?.gender
        ]
        const filledFields = fields.filter(field => field && String(field).trim() !== '').length
        return Math.round((filledFields / fields.length) * 100)
    }

    const handleCancelEdit = () => {
        setAction('')
    }

    return (
        <div className="profile-section-container">
            <div className="profile-section-header">
                <p className='heading'>
                    <img src={UserIcon} alt="" />
                    <span>Profile</span>
                </p>
                <p className="profile-completion">Profile completion <span>{calculateProfileCompletion()}%</span></p>
            </div>

            {isFetching && (
                <ProfileSkeletonLoader type="profile" />
            )}

            {!isFetching && (
            <>
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
                                            <label>Gender</label>
                                            <div className="dropdown">
                                                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {formData.gender || 'Gender'} <ChevronDown />
                                                </a>

                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleInputChange('gender', 'Female') }}>Female</a></li>
                                                    <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleInputChange('gender', 'Male') }}>Male</a></li>
                                                    <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleInputChange('gender', 'Other') }}>Other</a></li>
                                                </ul>
                                            </div>
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
                                        <div className="profile-input-group">
                                            <label>Gender</label>
                                            <p className="profile-value">{customerMetafields?.gender || 'Not set'}</p>
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
                {
                    action == 'edit' ? (
                        <div className="footer-buttons">
                            <button className='button-pink-border' onClick={handleCancelEdit} disabled={isLoading}>
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
            </>
            )}
        </div>
    )
}

export default ProfileSection