import React, { useState } from 'react'
import './ProfileSection.css'
import UserIcon from '../../assets/profile/user-square.svg'
import Smile from '../../assets/profile/smile.svg'
import Map from '../../assets/profile/map.svg'
import Card from '../../assets/profile/card.svg'
import Box from '../../assets/profile/cube.svg'
import Return from '../../assets/profile/return.svg'
import Heart from '../../assets/profile/heart.svg'
import Help from '../../assets/profile/help.svg'
import Bell from '../../assets/profile/bell.svg'
import Tag from '../../assets/profile/tag.svg'
import Settings from '../../assets/profile/settings.svg'
import { ChevronDown } from 'lucide-react'

const ProfileSection = () => {
    const [action, setAction] = useState('')

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
                                            <input type="text" placeholder='Enter first name' />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="profile-input-group">
                                            <label>Last Name</label>
                                            <input type="text" placeholder='Enter last name' />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="profile-drop-down">
                                            <label>Nationality</label>
                                            <div class="dropdown">
                                                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Select Nationality <ChevronDown />
                                                </a>

                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4" style={{paddingLeft: 0}}>
                                        <div className="profile-drop-down">
                                            <label>Gender</label>
                                            <div class="dropdown">
                                                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Gender <ChevronDown />
                                                </a>

                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="profile-input-group">
                                            <label>Birthday</label>
                                            <input type="date" placeholder='DD/MM/YYYY' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="Pregnancy-info">
                                <h1 className="heading">Personal Information <span>OPTIONAL</span> </h1>
                                <div className="row w-100 m-0">
                                    <div className="col-4" style={{paddingLeft: 0}}>
                                        <div className="profile-input-group">
                                            <label>Due date</label>
                                            <input type="date" placeholder='DD/MM/YYYY' />
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
                                            <p className="profile-value">Sarah</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="profile-input-group">
                                            <label>Last Name</label>
                                            <p className="profile-value">Sarah</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="profile-drop-down">
                                            <label>Nationality</label>
                                            <p className="profile-value">United States</p>
                                        </div>
                                    </div>
                                    <div className="col-4" style={{paddingLeft: 0}}>
                                        <div className="profile-drop-down">
                                            <label>Gender</label>
                                            <p className="profile-value">Female</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="profile-input-group">
                                            <label>Birthday</label>
                                            <p className="profile-value">1/09/2002</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="Pregnancy-info">
                                <h1 className="heading">Personal Information </h1>
                                <div className="row w-100 m-0">
                                    <div className="col-4" style={{paddingLeft: 0}}>
                                        <div className="profile-input-group">
                                            <label>Due date</label>
                                            <p className="profile-value">01/09/2026</p>
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