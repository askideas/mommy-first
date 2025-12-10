import React from 'react'
import './ImageCardContainer.css'
import ImageCard from '../ImageCard/ImageCard'
import Cat1 from '../../assets/shopbycategory/cat1.svg'
import Cat2 from '../../assets/shopbycategory/cat2.svg'
import Cat3 from '../../assets/shopbycategory/cat3.svg'

const ImageCardContainer = () => {
    const Items = [
        {
            'image': Cat1,
            'label': 'Shop by Category',
            'title': 'Pregnancy',
            'subtitle': 'Stay prepared + bump chic',
            'buttonlabel': 'Shop',
            'class': 'one'
        },
        {
            'image': Cat2,
            'label': 'Shop by Category',
            'title': 'Postpartum',
            'subtitle': 'Bounce back with ease',
            'buttonlabel': 'Shop',
            'class': 'two'
        },
        {
            'image': Cat3,
            'label': 'Shop by Category',
            'title': 'New & Noteworthy',
            'subtitle': 'Fresh finds, just for moms',
            'buttonlabel': 'Shop',
            'class': 'three'
        }
    ]
  return (
    <div className="container">
        <div className="image-card-container">
            {
                Items.map((item, index)=> {
                    return (
                        <ImageCard key={index} data={item} />
                    )
                })
            }
        </div>
    </div>
  )
}

export default ImageCardContainer