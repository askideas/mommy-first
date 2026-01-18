import React from 'react'
import './Heading.css'

const Heading = (props) => {
  return (
    <div className="container">
        <div className="heading-container">
            <h2>{props && props.data && props.data.title ? props.data.title: ''}</h2>
            <h1>{props && props.data && props.data.subtitle ? props.data.subtitle : ''}</h1>
            {
              props && props.data && props.data.description && (
                Array.isArray(props.data.description)
                ? props.data.description.map((item, index) => (
                  <p key={index} className='description' dangerouslySetInnerHTML={{ __html: item }}></p>
                ))
                : <p className='description' dangerouslySetInnerHTML={{ __html: props.data.description }}>{props.data.description}</p>
              )
            }
        </div>
    </div>
  )
}

export default Heading