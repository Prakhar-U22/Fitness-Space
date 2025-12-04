import React, { useState } from 'react';
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import './App.css';

function App() {

  const [page, setPage] = useState("login");

  return (
    <>
      <Navbar />

      {page === "login" && <Login goToRegister={() => setPage("register")} />}

      {page === "register" && <Register goBack={() => setPage("login")} />}
    </>
  );
}

export default App;
