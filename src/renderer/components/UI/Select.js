import React from 'react';
import "./Input.css";

const Select = React.forwardRef((props,ref) => {
  return (
    <select className='Input' ref={ref} {...props}>
        {props.children}
    </select>
  );
});

export default Select;