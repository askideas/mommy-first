import React from 'react'
import './Heading.css'

const Heading = (props) => {
  return (
    <div className="container">
        <div className="heading-container">
            <h2>{props && props.data && props.data.title ? props.data.title: ''}</h2>
            <h1>{props && props.data && props.data.subtitle ? props.data.subtitle : ''}</h1>
            {
              props && props.data && props.data.description && props.data.description.map((item, index)=> {
                return(
                  <p className='description'>{item}</p>
                )
              })
            }
        </div>
    </div>
  )
}

export default Heading