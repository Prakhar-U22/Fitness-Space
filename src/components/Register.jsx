import { useState } from "react";
import "./Register.css";

export default function Register({ goBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const body = { username: name, email, password };

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.error || "Registration failed");

      alert("Registration successful!");
      goBack();

    } catch (err) {
      alert("Error occurred");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2 className="register-title">Create Your Account</h2>
        <p className="register-subtitle">
          Register as a patient to continue
        </p>

        <form onSubmit={handleRegister}>
          <div className="register-field">
            <label className="register-label">Full Name</label>
            <input
              type="text"
              className="register-input"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="register-field">
            <label className="register-label">Email</label>
            <input
              type="email"
              className="register-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="register-field">
            <label className="register-label">Password</label>
            <input
              type="password"
              className="register-input"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="register-field">
            <label className="register-label">Age</label>
            <input
              type="number"
              className="register-input"
              placeholder="Your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="register-field">
            <label className="register-label">Gender</label>
            <select
              className="register-input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <button className="register-btn" type="submit">
            Register
          </button>
        </form>

        <div className="back-area">
          Already have an account?{" "}
          <span className="back-link" onClick={goBack}>
            Login here
          </span>
        </div>
      </div>
    </div>
  );
}
