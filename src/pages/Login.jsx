import React, { useState } from "react";
import { login, fetchProtected } from "../api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [protectedMsg, setProtectedMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    // hit backend login API
    const res = await login({ email, password });

    if (res.error) {
      setMsg(res.error);
    } else {
      localStorage.setItem("token", res.token);
      setMsg("Login successful! Token saved in localStorage.");
    }
  };

  const callProtected = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setProtectedMsg("No token found! Please login first.");
      return;
    }

    const res = await fetchProtected(token);
    setProtectedMsg(JSON.stringify(res, null, 2));
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label> <br />
          <input
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Password</label> <br />
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button style={{ marginTop: 15 }} type="submit">
          Login
        </button>
      </form>

      {/* Show login success/error messages */}
      <div style={{ marginTop: 12, color: "blue" }}>{msg}</div>

      {/* Protected route tester */}
      <button style={{ marginTop: 20 }} onClick={callProtected}>
        Call Protected Route
      </button>

      <pre style={{ marginTop: 12 }}>{protectedMsg}</pre>
    </div>
  );
}
