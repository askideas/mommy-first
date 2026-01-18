import React from 'react'
import './ImageCardContainer.css'
import ImageCard from '../ImageCard/ImageCard'
import Cat1 from '../../assets/shopbycategory/cat1.svg'
import Cat2 from '../../assets/shopbycategory/cat2.svg'
import Cat3 from '../../assets/shopbycategory/cat3.svg'

const ImageCardContainer = (props) => {
    const data = props.data;
    const Items = [
        {
            'id': 1,
            'image': data && data.category1 ? data.category1.image : Cat1,
            'label': data && data.category1 ? data.category1.label : 'Shop by Category',
            'title': data && data.category1 ? data.category1.heading :'Pregnancy',
            'subtitle': data && data.category1 ? data.category1.subheading : 'Stay prepared + bump chic',
            'buttonlabel': data && data.category1 ? data.category1.buttonLabel : 'Shop',
            'class': 'one'
        },
        {
            'id': 2,
            'image': data && data.category2 ? data.category2.image : Cat2,
            'label': data && data.category2 ? data.category2.label : 'Shop by Category',
            'title': data && data.category2 ? data.category2.heading : 'Postpartum',
            'subtitle': data && data.category2 ? data.category2.subheading : 'Bounce back with ease',
            'buttonlabel': data && data.category2 ? data.category2.buttonLabel :'Shop',
            'class': 'two'
        },
        {
            'id': 3,
            'image': data && data.category3 ? data.category3.image : Cat3,
            'label': data && data.category3 ? data.category3.label : 'Shop by Category',
            'title': data && data.category3 ? data.category3.heading : 'New & Noteworthy',
            'subtitle': data && data.category3 ? data.category3.subheading : 'Fresh finds, just for moms',
            'buttonlabel': data && data.category3 ? data.category3.buttonLabel : 'Shop',
            'class': 'three'
        }
    ]
    console.log(props.data);
    
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