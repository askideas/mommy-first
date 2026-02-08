import React, { useState, useEffect } from 'react'
import './AddressSection.css'
import Smile from '../../assets/profile/smile.svg'
import { ChevronDown, Minus, Plus, Loader2, Trash2, Edit2 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { 
    getUserDetails, 
    createUserAddress, 
    updateUserAddress, 
    deleteUserAddress, 
    setDefaultAddress 
} from '../../services/userService'
import LocationIcon from '../../assets/profile/location.svg'
import ProfileSkeletonLoader from '../ProfileSkeletonLoader/ProfileSkeletonLoader'
import { toast } from 'react-toastify'

const AddressSection = () => {
    const { user, customer, updateCustomer } = useAuth()
    const [addresses, setAddresses] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [editingAddressId, setEditingAddressId] = useState(null)
    const [showAddForm, setShowAddForm] = useState(false)
    
    // Form state for add/edit
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        province: '',
        country: 'United States',
        zip: '',
        phone: ''
    })

    // Fetch addresses on mount
    useEffect(() => {
        fetchAddresses()
    }, [customer?.id])

    const fetchAddresses = async () => {
        const userId = customer?.id || user?.userId
        if (!userId) return

        setIsFetching(true)
        try {
            const response = await getUserDetails(userId)
            if (response.success && response.data) {
                setAddresses(response.data.addresses || [])
                updateCustomer(response.data)
            }
        } catch (error) {
            console.error('Error fetching addresses:', error)
            toast.error('Failed to load addresses')
        } finally {
            setIsFetching(false)
        }
    }

    const resetForm = () => {
        setFormData({
            firstName: customer?.firstName || '',
            lastName: customer?.lastName || '',
            address1: '',
            address2: '',
            city: '',
            province: '',
            country: 'United States',
            zip: '',
            phone: ''
        })
    }

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleAddAddress = async () => {
        if (!formData.address1.trim() || !formData.city.trim() || !formData.province.trim() || !formData.zip.trim()) {
            toast.error('Please fill in all required fields')
            return
        }

        setIsLoading(true)

        try {
            const userId = customer?.id || user?.userId
            if (!userId) {
                toast.error('User not found. Please try logging in again.')
                return
            }

            const addressPayload = {
                firstName: formData.firstName.trim() || customer?.firstName || '',
                lastName: formData.lastName.trim() || customer?.lastName || '',
                address1: formData.address1.trim(),
                address2: formData.address2.trim(),
                city: formData.city.trim(),
                province: formData.province.trim(),
                country: formData.country.trim(),
                zip: formData.zip.trim(),
                phone: formData.phone.trim(),
                isDefault: addresses.length === 0 // Make default if first address
            }

            console.log('Creating address:', addressPayload)
            const response = await createUserAddress(userId, addressPayload)
            console.log('Create response:', response)

            if (response.success) {
                toast.success('Address added successfully!')
                resetForm()
                setShowAddForm(false)
                await fetchAddresses()
            } else {
                toast.error(response.message || 'Failed to add address')
            }
        } catch (error) {
            console.error('Add address error:', error)
            toast.error('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleEditAddress = (address) => {
        setEditingAddressId(address.id)
        setFormData({
            firstName: address.firstName || '',
            lastName: address.lastName || '',
            address1: address.address1 || '',
            address2: address.address2 || '',
            city: address.city || '',
            province: address.province || '',
            country: address.country || 'United States',
            zip: address.zip || '',
            phone: address.phone || ''
        })
        setShowAddForm(false)
    }

    const handleUpdateAddress = async () => {
        if (!formData.address1.trim() || !formData.city.trim() || !formData.province.trim() || !formData.zip.trim()) {
            toast.error('Please fill in all required fields')
            return
        }

        setIsLoading(true)

        try {
            const userId = customer?.id || user?.userId
            if (!userId || !editingAddressId) {
                toast.error('Unable to update address. Please try again.')
                return
            }

            const addressPayload = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                address1: formData.address1.trim(),
                address2: formData.address2.trim(),
                city: formData.city.trim(),
                province: formData.province.trim(),
                country: formData.country.trim(),
                zip: formData.zip.trim(),
                phone: formData.phone.trim()
            }

            console.log('Updating address:', editingAddressId, addressPayload)
            const response = await updateUserAddress(userId, editingAddressId, addressPayload)
            console.log('Update response:', response)

            if (response.success) {
                toast.success('Address updated successfully!')
                setEditingAddressId(null)
                resetForm()
                await fetchAddresses()
            } else {
                toast.error(response.message || 'Failed to update address')
            }
        } catch (error) {
            console.error('Update address error:', error)
            toast.error('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteAddress = async (addressId) => {
        if (!window.confirm('Are you sure you want to delete this address?')) {
            return
        }

        setIsLoading(true)

        try {
            const userId = customer?.id || user?.userId
            if (!userId) {
                toast.error('User not found. Please try again.')
                return
            }

            console.log('Deleting address:', addressId)
            const response = await deleteUserAddress(userId, addressId)
            console.log('Delete response:', response)

            if (response.success) {
                toast.success('Address deleted successfully!')
                await fetchAddresses()
            } else {
                toast.error(response.message || 'Failed to delete address')
            }
        } catch (error) {
            console.error('Delete address error:', error)
            toast.error('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSetDefault = async (addressId) => {
        setIsLoading(true)

        try {
            const userId = customer?.id || user?.userId
            if (!userId) {
                toast.error('User not found. Please try again.')
                return
            }

            console.log('Setting default address:', addressId)
            const response = await setDefaultAddress(userId, addressId)
            console.log('Set default response:', response)

            if (response.success) {
                toast.success('Default address updated!')
                await fetchAddresses()
            } else {
                toast.error(response.message || 'Failed to set default address')
            }
        } catch (error) {
            console.error('Set default error:', error)
            toast.error('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancelEdit = () => {
        setEditingAddressId(null)
        resetForm()
    }

    const handleShowAddForm = () => {
        setEditingAddressId(null)
        resetForm()
        setShowAddForm(!showAddForm)
    }

    // Countries list
    const countries = ['United States', 'India', 'United Kingdom', 'UAE', 'Canada', 'Australia']
    
    // US States list
    const usStates = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
        'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
        'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
        'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
        'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
        'Wisconsin', 'Wyoming'
    ]

    return (
        <div className="my-address-section-container">
            <div className="address-section-header">
                <p className='heading'>
                    <img src={Smile} alt="" />
                    <span>My Addresses</span>
                </p>
            </div>

            {isFetching && (
                <ProfileSkeletonLoader type="address" />
            )}

            {!isFetching && (
            <>
            <div className="address-section-body">
                {addresses.length === 0 && !isFetching ? (
                    <div className="no-addresses">
                        <img src={LocationIcon} alt="" />
                        <p className="noaddress-heading">No Address added</p>
                        <p className="no-address-sub-heading">Add from below</p>
                    </div>
                ) : (
                    <div className="accordion accordion-flush" id="addressListAccordian">
                        {addresses.map((item, index) => (
                            <div className="accordion-item" key={item.id}>
                                <h2 className="accordion-header">
                                    <button 
                                        className="accordion-button collapsed" 
                                        type="button" 
                                        data-bs-toggle="collapse" 
                                        data-bs-target={`#flush-collapse${item.id}`} 
                                        aria-expanded="false" 
                                        aria-controls={`flush-collapse${item.id}`}
                                    >
                                        <p className="address-type">
                                            <span>{item.address1}, {item.city}</span>
                                            {item.isDefault && <span className="default-badge">Default</span>}
                                        </p>

                                        <div className="make-default-section" onClick={(e) => e.stopPropagation()}>
                                            <button 
                                                className={item.isDefault ? 'active' : ''} 
                                                onClick={() => !item.isDefault && handleSetDefault(item.id)}
                                                disabled={isLoading || item.isDefault}
                                            ></button>
                                            <label>Make as default</label>
                                        </div>

                                        <button className='accordian-icon'>
                                            <ChevronDown />
                                        </button>
                                    </button>
                                </h2>
                                <div id={`flush-collapse${item.id}`} className="accordion-collapse collapse" data-bs-parent="#addressListAccordian">
                                    <div className="accordion-body">
                                        {editingAddressId === item.id ? (
                                            // Edit Form
                                            <div className="address-edit-form">
                                                <div className="edit-form-grid">
                                                    <div className="input-group-con">
                                                        <span className="label">First Name</span>
                                                        <input 
                                                            type="text" 
                                                            placeholder='First name' 
                                                            value={formData.firstName}
                                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="input-group-con">
                                                        <span className="label">Last Name</span>
                                                        <input 
                                                            type="text" 
                                                            placeholder='Last name' 
                                                            value={formData.lastName}
                                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="input-group-con full-width">
                                                        <span className="label">Address Line 1 *</span>
                                                        <input 
                                                            type="text" 
                                                            placeholder='Street address' 
                                                            value={formData.address1}
                                                            onChange={(e) => handleInputChange('address1', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="input-group-con full-width">
                                                        <span className="label">Address Line 2</span>
                                                        <input 
                                                            type="text" 
                                                            placeholder='Apt, suite, unit, etc.' 
                                                            value={formData.address2}
                                                            onChange={(e) => handleInputChange('address2', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="input-group-con">
                                                        <span className="label">City *</span>
                                                        <input 
                                                            type="text" 
                                                            placeholder='City' 
                                                            value={formData.city}
                                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="input-group-con">
                                                        <span className="label">State/Province *</span>
                                                        <div className="dropdown">
                                                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                {formData.province || 'Select state'} <ChevronDown />
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                {usStates.map(state => (
                                                                    <li key={state}>
                                                                        <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleInputChange('province', state) }}>
                                                                            {state}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="input-group-con">
                                                        <span className="label">ZIP Code *</span>
                                                        <input 
                                                            type="text" 
                                                            placeholder='ZIP code' 
                                                            value={formData.zip}
                                                            onChange={(e) => handleInputChange('zip', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="input-group-con">
                                                        <span className="label">Country</span>
                                                        <div className="dropdown">
                                                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                {formData.country || 'Select country'} <ChevronDown />
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                {countries.map(country => (
                                                                    <li key={country}>
                                                                        <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleInputChange('country', country) }}>
                                                                            {country}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="input-group-con">
                                                        <span className="label">Phone</span>
                                                        <input 
                                                            type="tel" 
                                                            placeholder='+1234567890' 
                                                            value={formData.phone}
                                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="action-btns">
                                                    <button className="button-pink-border" onClick={handleCancelEdit} disabled={isLoading}>
                                                        Cancel
                                                    </button>
                                                    <button className="button-pink-center" onClick={handleUpdateAddress} disabled={isLoading}>
                                                        {isLoading ? <><Loader2 className="spinner" size={14} /> Saving...</> : 'Save Changes'}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            // View Mode
                                            <>
                                                <div className="address-in-detail-section">
                                                    <div className="address-detail-full">
                                                        <span className='label'>Full Address</span>
                                                        <span className="value">
                                                            {item.firstName} {item.lastName}<br />
                                                            {item.address1}
                                                            {item.address2 && <>, {item.address2}</>}
                                                        </span>
                                                    </div>

                                                    <div className="address-detail-grid">
                                                        <div className="address-detail-item">
                                                            <span className='label'>City</span>
                                                            <span className="value">{item.city}</span>
                                                        </div>

                                                        <div className="address-detail-item">
                                                            <span className='label'>State</span>
                                                            <span className="value">{item.province}</span>
                                                        </div>

                                                        <div className="address-detail-item">
                                                            <span className='label'>ZIP code</span>
                                                            <span className="value">{item.zip}</span>
                                                        </div>

                                                        <div className="address-detail-item">
                                                            <span className='label'>Country</span>
                                                            <span className="value">{item.country}</span>
                                                        </div>

                                                        {item.phone && (
                                                            <div className="address-detail-item">
                                                                <span className='label'>Phone</span>
                                                                <span className="value">{item.phone}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="action-btns">
                                                    <button className="button-pink-border" onClick={() => handleEditAddress(item)} disabled={isLoading}>
                                                        <Edit2 size={14} /> Edit
                                                    </button>
                                                    <button className="button-pink-border delete-btn" onClick={() => handleDeleteAddress(item.id)} disabled={isLoading}>
                                                        <Trash2 size={14} /> Delete
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="add-address-section">
                <div className="accordion accordion-flush" id="addAddressAccordian">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button 
                                className={`accordion-button ${showAddForm ? '' : 'collapsed'}`} 
                                type="button" 
                                onClick={handleShowAddForm}
                            >
                                Add another Address 
                                <button className="accordian-icon">
                                    <Plus className="plus-icon" />
                                    <Minus className="minus-icon"/>
                                </button>
                            </button>
                        </h2>
                        {showAddForm && (
                            <div className="accordion-collapse collapse show">
                                <div className="accordion-body">
                                    <div className="add-address-inputs-container">
                                        <div className="input-group-con">
                                            <span className="label">First Name</span>
                                            <input 
                                                type="text" 
                                                placeholder='First name' 
                                                value={formData.firstName}
                                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            />
                                        </div>

                                        <div className="input-group-con">
                                            <span className="label">Last Name</span>
                                            <input 
                                                type="text" 
                                                placeholder='Last name' 
                                                value={formData.lastName}
                                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            />
                                        </div>

                                        <div className="input-group-con full-width">
                                            <span className="label">Address Line 1 *</span>
                                            <input 
                                                type="text" 
                                                placeholder='Street address' 
                                                value={formData.address1}
                                                onChange={(e) => handleInputChange('address1', e.target.value)}
                                            />
                                        </div>

                                        <div className="input-group-con full-width">
                                            <span className="label">Address Line 2</span>
                                            <input 
                                                type="text" 
                                                placeholder='Apt, suite, unit, etc.' 
                                                value={formData.address2}
                                                onChange={(e) => handleInputChange('address2', e.target.value)}
                                            />
                                        </div>

                                        <div className="input-group-con">
                                            <span className="label">City *</span>
                                            <input 
                                                type="text" 
                                                placeholder='City' 
                                                value={formData.city}
                                                onChange={(e) => handleInputChange('city', e.target.value)}
                                            />
                                        </div>

                                        <div className="input-group-con">
                                            <span className="label">State/Province *</span>
                                            <div className="dropdown">
                                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {formData.province || 'Select state'} <ChevronDown />
                                                </button>
                                                <ul className="dropdown-menu">
                                                    {usStates.map(state => (
                                                        <li key={state}>
                                                            <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleInputChange('province', state) }}>
                                                                {state}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="input-group-con">
                                            <span className="label">ZIP Code *</span>
                                            <input 
                                                type="text" 
                                                placeholder='Enter ZIP code' 
                                                value={formData.zip}
                                                onChange={(e) => handleInputChange('zip', e.target.value)}
                                            />
                                        </div>

                                        <div className="input-group-con">
                                            <span className="label">Country</span>
                                            <div className="dropdown">
                                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {formData.country || 'Select country'} <ChevronDown />
                                                </button>
                                                <ul className="dropdown-menu">
                                                    {countries.map(country => (
                                                        <li key={country}>
                                                            <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleInputChange('country', country) }}>
                                                                {country}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="input-group-con">
                                            <span className="label">Phone</span>
                                            <input 
                                                type="tel" 
                                                placeholder='+1234567890' 
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="add-form-actions">
                                        <button className="button-pink-border" onClick={handleShowAddForm} disabled={isLoading}>
                                            Cancel
                                        </button>
                                        <button className="button-pink-center" onClick={handleAddAddress} disabled={isLoading}>
                                            {isLoading ? <><Loader2 className="spinner" size={14} /> Adding...</> : 'Add Address'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            </>
            )}
        </div>
    )
}

export default AddressSection