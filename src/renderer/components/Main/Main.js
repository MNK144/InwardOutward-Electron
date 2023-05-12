import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./Main.css";
import TitleBar from "./TitleBar";
import MainContainer from "../UI/MainContainer";
import Dashboard from "../Sections/Dashboard/Dashboard";
import CustomerInward from "../Sections/CustomerInward/CustomerInward";
import Outward from "../Sections/CustomerOutward/Outward";
import Payments from "../Sections/Payments/Payments";
import Customers from "../Sections/Customers/Customers"
import InwardRegister from "../Sections/InwardRegister/InwardRegister";
import OutwardRegister from "../Sections/OutwardRegister/OutwardRegister";
import JobRegister from "../Sections/JobRegister/JobRegister";
import PaymentRegister from "../Sections/PaymentRegister/PaymentRegister";
import Settings from "../Sections/Settings/Settings";

const Main = () => {
  const location = useLocation();
  const title = location.pathname;
  return (
    <div className="Main">
      <TitleBar title={title} />
      <MainContainer>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/Customers" element={<Customers/>} />
          <Route path="/CustomerInward" element={<CustomerInward/>} />
          <Route path="/CustomerOutward" element={<Outward/>} />
          <Route path="/Payments" element={<Payments/>} />
          <Route path="/InwardRegister" element={<InwardRegister/>} />
          <Route path="/OutwardRegister" element={<OutwardRegister/>} />
          <Route path="/PaymentRegister" element={<PaymentRegister/>} />
          <Route path="/JobRegister" element={<JobRegister/>} />
          <Route path="/Settings" element={<Settings/>} />
        </Routes>
      </MainContainer>
    </div>
  );
};

export default Main;
