import React, { useState } from "react";
import "./OutwardSelectTable.css";
import DataTable from "react-data-table-component";
import { FaCheck } from "react-icons/fa";
import { useEffect } from "react";
import CustomerService from "../../../services/customer-service";
import InwardService from "../../../services/inward-service";

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

const OutwardSelectTable = ({handleSelect}) => {
  const [isNoData, setIsNoData] = useState(false);
  const [customerData,setCustomerData] = useState([]);
  const [inwardData,setInwardData] = useState([]);

  useEffect(()=> {
    CustomerService.getAllCustomers().then((res)=>{
        console.log(res.data);
        setCustomerData(res.data);
    });
  },[])

  useEffect(()=> {
    if(customerData.length) {
        InwardService.getAllInwards().then((res)=>{
            setInwardData(res.data);
        });
    }
  },[customerData])

  useEffect(()=>{
    if(inwardData.length) setIsNoData(false);
    else setIsNoData(true);
  },[inwardData])

  // const handleSelect = (id) => {};

  const columns = [
    {
      name: "Job Id",
      minWidth: "100px",
      maxWidth: "150px",
      cell: (row) => {
        return (
            <div className="OutwardSelectTable_cell_override">{row.jobID}</div>
        )
      },
    },
    {
      name: "Customer",
      minWidth:"100px",
      selector: (row) => {
        const customer = customerData.filter((customer)=>customer.id===row.customerID);
        console.log(customer);
        if(!customer) return "";
        return customer[0]?.name;
      },
    },
    {
      name: "Total",
      maxWidth: "80px",
      cell: (row) => {
        return (
            <div className="OutwardSelectTable_cell_override">₹{row.totalPrice}</div>
        )
      },
    },
    {
      name: "Date",
      maxWidth: "100px",
      cell: (row) => {
        return (
            <div className="OutwardSelectTable_cell_override">{row.inwardDate}</div>
        )
      },
    },
    {
      name: "Actions",
      center: true,
      compact: true,
      maxWidth: "50px",
      cell: (row) => {
        return (
          <div className="OutwardSelectTable_cell_actions">
            <FaCheck
              style={{ cursor: "pointer", color: "#2980b9" }}
              onClick={handleSelect.bind(null, row)}
            />
          </div>
        );
      },
    },
  ];

  const emptyTableRender = (
    <div className="OutwardSelectTable_table_empty">
      <h3>No Active Inwards Found</h3>
    </div>
  );

  return (
    <div className="OutwardSelectTable">
      {isNoData && emptyTableRender}
      {!isNoData && (
        <DataTable
          columns={columns}
          data={inwardData}
          customStyles={customStyles}
        />
      )}
    </div>
  );
};

export default OutwardSelectTable;
