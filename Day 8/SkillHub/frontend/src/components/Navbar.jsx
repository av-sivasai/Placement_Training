import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { FaMoon, FaSun } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, setDark } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <h2>SkillHub</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user && (
          <li onClick={() => setOpen(!open)} className="menu-item">
            Courses ▼
            {open && (
              <div className="dropdown">
                <Link to="/courses">All Courses</Link>
                <Link to="/add-course">Add Course</Link>
              </div>
            )}
          </li>
        )}
        {user && (
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        )}
        {!user ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <li className="menu-item" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <span>Hi, {user.name}</span>
            <button onClick={handleLogout} style={{background: 'red', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Logout</button>
          </li>
        )}
      </ul>
      <button className="theme-btn" onClick={() => setDark(!dark)}>
        {dark ? <FaSun /> : <FaMoon />}
      </button>
    </nav>
  );
}

export default Navbar;
