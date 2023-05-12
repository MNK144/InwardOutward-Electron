import React from 'react';
import "./Card.css";

const Card = (props) => {
  return (
    <div className='uiCard'>{props.children}</div>
  );
}

export default Card;