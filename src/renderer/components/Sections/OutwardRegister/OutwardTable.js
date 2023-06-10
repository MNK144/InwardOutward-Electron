import React from "react";
import "./OutwardTable.css";
import DataTable from "react-data-table-component";
import { AiOutlinePrinter } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import InwardService from "../../../services/inward-service";
import CustomerService from "../../../services/customer-service";
import { useNavigate } from "react-router-dom";
import OutwardService from "../../../services/outward-service";
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

const OutwardTable = ({ filter }) => {
  const [companyData,setCompanyData] = useState();
  const [outwardData, setOutwardData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [isDataChanged, setDataChanged] = useState("");
  const navigate = useNavigate();

  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    SettingsService.getCompanySettings().then(res=>{
      setCompanyData(res.data);
    })
    OutwardService.getAllOutwards().then((res) => {
      setOutwardData(res.data);
    });
    // InwardService.getAllInwards().then((res) => {
    //   setOutwardData(res.data);
    // });
    CustomerService.getAllCustomers().then((res) => {
      setCustomerData(res.data);
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
    let data = outwardData;
    if (filter.customerID) {
      data = data.filter((outward) => outward.customerID === filter.customerID);
    }
    if (filter.startDate) {
      const startDate = new Date(filter.startDate);
      data = data.filter((outward) => {
        const outwardDate = new Date(outward.invoiceDate);
        return outwardDate >= startDate;
      });
    }
    if (filter.endDate) {
      const endDate = new Date(filter.endDate);
      data = data.filter((outward) => {
        const outwardDate = new Date(outward.invoiceDate);
        return outwardDate <= endDate;
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

  const handlePrint = async (outward) => {
    // window.open('./CustomerInward/Print','_blank');
    const customer = customerData.filter(
      (cust) => cust.id === outward.customerID
    )[0];
    const inward = await InwardService.getInward(outward.inwardID);
    navigate("/CustomerOutward/Print", {
      state: { companyData: companyData,outwardData: outward, inwardData: inward.data ,customerData: customer },
    });
  };

  const columns = [
    {
      name: "Job Id",
      selector: (row) => row.jobID,
      sortable: true,
      minWidth: "160px",
      maxWidth: "180px",
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
      // sortable: true,
      minWidth: "180px",
      maxWidth: "200px",
    },
    {
      name: "Total Price",
      selector: (row) => "₹" + row.totalCharge,
      sortable: true,
      maxWidth: "140px",
      sortFunction: (a, b) => {
        return parseInt(a.totalCharge) - parseInt(b.totalCharge);
      },
    },
    {
      name: "Outward Date",
      selector: (row) => row.invoiceDate,
      sortable: true,
      minWidth: "135px",
      maxWidth: "150px",
      sortFunction: (a, b) => {
        // const d1 = a.date.substring(6,10)+"-"+a.date.substring(3,5)+"-"+a.date.substring(0,2);
        // const d2 = b.date.substring(6,10)+"-"+b.date.substring(3,5)+"-"+b.date.substring(0,2);
        // const d1 =
        //   a.date.substring(6, 10) +
        //   "-" +
        //   a.date.substring(3, 5) +
        //   "-" +
        //   a.date.substring(0, 2);
        // const d2 =
        //   b.date.substring(6, 10) +
        //   "-" +
        //   b.date.substring(3, 5) +
        //   "-" +
        //   b.date.substring(0, 2);
        return new Date(a.invoiceDate) - new Date(b.invoiceDate);
      },
    },
    {
      name: "Job Status",
      selector: (row) => row.jobStatus,
      maxWidth: "180px",
    },
    {
      name: "Remarks",
      selector: (row) => row.remarks,
      minWidth: "250px",
    },
    {
      name: "Actions",
      center: true,
      compact: true,
      minWidth: "120px",
      maxWidth: "160px",
      cell: (row) => {
        return (
          <div className="OutwardTable_cell_actions">
            <AiOutlinePrinter
              style={{ cursor: "pointer", color: "#2980b9" }}
              onClick={handlePrint.bind(null, row)}
            />
          </div>
        );
      },
    },
  ];

  const emptyTableRender = (
    <div className="OutwardTable_table_empty">
      <h3>No Outwards Found</h3>
    </div>
  );
  return (
    <div className="OutwardTable">
      <DataTable
        columns={columns}
        data={isFiltered ? filteredData : outwardData}
        customStyles={customStyles}
      />
    </div>
  );
};

export default OutwardTable;
