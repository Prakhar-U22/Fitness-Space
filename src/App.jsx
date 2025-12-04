import React, { useState } from 'react';
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar"; 
import './App.css';

function App() {

  const [page, setPage] = useState("home");

  return (
    <>
      {/* Navbar ALWAYS visible */}
      <Navbar 
        goHome={() => setPage("home")}
        goLogin={() => setPage("login")}
      />

      {page === "home" && <Home />}

      {page === "login" && (
        <Login 
          goToRegister={() => setPage("register")}
          goToHome={() => setPage("home")}
        />
      )}

      {page === "register" && (
        <Register goBack={() => setPage("login")} />
      )}
    </>
  );
}

export default App;
