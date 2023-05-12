import React from "react";
import Modal from "../../Misc/Modal";
import "./TransactionHistory.css";
import { AiOutlineClose } from "react-icons/ai";
import TransactionTable from "./TransactionTable";
// import InwardAddCustomerTable from "./InwardAddCustomerTable";

const TransactionHistory = (props) => {
  return (
    <Modal className="TransactionHistory_Modal" onClose={props.onClose}>
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
      <div className="TransactionHistory">
        <h2>Transaction History</h2>
        <div className="TransactionHistory_tableDiv">
            <TransactionTable transactionData={props.transactionData}/>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionHistory;
