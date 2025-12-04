import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="nav-btn home-btn" onClick={() => navigate("/")}>
          Home
        </button>

        <button className="nav-btn nav-link">Health Topics</button>
        <button className="nav-btn nav-link">Services</button>
        <button className="nav-btn nav-link">Contact Us</button>
      </div>

      <div className="nav-right">
        <button
          className="nav-btn login-btn"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
