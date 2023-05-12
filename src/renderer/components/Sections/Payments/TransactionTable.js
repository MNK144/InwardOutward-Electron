import React from "react";
import "./TransactionTable.css";
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

const TransactionTable = ({ transactionData }) => {

  useEffect(() => {

  }, []);


  const columns = [
    {
      name: "Amount",
      maxWidth: "120px",
      cell: (row) => {
        return <div className="transactionTable_cell_override">₹{row.amount}</div>;
      },
    },
    {
      name: "Date",
      maxWidth: "140px",
      cell: (row) => {
        return (
          <div className="transactionTable_cell_override">{row.paymentDate}</div>
        );
      },
    },
    {
      name: "Mode",
      cell: (row) => {
        return (
          <div className="transactionTable_cell_override">{row.paymentMode}</div>
        );
      },
    },
    {
      name: "Remarks",
      minWidth: "180px",
      cell: (row) => {
        return (
          <div className="transactionTable_cell_override">{row.remarks}</div>
        );
      },
    },
  ];

  const emptyTableRender = (
    <div className="transactionTable_table_empty">
      <h3>No Transactions Found</h3>
    </div>
  );
  return (
    <div className="TransactionTable">
      {transactionData?.length > 0 ? (
        <DataTable
          columns={columns}
          data={transactionData}
          customStyles={customStyles}
        />
      ) : (
        emptyTableRender
      )}
    </div>
  );
};

export default TransactionTable;
