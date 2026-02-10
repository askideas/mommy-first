import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './CareHub.css'
import MainImage from '../../assets/carehub/human.png'
import Pinkround from '../../assets/carehub/pink-round.png'
import CenterShade from '../../assets/carehub/center-shade.png'
import Img1 from '../../assets/Reviews/m1.svg'
import Img2 from '../../assets/Reviews/m2.svg'
import Img3 from '../../assets/Reviews/m3.svg'
import Img4 from '../../assets/Reviews/m4.svg'
import Img5 from '../../assets/Reviews/m5.svg'
import Calendar from '../../assets/carehub/calendar.svg'
import File from '../../assets/carehub/file-download.svg'
import Heart from '../../assets/carehub/heart-rounded.svg'
import Heading from '../../Components/Heading/Heading'
import BlogCard from '../../Components/BlogCard/BlogCard'
import EventCard from '../../Components/EventCard/EventCard'
import { blogsData } from '../../data/blogsData'
import { eventsData } from '../../data/eventsData'
import { Baby, Video, Heart as HeartIcon, Star, Download } from 'lucide-react'
import Carehubnewsletterimage from '../../assets/carehub/care-hub-news-letter.png'
import Boy from '../../assets/carehub/boy.svg'
import Girl from '../../assets/carehub/girl.svg'
import Email from '../../assets/carehub/email.svg'
import CareGuideImage from '../../assets/carehub/care-guide-img.png'
import { getLiveSessions, getJournals } from '../../services/blogService'
import { useFadeUpAnimation } from '../../hooks/useFadeUpAnimation'
import { db } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

