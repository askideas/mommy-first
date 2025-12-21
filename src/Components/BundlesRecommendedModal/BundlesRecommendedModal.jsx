import React from 'react'
import './BundlesRecommendedModal.css'
import { ArrowRight, ChevronDown, Clock, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BundlesRecommendedModal = () => {
    const filterLabel = ['2-3 days', '5-7 days', '10-14 days', '16-21 days', 'I just need a refill']
    const navigate = useNavigate();
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

            <div className="dropdown mf-dropdown">
            <p className="mf-dropdown-label">When will you start using this bundle?</p>
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Select <ChevronDown style={{width: '16px', height: '16px'}} />
            </button>
            <ul className="dropdown-menu w-100">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
            </div>

            <div className="filter-label-section">
            <p className="filter-label">How many days of care would you like covered?</p>
            <div className="label-con">
                {
                filterLabel.map((item, index)=> {
                    return (
                    <button key={index} className="filter-label-item">{item}</button>
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
            <button className='button-pink-center' style={{height: '40px'}} data-bs-dismiss="offcanvas" onClick={() => navigate("/bundles/recommended")} >Show my Recommended Bundle <ArrowRight style={{width: '20px', height: '20px'}} /></button>
            </div>
            <button className="button-pink-border" style={{height: '40px'}} data-bs-dismiss="offcanvas">Cancel</button>
        </div>
        </div>
    </div>
  )
}

export default BundlesRecommendedModal