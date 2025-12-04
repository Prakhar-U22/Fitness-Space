import { useState } from "react";
import "./Login.css";

export default function Login({ goToRegister, goToHome, goToDashboard }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://fitness-space-tuyn.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.error || "Invalid credentials");

      alert("Login successful!");
      localStorage.setItem("token", data.token);
      // goToHome();  // Redirect after login
      goToDashboard();

    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to continue your journey</p>

        <form onSubmit={handleLogin}>
          <div className="login-field">
            <label className="login-label">Email ID</label>
            <input
              type="email"
              className="login-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label className="login-label">Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <div className="switch-area">
          New patient?{" "}
          <span className="switch-link" onClick={goToRegister}>
            Create an account
          </span>
        </div>

        <div className="switch-area">
          <span className="switch-link" onClick={goToHome}>
            ← Back to Home
          </span>
        </div>
      </div>
    </div>
  );
}
