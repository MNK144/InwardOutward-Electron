import React from 'react'
import "./TitleBar.css";

const TitleBar = (props) => {
  return (
    <div className='TitleBar'>
        <h2>{props.title}</h2>
    </div>
  )
}

export default TitleBar