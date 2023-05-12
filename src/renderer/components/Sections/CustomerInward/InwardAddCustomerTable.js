import React, { useState } from "react";
import "./InwardAddCustomerTable.css";
import DataTable from "react-data-table-component";
import { FaCheck } from "react-icons/fa";
import { useEffect } from "react";
import CustomerService from "../../../services/customer-service";

const DUMMY_DATA = [
  {
    id: 1,
    name: "Manank",
    phone: "8511443237",
    email: "patel.manank144@gmail.com",
  },
  {
    id: 2,
    name: "John",
    phone: "9898989898",
    email: "johndoe@gmail.com",
  },
  {
    id: 3,
    name: "Mark Johnson",
    phone: "9756485858",
    email: "mark007@gmail.com",
  },
  {
    id: 4,
    name: "Mike",
    phone: "8585858585",
    email: "mike85@gmail.com",
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

const InwardAddCustomerTable = ({handleSelect}) => {
  const [isNoData, setIsNoData] = useState(false);
  const [customerData,setCustomerData] = useState([]);

  useEffect(()=> {
    CustomerService.getAllCustomers().then((res)=>{
        console.log(res.data);
        setCustomerData(res.data);
    });
  },[])

  useEffect(()=> {
    if(customerData.length) setIsNoData(false);
    else setIsNoData(true);
  },[customerData])

  // const handleSelect = (id) => {};

  const columns = [
    {
      name: "Name",
      maxWidth: "150px",
      cell: (row) => {
        return (
            <div className="inwardAddCustomer_cell_override">{row.name}</div>
        )
      }
    },
    {
      name: "Phone No",
      maxWidth: "120px",
      cell: (row) => {
        return (
            <div className="inwardAddCustomer_cell_override">{row.phone}</div>
        )
      }
    },
    {
      name: "Email",
      cell: (row) => {
        return (
            <div className="inwardAddCustomer_cell_override">{row.email}</div>
        )
      }
    },
    {
      name: "Select",
      center: true,
      maxWidth: "50px",
      cell: (row) => {
        return (
          <div className="inwardAddCustomer_cell_actions">
            <FaCheck
              style={{ cursor: "pointer", color: "#2980b9" }}
              onClick={handleSelect.bind(null, row.id, row.name)}
            />
          </div>
        );
      },
    },
  ];

  const emptyTableRender = (
    <div className="inwardAddCustomer_table_empty">
      <h3>No Customers Added yet</h3>
    </div>
  );
  return (
    <div className="InwardAddCustomerTable">
      {isNoData && emptyTableRender}
      {!isNoData && (
        <DataTable
          columns={columns}
          data={customerData}
          customStyles={customStyles}
        />
      )}
    </div>
  );
};

export default InwardAddCustomerTable;
