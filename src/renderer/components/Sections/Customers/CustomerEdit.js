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
const inputStyleError = { marginLeft: "10px", border: "2px solid #e60000" };

const CustomerEdit = ({ customerId, setCustomerEdit, toggleAddButton }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [emailError, setEmailError] = useState(null);

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
    // const company = "noCompany";

    //Validations
    if(!name || !address || !phone || !email) {
      if(!name) setNameError(true);
      if(!address) setAddressError(true);
      if(!phone) setPhoneError(true);
      if(!email) setEmailError(true);
      // if(!company) setCompanyError(true);
      return;
    }

    const customerData = {
      name,
      address,
      phone,
      email,
      // company,
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
              style={(nameError!==null && nameError===true) ? inputStyleError : inputStyle}
              onChange={(event) => {
                setName(event.target.value);
                if(event.target.value) setNameError(false);
                else setNameError(true);
              }}
              value={name}
            />
          </div>
          <div className="custAdd_formControl">
            <label htmlFor="address">Address:</label>
            <TextArea
              style={(addressError!==null && addressError===true) ? inputStyleError : inputStyle}
              onChange={(event) => {
                setAddress(event.target.value);
                if(event.target.value) setAddressError(false);
                else setAddressError(true);
              }}
              value={address}
            />
          </div>
          <div className="custAdd_formControl">
            <label htmlFor="phone">Phone No:</label>
            <Input
              type="number"
              style={(phoneError!==null && phoneError===true) ? inputStyleError : inputStyle}
              onChange={(event) => {
                setPhone(event.target.value);
                if(event.target.value) setPhoneError(false);
                else setPhoneError(true);
              }}
              value={phone}
            />
          </div>
          <div className="custAdd_formControl">
            <label htmlFor="email">Email:</label>
            <Input
              type="email"
              style={(emailError!==null && emailError===true) ? inputStyleError : inputStyle}
              onChange={(event) => {
                setEmail(event.target.value);
                if(event.target.value) setEmailError(false);
                else setEmailError(true);
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
