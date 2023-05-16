import React from "react";
import { useState } from "react";
import InwardService from "../../../services/inward-service";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import "./PaymentComplete.css";
import { useEffect } from "react";
import CustomerService from "../../../services/customer-service";
import Select from "../../UI/Select";
import PaymentProductTable from "./PaymentProductTable";
import OutwardService from "../../../services/outward-service";
import PaymentService from "../../../services/payment-service";

const inputStyle = { marginLeft: "10px", width: "200px" };
const inputStyle2 = { marginLeft: "10px", width: "180px", paddingLeft: "12px" };
const inputStyle3 = { marginLeft: "10px" };
const inputStyleError = { marginLeft: "10px", width: "200px", border: "2px solid #e60000" };
const inputStyle2Error = { marginLeft: "10px", width: "180px", paddingLeft: "12px", border: "2px solid #e60000" };
const inputStyle3Error = { marginLeft: "10px", border: "2px solid #e60000" };

const PaymentComplete = ({ paymentCompleteID, setPaymentCompleteUI }) => {
  const [jobID, setJobID] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [invoiceDate, setInvoiceDate] = useState();

  const [paymentDate, setPaymentDate] = useState();
  const [paymentMode, setPaymentMode] = useState("default");
  const [remarks, setRemarks] = useState("");

  const [invoiceAmount, setInvoiceAmount] = useState();
  const [paidAmount, setPaidAmount] = useState();
  const [outstanding, setOutstanding] = useState();
  const [entryAmount, setEntryAmount] = useState("");

  const [paymentDateError, setPaymentDateError] = useState(null);
  const [paymentModeError, setPaymentModeError] = useState(null);
  const [entryAmountError, setEntryAmountError] = useState(null);
  const [outstandingError, setOutstandingError] = useState(null);

  const [paymentData, setPaymentData] = useState();
  const [outwardData, setOutwardData] = useState([]);
  const [inwardData, setInwardData] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  const [inwardProducts, setInwardProducts] = useState([]);

  useEffect(() => {
    PaymentService.getPayment(paymentCompleteID).then((res) => {
      setPaymentData(res.data);
      setJobID(res.data.jobID);
      setPaidAmount("₹" + res.data.paidAmount);
      setOutstanding("₹" + res.data.outstandingAmount);
      setInvoiceDate(res.data.invoiceDate);
    });
  }, []);

  useEffect(() => {
    console.log(paymentData);
    if (paymentData) {
      OutwardService.getOutward(paymentData.outwardID).then((res) => {
        setOutwardData(res.data);
        setInvoiceAmount("₹" + res.data.totalCharge);
      });
      InwardService.getInward(paymentData.inwardID).then((res) => {
        setInwardData(res.data);
        setInwardProducts(res.data.inwardProducts);
      });
      CustomerService.getCustomer(paymentData.customerID).then((res) => {
        setCustomerData(res.data);
        setCustomerName(res.data.name);
      });
    }
  }, [paymentData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Validation
    if(paymentMode==="default" || !paymentDate || !entryAmount) {
      if(paymentMode==="default") setPaymentModeError(true);
      if(!paymentDate) setPaymentDateError(true);
      if(!entryAmount) setEntryAmountError(true);
      return;
    }
    else if(parseInt(entryAmount)>parseInt(outstanding.substring(1))) {
      setOutstandingError(true);
      return;
    }

    const transactionData = {
      paymentDate,
      paymentMode,
      remarks,
      amount: entryAmount,
    };
    console.log(transactionData);
    PaymentService.createTransaction(paymentCompleteID, transactionData)
      .then((res) => {
        console.log(res);
        if (res.data.status === "Success") {
          const paid = parseInt(paymentData.paidAmount) + parseInt(entryAmount);
          const ost =
            parseInt(paymentData.outstandingAmount) - parseInt(entryAmount);
          const isPending = ost > 0 ? true : false;

          const updatedDate =
            new Date(transactionData.paymentDate) >
            new Date(paymentData.paymentDate)
              ? transactionData.paymentDate
              : paymentData.paymentDate;

          PaymentService.updatePayment(paymentCompleteID, {
            outstandingAmount: ost.toString(),
            paidAmount: paid.toString(),
            paymentDate: updatedDate,
            isPending,
          })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPaymentCompleteUI(false);
      });
  };

  return (
    <Card>
      <div className="PaymentComplete">
        <h2>Payment Entry</h2>
        <hr></hr>
        <form className="PaymentComplete_form">
          <div className="PaymentComplete_formControl">
            <label htmlFor="jobID">JobID:</label>
            <Input
              type="text"
              style={inputStyle}
              disabled={true}
              onChange={(event) => {
                setJobID(event.target.value);
              }}
              value={jobID}
            />
          </div>
          <div className="PaymentComplete_formControl">
            <label htmlFor="name">Customer Name:</label>
            <Input
              type="text"
              style={inputStyle}
              disabled={true}
              value={customerName}
            />
          </div>
          <div className="PaymentComplete_formControl">
            <label htmlFor="outwardDate">Invoice Date:</label>
            <Input
              type="date"
              style={inputStyle}
              disabled={true}
              onChange={(event) => {
                setInvoiceDate(event.target.value);
              }}
              value={invoiceDate}
            />
          </div>
        </form>
        <hr style={{ marginTop: "24px" }}></hr>
        <div className="PaymentComplete_productTable">
          <PaymentProductTable productData={inwardProducts} />
        </div>
        <hr style={{ marginTop: "24px" }}></hr>
        <div className="PaymentComplete_bottomBar">
          <form className="InwardAdd_form" onSubmit={handleSubmit}>
            <div className="InwardAdd_formDivider">
              <div className="InwardAdd_formControl">
                <label htmlFor="name">Payment Date:</label>
                <Input
                  type="date"
                  style={(paymentDateError!==null && paymentDateError===true) ? inputStyleError : inputStyle}
                  onChange={(event) => {
                    setPaymentDate(event.target.value);
                    if(event.target.value) setPaymentDateError(false);
                    else setPaymentDateError(true);
                  }}
                  value={paymentDate}
                />
              </div>
              <div className="InwardAdd_formControl">
                <label htmlFor="receivedfrom">Mode of Payment:</label>
                <Select
                  style={(paymentModeError!==null && paymentModeError===true) ? inputStyle3Error : inputStyle3}
                  onChange={(event) => {
                    setPaymentMode(event.target.value);
                    if(event.target.value !== "default") setPaymentModeError(false);
                    else setPaymentModeError(true);
                  }}
                >
                  <option value="default">Select Mode</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Card">Card</option>
                  <option value="Online/UPI">Online/UPI</option>
                </Select>
              </div>
              <div className="InwardAdd_formControl">
                <label htmlFor="inwardDate">Remarks:</label>
                <Input
                  type="text"
                  style={inputStyle3}
                  onChange={(event) => {
                    setRemarks(event.target.value);
                  }}
                  value={remarks}
                />
              </div>
            </div>
            <div className="InwardAdd_formDivider">
              <div className="InwardAdd_formControl">
                <label htmlFor="products">Invoice Amount:</label>
                <Input
                  type="text"
                  style={inputStyle2}
                  disabled={true}
                  value={invoiceAmount}
                />
              </div>
              <div className="InwardAdd_formControl">
                <label htmlFor="receivedfrom">Paid Amount:</label>
                <Input
                  type="text"
                  style={inputStyle2}
                  disabled={true}
                  value={paidAmount}
                />
              </div>
              <div className="InwardAdd_formControl">
                <label htmlFor="receivedfrom">Outstanding:</label>
                <Input
                  type="text"
                  style={(outstandingError!==null && outstandingError===true) ? inputStyle2Error : inputStyle2}
                  disabled={true}
                  value={outstanding}
                />
              </div>
              <div className="InwardAdd_formControl">
                <label htmlFor="receivedfrom">Enter Amount:</label>
                <Input
                  type="text"
                  style={(entryAmountError!==null && entryAmountError===true) ? inputStyle2Error : inputStyle2}
                  onChange={(event) => {
                    setEntryAmount(event.target.value);
                    if(event.target.value) setEntryAmountError(false);
                    else setEntryAmountError(true);
                    setOutstandingError(false);
                  }}
                  value={entryAmount}
                />
              </div>
              <div className="InwardAdd_formActions">
                <label>&nbsp;</label>
                <Button
                  style={{
                    marginLeft: "10px",
                    fontWeight: "600",
                    width: "140px",
                  }}
                >
                  Complete
                </Button>
                &nbsp;&nbsp;
              </div>
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default PaymentComplete;
