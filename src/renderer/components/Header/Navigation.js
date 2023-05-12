import React from "react";
import { FaHome } from "react-icons/fa";
import { BiListPlus, BiListMinus } from "react-icons/bi";
import {
  MdPayments,
  MdPayment,
  MdOutlinePerson,
  MdSettings,
} from "react-icons/md";
import { TbDatabaseImport, TbDatabaseExport } from "react-icons/tb";
import { RiFileList3Line } from "react-icons/ri";
import "./Navigation.css";
import { NavLink } from "react-router-dom";

const iconStyle = { marginRight: "5px" };
const navLinkClass = ({ isActive }) => (isActive ? "LinkActive" : "Link");

const Navigation = () => {
  return (
    <nav className="Navigation">
      <ul>
        <NavLink to="/Dashboard" className={navLinkClass}>
          <li>
            <FaHome style={iconStyle} />
            <p className="NavText">Dashboard</p>
          </li>
        </NavLink>
        <NavLink to="/Customers" className={navLinkClass}>
          <li>
            <MdOutlinePerson style={iconStyle} />
            <p className="NavText">Customers</p>
          </li>
        </NavLink>
        <NavLink to="/CustomerInward" className={navLinkClass}>
          <li>
            <BiListPlus style={iconStyle} />
            <p className="NavText">Customer Inward</p>
          </li>
        </NavLink>
        <NavLink to="/CustomerOutward" className={navLinkClass}>
          <li>
            <BiListMinus style={iconStyle} />
            <p className="NavText">Customer Outward</p>
          </li>
        </NavLink>
        <NavLink to="/Payments" className={navLinkClass}>
          <li>
            <MdPayments style={iconStyle} />
            <p className="NavText">Payments</p>
          </li>
        </NavLink>
        <NavLink to="/InwardRegister" className={navLinkClass}>
          <li>
            <TbDatabaseImport style={iconStyle} />
            <p className="NavText">Inward Register</p>
          </li>
        </NavLink>
        <NavLink to="/OutwardRegister" className={navLinkClass}>
          <li>
            <TbDatabaseExport style={iconStyle} />
            <p className="NavText">Outward Register</p>
          </li>
        </NavLink>
        <NavLink to="/PaymentRegister" className={navLinkClass}>
          <li>
            <MdPayment style={iconStyle} />
            <p className="NavText">Payment Register</p>
          </li>
        </NavLink>
        <NavLink to="/JobRegister" className={navLinkClass}>
          <li>
            <RiFileList3Line style={iconStyle} />
            <p className="NavText">Job Register</p>
          </li>
        </NavLink>
        <NavLink to="/Settings" className={navLinkClass}>
          <li>
            <MdSettings style={iconStyle} />
            <p className="NavText">Settings</p>
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navigation;
