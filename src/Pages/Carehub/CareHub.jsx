import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { Baby, Video, Heart as HeartIcon } from 'lucide-react'
import Carehubnewsletterimage from '../../assets/carehub/care-hub-news-letter.png'

const CareHub = () => {
  const navigate = useNavigate()
  const [visibleBlogs, setVisibleBlogs] = useState(3)
  const [visibleEvents, setVisibleEvents] = useState(3)

  const journalHeading = {
    subtitle: "From the Care Journal",
    description: "Short, supportive reads on pregnancy, postpartum recovery, and<br/>product-use education—written to feel calm and practical."
  }

  const displayedBlogs = blogsData.slice(0, visibleBlogs)
  const displayedEvents = eventsData.slice(0, visibleEvents)

  const handleViewAllBlogs = () => {
    navigate('/blogs')
  }

  const handleViewAllEvents = () => {
    navigate('/events')
  }

  return (
    <div className="container">
        <div className="carehub-hero-section">
            <h1 className="heading">CARE HUB</h1>
            <h2 className="subheading">Support for every stage <br /> of motherhood.</h2>
            <div className="hero-section-image-round">
                <img src={Pinkround} alt="" className='pink-round' />
                <img src={CenterShade} alt="" className="center-shade" />
                <img src={MainImage} alt="" className="main-human-image" />
                <div className="floating-div-con one">
                    <img src={Img1} alt="" className='avatar-img' />
                    <div className="text-con">
                        <p className="text-desc">Ann, just downloaded <span>Ultimate Postpartum Recovery Guide</span> </p>
                        <p className="text-details">
                            <span className="name">Florida, USA</span>
                            <span className="time">Just now</span>
                        </p>
                    </div>
                </div>
                <div className="floating-div-con two">
                    <img src={Img2} alt="" className='avatar-img' />
                    <div className="text-con">
                        <p className="text-desc">Maria, downloaded <span>Hospital Bag Checklist</span> </p>
                        <p className="text-details">
                            <span className="name">Florida, USA</span>
                            <span className="time">2m</span>
                        </p>
                    </div>
                </div>
                <div className="floating-div-con three">
                    <img src={Img3} alt="" className='avatar-img' />
                    <div className="text-con">
                        <p className="text-desc">Jessica, downloaded <span>Postpartum Hygiene Checklist</span> </p>
                        <p className="text-details">
                            <span className="name">Florida, USA</span>
                            <span className="time">2m</span>
                        </p>
                    </div>
                </div>
                <div className="floating-div-con four">
                    <img src={Img4} alt="" className='avatar-img' />
                    <div className="text-con">
                        <p className="text-desc">Ann, just downloaded <span>Ultimate Postpartum Recovery Guide</span> </p>
                        <p className="text-details">
                            <span className="name">Florida, USA</span>
                            <span className="time green">Just now</span>
                        </p>
                    </div>
                </div>
                <div className="floating-div-con five">
                    <img src={Img5} alt="" className='avatar-img' />
                    <div className="text-con">
                        <p className="text-desc">Maria, downloaded <span>Hospital Bag Checklist</span> </p>
                        <p className="text-details">
                            <span className="name">Florida, USA</span>
                            <span className="time">2m</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="labels-sec-con">
                <div className="label-item-sec">
                    <img src={Calendar} alt="" className="image" />
                    <p className="text-con-sec">
                        <span className='active'>FREE</span>
                        <span>with Sign-up</span>
                    </p>
                </div>

                <div className="label-item-sec">
                    <img src={Heart} alt="" className="image" />
                    <p className="text-con-sec">
                        <span>Rated 100%</span>
                        <span>positive by moms</span>
                    </p>
                </div>

                <div className="label-item-sec">
                    <img src={File} alt="" className="image" />
                    <p className="text-con-sec">
                        <span>Downloaded by</span>
                        <span>99% of moms</span>
                    </p>
                </div>
            </div>

            <p className="care-hero-desc">Thoughtfully created care guides, expert-led education, and <br /> gentle movement—hosted by Mommy First.</p>

            <div className="care-hub-hero-btn-sec">
                <button className='button-pink-center care-btn'>Care Guides</button>
                <button className='button-pink-border jour-btn'>The Journal</button>
                <button className='button-pink-center live-btn'>LIVE Sessions</button>
            </div>
        </div>

        {/* From the Care Journal Section */}
        <div className="carehub-journal-section">
            <Heading data={journalHeading} />
            
            <div className="carehub-journal-grid">
                {displayedBlogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                <p className='progress-bar-text'>You’ve seen 3 out of 12 activities</p>
                <div className="progress-bar-con">
                    <span></span>
                </div>
                <button className='button-label' onClick={()=> navigate('/events')}>View all</button>
            </div>
        </div>

        {/* LIVE Sessions Section */}
        <div className="carehub-live-section">
            <h2 className="carehub-live-title">LIVE Sessions</h2>
            <p className="carehub-live-description">
                Classes led by certified OB/GYN nurses and instructors—created<br/>
                to educate, reduce fear, and build confidence.
            </p>

            <div className="carehub-live-features">
                <div className="carehub-feature-item">
                    <div className="carehub-feature-icon">
                        <Baby size={24} />
                    </div>
                    <p className="carehub-feature-text">
                        <span>Stroller Cart</span>
                        <span>Moms</span>
                    </p>
                </div>
                <div className="carehub-feature-item">
                    <div className="carehub-feature-icon">
                        <Video size={24} />
                    </div>
                    <p className="carehub-feature-text">
                        <span>Online</span>
                        <span>Yoga</span>
                    </p>
                </div>
                <div className="carehub-feature-item">
                    <div className="carehub-feature-icon">
                        <HeartIcon size={24} />
                    </div>
                    <p className="carehub-feature-text">
                        <span>Live</span>
                        <span>Virtual</span>
                    </p>
                </div>
            </div>

            <div className="carehub-events-grid">
                {displayedEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                <p className='progress-bar-text'>You’ve seen 3 out of 12 activities</p>
                <div className="progress-bar-con">
                    <span></span>
                </div>
                <button className='button-label' onClick={()=> navigate('/events')}>View all</button>
            </div>
        </div>

        {/* Newsletter Section */}
        <div className="carehub-newsletter-section">
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