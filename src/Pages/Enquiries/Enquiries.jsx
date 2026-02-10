import React, { useState, useEffect } from 'react'
import './Enquiries.css'
import Heading from '../../Components/Heading/Heading'
import Trophy from '../../assets/Enquiries/trophy.svg'
import Percentage from '../../assets/Enquiries/percent.svg'
import Heart from '../../assets/Enquiries/heart.svg'
import Microscope from '../../assets/Enquiries/microscope.svg'
import { ChevronDown, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

const Enquiries = () => {
    const navigate = useNavigate();

    // ============ STATE FOR FIREBASE DATA ============
    const [heroSection, setHeroSection] = useState(null);
    const [partnershipPitch, setPartnershipPitch] = useState(null);
    const [wholesaleRetail, setWholesaleRetail] = useState(null);
    const [medicalProcurement, setMedicalProcurement] = useState(null);
    const [healthPlans, setHealthPlans] = useState(null);
    const [contactCta, setContactCta] = useState(null);
    const [loading, setLoading] = useState(true);

    // ============ FETCH ENQUIRY PAGE DATA FROM FIREBASE ============
    useEffect(() => {
        const fetchEnquiryPageData = async () => {
            try {
                setLoading(true);
                
                // Fetch all documents in parallel
                const [heroDoc, pitchDoc, wholesaleDoc, medicalDoc, healthDoc, ctaDoc] = await Promise.all([
                    getDoc(doc(db, 'enquirypage', 'herosection')),
                    getDoc(doc(db, 'enquirypage', 'partnershippitch')),
                    getDoc(doc(db, 'enquirypage', 'wholesaleretail')),
                    getDoc(doc(db, 'enquirypage', 'medicalprocurement')),
                    getDoc(doc(db, 'enquirypage', 'healthplans')),
                    getDoc(doc(db, 'enquirypage', 'contactcta'))
                ]);

                if (heroDoc.exists()) {
                    setHeroSection(heroDoc.data());
                    console.log('Hero Section:', heroDoc.data());
                }

                if (pitchDoc.exists()) {
                    setPartnershipPitch(pitchDoc.data());
                    console.log('Partnership Pitch:', pitchDoc.data());
                }

                if (wholesaleDoc.exists()) {
                    setWholesaleRetail(wholesaleDoc.data());
                    console.log('Wholesale Retail:', wholesaleDoc.data());
                }

                if (medicalDoc.exists()) {
                    setMedicalProcurement(medicalDoc.data());
                    console.log('Medical Procurement:', medicalDoc.data());
                }

                if (healthDoc.exists()) {
                    setHealthPlans(healthDoc.data());
                    console.log('Health Plans:', healthDoc.data());
                }

                if (ctaDoc.exists()) {
                    setContactCta(ctaDoc.data());
                    console.log('Contact CTA:', ctaDoc.data());
                }

            } catch (error) {
                console.error('Error fetching enquiry page data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEnquiryPageData();
    }, []);

    // Icon mapping for dynamic items
    const iconMap = {
        'percentage': Percentage,
        'microscope': Microscope,
        'heart': Heart,
        'trophy': Trophy
    };

    const headingData = {
        'title': heroSection?.heroData.topLabel || "ENQUIRIES",
        'subtitle': heroSection?.heroData.heading || "Global Infrastructure. Local Care.",
        'description': heroSection?.heroData.subtitle || 'Partner with the leader in premium postpartum solutions.'
    }

    // Build accordion items from Firebase data
    const Items = [
        wholesaleRetail && {
            id: 1,
            questionIcon: iconMap[wholesaleRetail?.icon] || Percentage,
            question: wholesaleRetail?.wholesaleData.heading || "Wholesale & Retail",
            answer: wholesaleRetail?.wholesaleData.audienceDescription || "<p>For <strong>Boutiques & Major Retailers</strong> Modern mothers are trading generic drugstore supplies for premium, effective recovery tools. Join us in elevating the category.</p>",
            activeItems: [
                { label: wholesaleRetail?.wholesaleData.emailLabel, value: wholesaleRetail?.wholesaleData.email, isCopyEnabled: true },
                { label: wholesaleRetail?.wholesaleData.territoriesLabel, value: wholesaleRetail?.wholesaleData.territories, isCopyEnabled: false }
            ]
        },
        medicalProcurement && {
            id: 2,
            questionIcon: iconMap[medicalProcurement?.icon] || Microscope,
            question: medicalProcurement?.medicalData.heading || "Medical Procurement",
            answer: medicalProcurement?.medicalData.audienceDescription || "<p>For <strong>Hospitals & OB-GYN Practices</strong> We offer medical-grade procurement for hospital systems looking to upgrade their standard-of-care discharge kits.</p>",
            activeItems: [
                { label: medicalProcurement?.medicalData.emailLabel, value: medicalProcurement?.medicalData.email, isCopyEnabled: true }
            ]
        },
        healthPlans && {
            id: 3,
            questionIcon: iconMap[medicalProcurement?.icon] || Microscope,
            question: healthPlans?.healthPlansData.heading || "Medical Procurement",
            answer: healthPlans?.healthPlansData.audienceDescription || "<p>For <strong>Hospitals & OB-GYN Practices</strong> We offer medical-grade procurement for hospital systems looking to upgrade their standard-of-care discharge kits.</p>",
            activeItems: [
                { label: healthPlans?.healthPlansData.emailLabel, value: healthPlans?.healthPlansData.email, isCopyEnabled: true }
            ]
        }
    ].filter(Boolean);

    // Fallback items if no Firebase data
    const defaultItems = [
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

    const accordionItems = Items.length > 0 ? Items : defaultItems;

    return (
        <div className='mt-5'>
            <Heading data={headingData} />

            <div className="container">
                <div className="enquiry-section-con">
                    <div className="heading-sec">
                        <p className="head"><img src={Trophy} alt="" /><span>{partnershipPitch?.partnershipData.heading || 'The Partnership Pitch'}</span></p>
                        <p className="subhead"><Clock /><span>{partnershipPitch?.partnershipData.responseTime || 'Response time: within 24 hours.'}</span></p>
                    </div>
                    <p className="head-txt">{partnershipPitch?.partnershipData.subheading || 'Why Partner with Mommy First™?'}</p>
                    <p className="desc-txt">{partnershipPitch?.partnershipData.description || 'We are the only postpartum brand backed by the global logistics and medical expertise of NeoMed USA. With distribution hubs in New York (Global HQ), Bucharest (EU), Qatar (GCC), and Mumbai (India), we offer unshakeable supply chain reliability for major retailers and hospital networks.'}</p>
                </div>

                <div className="accordion" id="enquiresAccordian">
                    {
                        accordionItems.map((item,index)=> {
                            return (
                                <div className="accordion-item" key={index}>
                                    <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse${item.id}`} aria-expanded="true" aria-controls={`panelsStayOpen-collapse${item.id}`}>
                                        <p className='heading-txt'><img src={item.questionIcon} alt="" /> {item.question}</p> <button className="icon-con"><ChevronDown className='' /></button>
                                    </button>
                                    </h2>
                                    <div id={`panelsStayOpen-collapse${item.id}`} className="accordion-collapse collapse show">
                                        <div className="accordion-body" dangerouslySetInnerHTML={{ __html: item.answer }}></div>
                                        <div className="active-items-section">
                                            {
                                                item.activeItems.map((label, idx)=> {
                                                    return (
                                                        <div key={idx} className={`active-item ${item.activeItems.length > 1 ? 'multiple' : 'single'} `}>
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
                    <p>{contactCta?.ctaData.heading || "Still have questions? We're happy to help 🙂"}</p>
                    <button className='button-pink-center' onClick={() => navigate(contactCta?.ctaData.buttonLink || '/contact')}>
                        {contactCta?.ctaData.buttonText || 'CONTACT US'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Enquiries