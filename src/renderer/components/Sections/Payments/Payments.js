import React from "react";
import { useState } from "react";
import Button from "../../UI/Button";
import PaymentComplete from "./PaymentComplete";
import "./Payments.css";
import PaymentTable from "./PaymentTable";
import TransactionHistory from "./TransactionHistory";

const Payments = () => {
  const [paymentCount, setPaymentCount] = useState(0);
  const [isPaymentCompleteUI, setPaymentCompleteUI] = useState(false);
  const [paymentCompleteID, setPaymentCompleteID] = useState("");
  const [transactionHistoryModal,setTransactionHistoryModal] = useState(false);
  const [transactionData,setTransactionData] = useState([]);

  const handleViewTransaction = (data) => {
    setTransactionHistoryModal(true);
    setTransactionData(data);
  }

  const handleComplete = (id) => {
    setPaymentCompleteID(id);
    setPaymentCompleteUI(true);
  };

  const handleTransactionClose = () => {
    setTransactionHistoryModal(false);
  }

  return (
    <div className="Payments">
      <div className="payments_topbar">
        <p>Pending Payments: {paymentCount}</p>
        <div
          className={
            isPaymentCompleteUI
              ? "payments_topbar_btn_cont_on"
              : "payments_topbar_btn_cont_off"
          }
        >
          <Button
            className={"payments_topbar_btn"}
            style={{ fontWeight: "bolder" }}
            onClick={() => {
              setPaymentCompleteUI(false);
            }}
          >
            View Payments
          </Button>
        </div>
      </div>

      {!isPaymentCompleteUI && (
        <PaymentTable
          setPaymentCount={setPaymentCount}
          setPaymentCompleteUI={setPaymentCompleteUI}
          handleViewTransaction={handleViewTransaction}
          handlePaymentComplete={handleComplete}
        />
      )}

      {isPaymentCompleteUI && (
        <PaymentComplete
          paymentCompleteID={paymentCompleteID}
          setPaymentCompleteUI={setPaymentCompleteUI}
        />
      )}

      {transactionHistoryModal && (
        <TransactionHistory
          transactionData={transactionData}
          onClose={handleTransactionClose}
        />
      )}
    </div>
  );
};

export default Payments;
