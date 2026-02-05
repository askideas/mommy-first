import React, { useEffect, useState } from 'react'
import './Profile.css'
import ProfileImg from '../../assets/profile/pf-def.png'
import { CircleQuestionMark, Info, Loader2, Play } from 'lucide-react'
import UserIcon from '../../assets/profile/user-square.svg'
import Smile from '../../assets/profile/smile.svg'
import Map from '../../assets/profile/map.svg'
import Card from '../../assets/profile/card.svg'
import Box from '../../assets/profile/cube.svg'
import Heart from '../../assets/profile/heart.svg'
import Help from '../../assets/profile/help.svg'
import Bell from '../../assets/profile/bell.svg'
import Tag from '../../assets/profile/tag.svg'
import Settings from '../../assets/profile/settings.svg'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import ProfileSection from '../../Components/ProfileSection/ProfileSection'
import Flower from '../../assets/About/flower.svg'
import FlowerShadeHalf from '../../assets/About/flower-shade-half.svg'
import BabiesSection from '../../Components/BabiesSection/BabiesSection'
import AddressSection from '../../Components/AddressSection/AddressSection'
import NotificationsSection from '../../Components/NotificationsSection/NotificationsSection'
import WishlistSection from '../../Components/WishlistSection/WishlistSection'
import NewUserModal from '../../Components/NewUserModal/NewUserModal'
import { useAuth } from '../../contexts/AuthContext'
import HelpSection from '../../Components/HelpSection/HelpSection'
import OrdersSection from '../../Components/OrdersSection/OrdersSection'
import SessionsSection from '../../Components/SessionsSection/SessionsSection'

const Profile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, customer, logout, isNewCustomer, needsProfileCompletion } = useAuth();
    const [activeSection, setActiveSection] = useState("#profile");
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [showNewUserModal, setShowNewUserModal] = useState(false);
    const [customerData, setCustomerData] = useState(customer);

    useEffect(() => {
        const hash = location.hash;
        setActiveSection(hash || "profile");
    }, [location.hash]);

    // Check if profile needs completion and show modal
    useEffect(() => {
        if (isNewCustomer) {
            setShowNewUserModal(true)
        }
    }, [isNewCustomer, customer, user]);

    // Update customer data when customer changes
    useEffect(() => {
        setCustomerData(customer)
    }, [customer]);

    const handleNewUserModalClose = () => {
        // Don't allow closing for new users - they must complete the form
        // Modal will close itself after successful submission
    }

    const handleNewUserModalSuccess = (updatedCustomer) => {
        setCustomerData(updatedCustomer)
        setShowNewUserModal(false)
    }

    // Handle logout
    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

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
                    title : 'Wishlist',
                    icon : Heart,
                    hash : '#wishlist'
                },
                {
                    title : 'Sessions',
                    icon : Tag,
                    hash : '#sessions'
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
                    title : 'Help',
                    icon : Help,
                    hash : '#help'
                }
            ]
        },
    ]

    return (
        <div className="profile-main-container">
            {/* New User Modal */}
            <NewUserModal 
                isOpen={showNewUserModal} 
                onClose={handleNewUserModalClose}
                onSuccess={handleNewUserModalSuccess}
            />
            
            <img src={Flower} alt="" className="flowerone" />
            <img src={Flower} alt="" className="flowertwo" />
            <img src={Flower} alt="" className="flowerthree" />
            <img src={FlowerShadeHalf} alt="" className="flower-shade-one" />
            <div className="container">
                <div className="profile-header-section">
                    <div className="profile-image">
                        {user?.picture ? (
                            <img src={user.picture} alt={customerData?.fullName || user?.name || 'Profile'} />
                        ) : (
                            <img src={ProfileImg} alt="" />
                        )}
                        <span className="active"></span>
                    </div>
                    <p className="profile-name">Hi, <strong>{customerData?.fullName || user?.name || 'there'}</strong> 👋 </p>
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
                                    <div key={index} className='profile-items-con'>
                                        <h1 className="profile-menu-sec-heading">{item.title}</h1>
                                        {
                                            item.items.map((profileItem, itemIndex)=> {
                                                return (
                                                    <button key={itemIndex} className={`profile-menu-item ${activeSection === profileItem.hash ? "active" : ""}`} onClick={() => (window.location.hash = profileItem.hash.replace("#",""))} ><img src={profileItem.icon} alt="" />{profileItem.title}{profileItem.label && <span className='item-label'>{profileItem.label}</span>}</button>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                        <div className="logout-div-con">
                            <button className="logout-btn" onClick={handleLogout} disabled={isLoggingOut}>
                                {isLoggingOut ? <><Loader2 className="logout-spinner" /> Logging out...</> : 'Log Out'}
                            </button>
                        </div>
                        
                    </div>

                    <div className="profile-content-based-on-selection">
                        {activeSection === "#profile" && <ProfileSection />}
                        {activeSection === "#mybabies" && <BabiesSection />}
                        {activeSection === "#address" && <AddressSection />}
                        {activeSection === "#orders" && <OrdersSection />}
                        {activeSection === "#wishlist" && <WishlistSection />}
                        {activeSection === "#sessions" && <SessionsSection />}
                        {activeSection === "#help" && <HelpSection />}
                        {activeSection === "#notifications" && <NotificationsSection userData={customerData} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile