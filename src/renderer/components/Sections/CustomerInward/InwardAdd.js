import React from "react";
import { useState } from "react";
import InwardService from "../../../services/inward-service";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import "./InwardAdd.css";
import InwardAddCustomer from "./InwardAddCustomer";
import InwardAddTable from "./InwardAddTable";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import CustomerService from "../../../services/customer-service";
import SettingsService from "../../../services/settings-service";
import JobService from "../../../services/job-service";

const inputStyle = { marginLeft: "10px" };
const inputStyleError = { marginLeft: "10px", border: "2px solid #e60000" };
const inputStyle2 = { marginLeft: "10px", width: "380px" };
const inputStyle2Error = { marginLeft: "10px", width: "380px", border: "2px solid #e60000" };
const inputStyle3 = { marginLeft: "3px", width: "120px" };
const inputStyle3Error = { marginLeft: "3px", width: "120px", border: "2px solid #e60000" };

const InwardAdd = ({
  editMode,
  setInwardAdd,
  toggleAddButton,
  inwardEditId,
  setInwardEdit,
}) => {
  const [name, setName] = useState("Select a Customer");
  const [customerID, setCustomerID] = useState("");
  const [jobID, setJobID] = useState("");
  const [receivedFrom, setReceivedFrom] = useState("");
  const [inwardDate, setInwardDate] = useState();
  const [products, setProducts] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [problem, setProblem] = useState("");
  const [remarks, setRemarks] = useState("");
  const [serviceCharge, setServiceCharge] = useState("");
  const [partCharge, setPartCharge] = useState("");

  const [productsError, setProductsError] = useState(null);
  const [serialNoError, setSerialNoError] = useState(null);
  const [problemError, setProblemError] = useState(null);
  const [receivedFromError, setReceivedFromError] = useState(null);
  const [inwardDateError, setInwardDateError] = useState(null);
  const [serviceChargeError, setServiceChargeError] = useState(null);
  const [partChargeError, setPartChargeError] = useState(null);

  const [inwardProducts, setInwardProducts] = useState([]);
  const [selectCustomer, setSelectCustomer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [jobIDPrefix, setJobIDPrefix] = useState();
  const [jobIDYear, setJobIDYear] = useState();

  useEffect(() => {
    //year
    const year = new Date().getFullYear().toString();
    setJobIDYear(year);
    SettingsService.getCompanySettings().then((res) => {
      console.log(res.data);
      setJobIDPrefix(res.data.jobID);
    });
  }, []);

  useEffect(() => {
    if (jobIDYear && jobIDPrefix) {
      JobService.getJobCount(jobIDYear).then((res) => {
        console.log(res.data);
        if (res.data.count) {
          const jobID = jobIDPrefix + "/" + jobIDYear + "/" + res.data.count;
          setJobID(jobID);
        } else {
          console.log("Unexpected Error Occured");
        }
      });
    }
  }, [jobIDYear, jobIDPrefix]);

  useEffect(() => {
    if (editMode) {
      setIsLoading(true);
      InwardService.getInward(inwardEditId)
        .then((res) => {
          console.log("EditInward Data", res);
          const inward = res.data;
          //query customer name
          CustomerService.getCustomer(inward.customerID).then((res) => {
            setName(res.data.name);
          });
          setCustomerID(inward.customerID);
          setJobID(inward.jobID);
          setReceivedFrom(inward.receivedFrom);
          setInwardDate(inward.inwardDate);
          setInwardProducts(inward.inwardProducts);
          setServiceCharge(inward.serviceCharge);
          setPartCharge(inward.partCharge);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [editMode]);

  const handleSubmitAdd = (event) => {
    event.preventDefault();

    //Validations
    if(!products || !serialNo || !problem) {
      if(!products) setProductsError(true);
      if(!serialNo) setSerialNoError(true);
      if(!problem) setProblemError(true);
      return;
    }

    const product = {
      id: uuid(),
      products,
      serialNo,
      problem,
      remarks,
    };
    setInwardProducts([...inwardProducts, product]);
    setProducts("");
    setSerialNo("");
    setProblem("");
    setRemarks("");
    setProductsError(null);
    setSerialNoError(null);
    setProblemError(null);
  };
  const handleProductDelete = (id) => {
    setInwardProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Validation
    if(!receivedFrom || !inwardDate || !serviceCharge || !partCharge) {
      if(!receivedFrom) setReceivedFromError(true);
      if(!inwardDate) setInwardDateError(true);
      if(!serviceCharge) setServiceChargeError(true);
      if(!partCharge) setPartChargeError(true);
      return;
    }

    const inwardData = {
      jobID,
      customerID,
      inwardDate,
      receivedFrom,
      serviceCharge,
      partCharge,
      totalCharge: parseInt(serviceCharge) + parseInt(partCharge),
      isActive: true,
      inwardProducts,
    };
    console.log(inwardData);

    if (!editMode) {
      InwardService.createInward(inwardData)
        .then((res) => {
          console.log(res);
          if (res.data.status === "Success") {
            JobService.createJobData({
              jobID: jobID,
              customerID: customerID,
              inwardID: res.data.inwardID,
              inwardDate: inwardData.inwardDate,
            }).then((res2) => {
              console.log(res2.data);
              InwardService.editInward(res.data.inwardID, {
                jobDataID: res2.data.jobID,
              });
            }).finally(() => {
              setInwardAdd(false);
              toggleAddButton();
            });;
            JobService.updateJobCount(jobIDYear);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        // .finally(() => {
        //   console.log("Called Finally");
        //   setInwardAdd(false);
        //   toggleAddButton();
        // });
    } else {
      InwardService.editInward(inwardEditId, inwardData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setInwardEdit(false);
          toggleAddButton();
        });
    }
  };

  const handleCustomerClose = () => {
    setSelectCustomer(false);
  };
  const handleCustomerSelect = (id, name) => {
    console.log("...");
    setCustomerID(id);
    setName(name);
    handleCustomerClose();
  };

  return (
    <Card>
      <div className="InwardAdd">
        <h2>{!editMode ? "Add New Inward" : "Edit Inward"}</h2>
        <hr></hr>
        {selectCustomer && (
          <InwardAddCustomer
            onClose={handleCustomerClose}
            handleSelect={handleCustomerSelect}
          />
        )}
        <form className="InwardAdd_form" onSubmit={handleSubmitAdd}>
          <div className="InwardAdd_formDivider">
            <div
              className="InwardAdd_formControl"
              style={{ marginTop: "14px", marginBottom: "24px" }}
            >
              <label htmlFor="name" className="InwardAdd_jobid">
                {jobID}
              </label>
              <Button
                type="button"
                className="InwardAdd_selectCustomerBtn"
                onClick={() => setSelectCustomer(true)}
              >
                Select Customer
              </Button>
            </div>
            <div className="InwardAdd_formControl">
              <label htmlFor="name">Customer Name:</label>
              <Input
                type="text"
                style={inputStyle}
                disabled={true}
                value={name}
              />
            </div>
            <div className="InwardAdd_formControl">
              <label htmlFor="receivedfrom">Received From:</label>
              <Input
                type="text"
                style={(receivedFromError!==null && receivedFromError===true) ? inputStyleError : inputStyle}
                disabled={!customerID}
                onChange={(event) => {
                  setReceivedFrom(event.target.value);
                  if(event.target.value) setReceivedFromError(false);
                  else setReceivedFromError(true);
                }}
                value={receivedFrom}
              />
            </div>
            <div className="InwardAdd_formControl">
              <label htmlFor="inwardDate">Inward Date:</label>
              <Input
                type="date"
                style={(inwardDateError!==null && inwardDateError===true) ? inputStyleError : inputStyle}
                disabled={!customerID}
                onChange={(event) => {
                  setInwardDate(event.target.value);
                  if(event.target.value) setInwardDateError(false);
                  else setInwardDateError(true);
                }}
                value={inwardDate}
              />
            </div>
          </div>
          <div className="InwardAdd_formDivider">
            <div className="InwardAdd_formControl">
              <label htmlFor="products">Products:</label>
              <Input
                type="text"
                style={(productsError!==null && productsError===true) ? inputStyle2Error : inputStyle2}
                disabled={!customerID}
                onChange={(event) => {
                  setProducts(event.target.value);
                  if(event.target.value) setProductsError(false);
                  else setProductsError(true);
                }}
                value={products}
              />
            </div>
            <div className="InwardAdd_formControl">
              <label htmlFor="receivedfrom">Serial No:</label>
              <Input
                type="text"
                style={(serialNoError!==null && serialNoError===true) ? inputStyle2Error : inputStyle2}
                disabled={!customerID}
                onChange={(event) => {
                  setSerialNo(event.target.value);
                  if(event.target.value) setSerialNoError(false);
                  else setSerialNoError(true);
                }}
                value={serialNo}
              />
            </div>
            <div className="InwardAdd_formControl">
              <label htmlFor="receivedfrom">Problem:</label>
              <Input
                type="text"
                style={(problemError!==null && problemError===true) ? inputStyle2Error : inputStyle2}
                disabled={!customerID}
                onChange={(event) => {
                  setProblem(event.target.value);
                  if(event.target.value) setProblemError(false);
                  else setProblemError(true);
                }}
                value={problem}
              />
            </div>
            <div className="InwardAdd_formControl">
              <label htmlFor="receivedfrom">Remarks:</label>
              <Input
                type="text"
                style={inputStyle2}
                disabled={!customerID}
                onChange={(event) => {
                  setRemarks(event.target.value);
                }}
                value={remarks}
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
                disabled={!customerID}
              >
                Add Product
              </Button>
              &nbsp;&nbsp;
            </div>
          </div>
        </form>
        <hr style={{ marginTop: "24px" }}></hr>
        <div className="InwardAdd_productTable">
          <InwardAddTable
            productData={inwardProducts}
            handleDelete={handleProductDelete}
          />
        </div>
        <hr style={{ marginTop: "24px" }}></hr>
        <div className="InwardAdd_bottomBar">
          <form className="InwardAdd_bottomForm" onSubmit={handleSubmit}>
            <label style={{ paddingBottom: "2px" }}> Estimation: </label>
            <div className="InwardAdd_bottmFormControl">
              <label htmlFor="serviceCharge">Service Charge&nbsp; ₹</label>
              <Input
                type="number"
                style={(serviceChargeError!==null && serviceChargeError===true) ? inputStyle3Error : inputStyle3}
                disabled={!customerID}
                onChange={(event) => {
                  setServiceCharge(event.target.value);
                  if(event.target.value) setServiceChargeError(false);
                  else setServiceChargeError(true);
                }}
                value={serviceCharge}
              />
            </div>
            <div className="InwardAdd_bottmFormControl">
              <label htmlFor="partCharge">Part Charge&nbsp; ₹</label>
              <Input
                type="number"
                style={(partChargeError!==null && partChargeError===true) ? inputStyle3Error : inputStyle3}
                disabled={!customerID}
                onChange={(event) => {
                  setPartCharge(event.target.value);
                  if(event.target.value) setPartChargeError(false);
                  else setPartChargeError(true);
                }}
                value={partCharge}
              />
            </div>
            <div className="InwardAdd_bottomFormActions">
              <label>&nbsp;</label>
              <Button
                style={{
                  marginLeft: "10px",
                  fontWeight: "600",
                  width: "160px",
                }}
                disabled={!customerID}
              >
                {!editMode ? "Create Inward" : "Edit Inward"}
              </Button>
              &nbsp;&nbsp;
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default InwardAdd;
