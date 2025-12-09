import React from 'react'
import './MomsHub.css'
import Heading from '../Heading/Heading'
import CardWithImage from '../CardwithImage/CardWithImage'
import S1 from '../../assets/s-1.svg'
import S2 from '../../assets/s-2.svg'
import S3 from '../../assets/s-3.svg'

const MomsHub = () => {
  const headingData = {
    'title': "Moms Hub",
    'subtitle': "Together with Moms",
    'description': false
  }

  const Items = [
    {
      'image': S1,
      'title': 'MF Cooling Pad ❄️❄️❄️ is so special?',
      'description': [
        'Our cooling pad is designed to be super absorbent while also providing soothing relief to the perineal area. It effectively reduces swelling, inflammation, and soreness instantly.',
      ],
      'buttonlabel': 'Read Article',
      'labelonimage': 'Posted: Today, 4th November, 2025'
    },
    {
      'image': S2,
      'title': 'Cooling sensation!',
      'description': [
        'Finally, apply the perineal care foam on top of the liner.',
        'The witch hazel foam spray provides a cooling sensation, relieving irritation and discomfort in the perineal area.'
      ],
      'buttonlabel': 'Read Article',
      'labelonimage': 'Posted: Today, 4th November, 2025'
    },
    {
      'image': S3,
      'title': 'They absolutely love it ❤️',
      'description': [
        'Our cooling pad is designed to be super absorbent while also providing soothing relief to the perineal area. It effectively reduces swelling, inflammation, and soreness instantly.'
      ],
      'buttonlabel': 'Read Article',
      'labelonimage': 'Posted: Today, 4th November, 2025'
    }
  ]

  return (
    <div className="container">
      <div className="mommy-hub-container">
        <Heading data={headingData}/>
        <div className="moms-hub-items-con">
          {
            Items.map((item,index)=> {
              return (
                <CardWithImage key={index} item={item} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default MomsHub