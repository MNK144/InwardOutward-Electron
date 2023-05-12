import React from 'react';
import "./Button.css";

const Button = (props) => {
 const classes = 'Button ' + props.className;
  return (
    <button {...props} className={classes}>
        {props.children}
    </button>
  )
}

export default Button