import React, { useState } from 'react'
import './ProfileSection.css'
import UserIcon from '../../assets/profile/user-square.svg'
import { ChevronDown } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const ProfileSection = () => {
    const { user, customer } = useAuth()
    const [action, setAction] = useState('')
    
    // Form state for editing
    const [formData, setFormData] = useState({
        firstName: customer?.firstName || '',
        lastName: customer?.lastName || '',
        nationality: '',
        gender: '',
        birthday: '',
        dueDate: ''
    })

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
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
                                            <p className="profile-value">{customer?.firstName || 'Not set'}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="profile-input-group">
                                            <label>Last Name</label>
                                            <p className="profile-value">{customer?.lastName || 'Not set'}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="profile-drop-down">
                                            <label>Nationality</label>
                                            <p className="profile-value">{formData.nationality || 'Not set'}</p>
                                        </div>
                                    </div>
                                    <div className="col-4" style={{paddingLeft: 0}}>
                                        <div className="profile-drop-down">
                                            <label>Gender</label>
                                            <p className="profile-value">{formData.gender || 'Not set'}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="profile-input-group">
                                            <label>Birthday</label>
                                            <p className="profile-value">{formData.birthday || 'Not set'}</p>
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
                                            <p className="profile-value">{formData.dueDate || 'Not set'}</p>
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
                                            <p className="profile-value">{customer?.email || user?.email || 'Not set'}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="profile-input-group">
                                            <label>Phone</label>
                                            <p className="profile-value">{customer?.phone || user?.phone || 'Not set'}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="profile-input-group">
                                            <label>Total Orders</label>
                                            <p className="profile-value">{customer?.ordersCount || 0}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            <div className="profile-section-footer">
                <p className="notification-message"></p>
                {
                    action == 'edit' ? (<button className='button-pink-center' onClick={()=>setAction('')}>UPDATE</button>) : (<button className='button-pink-center' onClick={()=>setAction('edit')}>EDIT</button>)
                }
            </div>
        </div>
    )
}

export default ProfileSection