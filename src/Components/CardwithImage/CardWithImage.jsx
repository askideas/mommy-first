import React from 'react'
import './CardWithImage.css'

const CardWithImage = (props) => {
    const item = props.item;
  return (
    <div className="card-with-image-con">
        <span className={`label ${item && item.labelonimage ? '' : 'd-none'}`}>{item.labelonimage}</span>
        <img src={item.image} alt="" />
        <div className="content-con">
            <h1>{item.title}</h1>
            {
                item.description.map((desc,index)=> {
                    return (
                        <p key={index}>{desc}</p>
                    )
                })
            }
            <button className='button-label'>{item.buttonlabel}</button>
        </div>
        
    </div>
  )
}

export default CardWithImage