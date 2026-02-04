import React from 'react'
import './CardWithImage.css'
import { useNavigate } from 'react-router-dom';

const CardWithImage = (props) => {
    const item = props.item;
    const navigate = useNavigate();

    // Default placeholder image
    const defaultImage = 'https://via.placeholder.com/400x300/FD8CBB/FFFFFF?text=Mommy+First'

    // Helper function to get metafield value
    const getMetafieldValue = (key) => {
        const metafield = item.metafields?.find(m => m.key === key)
        return metafield?.value || null
    }

    // Handle both API data and hardcoded data formats
    const imageUrl = item.image?.url || item.image || defaultImage
    const title = item.title || ''
    const labelOnImage = item.labelonimage || getMetafieldValue('label_on_image')
    const buttonLabel = item.buttonlabel || getMetafieldValue('button_label') || 'Learn more'
    
    // Handle description - could be array or excerpt from API
    let descriptions = []
    if (item.description && Array.isArray(item.description)) {
        descriptions = item.description
    } else if (item.excerpt) {
        descriptions = [item.excerpt]
    } else {
        // Format date if available from API
        const dateTime = getMetafieldValue('live_session_date_and_time')
        if (dateTime) {
            const formattedDate = new Date(dateTime).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            })
            descriptions = [formattedDate]
        } else if (item.publishedAt) {
            const formattedDate = new Date(item.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            })
            descriptions = [formattedDate]
        }
    }

    // Handle navigation - use handle for API data or link for hardcoded data
    const link = item.link || `/events/${item.handle || item.id}`

    const handleClick = () => {
        navigate(link)
    }

  return (
    <div className={`card-with-image-con`} >
        <span className={`label ${labelOnImage ? '' : 'd-none'}`}>{labelOnImage}</span>
        <img src={imageUrl} alt={title} onClick={handleClick} />
        <div className="content-con">
            <h1>{title}</h1>
            {
                descriptions.map((desc, index) => {
                    return (
                        <p key={index}>{desc}</p>
                    )
                })
            }
            <button className='button-label' onClick={handleClick}>{buttonLabel}</button>
        </div>
        
    </div>
  )
}

export default CardWithImage