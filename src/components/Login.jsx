import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>

      <form className="login-form">
        <input type="text" placeholder="Email or Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
