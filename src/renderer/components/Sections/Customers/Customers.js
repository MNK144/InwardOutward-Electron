import React from "react";
import { useState } from "react";
import Button from "../../UI/Button";
import CustomerAdd from "./CustomerAdd";
import CustomerEdit from "./CustomerEdit";
import "./Customers.css";
import CustomerTable from "./CustomerTable";

const Customers = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [isCustomerAdd, setCustomerAdd] = useState(false);
  const [isAddCustomerButtonActive, setAddCustomerButtonActive] =
    useState(false);
  const [isCustomerEdit, setCustomerEdit] = useState(false);
  const [customerEditId, setCustomerEditId] = useState("");

  const toggleAddCustomerButton = () => {
    setAddCustomerButtonActive((prev) => !prev);
  };
  const handleAddCustomerButton = () => {
    if (!isCustomerEdit) {
      setCustomerAdd((isCustomerAdd) => !isCustomerAdd);
    } else {
      setCustomerEdit((isCustomerEdit) => !isCustomerEdit);
    }
    toggleAddCustomerButton();
  };

  const handleEdit = (id) => {
    setCustomerEditId(id);
    setCustomerEdit(true);
    toggleAddCustomerButton();
  };

  return (
    <div className="Customers">
      <div className="customer_topbar">
        <p>Total Customers: {customerCount}</p>
        <Button
          className="customer_topbar_btn"
          style={{ fontWeight: "bolder" }}
          onClick={handleAddCustomerButton}
        >
          {isAddCustomerButtonActive ? "View Customers" : "Add Customer"}
        </Button>
      </div>
      {!isCustomerAdd && !isCustomerEdit && (
        <CustomerTable
          setCustomerCount={setCustomerCount}
          handleEdit={handleEdit}
        />
      )}
      {isCustomerAdd && !isCustomerEdit && (
        <CustomerAdd
          setCustomerAdd={setCustomerAdd}
          toggleAddButton={toggleAddCustomerButton}
        />
      )}
      {!isCustomerAdd && isCustomerEdit && (
        <CustomerEdit
          customerId={customerEditId}
          setCustomerEdit={setCustomerEdit}
          toggleAddButton={toggleAddCustomerButton}
        />
      )}
    </div>
  );
};

export default Customers;
