import React from 'react';
import "./Input.css";

const Input = React.forwardRef((props,ref) => {
  return (
    <input className='Input' ref={ref} {...props}/>
  );
});

export default Input;