import { useEffect, useState } from "react";
import { getAdminQuestions } from "../../services/adminService";
import "../../styles/QuestionList.css";

function QuestionList({ round }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getAdminQuestions()
      .then((data) => {
        const filtered = data.filter((q) => q.round === round);
        setQuestions(filtered);
      })
      .catch((err) => {
        console.error("Failed to fetch questions", err);
        setQuestions([]); // Clear if error
      });
  }, [round]);

  return (
    <div className="question-list">
      <h3>Round {round} Questions</h3>
      {questions.length === 0 && <p>No questions for this round.</p>}
      {questions.map((q) => (
        <div key={q._id} className="question-card">
          <h4>{q.title}</h4>
          <p>{q.description.join(", ")}</p>

          {round >= 3 && q.links && q.links.length > 0 && (
            <div>
              <h5>Links:</h5>
              <ul>
                {q.links.map((link, i) => (
                  <li key={i}><a href={link} target="_blank" rel="noreferrer">{link}</a></li>
                ))}
              </ul>
            </div>
          )}

          {round >= 3 && q.images && q.images.length > 0 && (
            <div>
              <h5>Images:</h5>
              {q.images.map((img, i) => (
                <img key={i} src={img} alt={`question-${i}`} style={{ maxWidth: "200px" }} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default QuestionList;