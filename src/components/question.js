import React from 'react'
import Slider from './slider'

const Question = (props) =>{
    return(
        <div>
            {props.children}
            <Slider 
                value = {props.value} 
                handleChange = {props.handleChange} 
                num = {props.num}
                message = {props.message}
                >
            </Slider>
        </div>
    )
}

export default Question
