import React from 'react'
import './Enquiries.css'
import Heading from '../../Components/Heading/Heading'
import Trophy from '../../assets/Enquiries/trophy.svg'
import Percentage from '../../assets/Enquiries/percent.svg'
import Heart from '../../assets/Enquiries/heart.svg'
import Microscope from '../../assets/Enquiries/microscope.svg'
import { ChevronDown, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Enquiries = () => {
    const navigate = useNavigate();
    const headingData = {
        'title': "ENQUIRIES",
        'subtitle': "Global Infrastructure. Local Care.",
        'description': 'Partner with the leader in premium postpartum solutions.'
    }

    const Items = [
    {
        id: 1,
        questionIcon: Percentage,
        question: "Wholesale & Retail",
        answer:
        "<p>For <strong>Boutiques & Major Retailers</strong> Modern mothers are trading generic drugstore supplies for premium, effective recovery tools. Join us in elevating the category.</p>",
        activeItems: [
            {
                label: "Email",
                value: "wholesale@neomedusa.com",
                isCopyEnabled: true,
            },
            {
                label: "Territories",
                value: "North America, EMEA, APAC",
                isCopyEnabled: false,
            },
        ]
    },
    {
        id: 2,
        questionIcon: Microscope,
        question: "Medical Procurement",
        answer:
        "<p>For <strong>Hospitals & OB-GYN Practices</strong> We offer medical-grade procurement for hospital systems looking to upgrade their standard-of-care discharge kits.</p>",
        activeItems: [
            {
                label: "Email",
                value: "medical@neomedusa.com",
                isCopyEnabled: true,
            },
        ]
    },
    {
        id: 3,
        questionIcon: Heart,
        question: "Health Plans & Payers",
        answer:
        "<p>For Insurance Providers & Corporate Benefits We partner with forward-thinking Health Plans and Employee Benefit Platforms (FSA/HSA) to offer Mommy First™ recovery kits as a covered member perk.</p> <p>Help your members navigate the Fourth Trimester with the only recovery system backed by a Clinical Pharmacist and a Quality Specialist.</p>",
        activeItems: [
            {
                label: "Email",
                value: "partnerships@neomedusa.com",
                isCopyEnabled: true,
            },
        ]
    },
    ];

    return (
        <div className='mt-5'>
            <Heading data={headingData} />

            <div className="container">
                <div className="enquiry-section-con">
                    <div className="heading-sec">
                        <p className="head"><img src={Trophy} alt="" /><span>The Partnership Pitch</span></p>
                        <p className="subhead"><Clock /><span>Response time: within 24 hours.</span></p>
                    </div>
                    <p className="head-txt">Why Partner with Mommy First™?</p>
                    <p className="desc-txt">We are the only postpartum brand backed by the global logistics and medical expertise of NeoMed USA. With distribution hubs in New York (Global HQ), Bucharest (EU), Qatar (GCC), and Mumbai (India), we offer unshakeable supply chain reliability for major retailers and hospital networks.</p>
                </div>

                <div class="accordion" id="enquiresAccordian">
                    {
                        Items.map((item,index)=> {
                            return (
                                <div class="accordion-item" key={index}>
                                    <h2 class="accordion-header">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse${item.id}`} aria-expanded="true" aria-controls={`panelsStayOpen-collapse${item.id}`}>
                                        <p className='heading-txt'><img src={item.questionIcon} alt="" /> {item.question}</p> <button className="icon-con"><ChevronDown className='' /></button>
                                    </button>
                                    </h2>
                                    <div id={`panelsStayOpen-collapse${item.id}`} class="accordion-collapse collapse show">
                                        <div class="accordion-body" dangerouslySetInnerHTML={{ __html: item.answer }}></div>
                                        <div className="active-items-section">
                                            {
                                                item.activeItems.map((label, index)=> {
                                                    return (
                                                        <div className={`active-item ${item.activeItems.length > 1 ? 'multiple' : 'single'} `}>
                                                            <p className="label">{label.label}</p>
                                                            <div className="active-value">
                                                                <span>{label.value}</span>
                                                                {
                                                                    label.isCopyEnabled && <button><span>COPY</span></button>
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                            
                        })
                    }
                    
                </div>

                <div className="enquiries-contact-section">
                    <p>Still have questions? We’re happy to help 🙂</p>
                    <button className='button-pink-center' onClick={()=>navigate('/contact')}>CONTACT US</button>
                </div>
            </div>
        </div>
    )
}

export default Enquiries