const CareHub = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [visibleBlogs, setVisibleBlogs] = useState(3)
  const [visibleEvents, setVisibleEvents] = useState(3)
  const [liveSessionsData, setLiveSessionsData] = useState([])
  const [journalsData, setJournalsData] = useState([])
  const [isLoadingSessions, setIsLoadingSessions] = useState(true)
  const [isLoadingJournals, setIsLoadingJournals] = useState(true)
  const [heroLabelImages, setHeroLableImages] = useState([Calendar, Heart, File])

  // CareHub page data from Firebase
  const [heroSectionData, setHeroSectionData] = useState(null)
  const [careGuidesData, setCareGuidesData] = useState(null)
  const [isLoadingCareHub, setIsLoadingCareHub] = useState(true)

  // Animation refs
  const [heroRef, heroVisible] = useFadeUpAnimation(0.1, true)
  const [labelsRef, labelsVisible] = useFadeUpAnimation(0.1, true)
  const [careGuideRef, careGuideVisible] = useFadeUpAnimation(0.1, true)
  const [journalRef, journalVisible] = useFadeUpAnimation(0.1, true)
  const [liveRef, liveVisible] = useFadeUpAnimation(0.1, true)
  const [newsletterRef, newsletterVisible] = useFadeUpAnimation(0.1, true)

  useEffect(() => {
    fetchLiveSessions()
    fetchJournals()
    fetchCareHubPageData()
  }, [])

  const fetchCareHubPageData = async () => {
    setIsLoadingCareHub(true)
    try {
      // Fetch herosection document
      const heroDocRef = doc(db, 'carehubpage', 'herosection')
      const heroDocSnap = await getDoc(heroDocRef)
      if (heroDocSnap.exists()) {
        setHeroSectionData(heroDocSnap.data())
        console.log('Hero Section Data:', heroDocSnap.data())
      }

      // Fetch careguides document
      const careGuidesDocRef = doc(db, 'carehubpage', 'careguides')
      const careGuidesDocSnap = await getDoc(careGuidesDocRef)
      if (careGuidesDocSnap.exists()) {
        setCareGuidesData(careGuidesDocSnap.data())
        console.log('Care Guides Data:', careGuidesDocSnap.data())
      }
    } catch (error) {
      console.error('Failed to fetch carehub page data:', error)
    } finally {
      setIsLoadingCareHub(false)
    }
  }

  // Scroll to care guides section if hash is #careguides
  useEffect(() => {
    if (location.hash === '#careguides') {
      setTimeout(() => {
        const element = document.querySelector('.care-hub-section-container')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else if (location.hash === '#journal') {
      setTimeout(() => {
        const element = document.querySelector('.carehub-journal-section')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else if (location.hash === '#live-sessions') {
      setTimeout(() => {
        const element = document.querySelector('.carehub-live-section')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [location.hash])

  const scrollToSection = (sectionClass, hash) => {
    navigate(`/care-hub${hash}`)
    setTimeout(() => {
      const element = document.querySelector(sectionClass)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const fetchLiveSessions = async () => {
    setIsLoadingSessions(true)
    try {
      const response = await getLiveSessions()
      console.log('Live sessions response:', response)
      if (response.success && response.data?.articles?.edges) {
        setLiveSessionsData(response.data.articles.edges)
      }
    } catch (error) {
      console.error('Failed to fetch live sessions:', error)
    } finally {
      setIsLoadingSessions(false)
    }
  }

  const fetchJournals = async () => {
    setIsLoadingJournals(true)
    try {
      const response = await getJournals()
      console.log('Journals response:', response)
      if (response.success && response.data?.articles?.edges) {
        setJournalsData(response.data.articles.edges)
      }
    } catch (error) {
      console.error('Failed to fetch journals:', error)
    } finally {
      setIsLoadingJournals(false)
    }
  }

  const journalHeading = {
    subtitle: "From the Care Journal",
    description: "Short, supportive reads on pregnancy, postpartum recovery, and<br/>product-use education—written to feel calm and practical."
  }

  const displayedBlogs = journalsData.slice(0, visibleBlogs)
  const displayedEvents = liveSessionsData.slice(0, visibleEvents)

  const handleViewAllBlogs = () => {
    navigate('/blogs')
  }

  const handleViewAllEvents = () => {
    navigate('/events')
  }

  return (
    <div className="container">
        <div ref={heroRef} className={`carehub-hero-section ${heroVisible ? 'animate-in' : ''}`}>
            <h1 className="heading">{heroSectionData && heroSectionData.heroContent.heading}</h1>
            <h2 className="subheading" dangerouslySetInnerHTML={{ __html: heroSectionData && heroSectionData.heroContent.subheading }}></h2>
            <div className="hero-section-image-round">
                <img src={Pinkround} alt="" className='pink-round' />
                <img src={CenterShade} alt="" className="center-shade" />
                <img src={heroSectionData && heroSectionData.heroContent.image} alt="" className="main-human-image" />
                {
                    heroSectionData && heroSectionData.bubbles.map((bubble, index)=> {
                        return (
                            <div className={`floating-div-con ${index+1 == 1 && 'one'} ${index+1 == 2 && 'two'} ${index+1 == 3 && 'three'} ${index+1 == 4 && 'four'} ${index+1 == 5 && 'five'}`} key={index}>
                                <img src={bubble.image} alt="" className='avatar-img' />
                                <div className="text-con">
                                    <p className="text-desc" dangerouslySetInnerHTML={{ __html: bubble.description }}></p>
                                    <p className="text-details">
                                        <span className="name">{bubble.location}</span>
                                        <span className="time">{bubble.time}</span>
                                    </p>
                                </div>
                            </div>
                        )
                        
                    })
                }
            </div>

            <div ref={labelsRef} className={`labels-sec-con ${labelsVisible ? 'animate-in' : ''}`}>
                {
                    heroSectionData && heroSectionData.labelItems.map((label, index)=> {
                        return (
                            <div className="label-item-sec">
                                <img src={heroLabelImages[index]} alt="" className="image" />
                                <p className="text-con-sec">
                                    <span className={`${index==0 && 'active'}`}>{label.label1}</span>
                                    <span>{label.label2}</span>
                                </p>
                            </div>
                        )
                    })
                }
            </div>

            <p className="care-hero-desc" dangerouslySetInnerHTML={{ __html: heroSectionData && heroSectionData.heroContent.description }}></p>

            <div className="care-hub-hero-btn-sec">
                {
                    heroSectionData && heroSectionData.buttons.map((button, index)=> {
                        return (
                            <button className={`${index==0 || index==2 ? 'button-pink-center' : 'button-pink-border'} ${index==0 ? 'care-btn' : ''} ${index==1 ? 'jour-btn' : ''} ${index==2 ? 'live-btn' : ''}`} key={index} onClick={() => scrollToSection('.care-hub-section-container', `${button.link}`)}>{button.label}</button>
                        )
                    })
                }
            </div>
        </div>

        {/* Care Hub Section */}
        <div ref={careGuideRef} className={`care-hub-section-container ${careGuideVisible ? 'animate-in' : ''}`}>
            <h1 className="care-guide-head">Care Guides</h1>
            <h2 className="care-guide-subhead">Saveable guides designed to reduce overwhelm and answer the <br /> questions moms don’t always know to ask.</h2>
            <div className="care-guide-content-con">
                <div className="left-section">
                    <p className="labels-section-in-con">
                        <span className="active-green">{careGuidesData && careGuidesData.leftSection.label1}</span>
                        <span className='active-green-shade'>{careGuidesData && careGuidesData.leftSection.label2}</span>
                        <span className="active-brown"><Star />{careGuidesData && careGuidesData.leftSection.label3}</span>
                    </p>

                    <div className="details-section">
                        <h1>{careGuidesData && careGuidesData.leftSection.heading}</h1>
                        <h2>{careGuidesData && careGuidesData.leftSection.subheading}</h2>
                        <p>{careGuidesData && careGuidesData.leftSection.description}</p>
                    </div>

                    <div className="buttons-section">
                        <p className="label">{careGuidesData && careGuidesData.leftSection.buttonLabel}</p>
                        <button className='button-pink-center' onClick={()=>navigate(careGuidesData && careGuidesData.leftSection.buttonLink)}>{careGuidesData && careGuidesData.leftSection.buttonText}</button>
                    </div>
                </div>

                <div className="middle-section">
                    {
                        careGuidesData && careGuidesData.middleSection.map((item, index)=> {
                            return (
                                <div className="item-sec-card" key={index}>
                                    <p className="label-section">
                                        <span className="active-green">{item.label1}</span>
                                        <span className="active-green-shade">{item.label2}</span>
                                    </p>
                                    <div className="heading-section">
                                        <p className="heading">
                                            {item.heading} <span>{item.description}</span>
                                        </p>
                                        <button className="button-pink-center"><Download /></button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="right-section">
                    <img src={careGuidesData && careGuidesData.rightSection.image} alt="" />
                </div>
            </div>
            <div className="care-guide-btns-con">
                <p className="label-desc">For educational use only. Always consult your provider for medical advice.</p>
                <button className="button-pink-border">View all care guides</button>
            </div>
        </div>

        {/* From the Care Journal Section */}
        <div ref={journalRef} className={`carehub-journal-section ${journalVisible ? 'animate-in' : ''}`}>
            <Heading data={journalHeading} />
            
            <div className="carehub-journal-grid">
                {isLoadingJournals ? (
                    <p className="loading-text">Loading journals...</p>
                ) : displayedBlogs.length > 0 ? (
                    displayedBlogs.map((blog) => (
                        <BlogCard key={blog.node.id} blog={blog.node} />
                    ))
                ) : (
                    <p className="no-blogs-text">No journals available at the moment.</p>
                )}
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                <p className='progress-bar-text'>You've seen {displayedBlogs.length} out of {journalsData.length} articles</p>
                <div className="progress-bar-con">
                    <span></span>
                </div>
                <button className='button-label' onClick={()=> navigate('/blogs')}>View all</button>
            </div>
        </div>

        {/* LIVE Sessions Section */}
        <div ref={liveRef} className={`carehub-live-section ${liveVisible ? 'animate-in' : ''}`}>
            <h2 className="carehub-live-title">LIVE Sessions</h2>
            <p className="carehub-live-description">
                Classes led by certified OB/GYN nurses and instructors—created<br/>
                to educate, reduce fear, and build confidence.
            </p>

            <div className="carehub-live-features">
                <div className="carehub-feature-item">
                    <div className="carehub-feature-icon">
                        <img src={Boy} alt="" />
                    </div>
                    <p className="carehub-feature-text">
                        <span>Stroller Cart</span>
                        <span>Moms</span>
                    </p>
                </div>
                <div className="carehub-feature-item">
                    <div className="carehub-feature-icon">
                        <img src={Girl} alt="" />
                    </div>
                    <p className="carehub-feature-text">
                        <span>Online</span>
                        <span>Yoga</span>
                    </p>
                </div>
                <div className="carehub-feature-item">
                    <div className="carehub-feature-icon">
                        <img src={Email} alt="" />
                    </div>
                    <p className="carehub-feature-text">
                        <span>Live</span>
                        <span>Virtual</span>
                    </p>
                </div>
            </div>

            <div className="carehub-events-grid">
                {isLoadingSessions ? (
                    <p className="loading-text">Loading sessions...</p>
                ) : displayedEvents.length > 0 ? (
                    displayedEvents.map((event) => (
                        <EventCard key={event.node.id} event={event.node} />
                    ))
                ) : (
                    <p className="no-events-text">No live sessions available at the moment.</p>
                )}
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                <p className='progress-bar-text'>You've seen {displayedEvents.length} out of {liveSessionsData.length} activities</p>
                <div className="progress-bar-con">
                    <span></span>
                </div>
                <button className='button-label' onClick={()=> navigate('/live-sessions')}>View all</button>
            </div>
        </div>

        {/* Newsletter Section */}
        <div ref={newsletterRef} className={`carehub-newsletter-section ${newsletterVisible ? 'animate-in' : ''}`}>
            <img src={Carehubnewsletterimage} alt="" className='care-hub-bg-image' />
            <div className="carehub-newsletter-content">
                <h2 className="carehub-newsletter-title">Want guidance<br/>before you need it?</h2>
                <p className="carehub-newsletter-desc">
                    Join the Mommy First email community to unlock premium<br/>
                    care guides and get Live Session updates—supportive<br/>
                    messages only, no spam.
                </p>
                <div className="carehub-newsletter-form">
                    <input 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="carehub-newsletter-input"
                    />
                    <button className="button-pink-center carehub-newsletter-btn">Subscribe</button>
                </div>
            </div>
            {/* <div className="carehub-newsletter-image">
                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop" alt="Newsletter" />
            </div> */}
        </div>

    </div>
  )
}

export default CareHub