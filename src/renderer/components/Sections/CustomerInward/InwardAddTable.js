import React, { useState } from "react";
import "./InwardAddTable.css";
import DataTable from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { useEffect } from "react";

const DUMMY_DATA = [
  {
    id: 1,
    products: "HP Laptop",
    serialno: "HP0B58",
    problem: "Display Not Working ",
    remarks: "Check for Socket",
  },
  {
    id: 2,
    products: "Dell Laptop",
    serialno: "DL1204",
    problem: "Keyboard Not Working",
    remarks: "Spilled Water on Keyboard",
  },
  {
    id: 3,
    products: "Asus Laptop",
    serialno: "AS0012",
    problem: "Touchpad Not Working",
    remarks: "Change touchpad",
  },
];

const customStyles = {
  headRow: {
    style: {
      fontWeight: 900,
      fontSize: "14px",
      color: "#ffffff",
      background: "#2980b9",
    },
  },
};

const InwardAddTable = ({productData,handleDelete}) => {
  const [isNoData, setIsNoData] = useState(false);
  // const handleEdit = (id) => {};
  // const handleDelete = (id) => {};

  useEffect(()=>{
    console.log('.');
    if(productData.length) setIsNoData(false);
    else setIsNoData(true);
  },[productData])

  const columns = [
    {
      name: "Products",
      maxWidth: "200px",
      cell: (row) => {
        return (
            <div className="inwardAdd_cell_override">{row.products}</div>
        )
      }
    },
    {
      name: "Serial No",
      maxWidth: "150px",
      cell: (row) => {
        return (
            <div className="inwardAdd_cell_override">{row.serialNo}</div>
        )
      }
    },
    {
      name: "Problem",
      cell: (row) => {
        return (
            <div className="inwardAdd_cell_override">{row.problem}</div>
        )
      }
    },
    {
      name: "Remarks",
      cell: (row) => {
        return (
            <div className="inwardAdd_cell_override">{row.remarks}</div>
        )
      }
    },
    {
      name: "Actions",
      center: true,
      maxWidth: "110px",
      cell: (row) => {
        return (
          <div className="inwardAdd_cell_actions">
            <RiDeleteBinLine
              style={{ cursor: "pointer", color: "#ee4744" }}
              onClick={handleDelete.bind(null, row.id)}
            />
          </div>
        );
      },
    },
  ];

  const emptyTableRender = (
    <div className="inwardAdd_table_empty">
      <h3>No Products Added yet</h3>
    </div>
  );
  return (
    <div className="InwardAddTable">
      {isNoData && emptyTableRender}
      {!isNoData && (
        <DataTable
          columns={columns}
          data={productData}
          customStyles={customStyles}
        />
      )}
    </div>
  );
};

export default InwardAddTable;
