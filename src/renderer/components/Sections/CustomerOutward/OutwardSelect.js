import React, { useState } from "react";
import Modal from "../../Misc/Modal";
import "./OutwardSelect.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import OutwardSelectTable from "./OutwardSelectTable";

const OutwardSelect = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Modal className="OutwardSelect_Modal" onClose={props.onClose}>
      <AiOutlineClose
        style={{
          cursor: "pointer",
          position: "absolute",
          right: "2%",
          strokeWidth: "50px",
          width: "15px",
          height: "15px",
        }}
        onClick={props.onClose}
      />
      <div className="OutwardSelect">
        <h2>Inward List</h2>
        <form className="OutwardSelect_form" onSubmit={handleSubmit}>
          <div className="OutwardSelect_formControl">
            <label htmlFor="search">Search:</label>
            <Input
              type="text"
              style={{ margin: "10px" }}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              value={searchTerm}
            />
            <Button style={{ height: "36px", width: "50px", padding: "0px" }}>
              <BiSearchAlt2
                style={{
                  height: "18px",
                  width: "18px",
                  marginTop: "2px",
                  marginLeft: "1px",
                }}
              />
            </Button>
          </div>
        </form>
        {/* <hr style={{ width:"100%"}}/> */}
        <div className="OutwardSelect_tableDiv">
            <OutwardSelectTable handleSelect={props.handleSelect} searchTerm={searchTerm}/>
        </div>
      </div>
    </Modal>
  );
};

export default OutwardSelect;
