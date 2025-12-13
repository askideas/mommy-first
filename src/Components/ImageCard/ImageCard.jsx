import React from 'react'
import './ImageCard.css'
import { ArrowRight } from 'lucide-react';

const ImageCard = (props) => {
    const data = props.data;
  return (
    <div className={`image-card fade-up-animation-delay-${data.id}`} style={{backgroundImage: `url(${data.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="image-content-container">
            <p className="label-con">{data.label}</p>
            <h1 className="title">{data.title}</h1>
            <h2 className={`subtitle ${data.class}`}>{data.subtitle}</h2>
            <button className="button-pink-bg">{data.buttonlabel} <ArrowRight className='icon' /> </button>
        </div>
    </div>
  )
}

export default ImageCard
