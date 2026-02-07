import React from 'react'
import './ImageCard.css'
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ImageCard = (props) => {
    const data = props.data;
    const navigate = useNavigate();
  return (
    <div className={`image-card fade-up-animation-delay-${data.id}`} style={{backgroundImage: `url(${data.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="image-content-container">
            <p className="label-con">{data.label}</p>
            <h1 className="title">{data.title}</h1>
            <h2 className={`subtitle ${data.class}`}>{data.subtitle}</h2>
            <button className="button-pink-bg" onClick={()=>navigate(data.link)}>{data.buttonlabel} <ArrowRight className='icon' /> </button>
        </div>
    </div>
  )
}

export default ImageCard
