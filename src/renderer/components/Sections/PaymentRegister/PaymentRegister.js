import React, { useState } from "react";
import "./PaymentRegister.css";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Card from "../../UI/Card";
import InwardAddCustomer from "../CustomerInward/InwardAddCustomer";
import { useEffect } from "react";
import PaymentTable from "../Payments/PaymentTable";
import TransactionHistory from "../Payments/TransactionHistory";

const inputStyle = { marginLeft: "10px" };
const inputStyle2 = { marginLeft: "10px", width: "320px" };

const PaymentRegister = () => {
  const [inwardCount, setPaymentCount] = useState(0);
  const [selectCustomer, setSelectCustomer] = useState(false);
  const [custName, setCustName] = useState("Select a Customer");
  const [customerID, setCustomerID] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [filter, setFilter] = useState();
  const [transactionHistoryModal,setTransactionHistoryModal] = useState(false);
  const [transactionData,setTransactionData] = useState([]);

  useEffect(() => {
    handleFilter();
  }, [custName, startDate, endDate]);

  const handleViewTransaction = (data) => {
    setTransactionHistoryModal(true);
    setTransactionData(data);
  };
  const handleTransactionClose = () => {
    setTransactionHistoryModal(false);
  }

  const handleFilter = () => {
    if (!customerID && !startDate && !endDate) {
      setFilter(undefined);
    } else {
      setFilter({
        customerID,
        startDate,
        endDate,
      });
    }
  };

  const handleCustomerClose = () => {
    setSelectCustomer(false);
  };
  const handleCustomerSelect = (id, name) => {
    console.log("...");
    setCustomerID(id);
    setCustName(name);
    handleCustomerClose();
    handleFilter();
  };

  const handleClearSearch = () => {
    setCustomerID(undefined);
    setCustName("Select a Customer");
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <Card>
      {selectCustomer && (
        <InwardAddCustomer
          onClose={handleCustomerClose}
          handleSelect={handleCustomerSelect}
        />
      )}
      {transactionHistoryModal && (
        <TransactionHistory
          transactionData={transactionData}
          onClose={handleTransactionClose}
        />
      )}
      <div className="InwardRegister">
        <form className="InwardRegister_form">
          <div className="InwardRegister_formDivider">
            <div
              className="InwardRegister_formControl"
              style={{ marginTop: "10px", marginBottom: "12px" }}
            >
              <Button
                type="button"
                className="InwardRegister_searchBtn"
                onClick={() => setSelectCustomer(true)}
              >
                Select Customer
              </Button>
              <Button
                type="button"
                className="InwardRegister_clearBtn"
                onClick={handleClearSearch}
              >
                Clear Search
              </Button>
            </div>
            <div className="InwardRegister_formControl">
              <label htmlFor="name">Customer Name:</label>
              <Input
                type="text"
                style={inputStyle}
                disabled="true"
                value={custName}
              />
            </div>
          </div>
          <div className="InwardRegister_formDivider">
            <div className="InwardRegister_formControl">
              <label htmlFor="name">Start Date:</label>
              <Input
                type="date"
                style={inputStyle2}
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </div>
            <div className="InwardRegister_formControl">
              <label htmlFor="name">End Date:</label>
              <Input
                type="date"
                style={inputStyle2}
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </div>
          </div>
        </form>
        <hr></hr>
        <PaymentTable
          setPaymentCount={setPaymentCount}
          isPaymentRegister={true}
          handleViewTransaction={handleViewTransaction}
          filter={filter}
        />
      </div>
    </Card>
  );
};

export default PaymentRegister;
