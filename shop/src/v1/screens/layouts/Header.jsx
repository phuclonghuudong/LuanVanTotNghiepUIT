// import React, { useState } from "react";
import TopNavbar from "./TopNavbar";
import Navbar from "./Navbar";

const Header = ({ user, onCartClick, onMenuClick }) => {
  return (
    <>
      <TopNavbar />
      <Navbar user={user} onCartClick={onCartClick} onMenuClick={onMenuClick} />
    </>
  );
};

export default Header;
