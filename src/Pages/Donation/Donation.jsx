import React, { useState, useEffect } from 'react'
import './Donation.css'
import Heading from '../../Components/Heading/Heading'
import HeroImg from '../../assets/Donation/heroimg.png'
import Postpartum from '../../assets/Donation/postpartum.png'
import Discussion from '../../assets/Donation/discussion.png'
import { db } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

const Donation = () => {
    // Firebase data state
    const [heroSectionData, setHeroSectionData] = useState(null)
    const [meaningfulImpactData, setMeaningfulImpactData] = useState(null)
    const [momsActData, setMomsActData] = useState(null)
    const [postpartumSupportData, setPostpartumSupportData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchDonationPageData()
    }, [])

    const fetchDonationPageData = async () => {
        setIsLoading(true)
        try {
            // Fetch herosection document
            const heroDocRef = doc(db, 'donationpage', 'herosection')
            const heroDocSnap = await getDoc(heroDocRef)
            if (heroDocSnap.exists()) {
                setHeroSectionData(heroDocSnap.data())
                console.log('Hero Section Data:', heroDocSnap.data())
            }

            // Fetch meaningfulimpact document
            const meaningfulDocRef = doc(db, 'donationpage', 'meaningfulimpact')
            const meaningfulDocSnap = await getDoc(meaningfulDocRef)
            if (meaningfulDocSnap.exists()) {
                setMeaningfulImpactData(meaningfulDocSnap.data())
                console.log('Meaningful Impact Data:', meaningfulDocSnap.data())
            }

            // Fetch momsact document
            const momsActDocRef = doc(db, 'donationpage', 'momsact')
            const momsActDocSnap = await getDoc(momsActDocRef)
            if (momsActDocSnap.exists()) {
                setMomsActData(momsActDocSnap.data())
                console.log('Moms Act Data:', momsActDocSnap.data())
            }

            // Fetch postpartumsupport document
            const postpartumDocRef = doc(db, 'donationpage', 'postpartumsupport')
            const postpartumDocSnap = await getDoc(postpartumDocRef)
            if (postpartumDocSnap.exists()) {
                setPostpartumSupportData(postpartumDocSnap.data())
                console.log('Postpartum Support Data:', postpartumDocSnap.data())
            }
        } catch (error) {
            console.error('Failed to fetch donation page data:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const headingData = {
        'title': heroSectionData && heroSectionData.heroData.heading,
        'subtitle': heroSectionData && heroSectionData.heroData.subheading,
        'description': false
    }
  return (
    <>
        <Heading data={headingData} />
        <div className="container">
            <div className="donation-hero-section">
                <h1>Caring for Mothers, Together</h1>
                <img src={heroSectionData && heroSectionData.heroData.mainImage} alt="" />
                <p dangerouslySetInnerHTML={{ __html: heroSectionData && heroSectionData.heroData.description }}></p>
            </div>

            <div className="donation-content-container">
                <h1>{momsActData && momsActData.sectionData.heading}</h1>
                <div dangerouslySetInnerHTML={{ __html: momsActData && momsActData.sectionData.description }}></div>
                <hr />
                
                <h1>{postpartumSupportData && postpartumSupportData.supportData.heading}</h1>
                <img src={postpartumSupportData && postpartumSupportData.supportData.logo} className='postpartum-img' alt="" />
                <p>{postpartumSupportData && postpartumSupportData.supportData.description}</p>
                <ul>
                    <label>PSI provides:</label>
                    {
                        postpartumSupportData && postpartumSupportData.supportData.checkpoints.map((item, index)=> {
                            return (<li key={index}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.0078 21.9998C17.5307 21.9998 22.0078 17.5226 22.0078 11.9998C22.0078 6.47691 17.5307 1.99976 12.0078 1.99976C6.48497 1.99976 2.00781 6.47691 2.00781 11.9998C2.00781 17.5226 6.48497 21.9998 12.0078 21.9998Z" fill="#5ED34B"/>
                                    <path d="M7.08594 12L10.0859 15L16.0859 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>{item.text}</span>
                            </li>)
                        })
                    }
                </ul>
                <p>Through our ongoing support of PSI, Mommy First helps extend vital resources to families during one of the most vulnerable and important seasons of life.</p>
                <hr />

                <div className="discussion-container">
                    <img src={meaningfulImpactData && meaningfulImpactData.impactData.images[0].url} alt="" />
                    <div className="contents">
                        <h1>{meaningfulImpactData && meaningfulImpactData.impactData.role}</h1>
                        <div dangerouslySetInnerHTML={{ __html: meaningfulImpactData && meaningfulImpactData.impactData.description }}></div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Donation