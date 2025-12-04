<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
=======
import React, { useState } from 'react';
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar"; 
import Dashboard from "./components/Dashboard";
import './App.css';
>>>>>>> 82c21ef6c29b32bd443410e72c7c68225a9963dd

function App() {
  const [count, setCount] = useState(0)

  const [page, setPage] = useState("home");

  return (
    <>
<<<<<<< HEAD
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
=======
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
            goToDashboard={() => setPage("dashboard")}
        />
        
      )}
      {page === "dashboard" && (
        <Dashboard onLogout={() => setPage("home")} />
      )}

      {page === "register" && (
        <Register goBack={() => setPage("login")} />
      )}
>>>>>>> 82c21ef6c29b32bd443410e72c7c68225a9963dd
    </>
  );
}

export default App
