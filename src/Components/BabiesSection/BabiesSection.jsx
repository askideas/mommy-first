import React, { useState, useEffect } from 'react'
import './BabiesSection.css'
import Smile from '../../assets/profile/smile.svg'
import { ChevronDown, Minus, Plus, Loader2 } from 'lucide-react'
import CalenderHeart from '../../assets/profile/calendar-heart.svg'
import { useAuth } from '../../contexts/AuthContext'
import { updateNewUserProfile, getUserDetails } from '../../services/userService'

const BabiesSection = () => {
    const { user, customer, updateCustomer } = useAuth()
    const [action, setAction] = useState('')
    const [babies, setBabies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const [editingBabyIndex, setEditingBabyIndex] = useState(null)
    
    // Form state for adding/editing baby
    const [babyForm, setBabyForm] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        nationality: '',
        dateOfBirth: ''
    })

    // Extract babies data from customer metafields
    useEffect(() => {
        const extractBabies = () => {
            try {
                const babiesMetafield = customer?.metafields?.custom?.babies
                if (babiesMetafield && babiesMetafield.value) {
                    const babiesData = Array.isArray(babiesMetafield.value) 
                        ? babiesMetafield.value 
                        : JSON.parse(babiesMetafield.value)
                    setBabies(babiesData)
                } else {
                    setBabies([])
                }
            } catch (error) {
                console.error('Error extracting babies data:', error)
                setBabies([])
            }
        }
        
        extractBabies()
    }, [customer])

    // Fetch latest user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            const userId = customer?.id
            if (userId) {
                setIsFetching(true)
                try {
                    const response = await getUserDetails(userId)
                    if (response.success && response.data) {
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

    const handleInputChange = (field, value) => {
        setBabyForm(prev => ({ ...prev, [field]: value }))
        setMessage({ type: '', text: '' })
    }

    const getAvatarColor = (gender) => {
        return gender?.toLowerCase() === 'male' ? '#8EB1F6' : '#FD8CBB'
    }

    const getInitial = (firstName) => {
        return firstName?.charAt(0)?.toUpperCase() || 'B'
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Not set'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    }

    const resetBabyForm = () => {
        setBabyForm({
            firstName: '',
            lastName: '',
            gender: '',
            nationality: '',
            dateOfBirth: ''
        })
        setEditingBabyIndex(null)
    }

    const handleAddBaby = async () => {
        // Validate form
        if (!babyForm.firstName.trim()) {
            setMessage({ type: 'error', text: 'Baby first name is required' })
            return
        }

        setIsLoading(true)
        setMessage({ type: '', text: '' })

        try {
            const userId = customer?.id

            if (!userId) {
                setMessage({ type: 'error', text: 'User ID not found. Please try logging in again.' })
                setIsLoading(false)
                return
            }

            // Add new baby to the list
            const newBaby = {
                first_name: babyForm.firstName.trim(),
                last_name: babyForm.lastName.trim(),
                gender: babyForm.gender.toLowerCase(),
                nationality: babyForm.nationality,
                date_of_birth: babyForm.dateOfBirth
            }

            const updatedBabies = [...babies, newBaby]

            // Update metafields with new babies data
            const response = await updateNewUserProfile(userId, {
                firstName: customer.firstName,
                lastName: customer.lastName,
                metafields: [{
                    namespace: 'custom',
                    key: 'babies',
                    value: JSON.stringify(updatedBabies),
                    type: 'json'
                }]
            })

            if (response.success || response.data) {
                // Re-fetch user details
                const userDetailsResponse = await getUserDetails(userId)
                if (userDetailsResponse.success && userDetailsResponse.data) {
                    updateCustomer(userDetailsResponse.data)
                }

                setMessage({ type: 'success', text: 'Baby added successfully!' })
                resetBabyForm()
                
                // Close the accordion after a short delay
                setTimeout(() => {
                    setMessage({ type: '', text: '' })
                    document.querySelector('#flush-collapseOne')?.classList.remove('show')
                }, 1500)
            } else {
                setMessage({ type: 'error', text: response.message || 'Failed to add baby. Please try again.' })
            }
        } catch (err) {
            console.error('Add baby error:', err)
            setMessage({ type: 'error', text: 'Something went wrong. Please try again.' })
        } finally {
            setIsLoading(false)
        }
    }

    const handleEditBaby = async (index) => {
        const baby = babies[index]
        setBabyForm({
            firstName: baby.first_name || '',
            lastName: baby.last_name || '',
            gender: baby.gender?.charAt(0)?.toUpperCase() + baby.gender?.slice(1) || '',
            nationality: baby.nationality || '',
            dateOfBirth: baby.date_of_birth || ''
        })
        setEditingBabyIndex(index)
        
        // Open the add baby accordion for editing
        const addBabyAccordion = document.querySelector('#flush-collapseOne')
        if (addBabyAccordion) {
            addBabyAccordion.classList.add('show')
        }
    }

    const handleUpdateBaby = async () => {
        if (!babyForm.firstName.trim()) {
            setMessage({ type: 'error', text: 'Baby first name is required' })
            return
        }

        setIsLoading(true)
        setMessage({ type: '', text: '' })

        try {
            const userId = customer?.id

            if (!userId) {
                setMessage({ type: 'error', text: 'User ID not found. Please try logging in again.' })
                setIsLoading(false)
                return
            }

            // Update baby in the list
            const updatedBabies = [...babies]
            updatedBabies[editingBabyIndex] = {
                first_name: babyForm.firstName.trim(),
                last_name: babyForm.lastName.trim(),
                gender: babyForm.gender.toLowerCase(),
                nationality: babyForm.nationality,
                date_of_birth: babyForm.dateOfBirth
            }

            // Update metafields with updated babies data
            const response = await updateNewUserProfile(userId, {
                firstName: customer.firstName,
                lastName: customer.lastName,
                metafields: [{
                    namespace: 'custom',
                    key: 'babies',
                    value: JSON.stringify(updatedBabies),
                    type: 'json'
                }]
            })

            if (response.success || response.data) {
                // Re-fetch user details
                const userDetailsResponse = await getUserDetails(userId)
                if (userDetailsResponse.success && userDetailsResponse.data) {
                    updateCustomer(userDetailsResponse.data)
                }

                setMessage({ type: 'success', text: 'Baby updated successfully!' })
                resetBabyForm()
                
                setTimeout(() => {
                    setMessage({ type: '', text: '' })
                    document.querySelector('#flush-collapseOne')?.classList.remove('show')
                }, 1500)
            } else {
                setMessage({ type: 'error', text: response.message || 'Failed to update baby. Please try again.' })
            }
        } catch (err) {
            console.error('Update baby error:', err)
            setMessage({ type: 'error', text: 'Something went wrong. Please try again.' })
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteBaby = async (index) => {
        if (!window.confirm('Are you sure you want to delete this baby?')) {
            return
        }

        setIsLoading(true)
        setMessage({ type: '', text: '' })

        try {
            const userId = customer?.id

            if (!userId) {
                setMessage({ type: 'error', text: 'User ID not found. Please try logging in again.' })
                setIsLoading(false)
                return
            }

            // Remove baby from the list
            const updatedBabies = babies.filter((_, i) => i !== index)

            // Update metafields with updated babies data
            const response = await updateNewUserProfile(userId, {
                firstName: customer.firstName,
                lastName: customer.lastName,
                metafields: [{
                    namespace: 'custom',
                    key: 'babies',
                    value: JSON.stringify(updatedBabies),
                    type: 'json'
                }]
            })

            if (response.success || response.data) {
                // Re-fetch user details
                const userDetailsResponse = await getUserDetails(userId)
                if (userDetailsResponse.success && userDetailsResponse.data) {
                    updateCustomer(userDetailsResponse.data)
                }

                setMessage({ type: 'success', text: 'Baby deleted successfully!' })
                
                setTimeout(() => {
                    setMessage({ type: '', text: '' })
                }, 1500)
            } else {
                setMessage({ type: 'error', text: response.message || 'Failed to delete baby. Please try again.' })
            }
        } catch (err) {
            console.error('Delete baby error:', err)
            setMessage({ type: 'error', text: 'Something went wrong. Please try again.' })
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancelEdit = () => {
        resetBabyForm()
        document.querySelector('#flush-collapseOne')?.classList.remove('show')
    }


    return (
        <div className="my-babies-section-container">
            <div className="babies-section-header">
                <p className='heading'>
                    <img src={Smile} alt="" />
                    <span>My Babies</span>
                </p>
            </div>

            {isFetching && (
                <div className="profile-loading">
                    <Loader2 className="spinner" size={20} />
                    <span>Loading babies...</span>
                </div>
            )}

            <div className="babies-section-body">
                {babies.length > 0 ? (
                    <div className="accordion accordion-flush" id="babiesListAccordian">
                        {babies.map((baby, index) => {
                            const fullName = `${baby.first_name || ''} ${baby.last_name || ''}`.trim()
                            const initial = getInitial(baby.first_name)
                            const bgColor = getAvatarColor(baby.gender)
                            
                            return (
                                <div className="accordion-item" key={index}>
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${index}`} aria-expanded="false" aria-controls={`flush-collapse${index}`}>
                                            <p className="baby-name">
                                                <span className="avatar" style={{background: bgColor}}>{initial}</span>
                                                <span>{fullName || 'Baby'}</span>
                                            </p>

                                            <p className="baby-date-of-birth">
                                                <img src={CalenderHeart} alt="" />
                                                <span>Birthday on {formatDate(baby.date_of_birth)}</span>
                                            </p>

                                            <button className='accordian-icon' type="button">
                                                <ChevronDown />
                                            </button>
                                        </button>
                                    </h2>
                                    <div id={`flush-collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#babiesListAccordian">
                                        <div className="accordion-body">
                                            <div className="baby-in-detail-section">
                                                <div className="baby-detail-item">
                                                    <span className='label'>First Name</span>
                                                    <span className="value">{baby.first_name || 'Not set'}</span>
                                                </div>

                                                <div className="baby-detail-item">
                                                    <span className='label'>Last Name</span>
                                                    <span className="value">{baby.last_name || 'Not set'}</span>
                                                </div>

                                                <div className="baby-detail-item">
                                                    <span className='label'>Gender</span>
                                                    <span className="value">{baby.gender ? baby.gender.charAt(0).toUpperCase() + baby.gender.slice(1) : 'Not set'}</span>
                                                </div>

                                                <div className="baby-detail-item">
                                                    <span className='label'>Nationality</span>
                                                    <span className="value">{baby.nationality || 'Not set'}</span>
                                                </div>
                                            </div>
                                            <div className="action-btns">
                                                <button 
                                                    className="button-pink-border" 
                                                    onClick={() => handleEditBaby(index)}
                                                    disabled={isLoading}
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    className="button-pink-border" 
                                                    onClick={() => handleDeleteBaby(index)}
                                                    disabled={isLoading}
                                                >
                                                    {isLoading ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="no-babies-message">
                        <p>No babies added yet. Click "Add another Baby" to get started!</p>
                    </div>
                )}
            </div>

            <div className="add-baby-section">
                <div className="accordion accordion-flush" id="addBabyAccordian">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                {editingBabyIndex !== null ? 'Edit Baby' : 'Add another Baby'} 
                                <button className="accordian-icon" type="button">
                                    <Plus className="plus-icon" />
                                    <Minus className="minus-icon"/>
                                </button>
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#addBabyAccordian">
                            <div className="accordion-body">
                                <div className="add-baby-inputs-container">
                                    <div className="input-group-con">
                                        <span className="label">Baby Name</span>
                                        <input 
                                            type="text" 
                                            placeholder='Enter baby name' 
                                            value={babyForm.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        />
                                    </div>

                                    <div className="input-group-con">
                                        <span className="label">Last Name</span>
                                        <input 
                                            type="text" 
                                            placeholder='Enter last name' 
                                            value={babyForm.lastName}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        />
                                    </div>

                                    <div className="input-group-con">
                                        <span className="label">Nationality</span>
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {babyForm.nationality || 'Select Nationality'} <ChevronDown />
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleInputChange('nationality', 'Indian') }}>Indian</a></li>
                                                <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleInputChange('nationality', 'American') }}>American</a></li>
                                                <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleInputChange('nationality', 'British') }}>British</a></li>
                                                <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleInputChange('nationality', 'Canadian') }}>Canadian</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="input-group-con">
                                        <span className="label">Gender</span>
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {babyForm.gender || 'Select Gender'} <ChevronDown />
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleInputChange('gender', 'Male') }}>Male</a></li>
                                                <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleInputChange('gender', 'Female') }}>Female</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="input-group-con">
                                        <span className="label">Birthday</span>
                                        <input 
                                            type="date" 
                                            placeholder='Enter birthday' 
                                            value={babyForm.dateOfBirth}
                                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                        />
                                    </div>
                                </div>
                                
                                <div className="add-baby-footer">
                                    {editingBabyIndex !== null ? (
                                        <div className="footer-buttons">
                                            <button 
                                                className='button-outline' 
                                                onClick={handleCancelEdit} 
                                                disabled={isLoading}
                                            >
                                                CANCEL
                                            </button>
                                            <button 
                                                className='button-pink-center' 
                                                onClick={handleUpdateBaby} 
                                                disabled={isLoading}
                                            >
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
                                        <button 
                                            className='button-pink-center' 
                                            onClick={handleAddBaby} 
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="spinner" size={16} />
                                                    ADDING...
                                                </>
                                            ) : (
                                                'ADD BABY'
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="babies-section-footer">
                <p className={`notification-message ${message.type}`}>
                    {message.text}
                </p>
            </div>
        </div>
    )
}

export default BabiesSection