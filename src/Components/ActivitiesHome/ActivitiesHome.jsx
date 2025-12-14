import React from 'react'
import './ActivitiesHome.css'
import Heading from '../Heading/Heading'
import S1 from '../../assets/s-1.svg'
import S2 from '../../assets/s-2.svg'
import S3 from '../../assets/s-3.svg'
import CardWithImage from '../CardwithImage/CardWithImage'

const ActivitiesHome = () => {
  const headingData = {
    'title': "What’s On",
    'subtitle': "Our Activities & Engagements",
    'description': false
  }

  const Items = [
      {
        'image': S1,
        'title': 'Trusted by Moms Around the World',
        'description': [
          '5th November - 09th November 2025',
        ],
        'buttonlabel': 'Learn more',
        'labelonimage': false
      },
      {
        'image': S2,
        'title': 'Baby EXPO - DUBAI 2026',
        'description': [
          '5th August - 09th August 2026'
        ],
        'buttonlabel': 'Book your slot',
        'labelonimage': false
      },
      {
        'image': S3,
        'title': 'Mother’s Day Greetings!',
        'description': [
          'Saturday March 21st, 2026'
        ],
        'buttonlabel': 'Join Us',
        'labelonimage': false
      }
    ]

  return (
    <div className='container' style={{marginBottom: '154px'}}>
      <Heading data={headingData}/>
      <div className="filters-section">
        <button className='filter-button active'>Latest</button>
        <button className='filter-button'>2024</button>
        <button className='filter-button'>2023</button>
      </div>
      <div className="activities-home-container">
        {
          Items.map((item,index)=> {
            return (
              <CardWithImage key={index} item={item} />
            )
          })
        }
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
          <p className='progress-bar-text'>You’ve seen 3 out of 12 activities</p>
          <div className="progress-bar-con">
              <span></span>
          </div>
          <button className='button-label'>View all</button>
      </div>
    </div>
    
  )
}

export default ActivitiesHome