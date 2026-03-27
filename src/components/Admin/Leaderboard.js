import { useEffect, useState } from "react";
import API from "../../services/api";
import Navbar from '../Common/Navbar';
import "../../styles/Leaderboard.css";

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Mock for now, backend integration later
    API.get("/api/users")
      .then((res) => setUsers(res.data))
      .catch(() => {
        console.log("Backend not ready");
        // Mock data
        setUsers([
          { _id: 1, name: "Alice", score: 450 },
          { _id: 2, name: "Bob", score: 380 },
          { _id: 3, name: "Charlie", score: 320 },
        ]);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="leaderboard-container">
        <h2>Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {users
              .sort((a, b) => b.score - a.score)
              .map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.score}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;