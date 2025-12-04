import React from "react";
import TopHeader from "./TopHeader";
import Navbar from "./Navbar";
import Body from "./Body";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      <TopHeader />   {/* brand banner */}
      <Navbar />      {/* main navigation */}

      <main className="home-main">
        <Body />
      </main>
    </div>
  );
};

export default Home;
