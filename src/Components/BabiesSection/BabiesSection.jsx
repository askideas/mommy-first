import React, { useState } from 'react'
import './BabiesSection.css'
import Smile from '../../assets/profile/smile.svg'
import { ChevronDown, Minus, Plus } from 'lucide-react'
import CalenderHeart from '../../assets/profile/calendar-heart.svg'

const BabiesSection = () => {
    const [action, setAction] = useState('');

    const Babies =  [
        {
        "id": 1,
        "avatar": {
            "type": "letter",
            "value": "J",
            "bgColor": "#8EB1F6"
        },
        "fullName": "James Norah Sarah",
        "firstName": "Sarah",
        "lastName": "Paulson",
        "gender": "Male",
        "nationality": "United States",
        "birthday": "01/09/2023",
        "isExpanded": true,
        "actions": {
            "canEdit": true,
            "canDelete": true
        }
        },
        {
        "id": 2,
        "avatar": {
            "type": "letter",
            "value": "N",
            "bgColor": "#FD8CBB"
        },
        "fullName": "Noah Norah Sarah",
        "firstName": "Noah",
        "lastName": "Sarah",
        "gender": "Female",
        "nationality": "Canada",
        "birthday": "01/09/2023",
        "isExpanded": false,
        "actions": {
            "canEdit": true,
            "canDelete": true
        }
        },
        {
        "id": 3,
        "avatar": {
            "type": "letter",
            "value": "N",
            "bgColor": "#FD8CBB"
        },
        "fullName": "Noah Norah Sarah",
        "firstName": "Norah",
        "lastName": "Sarah",
        "gender": "Female",
        "nationality": "United Kingdom",
        "birthday": "01/09/2023",
        "isExpanded": false,
        "actions": {
            "canEdit": true,
            "canDelete": true
        }
        },
        {
        "id": 4,
        "avatar": {
            "type": "letter",
            "value": "E",
            "bgColor": "#FD8CBB"
        },
        "fullName": "Ethan Olivia James",
        "firstName": "Ethan",
        "lastName": "James",
        "gender": "Male",
        "nationality": "Australia",
        "birthday": "01/09/2023",
        "isExpanded": false,
        "actions": {
            "canEdit": true,
            "canDelete": true
        }
        }
    ]

    return (
        <div className="my-babies-section-container">
            <div className="babies-section-header">
                <p className='heading'>
                    <img src={Smile} alt="" />
                    <span>My Babies</span>
                </p>
            </div>

            <div className="babies-section-body">
                <div class="accordion accordion-flush" id="babiesListAccordian">
                    {
                        Babies.map((item, index)=> {
                            return (
                                <div class="accordion-item" key={index}>
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${item.id}`} aria-expanded="false" aria-controls={`flush-collapse${item.id}`}>
                                            <p className="baby-name">
                                                <spn className="avatar" style={{background: item.avatar.bgColor}}>{item.avatar.value}</spn>
                                                <span>{item.fullName}</span>
                                            </p>

                                            <p className="baby-date-of-birth">
                                                <img src={CalenderHeart} alt="" />
                                                <span>Birthday on {item.birthday}</span>
                                            </p>

                                            <button className='accordian-icon'>
                                                <ChevronDown />
                                            </button>
                                        </button>
                                    </h2>
                                    <div id={`flush-collapse${item.id}`} class="accordion-collapse collapse" data-bs-parent="#babiesListAccordian">
                                        <div class="accordion-body">
                                            <div className="baby-in-detail-section">
                                                <div className="baby-detail-item">
                                                    <span className='label'>First Name</span>
                                                    <span className="value">{item.firstName}</span>
                                                </div>

                                                <div className="baby-detail-item">
                                                    <span className='label'>Last Name</span>
                                                    <span className="value">{item.lastName}</span>
                                                </div>

                                                <div className="baby-detail-item">
                                                    <span className='label'>Gender</span>
                                                    <span className="value">{item.gender}</span>
                                                </div>

                                                <div className="baby-detail-item">
                                                    <span className='label'>Nationality</span>
                                                    <span className="value">{item.nationality}</span>
                                                </div>
                                            </div>
                                            <div className="action-btns">
                                                <button className="button-pink-border">Edit</button>
                                                <button className="button-pink-border">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>

            <div className="add-baby-section">
                <div class="accordion accordion-flush" id="addBabyAccordian">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Add another Baby <button className="accordian-icon"><Plus className="plus-icon" /><Minus className="minus-icon"/></button>
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#addBabyAccordian">
                        <div class="accordion-body">
                            <div className="add-baby-inputs-container">
                                <div className="input-group-con">
                                    <span className="label">Baby Name</span>
                                    <input type="text" placeholder='Enter baby name' />
                                </div>

                                <div className="input-group-con">
                                    <span className="label">Last Name</span>
                                    <input type="text" placeholder='Enter last name' />
                                </div>

                                <div className="input-group-con">
                                    <span className="label">Nationality</span>
                                    <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Dropdown button <ChevronDown />
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Action</a></li>
                                            <li><a class="dropdown-item" href="#">Another action</a></li>
                                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="input-group-con">
                                    <span className="label">Gender</span>
                                    <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Dropdown button <ChevronDown />
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Action</a></li>
                                            <li><a class="dropdown-item" href="#">Another action</a></li>
                                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="input-group-con">
                                    <span className="label">Birthday</span>
                                    <input type="date" placeholder='Enter baby name' />
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="babies-section-footer">
                <p className="notification-message"></p>
                {
                    action == 'edit' ? (<button className='button-pink-center' onClick={()=>setAction('')}>UPDATE</button>) : (<button className='button-pink-center' onClick={()=>setAction('edit')}>EDIT</button>)
                }
            </div>
        </div>
    )
}

export default BabiesSection