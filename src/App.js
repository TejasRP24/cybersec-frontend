import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminSignup from "./components/Admin/AdminSignup";
import AdminDashboard from "./pages/AdminDashboard";
import Leaderboard from "./components/Admin/Leaderboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;