import { useState } from "react";
import Navbar from "../components/Common/Navbar";
import QuestionList from "../components/Admin/QuestionList";
import QuestionForm from "../components/Admin/QuestionForm";
import "../styles/adminDashboard.css";

function AdminDashboard() {
  const [round, setRound] = useState(1);

  return (
    <div>
      <Navbar />
      <main className="dashboard-content">
        <h1>Admin Dashboard</h1>
        <QuestionForm round={round} setRound={setRound} />
        <QuestionList round={round} />
      </main>
    </div>
  );
}

export default AdminDashboard;