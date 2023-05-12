import React, { useState } from "react";
import "./OutwardProductTable.css";
import DataTable from "react-data-table-component";
import { useEffect } from "react";

const DUMMY_DATA = [
  {
    id: 1,
    products: "HP Laptop",
    serialNo: "HP0B58",
    problem: "Display Not Working ",
    remarks: "Check for Socket",
  },
  {
    id: 2,
    products: "Dell Laptop",
    serialNo: "DL1204",
    problem: "Keyboard Not Working",
    remarks: "Spilled Water on Keyboard",
  },
  {
    id: 3,
    products: "Asus Laptop",
    serialNo: "AS0012",
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

const OutwardProductTable = ({productData}) => {
  const [isNoData, setIsNoData] = useState(false);

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
            <div className="OutwardProductTable_cell_override">{row.products}</div>
        )
      }
    },
    {
      name: "Serial No",
      maxWidth: "150px",
      cell: (row) => {
        return (
            <div className="OutwardProductTable_cell_override">{row.serialNo}</div>
        )
      }
    },
    {
      name: "Problem",
      cell: (row) => {
        return (
            <div className="OutwardProductTable_cell_override">{row.problem}</div>
        )
      }
    },
    {
      name: "Remarks",
      cell: (row) => {
        return (
            <div className="OutwardProductTable_cell_override">{row.remarks}</div>
        )
      }
    }
  ];

  const emptyTableRender = (
    <div className="OutwardProductTable_table_empty">
      <h3>No Products Loaded yet</h3>
    </div>
  );
  return (
    <div className="OutwardProductTable">
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

export default OutwardProductTable;
