import React from "react";
import "./Navbar.css";

const Navbar = ({ goLogin, goHome }) => {
  return (
    <nav className="navbar">
      
      {/* LEFT SIDE BUTTONS */}
      <div className="nav-left">
        <button className="nav-btn home-btn" onClick={goHome}>Home</button>
        <button className="nav-btn nav-link">Health Topics</button>
        <button className="nav-btn nav-link">Services</button>
        <button className="nav-btn nav-link">Contact Us</button>
      </div>

      {/* RIGHT SIDE LOGIN */}
      <div className="nav-right">
        <button className="nav-btn login-btn" onClick={goLogin}>
          Login
        </button>
      </div>

    </nav>
  );
};

export default Navbar;
