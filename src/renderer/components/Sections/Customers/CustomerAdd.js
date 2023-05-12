import React from "react";
import { useState } from "react";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import TextArea from "../../UI/TextArea";
import "./CustomerAdd.css";
import CustomerService from "../../../services/customer-service";

const inputStyle = { marginLeft: "10px" };

const CustomerAdd = ({ setCustomerAdd, toggleAddButton }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company,setCompany] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const customerData = {
      name,
      address,
      phone,
      email,
      company,
    };
    console.log(customerData);
    CustomerService.createCustomer(customerData)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setCustomerAdd(false);
        toggleAddButton();
      });
  };

  const handleReset = () => {
    setName("");
    setAddress("");
    setPhone("");
    setEmail("");
    setCompany("");
  };

  return (
    <Card>
      <div className="CustomerAdd">
        <h2>Add New Customer</h2>
        <form className="custAdd_form" onSubmit={handleSubmit}>
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
          <div className="custAdd_formControl">
            <label htmlFor="company">Company:</label>
            <Input
              type="text"
              style={inputStyle}
              onChange={(event) => {
                setCompany(event.target.value);
              }}
              value={company}
            />
          </div>
          <div className="custAdd_formActions">
            <Button style={{fontWeight: "600"}}>Submit</Button>&nbsp;&nbsp;
            <Button style={{fontWeight: "600"}} type="button" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default CustomerAdd;
