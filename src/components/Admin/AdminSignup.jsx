import { useState } from "react";
import { adminSignup } from "../../services/adminService";
import "../../styles/AdminSignup.css";

function AdminSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await adminSignup({ email, password });
      alert("Signup successful");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="signup-container">
        <div className = "signup-card">
            <h2>Admin Signup</h2>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
        </div>
    </div>
  );
}

export default AdminSignup;