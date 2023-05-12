import React, { useState } from "react";
import "./CustomerInward.css";
import Button from "../../UI/Button";
import InwardAdd from "./InwardAdd";
import InwardTable from "./InwardTable";

const CustomerInward = () => {

  const [inwardCount, setInwardCount] = useState(0);
  const [isInwardAdd, setInwardAdd] = useState(false);
  const [isAddInwardButtonActive, setAddInwardButtonActive] =
    useState(false);
  const [isInwardEdit, setInwardEdit] = useState(false);
  const [inwardEditId, setInwardEditId] = useState("");

  const toggleAddInwardButton = () => {
    setAddInwardButtonActive((prev) => !prev);
  };
  const handleAddInwardButton = () => {
    if (!isInwardEdit) {
      setInwardAdd((isInwardAdd) => !isInwardAdd);
    } else {
      setInwardEdit((isInwardEdit) => !isInwardEdit);
    }
    toggleAddInwardButton();
  };

  const handleEdit = (id) => {
    setInwardEditId(id);
    setInwardEdit(true);
    toggleAddInwardButton();
    // toggleAddInwardButton();
  };

  return (
    <div className="CustomerInward">
      <div className="inward_topbar">
        <p>Total Inwards: {inwardCount}</p>
        <Button
          className="inward_topbar_btn"
          style={{ fontWeight: "bolder" }}
          onClick={handleAddInwardButton}
        >
          {isAddInwardButtonActive ? "View Inwards" : "Add Inward"}
        </Button>
      </div>
      {!isInwardAdd && !isInwardEdit && (
        <InwardTable
          setInwardCount={setInwardCount}
          handleEdit={handleEdit}
        />
      )}
      {isInwardAdd && !isInwardEdit && (
        <InwardAdd
          setInwardAdd={setInwardAdd}
          toggleAddButton={toggleAddInwardButton}
          editMode={false}
        />
      )}
      {!isInwardAdd && isInwardEdit && (
        <InwardAdd
          inwardEditId={inwardEditId}
          toggleAddButton={toggleAddInwardButton}
          editMode={true}
          setInwardEdit={setInwardEdit}
        />
      )}
    </div>
  );
};

export default CustomerInward;
