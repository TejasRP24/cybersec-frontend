import { useState } from "react";
import API from "../../services/api";
import "../../styles/QuestionForm.css";

function QuestionForm() {
  const [round, setRound] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState([""]);
  const [answers, setAnswers] = useState([""]);
  const [basePoint, setBasePoint] = useState(100);

  const handleDescriptionChange = (index, value) => {
    const newDesc = [...description];
    newDesc[index] = value;
    setDescription(newDesc);
  };

  const handleAnswerChange = (index, value) => {
    const newAns = [...answers];
    newAns[index] = value;
    setAnswers(newAns);
  };

  // add new field (only for round 3 & 4)
  const addField = () => {
    setDescription([...description, ""]);
    setAnswers([...answers, ""]);
  };

  // remove field
  const removeField = (index) => {
    const newDesc = description.filter((_, i) => i !== index);
    const newAns = answers.filter((_, i) => i !== index);
    setDescription(newDesc);
    setAnswers(newAns);
  };

  const handleSubmit = async () => {
    const data = {
      round,
      title,
      description,
      answers,
      base_point: basePoint,
    };

    console.log("Submitting:", data);

    try {
      await API.post("/api/admin/questions", data);
      alert("Question uploaded successfully");
    } catch (err) {
      console.log("Backend not connected yet");
      alert("Check console (backend not ready)");
    }
  };

  return (
    <div className="form-card">
      <h2>Upload Question</h2>

      <select
        value={round}
        onChange={(e) => {
          const selectedRound = Number(e.target.value);
          setRound(selectedRound);

          // reset fields when switching rounds
          setDescription([""]);
          setAnswers([""]);
        }}
      >
        <option value={1}>Round 1</option>
        <option value={2}>Round 2</option>
        <option value={3}>Round 3</option>
        <option value={4}>Round 4</option>
      </select>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {description.map((desc, index) => (
        <div key={index}>
          <textarea
            placeholder={`Question ${index + 1}`}
            value={desc}
            onChange={(e) =>
              handleDescriptionChange(index, e.target.value)
            }
          />

          <input
            placeholder={`Answer ${index + 1}`}
            value={answers[index]}
            onChange={(e) =>
              handleAnswerChange(index, e.target.value)
            }
          />

          {/* Remove button (only for round 3 & 4) */}
          {round >= 3 && description.length > 1 && (
            <button onClick={() => removeField(index)}>
              Remove
            </button>
          )}
        </div>
      ))}

      {/* Add button (only for round 3 & 4) */}
      {round >= 3 && (
        <button onClick={addField}>Add Question</button>
      )}

      <input
        type="number"
        placeholder="Base Points"
        value={basePoint}
        onChange={(e) => setBasePoint(Number(e.target.value))}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default QuestionForm;