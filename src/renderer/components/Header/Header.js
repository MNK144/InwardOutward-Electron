import React from "react";
import Navigation from "./Navigation";
import "./Header.css";

const Header = () => {
  return (
    <header className="Header">
      <h1>Inward Outward</h1>
      <Navigation/>
    </header>
  );
};

export default Header;
