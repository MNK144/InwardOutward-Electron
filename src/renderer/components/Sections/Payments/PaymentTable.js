import React from "react";
import "./PaymentTable.css";
import DataTable from "react-data-table-component";
import { RiFileList3Fill } from "react-icons/ri";
import { FaMoneyBill } from "react-icons/fa";
import { AiOutlinePrinter } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import InwardService from "../../../services/inward-service";
import CustomerService from "../../../services/customer-service";
import Modal from "../../Misc/Modal";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";
import SettingsService from "../../../services/settings-service";
import PaymentService from "../../../services/payment-service";
import OutwardService from "../../../services/outward-service";

// const DUMMY_DATA = [
//     {
//       id: 1,
//       jobID: "ABC/2022-23/1",
//       customer: "Mark Robert Johnson",
//       invoiceAmount: "1200",
//       outstandingAmount: "1200",
//       paidAmount: "0",
//       invoiceDate: "12-02-2020",
//     },
//     {
//       id: 2,
//       jobID: "ABC/2022-23/2",
//       customer: "Mike",
//       invoiceAmount: "1800",
//       outstandingAmount: "1400",
//       paidAmount: "400",
//       invoiceDate: "14-02-2020",
//     },
// ];

const customStyles = {
  headRow: {
    style: {
      fontWeight: 900,
      fontSize: "14px",
      color: "#ffffff",
      background: "#2980b9",
    },
  },
};

const PaymentTable = ({
  setPaymentCount,
  isPaymentRegister,
  handleViewTransaction,
  handlePaymentComplete,
  filter,
}) => {
  const [companyData, setCompanyData] = useState();
  const [paymentData, setPaymentData] = useState([]);
  const [purePaymentData, setPurePaymentData] = useState([]);
  const [inwardData, setInwardData] = useState([]);
  const [outwardData, setOutwardData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [isDataChanged, setDataChanged] = useState("");
  const navigate = useNavigate();

  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    SettingsService.getCompanySettings().then((res) => {
      setCompanyData(res.data);
    });
    PaymentService.getAllPayments().then((res) => {
      setPaymentData(res.data);
      setPaymentCount(res.data.length);
    });
    OutwardService.getAllOutwards().then((res) => {
      setOutwardData(res.data);
    });
    InwardService.getAllInwards().then((res) => {
      setInwardData(res.data);
    });
    CustomerService.getAllCustomers().then((res) => {
      setCustomerData(res.data);
    });
  }, [isDataChanged]);

  const purifyPaymentData = () => {
    if(paymentData.length) {
      const filtered = [];
      for(let i=0;i<paymentData.length;i++) {
        // console.log("PD",parseInt(paymentData[i].outstandingAmount));
        if(parseInt(paymentData[i].outstandingAmount)>0)
          filtered.push(paymentData[i]);
      }
      setPurePaymentData(filtered)
      setPaymentCount(filtered.length)
    } else {
      setPurePaymentData([]);
      setPaymentCount(0);
    }
  }
  useEffect(()=>{
    if(paymentData.length)
    {
      if(isPaymentRegister) {
        setPurePaymentData(paymentData);
      } else {
        purifyPaymentData();
      }
    }
  },[paymentData]);

  const runFilter = () => {
    let data = purePaymentData;
    if (filter.customerID) {
      data = data.filter((payment) => payment.customerID === filter.customerID);
    }
    if (filter.startDate) {
      const startDate = new Date(filter.startDate);
      data = data.filter((payment) => {
        const paymentDate = new Date(payment.paymentDate);
        return paymentDate >= startDate;
      });
    }
    if (filter.endDate) {
      const endDate = new Date(filter.endDate);
      data = data.filter((payment) => {
        const paymentDate = new Date(payment.paymentDate);
        return paymentDate <= endDate;
      });
    }
    setFilteredData(data);
  };

  useEffect(() => {
    if (!filter) {
      setIsFiltered(false);
      setFilteredData([]);
    } else {
      setIsFiltered(true);
      runFilter();
    }
  }, [purePaymentData, filter]);

  const handlePrint = async (payment) => {
    const customer = customerData.filter(
      (cust) => cust.id === payment.customerID
    )[0];
    const inward = inwardData.filter(
      (inward) => inward.id === payment.inwardID
    )[0];
    navigate("/PaymentRegister/Print", {
      state: {
        companyData: companyData,
        paymentData: payment,
        inwardData: inward,
        customerData: customer,
      },
    });
  };

  const columns = [
    {
      name: "Job ID",
      selector: (row) => row.jobID,
      sortable: true,
      minWidth: "140px",
      maxWidth: "200px",
    },
    {
      name: "Customer",
      selector: (row) => {
        const customer = customerData.filter(
          (customer) => customer.id === row.customerID
        );
        if (!customer) return "";
        return customer[0]?.name;
      },
      sortable: true,
      minWidth: "140px",
    },
    {
      name: "Invoice Amount",
      selector: (row) => {
        const outward = outwardData.filter(
          (outward) => outward.id === row.outwardID
        );
        if (!outward) return "";
        return "₹" + outward[0]?.totalCharge;
      },
      sortable: true,
      minWidth: "120px",
      maxWidth: "180px",
      sortFunction: (a, b) => {
        return parseInt(a.invoiceAmount) - parseInt(b.invoiceAmount);
      },
    },
    {
      name: "Outstanding",
      selector: (row) => "₹" + row.outstandingAmount,
      sortable: true,
      minWidth: "80px",
      maxWidth: "150px",
      sortFunction: (a, b) => {
        return parseInt(a.outstandingAmount) - parseInt(b.outstandingAmount);
      },
    },
    {
      name: "Paid Amount",
      selector: (row) => "₹" + row.paidAmount,
      sortable: true,
      minWidth: "80px",
      maxWidth: "150px",
      sortFunction: (a, b) => {
        return parseInt(a.paidAmount) - parseInt(b.paidAmount);
      },
    },
    {
      name: "Invoice Date",
      selector: (row) => row.invoiceDate,
      sortable: true,
      minWidth: "100px",
      maxWidth: "150px",
      sortFunction: (a, b) => {
        // const d1 = a.date.substring(6,10)+"-"+a.date.substring(3,5)+"-"+a.date.substring(0,2);
        // const d2 = b.date.substring(6,10)+"-"+b.date.substring(3,5)+"-"+b.date.substring(0,2);
        return new Date(a.invoiceDate) - new Date(b.invoiceDate);
      },
    },
    {
      name: "Actions",
      center: true,
      compact: true,
      minWidth: "170px",
      maxWidth: "200px",
      cell: (row) => {
        return (
          <div className="payments_cell_actions">
            <div className="payments_actions_tooltip">
              <span class="tooltiptext posleft">Transaction History</span>
              <RiFileList3Fill
                style={{ cursor: "pointer", color: "#2980b9", margin: "2px" }}
                onClick={handleViewTransaction.bind(null, row.transactionData)}
              />
            </div>
            <div className="payments_actions_tooltip">
              <span class="tooltiptext posright">Complete Payment</span>
              <FaMoneyBill
                style={{ cursor: "pointer", color: "#00cc44", margin: "2px" }}
                onClick={handlePaymentComplete.bind(null, row.id)}
              />
            </div>
          </div>
        );
      },
    },
  ];
  const columnsRegister = [
    {
      name: "Job ID",
      selector: (row) => row.jobID,
      sortable: true,
      minWidth: "140px",
      maxWidth: "200px",
    },
    {
      name: "Customer",
      selector: (row) => {
        const customer = customerData.filter(
          (customer) => customer.id === row.customerID
        );
        if (!customer) return "";
        return customer[0]?.name;
      },
      sortable: true,
      minWidth: "140px",
    },
    {
      name: "Invoice Amount",
      selector: (row) => {
        const outward = outwardData.filter(
          (outward) => outward.id === row.outwardID
        );
        if (!outward) return "";
        return "₹" + outward[0]?.totalCharge;
      },
      sortable: true,
      minWidth: "120px",
      maxWidth: "200px",
      sortFunction: (a, b) => {
        return parseInt(a.invoiceAmount) - parseInt(b.invoiceAmount);
      },
    },
    {
      name: "Date",
      selector: (row) => row.paymentDate,
      sortable: true,
      minWidth: "100px",
      maxWidth: "180px",
      sortFunction: (a, b) => {
        // const d1 = a.date.substring(6,10)+"-"+a.date.substring(3,5)+"-"+a.date.substring(0,2);
        // const d2 = b.date.substring(6,10)+"-"+b.date.substring(3,5)+"-"+b.date.substring(0,2);
        return new Date(a.paymentDate) - new Date(b.paymentDate);
      },
    },
    {
      name: "Status",
      selector: (row) =>
        row.isPending ? "Payment Pending" : "Payment Complete",
      sortable: true,
      minWidth: "80px",
      maxWidth: "150px",
    },
    {
      name: "Actions",
      center: true,
      compact: true,
      minWidth: "170px",
      maxWidth: "200px",
      cell: (row) => {
        return (
          <div className="payments_cell_actions">
            <div className="payments_actions_tooltip">
              <span class="tooltiptext posleft">Transaction History</span>
              <RiFileList3Fill
                style={{ cursor: "pointer", color: "#2980b9", margin: "2px" }}
                onClick={handleViewTransaction.bind(null, row.transactionData)}
              />
            </div>
            <div className="payments_actions_tooltip">
              {/* <span class="tooltiptext posright">Print</span> */}
              <AiOutlinePrinter
                style={{ cursor: "pointer", color: "#2980b9", margin: "2px" }}
                onClick={handlePrint.bind(null, row)}
              />
            </div>
          </div>
        );
      },
    },
  ];

  const emptyTableRender = (
    <div className="payments_table_empty">
      <h3>No Pending Payments Found</h3>
    </div>
  );
  return (
    <div className="PaymentTable">
      {purePaymentData.length > 0 ? (
        <DataTable
          columns={isPaymentRegister ? columnsRegister : columns}
          data={isFiltered ? filteredData : purePaymentData}
          customStyles={customStyles}
        />
      ) : (
        emptyTableRender
      )}

      {/* {isDeleteModalActive && (
        <Modal
          onClose={() => {
            setDeleteModalActive(false);
            setDeleteId("");
          }}
        >
          <div>
            <h3>Are you sure want to delete this inward?</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "24px",
              }}
            >
              <Button>&nbsp;Yes&nbsp;</Button>
              &nbsp;&nbsp;
              <Button
                onClick={() => {
                  setDeleteModalActive(false);
                  setDeleteId("");
                }}
              >
                &nbsp;No&nbsp;
              </Button>
            </div>
          </div>
        </Modal>
      )} */}
    </div>
  );
};

export default PaymentTable;
