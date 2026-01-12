import React, { useState } from 'react'
import './AddressSection.css'
import Smile from '../../assets/profile/smile.svg'
import { ChevronDown, Minus, Plus } from 'lucide-react'

const AddressSection = () => {
    const [action, setAction] = useState('');

    const Addresses =  [
        {
            "id": 1,
            "addressType": "Home",
            "fullAddress": "9410 tangerine place, Apt 107",
            "city": "Davie",
            "state": "Florida",
            "zipCode": "34434",
            "additionalInfo": "",
            "isDefault": true,
            "isExpanded": true
        },
        {
            "id": 2,
            "addressType": "Hospital",
            "fullAddress": "123 Medical Center Drive",
            "city": "Miami",
            "state": "Florida",
            "zipCode": "33101",
            "additionalInfo": "Emergency entrance on the left",
            "isDefault": false,
            "isExpanded": false
        }
    ]

    return (
        <div className="my-address-section-container">
            <div className="address-section-header">
                <p className='heading'>
                    <img src={Smile} alt="" />
                    <span>My Addresses</span>
                </p>
            </div>

            <div className="address-section-body">
                <div class="accordion accordion-flush" id="addressListAccordian">
                    {
                        Addresses.map((item, index)=> {
                            return (
                                <div class="accordion-item" key={index}>
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${item.id}`} aria-expanded="false" aria-controls={`flush-collapse${item.id}`}>
                                            <p className="address-type">
                                                <span>{item.addressType}</span>
                                            </p>

                                            <div className="make-default-section">
                                                <button className={`${index == 0 ? 'active' : ''}`}></button>
                                                <label htmlFor={`default-${item.id}`}>Make as default</label>
                                            </div>

                                            <button className='accordian-icon'>
                                                <ChevronDown />
                                            </button>
                                        </button>
                                    </h2>
                                    <div id={`flush-collapse${item.id}`} class="accordion-collapse collapse" data-bs-parent="#addressListAccordian">
                                        <div class="accordion-body">
                                            <div className="address-in-detail-section">
                                                <div className="address-detail-full">
                                                    <span className='label'>Full Address</span>
                                                    <span className="value">{item.fullAddress}</span>
                                                </div>

                                                <div className="address-detail-grid">
                                                    <div className="address-detail-item">
                                                        <span className='label'>City</span>
                                                        <span className="value">{item.city}</span>
                                                    </div>

                                                    <div className="address-detail-item">
                                                        <span className='label'>State</span>
                                                        <span className="value">{item.state}</span>
                                                    </div>

                                                    <div className="address-detail-item">
                                                        <span className='label'>ZIP code</span>
                                                        <span className="value">{item.zipCode}</span>
                                                    </div>
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

            <div className="add-address-section">
                <div class="accordion accordion-flush" id="addAddressAccordian">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Add another Address <button className="accordian-icon"><Plus className="plus-icon" /><Minus className="minus-icon"/></button>
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#addAddressAccordian">
                        <div class="accordion-body">
                            <div className="add-address-inputs-container">
                                <div className="input-group-con full-width">
                                    <span className="label">Enter Address</span>
                                    <input type="text" placeholder='Write here' />
                                </div>

                                <div className="input-group-con">
                                    <span className="label">City</span>
                                    <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Select city <ChevronDown />
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Davie</a></li>
                                            <li><a class="dropdown-item" href="#">Miami</a></li>
                                            <li><a class="dropdown-item" href="#">Orlando</a></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="input-group-con">
                                    <span className="label">State</span>
                                    <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Select state <ChevronDown />
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Florida</a></li>
                                            <li><a class="dropdown-item" href="#">California</a></li>
                                            <li><a class="dropdown-item" href="#">New York</a></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="input-group-con">
                                    <span className="label">ZIP code</span>
                                    <input type="text" placeholder='Enter ZIP code' />
                                </div>

                                <div className="input-group-con full-width">
                                    <span className="label">Additional informations (If any)</span>
                                    <input type="text" placeholder='Write here' />
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="address-section-footer">
                <p className="notification-message"></p>
                {
                    action == 'edit' ? (<button className='button-pink-center' onClick={()=>setAction('')}>UPDATE</button>) : (<button className='button-pink-center' onClick={()=>setAction('edit')}>EDIT</button>)
                }
            </div>
        </div>
    )
}

export default AddressSection