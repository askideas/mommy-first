import React from 'react'
import './AllStories.css'

const AllStories = () => {
    const Stories = [
    {
        id: 1,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.|The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 2,
        rating: 5,
        reviewText:
        "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
    },
    {
        id: 3,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.|No one told me how much I'd bleed or how sore I'd be.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 4,
        rating: 5,
        reviewText:
        "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
    },
    {
        id: 5,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.|The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 6,
        rating: 5,
        reviewText:
        "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
    },
    {
        id: 7,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 8,
        rating: 5,
        reviewText:
        "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
    },
    {
        id: 9,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 10,
        rating: 5,
        reviewText:
        "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
    },
    {
        id: 11,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 12,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 1,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.|The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 2,
        rating: 5,
        reviewText:
        "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
    },
    {
        id: 3,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.|No one told me how much I'd bleed or how sore I'd be.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 4,
        rating: 5,
        reviewText:
        "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
    },
    {
        id: 5,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.|The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 6,
        rating: 5,
        reviewText:
        "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
    },
    {
        id: 7,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 8,
        rating: 5,
        reviewText:
        "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
    },
    {
        id: 9,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 10,
        rating: 5,
        reviewText:
        "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
    },
    {
        id: 11,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 12,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 1,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.|The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 2,
        rating: 5,
        reviewText:
        "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
    },
    {
        id: 3,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.|No one told me how much I'd bleed or how sore I'd be.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 4,
        rating: 5,
        reviewText:
        "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
    },
    {
        id: 5,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.|The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 6,
        rating: 5,
        reviewText:
        "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
    },
    {
        id: 7,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 8,
        rating: 5,
        reviewText:
        "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
    },
    {
        id: 9,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 10,
        rating: 5,
        reviewText:
        "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
    },
    {
        id: 11,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    {
        id: 12,
        rating: 5,
        reviewText:
        "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
    },
    ];

  return (
    <div className="container">
        <div className="all-stories-container">
            <div className="filters-section my-4">
                <button className='filter-button filter-pad active'>ALL </button>
                <button className='filter-button filter-pad'>Recent</button>
                <button className='filter-button filter-pad'>2025</button>
            </div>

            <div className="reviews-list">
                
            </div>
        </div>
    </div>
  )
}

export default AllStories