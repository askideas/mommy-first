import React from 'react'
import './Profile.css'
import ProfileImg from '../../assets/profile/pf-def.png'
import { Info } from 'lucide-react'

const Profile = () => {
  return (
    <div className="profile-main-container">
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
    </div>
  )
}

export default Profile