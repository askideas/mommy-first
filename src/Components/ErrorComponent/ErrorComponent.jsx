import React from 'react'
import './ErrorComponent.css'
import { useNavigate } from 'react-router-dom';

const ErrorComponent = (props) => {
    const data = props.data;
    const navigate = useNavigate();
    return (
        <div className="error-component-container">
            <img src={data.image} alt="" />
            <h1>{data.title}</h1>
            <h2>{data.subtitle}</h2>
            <div className="buttons-container">
                {
                    data.buttons.map((button, index)=> {
                        return (
                            <button className={button.className} onClick={()=>navigate(button.link)}>{button.label}</button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ErrorComponent