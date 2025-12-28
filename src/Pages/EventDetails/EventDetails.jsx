import React from 'react'
import './EventDetails.css'
import { NavLink } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import EventDetail from '../../assets/event-detail.png'
import S1 from '../../assets/s-1.svg'
import S2 from '../../assets/s-2.svg'
import S3 from '../../assets/s-3.svg'
import CardWithImage from '../../Components/CardwithImage/CardWithImage'

const EventDetails = () => {
    const Items = [
        {
            id: 1,
            image: S1,
            title: "Trusted by Moms Around the World",
            description: ["5th November - 09th November 2025"],
            buttonlabel: "Learn more",
            labelonimage: false,
            link: "/events/1",
        },
        {
            id: 2,
            image: S2,
            title: "Baby EXPO - DUBAI 2026",
            description: ["5th August - 09th August 2026"],
            buttonlabel: "Book your slot",
            labelonimage: false,
            link: "/events/2",
        },
        {
            id: 3,
            image: S3,
            title: "Mother’s Day Greetings!",
            description: ["Saturday March 21st, 2026"],
            buttonlabel: "Join Us",
            labelonimage: false,
            link: "/events/3",
        }
    ]

    return (
        <div className="container mt-5">
            <div className="breadcrumbs-section">
                <NavLink to="/">Home</NavLink>
                <ChevronRight />
                <NavLink to="/shop">Events</NavLink>
                <ChevronRight />
                <span>Event details</span>
            </div>
            <h1 className="event-details-heading">Trusted by Moms around the world</h1>
            <div className="event-details-main-container">
                <img src={EventDetail} alt="" className='event-image' />
                <div className="event-description">
                    <h1>About the event</h1>
                    <p>I absolutely loved this postpartum kit. I just recently gave birth to my son and bought this kit to help ease my pain and it definitely did that! The cold pads are the perfect size covering the whole area. Really cools and soothes your lady parts and is a great essential to have. The peri spray bottle is also helpful due to the multi-use friendly sprayer. I would definitely recommend this kit for any mamas looking to feel better postpartum!! Really cools and soothes your lady parts and is a great essential to have. The peri spray bottle is also helpful due to the multi-use friendly sprayer. I would definitely recommend this kit for any mamas looking to feel better postpartum!!</p>
                    <p>The herbal spray felt amazing as it really cools and soothes your lady parts and is a great essential to have. The peri spray bottle is also helpful due to the multi-use friendly sprayer. I would definitely recommend this kit for any mamas looking to feel better postpartum. Really cools and soothes your lady parts and is a great essential to have. The peri spray bottle is also helpful due to the multi-use friendly sprayer. I would definitely recommend this kit for any mamas looking to feel better postpartum!!</p>
                    <p>Really cools and soothes your lady parts and is a great essential to have. The peri spray bottle is also helpful due to the multi-use friendly sprayer. I would definitely recommend this kit for any mamas looking to feel better postpartum!!</p>
                </div>
                <div className="event-schedule-container">
                    <div className="schedule-item">
                        <p>Date</p>
                        <h1>Saturday March 21st, 2026</h1>
                    </div>

                    <div className="schedule-item">
                        <p>Time</p>
                        <h1>From 8:00 AM  - 3:00 PM</h1>
                    </div>

                    <div className="schedule-item">
                        <p>Venue</p>
                        <h1>New York city, New York</h1>
                    </div>
                </div>
                <button className='button-pink-center book-slot-btn' >Book your seat</button>
            </div>

            <div className="related-events-container">
                {
                    Items.map((item, index)=> {
                        return (
                            <CardWithImage key={index} item={item} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default EventDetails