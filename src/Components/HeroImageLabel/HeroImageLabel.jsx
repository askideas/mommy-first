import React from 'react'
import './HeroImageLabel.css'

const HeroImageLabel = (props) => {
    const { data, isLoading } = props;

    if (isLoading) {
        return (
            <div className="container">
                <div className="hero-image-label-container hero-image-label-skeleton">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-text"></div>
                </div>
            </div>
        )
    }

    if (!data) return null;

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