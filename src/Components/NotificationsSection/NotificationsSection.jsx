import React, { useState, useEffect } from 'react'
import './NotificationsSection.css'
import Bell from '../../assets/profile/bell.svg'
import { Mail, MessageCircle, MessageSquare, Loader2 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { updateNotificationSettings } from '../../services/userService'
import { toast } from 'react-toastify'

const NotificationsSection = ({ userData }) => {
    const { user, customer } = useAuth()
    const [isUpdating, setIsUpdating] = useState(false)
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'Email',
            label: 'Email Notifications',
            icon: Mail,
            enabled: false,
            description: 'Get updates via email',
            metafieldKey: 'enable_email_notification'
        },
        {
            id: 2,
            type: 'SMS',
            label: 'SMS',
            icon: MessageSquare,
            enabled: false,
            description: 'Get updates via text message',
            metafieldKey: 'enable_sms_notification'
        },
        {
            id: 3,
            type: 'WhatsApp',
            label: 'WhatsApp',
            icon: MessageCircle,
            enabled: false,
            description: 'Get updates via WhatsApp',
            metafieldKey: 'enable_whatsapp_notification'
        }
    ])

    // Load notification settings from user data
    useEffect(() => {
        if (userData?.metafields?.custom) {
            const metafields = userData.metafields.custom
            
            setNotifications(prev => prev.map(notif => {
                const metafieldData = metafields[notif.metafieldKey]
                return {
                    ...notif,
                    enabled: metafieldData?.value === true || metafieldData?.value === 'true'
                }
            }))
        }
    }, [userData])

    const toggleNotification = async (id) => {
        // Get user ID from userData prop, customer, or user
        const userId = userData?.id || customer?.id || user?.id
        
        if (!userId) {
            toast.error('Please log in to update notification settings')
            return
        }

        const notification = notifications.find(n => n.id === id)
        const newEnabledState = !notification.enabled

        // Optimistically update UI
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, enabled: newEnabledState } : notif
            )
        )

        setIsUpdating(true)

        try {
            // Prepare update payload
            const updatePayload = {}
            
            if (notification.metafieldKey === 'enable_email_notification') {
                updatePayload.enableEmailNotification = newEnabledState
            } else if (notification.metafieldKey === 'enable_sms_notification') {
                updatePayload.enableSmsNotification = newEnabledState
            } else if (notification.metafieldKey === 'enable_whatsapp_notification') {
                updatePayload.enableWhatsappNotification = newEnabledState
            }

            console.log('Updating notification settings for userId:', userId, 'payload:', updatePayload)
            const response = await updateNotificationSettings(userId, updatePayload)

            if (response.success) {
                toast.success(`${notification.label} ${newEnabledState ? 'enabled' : 'disabled'}`)
            } else {
                // Revert on failure
                setNotifications(prev =>
                    prev.map(notif =>
                        notif.id === id ? { ...notif, enabled: !newEnabledState } : notif
                    )
                )
                toast.error(response.message || 'Failed to update notification settings')
            }
        } catch (error) {
            console.error('Error updating notification:', error)
            // Revert on error
            setNotifications(prev =>
                prev.map(notif =>
                    notif.id === id ? { ...notif, enabled: !newEnabledState } : notif
                )
            )
            toast.error('Something went wrong. Please try again.')
        } finally {
            setIsUpdating(false)
        }
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
                                    disabled={isUpdating}
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
