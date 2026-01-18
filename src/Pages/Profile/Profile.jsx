import React, { useEffect, useState } from 'react'
import './Profile.css'
import ProfileImg from '../../assets/profile/pf-def.png'
import { Info } from 'lucide-react'
import UserIcon from '../../assets/profile/user-square.svg'
import Smile from '../../assets/profile/smile.svg'
import Map from '../../assets/profile/map.svg'
import Card from '../../assets/profile/card.svg'
import Box from '../../assets/profile/cube.svg'
import Return from '../../assets/profile/return.svg'
import Heart from '../../assets/profile/heart.svg'
import Help from '../../assets/profile/help.svg'
import Bell from '../../assets/profile/bell.svg'
import Tag from '../../assets/profile/tag.svg'
import Settings from '../../assets/profile/settings.svg'
import { NavLink, useLocation } from 'react-router-dom'
import ProfileSection from '../../Components/ProfileSection/ProfileSection'
import Flower from '../../assets/About/flower.svg'
import FlowerShadeHalf from '../../assets/About/flower-shade-half.svg'
import BabiesSection from '../../Components/BabiesSection/BabiesSection'
import AddressSection from '../../Components/AddressSection/AddressSection'
import PaymentSection from '../../Components/PaymentSection/PaymentSection'
import SettingsSection from '../../Components/SettingsSection/SettingsSection'
import NotificationsSection from '../../Components/NotificationsSection/NotificationsSection'

const Profile = () => {
    const location = useLocation();
    const [activeSection, setActiveSection] = useState("#profile");

    useEffect(() => {
        const hash = location.hash;
        setActiveSection(hash || "profile");
    }, [location.hash]);

    const Profilemenu = [
        {
            title: 'My Account',
            items : [
                {
                    title : 'Profile',
                    icon : UserIcon,
                    hash : '#profile'
                },
                {
                    title : 'My Babies',
                    icon : Smile,
                    hash : '#mybabies',
                    label: 'OPTIONAL'
                },
                {
                    title : 'Addresses',
                    icon : Map,
                    hash : '#address'
                },
                {
                    title : 'Payments',
                    icon : Card,
                    hash : '#payments'
                }
            ]
        },
        {
            title: 'Order related',
            items : [
                {
                    title : 'My Orders',
                    icon : Box,
                    hash : '#orders'
                },
                {
                    title : 'Returns & Exchanges',
                    icon : Return,
                    hash : '#returnandexchange'
                },
                {
                    title : 'Wishlist',
                    icon : Heart,
                    hash : '#wishlist'
                },
                {
                    title : 'Help',
                    icon : Help,
                    hash : '#help'
                }
            ]
        },
        {
            title: false,
            items : [
                {
                    title : 'Notifications',
                    icon : Bell,
                    hash : '#notifications'
                },
                {
                    title : 'Subscriptions',
                    icon : Tag,
                    hash : '#subscriptions'
                },
                {
                    title : 'Settings',
                    icon : Settings,
                    hash : '#settings'
                }
            ]
        },
    ]

    return (
        <div className="profile-main-container">
            <img src={Flower} alt="" className="flowerone" />
            <img src={Flower} alt="" className="flowertwo" />
            <img src={Flower} alt="" className="flowerthree" />
            <img src={FlowerShadeHalf} alt="" className="flower-shade-one" />
            <div className="container">
                <div className="profile-header-section">
                    <div className="profile-image">
                        <img src={ProfileImg} alt="" />
                        <span className="active"></span>
                    </div>
                    <p className="profile-name">Hi, <strong>Sarah</strong> 👋 </p>
                    <p className="greeting">Hope you’re feeling good today</p>
                    <p className="info"><Info />You’re 20% there! Complete your profile to enjoy full benefits and special surprises ✨</p>
                </div>
            </div>

            <div className="container">
                <div className="profile-details-main-container">
                    <div className="profile-sidebar-con">
                        {
                            Profilemenu.map((item, index)=> {
                                return (
                                    <div className='profile-items-con'>
                                        <h1 className="profile-menu-sec-heading">{item.title}</h1>
                                        {
                                            item.items.map((profileItem, index)=> {
                                                return (
                                                    <button className={`profile-menu-item ${activeSection === profileItem.hash ? "active" : ""}`} onClick={() => (window.location.hash = profileItem.hash.replace("#",""))} ><img src={profileItem.icon} alt="" />{profileItem.title}{profileItem.label && <span className='item-label'>{profileItem.label}</span>}</button>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                        <div className="logout-div-con">
                            <button className="logout-btn">Log Out</button>
                        </div>
                        
                    </div>

                    <div className="profile-content-based-on-selection">
                        {activeSection === "#profile" && <ProfileSection />}
                        {activeSection === "#mybabies" && <BabiesSection />}
                        {activeSection === "#address" && <AddressSection />}
                        {activeSection === "#payments" && <PaymentSection />}
                        {activeSection === "#settings" && <SettingsSection />}
                        {activeSection === "#notifications" && <NotificationsSection />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile