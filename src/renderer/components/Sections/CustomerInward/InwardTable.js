import React from "react";
import "./InwardTable.css";
import DataTable from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
// import { AiFillEye } from "react-icons/ai";
import { AiOutlinePrinter } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import InwardService from "../../../services/inward-service";
import CustomerService from "../../../services/customer-service";
import Modal from "../../Misc/Modal";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";
import SettingsService from "../../../services/settings-service";

const DUMMY_DATA = [
  {
    id: 1,
    jobid: "ABC/2022-23/1050",
    customer: "Mark Robert Johnson",
    totalCharge: "1000",
    date: "12-02-2020",
  },
  {
    id: 2,
    jobid: "A2",
    customer: "Mike",
    totalCharge: "5000",
    date: "14-04-2019",
  },
  {
    id: 3,
    jobid: "A3",
    customer: "John",
    totalCharge: "500",
    date: "31-10-2022",
  },
  {
    id: 4,
    jobid: "A4",
    customer: "Tom",
    totalCharge: "1000",
    date: "11-03-2021",
  },
];

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

const InwardTable = ({
  setInwardCount,
  handleEdit,
  isInwardRegister,
  filter,
}) => {
  const [companyData, setCompanyData] = useState();
  const [inwardData, setInwardData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [isDeleteModalActive, setDeleteModalActive] = useState(false);
  const [isDataChanged, setDataChanged] = useState("");
  const navigate = useNavigate();

  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    SettingsService.getCompanySettings().then((res) => {
      setCompanyData(res.data);
    });
    InwardService.getAllInwards().then((res) => {
      setInwardData(res.data);
      setInwardCount(res.data.length);
    });
    CustomerService.getAllCustomers().then((res) => {
      setCustomerData(res.data);
    });
  }, [isDataChanged]);

  const runFilter = () => {
    let data = inwardData;
    if (filter.customerID) {
      data = data.filter((inward) => inward.customerID === filter.customerID);
    }
    if (filter.startDate) {
      const startDate = new Date(filter.startDate);
      data = data.filter((inward) => {
        const inwardDate = new Date(inward.inwardDate);
        return inwardDate >= startDate;
      });
    }
    if (filter.endDate) {
      const endDate = new Date(filter.endDate);
      data = data.filter((inward) => {
        const inwardDate = new Date(inward.inwardDate);
        return inwardDate <= endDate;
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
  }, [inwardData, filter]);

  const handlePrint = (inward) => {
    // window.open('./CustomerInward/Print','_blank');
    const customer = customerData.filter(
      (cust) => cust.id === inward.customerID
    )[0];
    navigate("/CustomerInward/Print", {
      state: {
        companyData: companyData,
        inwardData: inward,
        customerData: customer,
      },
    });
  };
  // const handleEdit = (id) => {};
  const handleDelete = (id) => {
    console.log("handleDelete Called: " + id);
    setDeleteId(id);
    setDeleteModalActive(true);
  };
  const handleConfirmDelete = () => {
    console.log("handle final delete " + deleteId);
    InwardService.deleteInward(deleteId)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "Success") {
          console.log("Delete Successfully");
        } else {
          console.log("Failed to delete");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setDeleteModalActive(false);
        setDeleteId("");
      });

    CustomerService.deleteCustomer(deleteId)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "Success") {
          console.log("Deleted Successfully");
        } else {
          console.log("Failed to delete");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setDeleteModalActive(false);
        setDataChanged(deleteId);
        setDeleteId("");
      });
  };

  const columns = [
    {
      name: "Job Id",
      selector: (row) => row.jobID,
      sortable: true,
      minWidth: "160px",
      maxWidth: "210px",
    },
    {
      name: "Customer",
      selector: (row) => {
        const customer = customerData.filter(
          (customer) => customer.id === row.customerID
        );
        console.log(customer);
        if (!customer) return "";
        return customer[0]?.name;
      },
      sortable: true,
      minWidth: "180px",
    },
    {
      name: "Total Price",
      selector: (row) => "₹" + row.totalCharge,
      sortable: true,
      maxWidth: "250px",
      sortFunction: (a, b) => {
        return parseInt(a.totalCharge) - parseInt(b.totalCharge);
      },
    },
    {
      name: "Inward Date",
      selector: (row) => row.inwardDate,
      sortable: true,
      minWidth: "135px",
      maxWidth: "250px",
      sortFunction: (a, b) => {
        // const d1 = a.date.substring(6,10)+"-"+a.date.substring(3,5)+"-"+a.date.substring(0,2);
        // const d2 = b.date.substring(6,10)+"-"+b.date.substring(3,5)+"-"+b.date.substring(0,2);
        const d1 =
          a.date.substring(6, 10) +
          "-" +
          a.date.substring(3, 5) +
          "-" +
          a.date.substring(0, 2);
        const d2 =
          b.date.substring(6, 10) +
          "-" +
          b.date.substring(3, 5) +
          "-" +
          b.date.substring(0, 2);
        return new Date(d1) - new Date(d2);
      },
    },
    {
      name: "Actions",
      center: true,
      compact: true,
      minWidth: "120px",
      maxWidth: "160px",
      cell: (row) => {
        if (isInwardRegister) {
          return (
            <div className="inward_cell_actions">
              <AiOutlinePrinter
                style={{ cursor: "pointer", color: "#2980b9" }}
                onClick={handlePrint.bind(null, row)}
              />
            </div>
          );
        } else {
          return (
            <div className="inward_cell_actions">
              <AiOutlinePrinter
                style={{ cursor: "pointer", color: "#2980b9", margin: "2px" }}
                onClick={handlePrint.bind(null, row)}
              />
              <FiEdit
                style={{ cursor: "pointer", color: "#2980b9", margin: "2px" }}
                onClick={handleEdit.bind(null, row.id)}
              />
              <RiDeleteBinLine
                style={{ cursor: "pointer", color: "#ee4744", margin: "2px" }}
                onClick={handleDelete.bind(null, row.id)}
              />
            </div>
          );
        }
      },
    },
  ];

  const emptyTableRender = (
    <div className="inward_table_empty">
      <h3>No Inwards Found</h3>
    </div>
  );
  return (
    <div className="InwardTable">
      {inwardData.length > 0 ? (
        <DataTable
          columns={columns}
          data={isFiltered ? filteredData : inwardData}
          customStyles={customStyles}
        />
      ) : (
        emptyTableRender
      )}

      {isDeleteModalActive && (
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
              <Button onClick={handleConfirmDelete}>&nbsp;Yes&nbsp;</Button>
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
      )}
    </div>
  );
};

export default InwardTable;
