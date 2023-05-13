import React from "react";
import { useState } from "react";
import InwardService from "../../../services/inward-service";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import "./Outward.css";
import OutwardSelect from "./OutwardSelect";
import OutwardProductTable from "./OutwardProductTable";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import CustomerService from "../../../services/customer-service";
import OutwardService from "../../../services/outward-service";
import { useNavigate } from "react-router-dom";
import Modal from "../../Misc/Modal";
import SettingsService from "../../../services/settings-service";
import PaymentService from "../../../services/payment-service";
import JobService from "../../../services/job-service";

const inputStyle = { marginLeft: "10px" };
const inputStyle2 = { marginLeft: "10px", width: "350px" };

const Outward = () => {
  const [jobID, setJobID] = useState("Select an Inward"); //disabled fields
  const [custName, setCustName] = useState("Select an Inward"); //disabled fields
  const [inwardDate, setInwardDate] = useState("Select an Inward"); //disabled fields
  const [customer, setCustomer] = useState(""); //hidden
  const [invoiceDate, setInvoiceDate] = useState();
  const [jobStatus, setJobStatus] = useState();
  const [remarks, setRemarks] = useState();
  const [serviceCharge, setServiceCharge] = useState();
  const [partCharge, setPartCharge] = useState();
  const [totalCharge, setTotalCharge] = useState(0);
  const [inwardData, setInwardData] = useState();
  const [inwardProducts, setInwardProducts] = useState([]);
  const [selectCustomer, setSelectCustomer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPrintModalActive, setPrintModalActive] = useState(false);
  const [companyData, setCompanyData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    SettingsService.getCompanySettings()
      .then((res) => {
        setCompanyData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const makeOutwardData = () => {
    return {
      jobID,
      inwardID: inwardData.id,
      customerID: customer.id,
      invoiceDate,
      serviceCharge,
      partCharge,
      totalCharge: parseInt(serviceCharge) + parseInt(partCharge),
      jobStatus,
      remarks,
    };
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inwardData) return;
    const outwardData = makeOutwardData();
    console.log(outwardData);
    OutwardService.createOutward(outwardData)
      .then((res) => {
        console.log(res);
        const paymentPayload = {
          jobID: outwardData.jobID,
          outwardID: res.data.outwardID,
          inwardID: outwardData.inwardID,
          customerID: outwardData.customerID,
          outstandingAmount: outwardData.totalCharge,
          paidAmount: "0",
          invoiceDate: outwardData.invoiceDate,
        };
        PaymentService.createPayment(paymentPayload)
          .then((res2) => {
            console.log("Payment Transaction Created");
            JobService.updateJobData(inwardData.jobDataID, {
              outwardID: res.data.outwardID,
              paymentID: res2.data.paymentID,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPrintModalActive(true);
      });
  };
  const handlePrint = () => {
    navigate("/CustomerOutward/Print", {
      state: {
        companyData: companyData,
        outwardData: makeOutwardData(),
        inwardData: inwardData,
        customerData: customer,
      },
    });
  };

  const resetFields = () => {
    setJobID("Select an Inward");
    setCustName("Select an Inward");
    setInwardDate("Select an Inward");
    setCustomer("");
    setInvoiceDate("");
    setJobStatus("");
    setRemarks("");
    setServiceCharge("");
    setPartCharge("");
    setTotalCharge(0);
    setInwardData({});
    setInwardProducts([]);
  };

  const handleInwardModalClose = () => {
    setSelectCustomer(false);
  };

  const getCustomerDetails = (id) => {
    CustomerService.getCustomer(id).then((res) => {
      setCustomer(res.data);
      setCustName(res.data.name);
    });
  };

  const handleInwardSelect = (inward) => {
    console.log("...", inward);
    setInwardData(inward);
    setJobID(inward.jobID);
    setInwardDate(inward.inwardDate);
    getCustomerDetails(inward.customerID);
    setServiceCharge(inward.serviceCharge);
    setPartCharge(inward.partCharge);
    setInwardProducts(inward.inwardProducts);
    handleInwardModalClose();
  };

  return (
    <>
      {isPrintModalActive && (
        <Modal
          onClose={() => {
            setPrintModalActive(false);
            resetFields();
          }}
        >
          <div>
            <h3 style={{ textAlign: "center" }}>
              Outward Created Successfully
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "24px",
              }}
            >
              <Button
                onClick={handlePrint}
                style={{
                  marginLeft: "10px",
                  fontWeight: "600",
                  width: "120px",
                }}
              >
                &nbsp;Print&nbsp;
              </Button>
              &nbsp;&nbsp;
              <Button
                style={{
                  marginLeft: "10px",
                  fontWeight: "600",
                  width: "120px",
                }}
                onClick={() => {
                  setPrintModalActive(false);
                }}
              >
                &nbsp;Close&nbsp;
              </Button>
            </div>
          </div>
        </Modal>
      )}
      <Card>
        <div className="Outward">
          <h2>Create Outward</h2>
          <hr></hr>
          {selectCustomer && (
            <OutwardSelect
              onClose={handleInwardModalClose}
              handleSelect={handleInwardSelect}
            />
          )}
          <form className="Outward_form">
            <div className="Outward_formDivider">
              <div
                className="Outward_formControl"
                style={{ marginTop: "4px", marginBottom: "12px" }}
              >
                <Button
                  type="button"
                  className="Outward_selectInwardBtn"
                  onClick={() => setSelectCustomer(true)}
                >
                  Select Inward
                </Button>
              </div>
              <div className="Outward_formControl">
                <label htmlFor="name">JobID:</label>
                <Input
                  type="text"
                  style={inputStyle}
                  disabled={true}
                  value={jobID}
                />
              </div>
            </div>
            <div className="Outward_formDivider">
              <div className="Outward_formControl">
                <label htmlFor="name">Customer Name:</label>
                <Input
                  type="text"
                  style={inputStyle2}
                  disabled={true}
                  value={custName}
                />
              </div>
              <div className="Outward_formControl">
                <label htmlFor="name">Inward Date:</label>
                <Input
                  type="text"
                  style={inputStyle2}
                  disabled={true}
                  value={inwardDate}
                />
              </div>
            </div>
          </form>
          <hr></hr>
          <form className="Outward_form" onSubmit={handleSubmit}>
            <div className="Outward_formDivider">
              <div className="Outward_formControl">
                <label htmlFor="inwardDate">Invoice Date:</label>
                <Input
                  type="date"
                  style={inputStyle}
                  onChange={(event) => {
                    setInvoiceDate(event.target.value);
                  }}
                  value={invoiceDate}
                />
              </div>
              <div className="Outward_formControl">
                <label htmlFor="receivedfrom">Job Status:</label>
                <Input
                  type="text"
                  style={inputStyle}
                  onChange={(event) => {
                    setJobStatus(event.target.value);
                  }}
                  value={jobStatus}
                />
              </div>
              <div className="Outward_formControl">
                <label htmlFor="receivedfrom">Remarks:</label>
                <Input
                  type="text"
                  style={inputStyle}
                  onChange={(event) => {
                    setRemarks(event.target.value);
                  }}
                  value={remarks}
                />
              </div>
            </div>
            <div className="Outward_formDivider">
              <div className="Outward_formControl">
                <label htmlFor="products">Service Charge ₹:</label>
                <Input
                  type="text"
                  style={inputStyle2}
                  onChange={(event) => {
                    setServiceCharge(event.target.value);
                  }}
                  value={serviceCharge}
                />
              </div>
              <div className="Outward_formControl">
                <label htmlFor="receivedfrom">Part Charge ₹:</label>
                <Input
                  type="text"
                  style={inputStyle2}
                  onChange={(event) => {
                    setPartCharge(event.target.value);
                  }}
                  value={partCharge}
                />
              </div>
              <div className="Outward_formControl">
                <label htmlFor="receivedfrom">Total ₹:</label>
                <p
                  style={{
                    marginLeft: "17px",
                    marginTop: "2px",
                    color: "#26c281",
                    fontSize: "16px",
                  }}
                >
                  {!inwardData
                    ? 0
                    : parseInt(serviceCharge) + parseInt(partCharge)}
                </p>
              </div>
            </div>
          </form>
          <hr style={{ marginTop: "24px" }}></hr>
          <div className="Outward_productTable">
            <OutwardProductTable productData={inwardProducts} />
          </div>
          <hr style={{ marginTop: "24px" }}></hr>
          <div className="Outward_bottomBar">
            <form className="Outward_bottomForm" onSubmit={handleSubmit}>
              <div className="Outward_bottomFormActions">
                <label>&nbsp;</label>
                {/* <Button
                  type="button"
                  style={{
                    marginLeft: "10px",
                    fontWeight: "600",
                    width: "120px",
                  }}
                  onClick={handlePrint}
                >
                  Print
                </Button>
                &nbsp;&nbsp; */}
                <Button
                  style={{
                    marginLeft: "10px",
                    fontWeight: "600",
                    width: "180px",
                  }}
                >
                  Create Outward
                </Button>
                &nbsp;&nbsp;
              </div>
            </form>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Outward;
