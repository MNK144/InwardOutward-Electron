import React from "react";
import "./TableItem.css";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const TableItem = ({ item, handleEdit, handleDelete }) => {
  return (
    <div className="cst_row TableItem">
      <div className="cst_cell">{item.id}</div>
      <div className="cst_cell">{item.name}</div>
      <div className="cst_cell">{item.address}</div>
      <div className="cst_cell">{item.phone}</div>
      <div className="cst_cell">{item.email}</div>
      <div className="cst_cell_actions">
        <FiEdit
          style={{ cursor: "pointer", color: "#2980b9" }}
          onClick={handleEdit.bind(null, item.id)}
        />
        <RiDeleteBinLine
          style={{ cursor: "pointer", color: "#ee4744" }}
          onClick={handleDelete.bind(null, item.id)}
        />
      </div>
      {/* <div className="cst_cell"><span className="tableitem_btn">Edit</span></div>
      <div className="cst_cell"><span className="tableitem_btn">Delete</span></div> */}
    </div>
  );
};

export default TableItem;
