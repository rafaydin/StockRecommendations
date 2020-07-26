
import React from 'react'
import styled from 'styled-components'

//CSS styling for slider and value
const Styles = styled.div`
  align-items: center;
  color: #A22112;
  margin-top: 2rem;
  margin-bottom: 2rem;

  .value{
      font-size: 1.75rem;
  }

  .slider{
      flex: 1;
      width: 15%;
      height: 15px;
      border-radius: 5px;
      background: #efefef;
      outline: none;

      &::-webkit-slider-thumb{
        -webkit-appearance: none;
        border: none;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: goldenrod;
        margin-top: -4px;
      }

      &::-webkit-slider-runnable-track {
        width: 300px;
        height: 5px;
        background: #ddd;
        border: none;
        border-radius: 3px;
    }

  }

`
// defines slider, value and message
const Slider = (props) => {
    return (
      <Styles>
        <input type="range" min={1} max={5} value={props.value} className="slider" onChange={props.handleChange} />
         <div className="value">{props.value} - {props.message}</div>
      </Styles>
    )
}


export default Slider