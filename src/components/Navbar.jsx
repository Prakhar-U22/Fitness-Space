import { useNavigate } from "react-router-dom";
import "./Navbar.css";
// import Login from "./Login";

<<<<<<< HEAD
const Navbar = () => {
  const navigate = useNavigate();

=======
const Navbar = ({ goLogin, goHome }) => {
>>>>>>> 82c21ef6c29b32bd443410e72c7c68225a9963dd
  return (
    <nav className="navbar">
      <div className="nav-left">
<<<<<<< HEAD
        <button className="nav-btn home-btn" onClick={() => navigate("/")}>
          Home
        </button>

=======
        <button className="nav-btn home-btn" onClick={goHome}>Home</button>
>>>>>>> 82c21ef6c29b32bd443410e72c7c68225a9963dd
        <button className="nav-btn nav-link">Health Topics</button>
        <button className="nav-btn nav-link">Services</button>
        <button className="nav-btn nav-link">Contact Us</button>
      </div>

      <div className="nav-right">
<<<<<<< HEAD
        <button
          className="nav-btn login-btn"
          onClick={() => navigate("/login")}
        >
=======
        <button className="nav-btn login-btn" onClick={goLogin}>
>>>>>>> 82c21ef6c29b32bd443410e72c7c68225a9963dd
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
