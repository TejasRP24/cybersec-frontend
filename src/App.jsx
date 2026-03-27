import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminSignup from "./components/Admin/AdminSignup";
import AdminDashboard from "./pages/AdminDashboard";
import ManageQuestions from "./pages/ManageQuestions";
import Leaderboard from "./components/Admin/Leaderboard";
import { NotificationProvider } from "./context/NotificationContext";

function App() {
  const token = localStorage.getItem("token");

  return (
    <NotificationProvider>
      <Router>
        <Routes>
          <Route path="/" element={token ? <Navigate to="/admin/dashboard" /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          
          {/* Protected Routes (Optional: could add a wrapper component) */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manage-questions" element={<ManageQuestions />} />
          <Route path="/admin/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;