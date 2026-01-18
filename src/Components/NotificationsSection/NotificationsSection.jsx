import React, { useState } from 'react'
import './NotificationsSection.css'
import Bell from '../../assets/profile/bell.svg'
import { Mail, MessageCircle, MessageSquare } from 'lucide-react'

const NotificationsSection = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'Email',
            label: 'Email Notifications',
            icon: Mail,
            enabled: true,
            description: 'Get updates via email'
        },
        {
            id: 2,
            type: 'SMS',
            label: 'SMS',
            icon: MessageSquare,
            enabled: false,
            description: 'Get updates via text message'
        },
        {
            id: 3,
            type: 'WhatsApp',
            label: 'WhatsApp',
            icon: MessageCircle,
            enabled: false,
            description: 'Get updates via WhatsApp'
        },
        {
            id: 4,
            type: 'WhatsApp Business',
            label: 'WhatsApp',
            icon: MessageCircle,
            enabled: false,
            description: 'Get updates via WhatsApp Business'
        }
    ])

    const toggleNotification = (id) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
        ))
    }

    return (
        <div className="notifications-section-container">
            <div className="notifications-section-header">
                <p className='notifications-heading'>
                    <img src={Bell} alt="Notifications" />
                    <span>Notifications</span>
                </p>
            </div>

            <div className="notifications-section-body">
                <div className="notifications-list">
                    {notifications.map((notif) => (
                        <div className="notification-item" key={notif.id}>
                            <div className="notification-content">
                                <div className="notification-icon-box">
                                    <notif.icon size={20} />
                                </div>
                                <div className="notification-text">
                                    <p className="notification-label">{notif.label}</p>
                                </div>
                            </div>
                            <div className="notification-toggle-wrapper">
                                <input 
                                    type="checkbox" 
                                    id={`toggle-${notif.id}`}
                                    className="notification-toggle"
                                    checked={notif.enabled}
                                    onChange={() => toggleNotification(notif.id)}
                                />
                                <label htmlFor={`toggle-${notif.id}`} className="toggle-slider"></label>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="notifications-info-box">
                    <p className="info-text">
                        Opting out kills promotional messages, but you'll still receive important service updates
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NotificationsSection
