import React from "react";
import Modal from "../../Misc/Modal";
import "./ProductDetails.css";
import { AiOutlineClose } from "react-icons/ai";
import ProductTable from "./ProductTable";

const ProductDetails = (props) => {
  return (
    <Modal className="ProductDetails_Modal" onClose={props.onClose}>
      <AiOutlineClose
        style={{
          cursor: "pointer",
          position: "absolute",
          right: "2%",
          strokeWidth: "50px",
          width: "15px",
          height: "15px",
        }}
        onClick={props.onClose}
      />
      <div className="ProductDetails">
        <h2>Product Details</h2>
        <div className="ProductDetails_tableDiv">
            <ProductTable productData={props.productData}/>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetails;
