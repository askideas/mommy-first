import React from 'react'
import './HeroImageLabel.css'

const HeroImageLabel = (props) => {
    const data = props.data;
  return (
    <div className="container">
        <div className="hero-image-label-container" style={{height: data.he}}>
            <img src={data.image} alt="" />
            <p style={{width: data.pwidth}} >{data.text}</p>
        </div>
    </div>
  )
}

export default HeroImageLabel