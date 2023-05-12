import React from 'react';
import "./Input.css";

const TextArea = React.forwardRef((props,ref) => {
  return (
    <textarea className='Input' ref={ref} {...props}/>
  );
});

export default TextArea;