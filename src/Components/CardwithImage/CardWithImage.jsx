import React from 'react'
import './CardWithImage.css'
import { useNavigate } from 'react-router-dom';

const CardWithImage = (props) => {
    const item = props.item;
    const navigate = useNavigate();
  return (
    <div className={`card-with-image-con`} >
        <span className={`label ${item && item.labelonimage ? '' : 'd-none'}`}>{item.labelonimage}</span>
        <img src={item.image} alt="" onClick={()=>navigate(item.link ? item.link : '#')} />
        <div className="content-con">
            <h1>{item.title}</h1>
            {
                item.description.map((desc,index)=> {
                    return (
                        <p key={index}>{desc}</p>
                    )
                })
            }
            <button className='button-label' onClick={()=>navigate(item.link ? item.link : '#')}>{item.buttonlabel}</button>
        </div>
        
    </div>
  )
}

export default CardWithImage