import { useEffect, useState } from "react";
import { getLeaderboard } from "../../services/userService";
import socket from "../../services/socket";
import Navbar from '../Common/Navbar';
import "../../styles/Leaderboard.css";

function Leaderboard() {
  const [users, setUsers] = useState([]);

  const fetchLeaderboard = () => {
    getLeaderboard()
      .then((data) => setUsers(data))
      .catch((err) => {
        console.error("Failed to fetch leaderboard", err);
        setUsers([]);
      });
  };

  useEffect(() => {
    fetchLeaderboard();

    // Listen for real-time updates
    socket.on("leaderboardUpdate", () => {
      console.log("Leaderboard update received via WebSocket");
      fetchLeaderboard();
    });

    return () => {
      socket.off("leaderboardUpdate");
    };
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
              <th>Username</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {users
              .sort((a, b) => b.totalPoints - a.totalPoints)
              .map((user, index) => (
                <tr key={user._id || index}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{Math.max(0, user.totalPoints)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;