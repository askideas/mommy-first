import React, { useState, useEffect } from 'react'
import './AFMarketing.css'
import Heading from '../../Components/Heading/Heading'
import HeroImg from '../../assets/af-marketing/hero-img.png'
import Trophy from '../../assets/af-marketing/trophy.svg'
import Bottle from '../../assets/af-marketing/bottle.svg'
import Pad from '../../assets/af-marketing/pad.svg'
import Box from '../../assets/af-marketing/box.svg'
import Percentage from '../../assets/af-marketing/percentage.svg'
import Folder from '../../assets/af-marketing/folder.svg'
import Help from '../../assets/af-marketing/help.svg'
import CoinShade from '../../assets/af-marketing/coin-shade.png'
import OrangeShadeLeft from '../../assets/af-marketing/orangeshadeleft.png'
import GreenShade from '../../assets/af-marketing/greenshade.png'
import CoinsShade from '../../assets/af-marketing/coinsshade.png'
import FAQComponent from '../../Components/FAQComponent/FAQComponent'
import { db } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const AFMarketing = () => {
    const navigate = useNavigate();
    // Firebase data state
    const [heroSectionData, setHeroSectionData] = useState(null)
    const [applyAccessEarnData, setApplyAccessEarnData] = useState(null)
    const [faqData, setFaqData] = useState(null)
    const [programFeaturesData, setProgramFeaturesData] = useState(null)
    const [whyBecomeData, setWhyBecomeData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchAffiliateMarketingPageData()
    }, [])

    const fetchAffiliateMarketingPageData = async () => {
        setIsLoading(true)
        try {
            // Fetch herosection document
            const heroDocRef = doc(db, 'affiliatemarketingpage', 'herosection')
            const heroDocSnap = await getDoc(heroDocRef)
            if (heroDocSnap.exists()) {
                setHeroSectionData(heroDocSnap.data())
                console.log('Hero Section Data:', heroDocSnap.data())
            }

            // Fetch applyaccessearn document
            const applyDocRef = doc(db, 'affiliatemarketingpage', 'applyaccessearn')
            const applyDocSnap = await getDoc(applyDocRef)
            if (applyDocSnap.exists()) {
                setApplyAccessEarnData(applyDocSnap.data())
                console.log('Apply Access Earn Data:', applyDocSnap.data())
            }

            // Fetch faq document
            const faqDocRef = doc(db, 'affiliatemarketingpage', 'faq')
            const faqDocSnap = await getDoc(faqDocRef)
            if (faqDocSnap.exists()) {
                setFaqData(faqDocSnap.data())
                console.log('FAQ Data:', faqDocSnap.data())
            }

            // Fetch programfeatures document
            const programDocRef = doc(db, 'affiliatemarketingpage', 'programfeatures')
            const programDocSnap = await getDoc(programDocRef)
            if (programDocSnap.exists()) {
                setProgramFeaturesData(programDocSnap.data())
                console.log('Program Features Data:', programDocSnap.data())
            }

            // Fetch whybecome document
            const whyDocRef = doc(db, 'affiliatemarketingpage', 'whybecome')
            const whyDocSnap = await getDoc(whyDocRef)
            if (whyDocSnap.exists()) {
                setWhyBecomeData(whyDocSnap.data())
                console.log('Why Become Data:', whyDocSnap.data())
            }
        } catch (error) {
            console.error('Failed to fetch affiliate marketing page data:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const headingData = {
        'title': heroSectionData && heroSectionData.heroData.heading,
        'subtitle': heroSectionData && heroSectionData.heroData.subheading,
        'description': heroSectionData && heroSectionData.heroData.description
    }

    const faqs = []
    faqData && faqData.faqData.faqs.map((item,index)=>faqs.push(item))

  return (
    <div className="af-marketing-container-section">
        <img src={OrangeShadeLeft} className='orange-shade' alt="" />
        <img src={CoinsShade} className='coins-shade' alt="" />
        <img src={GreenShade} className='green-shade' alt="" />
        <div className="container">
            <div className="af-marketing-hero-section">
                <img src={heroSectionData && heroSectionData.heroData.image} alt="" className="hero-img" />
                <Heading data={headingData} />
                <button className='button-pink-center apply-btn-af-mar' onClick={()=>navigate(heroSectionData && heroSectionData.heroData.buttonLink)}>{heroSectionData && heroSectionData.heroData.buttonText}</button>
            </div>

            <div className="why-partner-section">
                <img src={CoinShade} alt="" className='coin-shade-img' />
                <p className="head"><img src={Trophy} alt="" />{whyBecomeData && whyBecomeData.sectionData.heading}</p>
                <div className="why-partner-items">
                    {
                        whyBecomeData && whyBecomeData.sectionData.cards.map((item,index) => {
                            return (
                                <div className="why-partner-item" key={index}>
                                    <img src={item.image} alt="" />
                                    <h1>{item.heading}</h1>
                                    <p>{item.description}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <button className='button-pink-center apply-for-pro-circle' onClick={()=>navigate(whyBecomeData && whyBecomeData.sectionData.buttonLabel)}>{whyBecomeData && whyBecomeData.sectionData.buttonText}</button>
            </div>

            <div className="apply-acces-earn-sec">
                <p className="pink">{applyAccessEarnData && applyAccessEarnData.sectionData.label1} <span></span></p>
                <p className="dark-pink">{applyAccessEarnData && applyAccessEarnData.sectionData.label2}</p>
                <p className="earn"><span></span>{applyAccessEarnData && applyAccessEarnData.sectionData.label3}</p>
            </div>

            <div className="af-benifits-prof">
                <div className="benefits-section">
                    <p className="head">
                        <img src={programFeaturesData && programFeaturesData.featuresData.cards[0].iconImage} alt="" /> {programFeaturesData && programFeaturesData.featuresData.cards[0].heading}
                    </p>
                    <p className="label">{programFeaturesData && programFeaturesData.featuresData.cards[0].label}</p>
                    {
                        programFeaturesData && programFeaturesData.featuresData.cards[0].points.map((item,index) => {
                            return (
                                <p key={index} className="shade-item">{item.text}</p>
                            )
                        })
                    }
                </div>

                <div className="professional-section">
                    <p className="head">
                        <img src={programFeaturesData && programFeaturesData.featuresData.cards[1].iconImage} alt="" /> {programFeaturesData && programFeaturesData.featuresData.cards[1].heading}
                    </p>
                    <p className="label">{programFeaturesData && programFeaturesData.featuresData.cards[1].label}</p>
                    {
                        programFeaturesData && programFeaturesData.featuresData.cards[1].points.map((item,index) => {
                            return (
                                <p key={index} className="shade-item">{item.text}</p>
                            )
                        })
                    }
                </div>
            </div>

            <div className="af-whos-this-for">
                <p className="head">
                    <img src={programFeaturesData && programFeaturesData.featuresData.cards[2].iconImage} alt="" /> {programFeaturesData && programFeaturesData.featuresData.cards[2].heading}
                </p>
                <p className="label">{programFeaturesData && programFeaturesData.featuresData.cards[2].label}</p>
                {
                    programFeaturesData && programFeaturesData.featuresData.cards[2].points.map((item,index) => {
                        return (
                            <p key={index} className="shade-item">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.0078 21.9998C17.5307 21.9998 22.0078 17.5226 22.0078 11.9998C22.0078 6.47691 17.5307 1.99976 12.0078 1.99976C6.48497 1.99976 2.00781 6.47691 2.00781 11.9998C2.00781 17.5226 6.48497 21.9998 12.0078 21.9998Z" fill="#5ED34B"/>
                                    <path d="M7.08594 12L10.0859 15L16.0859 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>{item.text}</span>
                            </p>
                        )
                    })
                }
                <button className='button-pink-center mt-5'>Apply for the Pro-Circle Affiliate Program</button>
            </div>

            <FAQComponent
                faqs={faqs}
                title=""
                subtitle="Frequently Asked Questions"
                description=""
            />
        </div>
    </div>
  )
}

export default AFMarketing