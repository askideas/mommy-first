import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'
import './MomsReviewsSlider.css'

const MomsReviewsSlider = () => {
    const reviews = [
    {
      "id": 1,
      "rating": 5,
      "review": "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
      "author": {
        "name": "Jessica",
        "tag": "first-time mom",
        "avatar": "/images/users/jessica.png"
      }
    },
    {
      "id": 2,
      "rating": 5,
      "review": "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as I got home and it was so much less scary.",
      "author": {
        "name": "Maria",
        "tag": "vaginal birth",
        "avatar": "/images/users/maria.png"
      }
    },
    {
      "id": 3,
      "rating": 5,
      "review": "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads.",
      "author": {
        "name": "Jessica",
        "tag": "first-time mom",
        "avatar": "/images/users/jessica.png"
      }
    },
    {
      "id": 4,
      "rating": 5,
      "review": "The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
      "author": {
        "name": "Jessica",
        "tag": "first-time mom",
        "avatar": "/images/users/jessica.png"
      }
    },
    {
      "id": 5,
      "rating": 5,
      "review": "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as I got home and going to the bathroom felt so much less scary.",
      "author": {
        "name": "Maria",
        "tag": "vaginal birth",
        "avatar": "/images/users/maria.png"
      }
    }
  ]

  return (
    <>
        <div className="container">
            <div className="momsreview-section-heading">
                <div className="head-ing">
                    <h1>What real moms are saying.</h1>
                    <h2>Postpartum is hard enough. The right support makes a bigger difference than anyone tells you.</h2>
                </div>
                <div className="slider-navigation">
                    <button><ArrowLeft /></button>
                    <button><ArrowRight /></button>
                </div>
            </div>
        </div>

        <div className="container">
            <div className="moms-review-slider">
                
            </div>
        </div>
    </>
    
  )
}

export default MomsReviewsSlider