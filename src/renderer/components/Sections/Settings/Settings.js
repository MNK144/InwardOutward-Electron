import React, { useEffect } from "react";
import { useState } from "react";
import SettingsService from "../../../services/settings-service";
import Modal from "../../Misc/Modal";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import TextArea from "../../UI/TextArea";
import "./Settings.css";

const inputStyle = { marginLeft: "10px" };
const inputStyle2 = { marginLeft: "10px", width: "350px" };

const Settings = () => {
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [jobID, setJobID] = useState("");

  const [inwardTC, setInwardTC] = useState("");
  const [outwardTC, setOutwardTC] = useState("");
  const [paymentTC, setPaymentTC] = useState("");

  const [isCompanyModalActive,setIsCompanyModalActive] = useState(false);

  useEffect(()=>{
    SettingsService.getCompanySettings().then(res=>{
      console.log(res.data);
      setCompanyName(res.data.companyName);
      setAddress(res.data.address);
      setContact(res.data.contact);
      setEmail(res.data.email);
      setJobID(res.data.jobID);
      setInwardTC(res.data.inwardTC);
      setOutwardTC(res.data.outwardTC);
      setPaymentTC(res.data.paymentTC);
    });
  },[])

  const handleUpdate = (e) => {
    e.preventDefault();
    const companyPayload = {
      companyName,
      address,
      contact,
      email,
      jobID,
      inwardTC,
      outwardTC,
      paymentTC,
    };
    console.log("CompanyPayload:", companyPayload);
    SettingsService.updateCompanySettings(companyPayload).then(res=>{
      //if success
      setIsCompanyModalActive(true);
    });
  };

  return (
    <>
      {isCompanyModalActive && (
        <Modal
          onClose={() => {
            setIsCompanyModalActive(false);
          }}
        >
          <div>
            <h3 style={{ textAlign: "center" }}>
              Company Settings Updated Successfully
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "24px",
              }}
            >
              <Button
                style={{
                  fontWeight: "600",
                  width: "120px",
                }}
                onClick={() => {
                  setIsCompanyModalActive(false);
                }}
              >
                &nbsp;Okay&nbsp;
              </Button>
            </div>
          </div>
        </Modal>
      )}
      <Card>
        <div className="Settings">
          <h2>Company Configuration</h2>
          <hr></hr>
          <form className="Settings_form" onSubmit={handleUpdate}>
            <div className="Settings_formDivider">
              <div className="Settings_formControl">
                <label htmlFor="companyName">Company Name:</label>
                <Input
                  type="text"
                  style={inputStyle}
                  tabIndex="1"
                  onChange={(event) => {
                    setCompanyName(event.target.value);
                  }}
                  value={companyName}
                />
              </div>
              <div className="Settings_formControl">
                <label htmlFor="address">Address:</label>
                <TextArea
                  type="text"
                  style={inputStyle}
                  tabIndex="1"
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                  value={address}
                />
              </div>
              <div
                className="Settings_formControl"
                style={{ marginTop: "30px" }}
              >
                <label htmlFor="inwardTC">Inward Terms & Conditions:</label>
                <TextArea
                  type="text"
                  style={inputStyle}
                  tabIndex="5"
                  onChange={(event) => {
                    setInwardTC(event.target.value);
                  }}
                  value={inwardTC}
                />
              </div>
              <div className="Settings_formControl">
                <label htmlFor="outwardTC">Outward Terms & Conditions:</label>
                <TextArea
                  type="text"
                  style={inputStyle}
                  tabIndex="6"
                  onChange={(event) => {
                    setOutwardTC(event.target.value);
                  }}
                  value={outwardTC}
                />
              </div>
            </div>
            <div className="Settings_formDivider">
              <div className="Settings_formControl">
                <label htmlFor="contact">Contact No.:</label>
                <Input
                  type="text"
                  style={inputStyle2}
                  tabIndex="2"
                  onChange={(event) => {
                    setContact(event.target.value);
                  }}
                  value={contact}
                />
              </div>
              <div className="Settings_formControl">
                <label htmlFor="email">Email:</label>
                <Input
                  type="text"
                  style={inputStyle2}
                  tabIndex="3"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  value={email}
                />
              </div>
              <div className="Settings_formControl">
                <label htmlFor="jobID">Job ID:</label>
                <Input
                  type="text"
                  style={inputStyle2}
                  tabIndex="4"
                  onChange={(event) => {
                    setJobID(event.target.value);
                  }}
                  value={jobID}
                />
              </div>
              <div className="Settings_formControl">
                <label htmlFor="paymentTC">Payment Terms & Conditions:</label>
                <TextArea
                  type="text"
                  style={inputStyle2}
                  tabIndex="7"
                  onChange={(event) => {
                    setPaymentTC(event.target.value);
                  }}
                  value={paymentTC}
                />
              </div>
              <div className="Settings_formActions">
                <label>&nbsp;</label>
                <Button
                  tabIndex="8"
                  style={{
                    fontWeight: "600",
                    width: "180px",
                  }}
                >
                  Update Settings
                </Button>
                &nbsp;&nbsp;
              </div>
            </div>
          </form>

          {/* <div className="Settings_bottomBar">
            <form className="Settings_bottomForm" onSubmit={handleSubmit}>
              <div className="Settings_bottomFormActions">
                <label>&nbsp;</label>
                <Button
                  style={{
                    marginLeft: "10px",
                    fontWeight: "600",
                    width: "180px",
                  }}
                  
                >
                  Update Settings
                </Button>
                &nbsp;&nbsp;
              </div>
            </form>
          </div> */}
          <hr style={{ marginTop: "24px" }}></hr>
          <h2>Account Configuration</h2>
          <hr></hr>
          <h2>Database Configuration</h2>
          <hr></hr>
        </div>
      </Card>
    </>
  );
};

export default Settings;
