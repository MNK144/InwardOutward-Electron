import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./CustomerTable.css";
import TableItem from "./TableItem";
import Modal from "../../Misc/Modal";
import Button from "../../UI/Button";
import CustomerService from "../../../services/customer-service";
import DataTable from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

// const DUMMY_CUSTOMERS = [
//   {
//     id: "1",
//     name: "Manank",
//     address: "123, ABC Society, Ahmedabad, Gujarat",
//     phone: "8511443237",
//     email: "patel.manank144@gmail.com",
//   },
//   {
//     id: "2",
//     name: "Manank Patel",
//     address: "M-407 XYZ Residency, Ahmedabad, Gujarat-382480",
//     phone: "8511443237",
//     email: "patel.manank144@gmail.com",
//   },
//   {
//     id: "3",
//     name: "Manank",
//     address:
//       "Abc 123 sdh fjret435 b5j3  tjr jtbre jytjt ye ybejye ybe ntgjdfn tgjre njdf gdf gdf gjdfjjn",
//     phone: "8511443237",
//     email: "patel.manank144@gmail.com",
//   },
//   {
//     id: "4",
//     name: "Manank",
//     address: "M-407 XYZ Residency, Ahmedabad, Gujarat-382480",
//     phone: "8511443237",
//     email: "patel.manank144@gmail.com",
//   },
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

const CustomerTable = ({ setCustomerCount, handleEdit }) => {
  const [customerData, setCustomerData] = useState([]);
  const [isDeleteModalActive, setDeleteModalActive] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isDataChanged, setDataChanged] = useState("");

  const handleDelete = (id) => {
    console.log("handleDelete Called: " + id);
    setDeleteId(id);
    setDeleteModalActive(true);
  };

  const handleConfirmDelete = () => {
    console.log("handle final delete " + deleteId);
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

  useEffect(() => {
    //call get
    CustomerService.getAllCustomers()
      .then((response) => {
        console.log(response.data);
        setCustomerData(response.data);
        setCustomerCount(response.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isDataChanged, setCustomerCount]);

  const emptyTableRender = (
    <div className="cust_table_empty">
      <h3>No Customers Found</h3>
    </div>
  );

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      minWidth: "160px",
      maxWidth: "210px",
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
      minWidth: "180px",
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      maxWidth: "250px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      minWidth: "135px",
      maxWidth: "250px",
    },
    {
      name: "Actions",
      center: true,
      compact: true,
      minWidth: "120px",
      maxWidth: "160px",
      cell: (row) => {
        return (
          <div className="inward_cell_actions">
            <FiEdit
              style={{ cursor: "pointer", color: "#2980b9", margin: "2px" }}
              onClick={handleEdit.bind(null, row.id)}
            />
            <RiDeleteBinLine
              style={{ cursor: "pointer", color: "#ee4744", margin: "2px" }}
              onClick={()=>handleDelete(row.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="CustomerTable">
      {!customerData.length ? (
        emptyTableRender
      ) : (
        // <div className="cst_table">
        //   <div className="cst_row cst_header">
        //     <div className="cst_cell">ID</div>
        //     <div className="cst_cell">Name</div>
        //     <div className="cst_cell">Address</div>
        //     <div className="cst_cell">Phone</div>
        //     <div className="cst_cell">Email</div>
        //     <div className="cst_cell" style={{ textAlign: "center" }}>
        //       Actions
        //     </div>
        //     {/* <div className="cst_cell">Edit</div>
        //   <div className="cst_cell">Delete</div> */}
        //   </div>

        //   {/* {DUMMY_CUSTOMERS.map((item) => (
        //   <TableItem key={item.id} item={item} />
        // ))} */}
        //   {customerData.map((item) => (
        //     <TableItem
        //       key={item.id}
        //       item={item}
        //       customerData={customerData}
        //       setCustomerData={setCustomerData}
        //       handleEdit={handleEdit}
        //       handleDelete={handleDelete}
        //     />
        //   ))}
        // </div>
        <DataTable
          columns={columns}
          data={customerData}
          customStyles={customStyles}
        />
      )}
      {isDeleteModalActive && (
        <Modal
          onClose={() => {
            setDeleteModalActive(false);
            setDeleteId("");
          }}
        >
          <div>
            <h3>Are you sure want to delete this customer?</h3>
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

export default CustomerTable;
