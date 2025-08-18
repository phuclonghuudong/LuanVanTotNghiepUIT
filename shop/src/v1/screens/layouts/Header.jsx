// import React, { useState } from "react";
import TopNavbar from "./TopNavbar";
import Navbar from "./Navbar";

const Header = ({ onCartClick, onMenuClick }) => {
  return (
    <>
      <TopNavbar />
      <Navbar onCartClick={onCartClick} onMenuClick={onMenuClick} />
    </>
  );
};

export default Header;
