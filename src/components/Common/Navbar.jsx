import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, [location]);

  return (
    <>
      <button
        className={`hamburger ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      <div className={`sidebar-navbar ${open ? "open" : ""}`}>
        <h2 className="sidebar-title">Cybersec Event</h2>
        <ul>
          {!isAuth ? (
            <>
              <li className={location.pathname === "/admin/login" ? "active" : ""}>
                <Link to="/admin/login" onClick={() => setOpen(false)}>Login</Link>
              </li>
              <li className={location.pathname === "/admin/signup" ? "active" : ""}>
                <Link to="/admin/signup" onClick={() => setOpen(false)}>Signup</Link>
              </li>
            </>
          ) : (
            <>
              <li className={location.pathname === "/admin/dashboard" ? "active" : ""}>
                <Link to="/admin/dashboard" onClick={() => setOpen(false)}>Upload Question</Link>
              </li>
              <li className={location.pathname === "/admin/manage-questions" ? "active" : ""}>
                <Link to="/admin/manage-questions" onClick={() => setOpen(false)}>Manage Questions</Link>
              </li>
              <li className={location.pathname === "/admin/leaderboard" ? "active" : ""}>
                <Link to="/admin/leaderboard" onClick={() => setOpen(false)}>Leaderboard</Link>
              </li>
              <li className="logout-li">
                 <button className="logout-btn" onClick={() => {
                   localStorage.removeItem("token");
                   window.location.href = "/admin/login";
                 }}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;