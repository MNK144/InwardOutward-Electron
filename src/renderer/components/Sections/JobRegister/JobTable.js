import React from "react";
import "./JobTable.css";
import DataTable from "react-data-table-component";
import { RiFileList3Fill } from "react-icons/ri";
import { useState } from "react";
import { useEffect } from "react";
import InwardService from "../../../services/inward-service";
import CustomerService from "../../../services/customer-service";
import { useNavigate } from "react-router-dom";
import OutwardService from "../../../services/outward-service";
import SettingsService from "../../../services/settings-service";
import JobService from "../../../services/job-service";

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

const JobTable = ({ filter }) => {
  const [companyData, setCompanyData] = useState();
  const [jobData, setJobData] = useState([]);
  const [outwardData, setOutwardData] = useState([]);
  const [inwardData, setInwardData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [isDataChanged, setDataChanged] = useState("");
  const navigate = useNavigate();

  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    SettingsService.getCompanySettings().then((res) => {
      setCompanyData(res.data);
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
    JobService.getAllJobs().then((res) => {
      setJobData(res.data);
    });
  }, [isDataChanged]);

  //   useEffect(()=>{
  //     if(outwardData.length && customerData.length) {
  //         const updatedPayload = outwardData.map(async (outward)=>{
  //             const inward = await InwardService.getInward(outward.inwardID);
  //             const customer = customerData.filter((customer)=>customer.id===inward.data.customerID)[0];
  //             const rt =  {...outward,customerName:customer.name};
  //             console.log("rt:",rt);
  //             return rt;
  //         });
  //         console.log("updatedPayload",updatedPayload);
  //         setOutwardDataP(updatedPayload);
  //     }
  //   },[outwardData,customerData])

  const runFilter = () => {
    let data = jobData;
    if (filter.customerID) {
      data = data.filter((job) => job.customerID === filter.customerID);
    }
    if (filter.startDate) {
      const startDate = new Date(filter.startDate);
      data = data.filter((job) => {
        const inwardDate = new Date(job.inwardDate);
        return inwardDate >= startDate;
      });
    }
    if (filter.endDate) {
      const endDate = new Date(filter.endDate);
      data = data.filter((job) => {
        const inwardDate = new Date(job.inwardDate);
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
  }, [outwardData, filter]);

  const handleView = (id) => {
    //do something
  };

  const columns = [
    {
      name: "Job Id",
      selector: (row) => row.jobID,
      sortable: true,
      minWidth: "120px",
      maxWidth: "140px",
    },
    {
      name: "Customer",
      selector: (row) => {
        const customer = customerData.filter(
          (customer) => customer.id === row.customerID
        );
        // console.log(customer);
        if (!customer) return "";
        return customer[0]?.name;
      },
      sortable: true,
      minWidth: "180px",
      maxWidth: "200px",
    },
    {
      name: "Inward Date",
      selector: (row) => row.inwardDate,
      minWidth: "135px",
      maxWidth: "150px",
      // sortFunction: (a, b) => {
      //   return new Date(a.invoiceDate) - new Date(b.invoiceDate);
      // },
    },
    {
      name: "Outward Date",
      selector: (row) => {
        if(!row.outwardID) return "N/A"
        const outward = outwardData.filter(
          (outward) => outward.id === row.outwardID
        );
        if (!outward) return "";
        return outward[0]?.invoiceDate;
      },
      minWidth: "135px",
      maxWidth: "150px",
    },
    {
      name: "Inward Total",
      selector: (row) => {
        const inward = inwardData.filter(
          (inward) => inward.id === row.inwardID
        );
        if (!inward || !inward[0]) return "";
        return "₹" + inward[0]?.totalCharge;
      },
      // sortable: true,
      maxWidth: "140px",
      // sortFunction: (a, b) => {
      //   return parseInt(a.totalCharge) - parseInt(b.totalCharge);
      // },
    },
    {
      name: "Outward Total",
      selector: (row) => {
        if(!row.outwardID) return "N/A"
        const outward = outwardData.filter(
          (outward) => outward.id === row.outwardID
        );
        if (!outward || !outward[0]) return "";
        return "₹" + outward[0]?.totalCharge;
      },
      // sortable: true,
      maxWidth: "140px",
      // sortFunction: (a, b) => {
      //   return parseInt(a.totalCharge) - parseInt(b.totalCharge);
      // },
    },
    {
      name: "Received From",
      selector: (row) => {
        const inward = inwardData.filter(
          (inward) => inward.id === row.inwardID
        );
        if (!inward || !inward[0]) return "";
        return inward[0]?.receivedFrom;
      },
      maxWidth: "150px",
    },
    {
      name: "Actions",
      center: true,
      compact: true,
      minWidth: "120px",
      maxWidth: "160px",
      cell: (row) => {
        return (
          <div className="JobTable_cell_actions">
            <RiFileList3Fill
              style={{ cursor: "pointer", color: "#2980b9" }}
              onClick={handleView.bind(null, row)}
            />
          </div>
        );
      },
    },
  ];

  const emptyTableRender = (
    <div className="JobTable_table_empty">
      <h3>No Jobs Found</h3>
    </div>
  );
  return (
    <div className="JobTable">
      <DataTable
        columns={columns}
        data={isFiltered ? filteredData : jobData}
        customStyles={customStyles}
      />
    </div>
  );
};

export default JobTable;
