import React from 'react'
import './HeroImageLabel.css'

const HeroImageLabel = (props) => {
    const data = props.data;
  return (
    <div className="container">
        <div className="hero-image-label-container" style={{height: data.height}}>
            <img src={data.image} alt="" />
            <p style={{maxWidth: data.pwidth}} >{data.text}</p>
        </div>
    </div>
  )
}

export default HeroImageLabel