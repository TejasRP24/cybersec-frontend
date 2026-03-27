import { useState } from "react";
import API from "../../services/api";
import "../../styles/QuestionForm.css";

function QuestionForm({ round, setRound }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState([""]);
  const [answers, setAnswers] = useState([""]);
  const [links, setLinks] = useState([""]);
  const [images, setImages] = useState([]);
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

  const handleLinkChange = (index, value) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const addLink = () => setLinks([...links, ""]);
  const removeLink = (index) => setLinks(links.filter((_, i) => i !== index));

  const addField = () => {
    if (round < 3) return;
    setDescription([...description, ""]);
    setAnswers([...answers, ""]);
  };

  const removeField = (index) => {
    setDescription(description.filter((_, i) => i !== index));
    setAnswers(answers.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title || description.some(d => !d) || answers.some(a => !a)) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("round", round);
    formData.append("title", title);
    formData.append("base_point", basePoint);
    formData.append("description", JSON.stringify(description));
    formData.append("answers", JSON.stringify(answers));
    formData.append("links", JSON.stringify(links));

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      await API.post("/api/admin/questions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Question uploaded successfully");
    } catch (err) {
      console.log("Backend not connected yet");
      alert("Check console (backend not ready)");
    }
  };

  const handleRoundChange = (e) => {
    const selectedRound = Number(e.target.value);
    setRound(selectedRound);

    setDescription([""]);
    setAnswers([""]);
    setLinks([""]);
    setImages([]);
  };

  return (
    <div className="form-card">
      <h2>Upload Question</h2>

      <select value={round} onChange={handleRoundChange}>
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
            onChange={(e) => handleDescriptionChange(index, e.target.value)}
          />

          <input
            placeholder={`Answer ${index + 1}`}
            value={answers[index]}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />

          {/* Remove button (only for round 3 & 4) */}
          {round >= 3 && description.length > 1 && (
            <button type="button" onClick={() => removeField(index)}>Remove</button>
          )}
        </div>
      ))}

      {/* Add new question field button (only for round 3 & 4) */}
      {round >= 3 && (
        <button type="button" onClick={addField}>Add Question</button>
      )}

      {/* Links / Images section for round 3 & 4 */}
      {round >= 3 && (
        <div className="links-images-section">
          <h4>Links / Images</h4>

          {/* Links */}
          {links.map((link, index) => (
            <div key={index} className="link-input">
              <input
                placeholder={`Link ${index + 1}`}
                value={link}
                onChange={(e) => handleLinkChange(index, e.target.value)}
              />
              {links.length > 1 && (
                <button type="button" onClick={() => removeLink(index)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addLink}>Add Link</button>

          {/* Image uploads */}
          <div style={{ marginTop: "1rem" }}>
            <label>Upload Images</label>
            <input
              type="file"
              multiple
              onChange={(e) => setImages(e.target.files)}
            />
          </div>
        </div>
      )}

      <input
        type="number"
        placeholder="Base Points"
        value={basePoint}
        onChange={(e) => setBasePoint(Number(e.target.value))}
      />

      <button type="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default QuestionForm;