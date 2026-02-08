import React, { useState } from 'react'
import './BundlesRecommendedModal.css'
import { ArrowRight, ChevronDown, Clock, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BundlesRecommendedModal = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [selectedStage, setSelectedStage] = useState(null)
    const [selectedDays, setSelectedDays] = useState(null)
    const [redirection, setRedirection] = useState('')
    
    const stageOptions = [
        { id: 'pregnant', label: "I'm Pregnant & Preparing" },
        { id: '0-3', label: '0–3 Days Postpartum' },
        { id: '3-7', label: '3–7 Days Postpartum' },
        { id: '8-14', label: '8–14 Days Postpartum' },
        { id: '15-21', label: '15–21 Days Postpartum' }
    ]
    
    const filterLabel = [
        {
            'label': 'Week 1 (5-7 days)',
            'bundle': 'the-first-week-healing-system'
        },
        {
            'label': 'Week 2 (10-14 days)',
            'bundle': '2-weeks-full-recovery-set'
        },
        {
            'label': 'Week 3 (17-21)',
            'bundle': '21-day-postpartum-care'
        }
    ]

    const navigate = useNavigate();
    
    const handleStageSelect = (option) => {
        setSelectedStage(option)
        setShowDropdown(false)
    }
    
    const handleDaysSelect = (days, bundle) => {
        setSelectedDays(days === selectedDays ? null : days);
        setRedirection(`/bundles/recommended#${bundle}`)
    }
  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="bundlesuggestionsmodal" aria-labelledby="offcanvasRightLabel">
        <div className="heading-and-filter-section">
        <div className="heading-section-container">
            <div className="d-flex justify-content-between align-items-center label-skip-con">
            <p className="label-sec"><Clock /> 30-second bundle finder</p>
            <p className="skip" data-bs-dismiss="offcanvas">Skip</p>
            </div>
            <h1 className="heading-txt">Not sure which <br /> bundle you need?</h1>
            <h1 className="sub-heading-txt">Answer two quick questions and we’ll match you with the bundle that fits your stage of recovery and how many days of care you want covered.</h1>
        </div>
        <div className="filter-section-container">

            <div className="stage-dropdown-container">
            <p className="stage-dropdown-label">When will you start using this bundle?</p>
            <div className="stage-dropdown-wrapper">
                <button 
                    className="stage-dropdown-btn" 
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    {selectedStage ? selectedStage.label : 'Select'}
                    <ChevronDown style={{width: '16px', height: '16px', transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease'}} />
                </button>
                {showDropdown && (
                    <div className="stage-dropdown-menu">
                        {stageOptions.map((option) => (
                            <button
                                key={option.id}
                                className={`stage-dropdown-item ${selectedStage?.id === option.id ? 'active' : ''}`}
                                onClick={() => handleStageSelect(option)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            </div>

            <div className="filter-label-section">
            <p className="filter-label">How many days of care would you like covered?</p>
            <div className="label-con">
                {
                filterLabel.map((item, index)=> {
                    return (
                    <button 
                        key={index} 
                        className={`filter-label-item ${selectedDays === item.label ? 'active' : ''}`}
                        onClick={() => handleDaysSelect(item.label, item.bundle)}
                    >
                        {item.label}
                    </button>
                    )
                })
                }
            </div>
            </div>
        </div>
        </div>
        <div className="footer-section">
        <p className="info-txt"><Info style={{width: '16px' , height: '16px'}} /> You can always add a Refill Essentials bundle later.</p>
        <div className="buttons-con">
            <div style={{flex: '1'}}>
            <button className={`button-pink-center ${selectedDays && selectedStage ? '' : 'disabled'}`} style={{height: '40px'}} data-bs-dismiss="offcanvas" onClick={() => navigate(redirection)} >Show my Recommended Bundle <ArrowRight style={{width: '20px', height: '20px'}} /></button>
            </div>
            <button className="button-pink-border" style={{height: '40px'}} data-bs-dismiss="offcanvas">Cancel</button>
        </div>
        </div>
    </div>
  )
}

export default BundlesRecommendedModal