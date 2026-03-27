import { useState } from "react";
import { adminLogin } from "../../services/adminService";
import { useNotification } from "../../context/NotificationContext";
import "../../styles/AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showNotification } = useNotification();

  const handleLogin = async () => {
    try {
      await adminLogin({ email, password });
      showNotification("Login successful", "success");
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 500);
    } catch (err) {
      showNotification("Login failed. Check credentials.", "error");
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Admin Login</h1>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default AdminLogin;