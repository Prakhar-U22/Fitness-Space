import React from "react";
import "./TopHeader.css";

const TopHeader = () => {
  return (
    <div className="top-header">
      <div className="top-header-content">

        {/* Logo Box */}
        <div className="logo-box">
          <span className="logo-text">FS</span>
        </div>

        {/* Title + tagline */}
        <div className="title-block">
          <h1 className="site-title">Fitness Space</h1>
          <p className="site-tagline">Your Wellness. Your Journey.</p>
        </div>

      </div>
    </div>
  );
};

export default TopHeader;
