import React from "react";
import "./PaymentProductTable.css";
import DataTable from "react-data-table-component";

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

const PaymentProductTable = ({ productData }) => {

  const columns = [
    {
      name: "Products",
      maxWidth: "200px",
      cell: (row) => {
        return <div className="paymentProduct_cell_override">{row.products}</div>;
      },
    },
    {
      name: "Serial No",
      maxWidth: "150px",
      cell: (row) => {
        return <div className="paymentProduct_cell_override">{row.serialNo}</div>;
      },
    },
    {
      name: "Problem",
      cell: (row) => {
        return <div className="paymentProduct_cell_override">{row.problem}</div>;
      },
    },
    {
      name: "Remarks",
      cell: (row) => {
        return <div className="paymentProduct_cell_override">{row.remarks}</div>;
      },
    },
  ];

  const emptyTableRender = (
    <div className="paymentProduct_table_empty">
      <h3>No Products Added yet</h3>
    </div>
  );
  return (
    <div className="PaymentProductTable">
      {productData.length > 0 ? (
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

export default PaymentProductTable;
