import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="nav-btn home-btn">Home</button>
      </div>

      <div className="nav-right">
        <button className="nav-btn login-btn">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
