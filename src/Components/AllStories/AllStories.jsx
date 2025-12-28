import React, { useState } from 'react'
import './AllStories.css'
import Star from '../../assets/Reviews/star.svg'
import M1 from '../../assets/Reviews/m1.svg'

const AllStories = () => {
    const [displayedItems, setDisplayedItems] = useState(12);
    const ITEMS_PER_PAGE = 12;

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
        id: 13,
        rating: 5,
        reviewText:
          "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.|The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
      },
      {
        id: 14,
        rating: 5,
        reviewText:
          "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
      },
      {
        id: 15,
        rating: 5,
        reviewText:
          "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.|No one told me how much I'd bleed or how sore I'd be.",
        reviewer: "Jessica",
        tag: "first-time mom",
      },
      {
        id: 16,
        rating: 5,
        reviewText:
          "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
      },
      {
        id: 17,
        rating: 5,
        reviewText:
          "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
      },
      {
        id: 18,
        rating: 5,
        reviewText:
          "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
      },
      {
        id: 19,
        rating: 5,
        reviewText:
          "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
      },
      {
        id: 20,
        rating: 5,
        reviewText:
          "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
      },
      {
        id: 21,
        rating: 5,
        reviewText:
          "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
      },
      {
        id: 22,
        rating: 5,
        reviewText:
          "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
      },
      {
        id: 23,
        rating: 5,
        reviewText:
          "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
      },
      {
        id: 24,
        rating: 5,
        reviewText:
          "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
      },
      {
        id: 25,
        rating: 5,
        reviewText:
          "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
      },
      {
        id: 26,
        rating: 5,
        reviewText:
          "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
      },
      {
        id: 27,
        rating: 5,
        reviewText:
          "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
      },
      {
        id: 28,
        rating: 5,
        reviewText:
          "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
      },
      {
        id: 29,
        rating: 5,
        reviewText:
          "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
      },
      {
        id: 30,
        rating: 5,
        reviewText:
          "The cooling pads + witch hazel were a lifesaver. I used the First Week System as soon as felt so much less scary.",
        reviewer: "Maria",
        tag: "vaginal birth",
      },
      {
        id: 31,
        rating: 5,
        reviewText:
          "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
      },
      {
        id: 32,
        rating: 5,
        reviewText:
          "No one told me how much I'd bleed or how sore I'd be. The 2 Week Set meant I didn't have to send my partner out at midnight for more pads. Everything was already waiting for me at home.",
        reviewer: "Jessica",
        tag: "first-time mom",
      },
    ];

    const visibleStories = Stories.slice(0, displayedItems);
    const hasMore = displayedItems < Stories.length;

    const handleLoadMore = () => {
        setDisplayedItems(prev => Math.min(prev + ITEMS_PER_PAGE, Stories.length));
    };

  return (
    <div className="container">
        <div className="all-stories-container">
            <div className="filters-section my-5">
                <button className='filter-button filter-pad active'>ALL </button>
                <button className='filter-button filter-pad'>Recent</button>
                <button className='filter-button filter-pad'>2025</button>
            </div>

            <div className="reviews-list">
                {visibleStories.map((story, index) => {
                    const paragraphs = story.reviewText.split('|');
                    return (
                        <div key={`${story.id}-${index}`} className="review-card">
                            <div className="review-stars">
                                {[...Array(story.rating)].map((_, i) => (
                                    <img key={i} src={Star} alt="star" className="star-icon" />
                                ))}
                            </div>
                            <div className="review-text">
                                {paragraphs.map((para, pIndex) => (
                                    <p key={pIndex}>{para}</p>
                                ))}
                            </div>
                            <div className="review-author">
                                <img src={M1} alt={story.reviewer} className="author-avatar" />
                                <span className="author-name">{story.reviewer}, {story.tag}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center">
                <p className='progress-bar-text'>You've seen {visibleStories.length} out of {Stories.length} Stories</p>
                <div className="progress-bar-con">
                    <span style={{ width: `${(visibleStories.length / Stories.length) * 100}%` }}></span>
                </div>
                {hasMore && (
                    <button className='button-label' onClick={handleLoadMore}>Load more</button>
                )}
            </div>
        </div>
    </div>
  )
}

export default AllStories