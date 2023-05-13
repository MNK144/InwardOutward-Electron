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
const inputStyle2 = { marginLeft: "10px", width: "380px" };

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
  };
  const handleProductDelete = (id) => {
    setInwardProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
                style={inputStyle}
                onChange={(event) => {
                  setReceivedFrom(event.target.value);
                }}
                value={receivedFrom}
              />
            </div>
            <div className="InwardAdd_formControl">
              <label htmlFor="inwardDate">Inward Date:</label>
              <Input
                type="date"
                style={inputStyle}
                onChange={(event) => {
                  setInwardDate(event.target.value);
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
                style={inputStyle2}
                onChange={(event) => {
                  setProducts(event.target.value);
                }}
                value={products}
              />
            </div>
            <div className="InwardAdd_formControl">
              <label htmlFor="receivedfrom">Serial No:</label>
              <Input
                type="text"
                style={inputStyle2}
                onChange={(event) => {
                  setSerialNo(event.target.value);
                }}
                value={serialNo}
              />
            </div>
            <div className="InwardAdd_formControl">
              <label htmlFor="receivedfrom">Problem:</label>
              <Input
                type="text"
                style={inputStyle2}
                onChange={(event) => {
                  setProblem(event.target.value);
                }}
                value={problem}
              />
            </div>
            <div className="InwardAdd_formControl">
              <label htmlFor="receivedfrom">Remarks:</label>
              <Input
                type="text"
                style={inputStyle2}
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
                style={{ marginLeft: "3px", width: "120px" }}
                onChange={(event) => {
                  setServiceCharge(event.target.value);
                }}
                value={serviceCharge}
              />
            </div>
            <div className="InwardAdd_bottmFormControl">
              <label htmlFor="partCharge">Part Charge&nbsp; ₹</label>
              <Input
                type="number"
                style={{ marginLeft: "3px", width: "120px" }}
                onChange={(event) => {
                  setPartCharge(event.target.value);
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
