import React, { useState } from 'react'
import './Events.css'
import S1 from '../../assets/s-1.svg'
import S2 from '../../assets/s-2.svg'
import S3 from '../../assets/s-3.svg'
import Default from '../../assets/default.png'
import Heading from '../../Components/Heading/Heading'
import CardWithImage from '../../Components/CardwithImage/CardWithImage'

const Events = () => {
    const [displayedItems, setDisplayedItems] = useState(9);
    const ITEMS_PER_PAGE = 9;

    const headingData = {
        'title': "What’s On",
        'subtitle': "Our Activities & Engagements",
        'description': false
    }
    
    const Items = [
      {
        id: 1,
        image: S1,
        title: "Trusted by Moms Around the World",
        description: ["5th November - 09th November 2025"],
        buttonlabel: "Learn more",
        labelonimage: false,
      },
      {
        id: 2,
        image: S2,
        title: "Baby EXPO - DUBAI 2026",
        description: ["5th August - 09th August 2026"],
        buttonlabel: "Book your slot",
        labelonimage: false,
      },
      {
        id: 3,
        image: S3,
        title: "Mother’s Day Greetings!",
        description: ["Saturday March 21st, 2026"],
        buttonlabel: "Join Us",
        labelonimage: false,
      },
      {
        id: 4,
        image: Default,
        title: "Baby EXPO - DUBAI 2026",
        description: ["5th August - 09th August 2026"],
        buttonlabel: "Book your slot",
        labelonimage: false,
      },
      {
        id: 5,
        image: S1,
        title: "Trusted by Moms Around the World",
        description: ["5th November - 09th November 2025"],
        buttonlabel: "Learn more",
        labelonimage: false,
      },
      {
        id: 6,
        image: S2,
        title: "Mother’s Day Greetings!",
        description: ["Saturday March 21st, 2026"],
        buttonlabel: "Join Us",
        labelonimage: false,
      },
      {
        id: 7,
        image: S3,
        title: "Mother’s Day Greetings!",
        description: ["Saturday March 21st, 2026"],
        buttonlabel: "Join Us",
        labelonimage: false,
      },
      {
        id: 8,
        image: Default,
        title: "Trusted by Moms Around the World",
        description: ["5th November - 09th November 2025"],
        buttonlabel: "Learn more",
        labelonimage: false,
      },
      {
        id: 9,
        image: S1,
        title: "Baby EXPO - DUBAI 2026",
        description: ["5th August - 09th August 2026"],
        buttonlabel: "Book your slot",
        labelonimage: false,
      },
      {
        id: 10,
        image: S1,
        title: "Trusted by Moms Around the World",
        description: ["5th November - 09th November 2025"],
        buttonlabel: "Learn more",
        labelonimage: false,
      },
      {
        id: 11,
        image: S2,
        title: "Baby EXPO - DUBAI 2026",
        description: ["5th August - 09th August 2026"],
        buttonlabel: "Book your slot",
        labelonimage: false,
      },
      {
        id: 12,
        image: S3,
        title: "Mother’s Day Greetings!",
        description: ["Saturday March 21st, 2026"],
        buttonlabel: "Join Us",
        labelonimage: false,
      },
      {
        id: 13,
        image: Default,
        title: "Baby EXPO - DUBAI 2026",
        description: ["5th August - 09th August 2026"],
        buttonlabel: "Book your slot",
        labelonimage: false,
      },
      {
        id: 14,
        image: S1,
        title: "Trusted by Moms Around the World",
        description: ["5th November - 09th November 2025"],
        buttonlabel: "Learn more",
        labelonimage: false,
      },
      {
        id: 15,
        image: S2,
        title: "Mother’s Day Greetings!",
        description: ["Saturday March 21st, 2026"],
        buttonlabel: "Join Us",
        labelonimage: false,
      },
      {
        id: 16,
        image: S3,
        title: "Mother’s Day Greetings!",
        description: ["Saturday March 21st, 2026"],
        buttonlabel: "Join Us",
        labelonimage: false,
      },
      {
        id: 17,
        image: Default,
        title: "Trusted by Moms Around the World",
        description: ["5th November - 09th November 2025"],
        buttonlabel: "Learn more",
        labelonimage: false,
      },
      {
        id: 18,
        image: S1,
        title: "Baby EXPO - DUBAI 2026",
        description: ["5th August - 09th August 2026"],
        buttonlabel: "Book your slot",
        labelonimage: false,
      },
    ];

    const visibleItems = Items.slice(0, displayedItems);
    const hasMore = displayedItems < Items.length;

    const handleLoadMore = () => {
        setDisplayedItems(prev => Math.min(prev + ITEMS_PER_PAGE, Items.length));
    };

    return (
        <div className='container' style={{marginBottom: '154px', marginTop: '90px'}}>
        <Heading data={headingData}/>
        <div className="filters-section">
            <button className='filter-button active'>Latest</button>
            <button className='filter-button'>2024</button>
            <button className='filter-button'>2023</button>
        </div>
        <div className="activities-home-container">
            {
            visibleItems.map((item,index)=> {
                return (
                <CardWithImage key={index} item={item} />
                )
            })
            }
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
            <p className='progress-bar-text'>You've seen {visibleItems.length} out of {Items.length} activities</p>
            <div className="progress-bar-con">
                <span style={{ width: `${(visibleItems.length / Items.length) * 100}%` }}></span>
            </div>
            {hasMore && (
                <button className='button-label' onClick={handleLoadMore}>Load more</button>
            )}
        </div>
        </div>
    )
}

export default Events