import React from 'react'
import ErrorComponent from '../../Components/ErrorComponent/ErrorComponent'
import NotFoundImage from '../../assets/not-found.svg'

const NotFound = () => {
  return (
    <ErrorComponent data={
        {
            "title": "We can’t find that page",
            "subtitle": "The link may be broken, or the page may have been moved.",
            "image": NotFoundImage,
            "buttons": [
                {
                    label: "Go to HOME",
                    className: "button-pink-center",
                    link:'/'
                },
                {
                    label: "SHOP",
                    className: "button-pink-border",
                    link:'/shop'
                },
                {
                    label: "Contact Support",
                    className: "button-pink-border",
                    link:'/contact'
                },
            ]
        }
    } />
  )
}

export default NotFound