import React from "react";
import ReactDom from "react-dom";
import "./Modal.css";

const Modal = ({ children, onClose, className }) => {
  return ReactDom.createPortal(
    <>
      <div className="Backdrop" onClick={onClose}></div>
      <div className={"Modal " + className}>{children}</div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;