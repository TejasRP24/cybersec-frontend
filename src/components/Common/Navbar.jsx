import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <button
        className={`hamburger ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      <div className={`sidebar-navbar ${open ? "open" : ""}`}>
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul>
          <li className={location.pathname === "/admin/dashboard" ? "active" : ""}>
            <Link to="/admin/dashboard" onClick={() => setOpen(false)}>
              Upload Question
            </Link>
          </li>
          <li className={location.pathname === "/admin/manage-questions" ? "active" : ""}>
            <Link to="/admin/manage-questions" onClick={() => setOpen(false)}>
              Manage Questions
            </Link>
          </li>
          <li className={location.pathname === "/admin/leaderboard" ? "active" : ""}>
            <Link to="/admin/leaderboard" onClick={() => setOpen(false)}>
              Leaderboard
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;