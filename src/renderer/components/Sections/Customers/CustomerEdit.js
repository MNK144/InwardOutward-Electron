import React from "react";
import { useState } from "react";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import TextArea from "../../UI/TextArea";
// import "./CustomerAdd.css";
import { useEffect } from "react";
import CustomerService from "../../../services/customer-service";

const inputStyle = { marginLeft: "10px" };

const CustomerEdit = ({ customerId, setCustomerEdit, toggleAddButton }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  console.log("Editing Customer: " + customerId);

  useEffect(() => {
    CustomerService.getCustomer(customerId)
      .then((response) => {
        console.log(response);
        setName(response.data.name);
        setAddress(response.data.address);
        setPhone(response.data.phone);
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [customerId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const company = "noCompany";
    const customerData = {
      name,
      address,
      phone,
      email,
      company,
    };
    console.log(customerData);
    CustomerService.editCustomer(customerId, customerData)
      .then((response) => {
        if (response.data.status === "Success") {
          console.log("Edit Successful");
        }
      })
      .catch((error) => {
        console.log("Edit Error: " + error);
      })
      .finally(() => {
        closeEditMode();
      })
  };

  const closeEditMode = () => {
    setCustomerEdit(false);
    toggleAddButton();
  }

  return (
    <Card>
      <div className="CustomerAdd">
        <h2>Edit Customer</h2>
        <form className="custAdd_form" onSubmit={handleSubmit}>
          <div className="custAdd_formControl">
            <label htmlFor="id">ID:</label>
            <Input type="text" style={inputStyle} value={customerId} disabled />
          </div>
          <div className="custAdd_formControl">
            <label htmlFor="name">Customer Name:</label>
            <Input
              type="text"
              style={inputStyle}
              onChange={(event) => {
                setName(event.target.value);
              }}
              value={name}
            />
          </div>
          <div className="custAdd_formControl">
            <label htmlFor="address">Address:</label>
            <TextArea
              style={inputStyle}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
              value={address}
            />
          </div>
          <div className="custAdd_formControl">
            <label htmlFor="phone">Phone No:</label>
            <Input
              type="number"
              style={inputStyle}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              value={phone}
            />
          </div>
          <div className="custAdd_formControl">
            <label htmlFor="email">Email:</label>
            <Input
              type="email"
              style={inputStyle}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              value={email}
            />
          </div>
          <div className="custAdd_formActions">
            <Button style={{fontWeight: "600"}}>&nbsp;Modify&nbsp;</Button>
            &nbsp;&nbsp;
            <Button style={{fontWeight: "600"}} type="button" onClick={closeEditMode}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default CustomerEdit;
