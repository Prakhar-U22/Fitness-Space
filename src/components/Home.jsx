import React from "react";
import Navbar from "./Navbar";
import Body from "./Body";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Navbar />
      
      {/* Empty main area for now */}
      <main className="home-main">
        <Body/>  {/* You can add your sections here later */}
      </main>
    </div>
  );
};

export default Home;
