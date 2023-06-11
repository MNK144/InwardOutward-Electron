import React from "react";
import "./ProductTable.css";
import DataTable from "react-data-table-component";
import { useEffect } from "react";

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

const ProductTable = ({ productData }) => {

  const columns = [
    {
      name: "Products",
      maxWidth: "120px",
      cell: (row) => {
        return <div className="productTable_cell_override">{row.products}</div>;
      },
    },
    {
      name: "Serial No",
      maxWidth: "140px",
      cell: (row) => {
        return (
          <div className="productTable_cell_override">{row.serialNo}</div>
        );
      },
    },
    {
      name: "Problem",
      cell: (row) => {
        return (
          <div className="productTable_cell_override">{row.problem}</div>
        );
      },
    },
    {
      name: "Remarks",
      minWidth: "180px",
      cell: (row) => {
        return (
          <div className="productTable_cell_override">{row.remarks}</div>
        );
      },
    },
  ];

  const emptyTableRender = (
    <div className="productTable_table_empty">
      <h3>No Products Found</h3>
    </div>
  );
  return (
    <div className="ProductTable">
      {productData?.length > 0 ? (
        <DataTable
          columns={columns}
          data={productData}
          customStyles={customStyles}
        />
      ) : (
        emptyTableRender
      )}
    </div>
  );
};

export default ProductTable;
