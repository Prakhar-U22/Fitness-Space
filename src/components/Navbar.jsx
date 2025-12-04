import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left">
        <button className="btn home-btn">Home</button>
      </div>

      <div className="right">
        <button className="btn login-btn">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
