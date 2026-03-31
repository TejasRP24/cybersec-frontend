import { useState } from "react";
import { createQuestion } from "../../services/adminService";
import { useNotification } from "../../context/NotificationContext";
import "../../styles/QuestionForm.css";

function QuestionForm({ round, setRound }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState([""]);
  const [answers, setAnswers] = useState([""]);
  const [links, setLinks] = useState([""]);
  const [images, setImages] = useState([]); // general images for round 1 & 2
  const [round3Images, setRound3Images] = useState([null]); // per-question images for round 3
  const [basePoint, setBasePoint] = useState(100);
  const [isUploading, setIsUploading] = useState(false);
  const { showNotification } = useNotification();

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

  // Handle per-question image change for Round 3
  const handleRound3ImageChange = (index, file) => {
    const updated = [...round3Images];
    updated[index] = file || null;
    setRound3Images(updated);
  };

  const addField = () => {
    if (round < 3) return;
    setDescription([...description, ""]);
    setAnswers([...answers, ""]);
    if (round === 3) setRound3Images([...round3Images, null]);
  };

  const removeField = (index) => {
    setDescription(description.filter((_, i) => i !== index));
    setAnswers(answers.filter((_, i) => i !== index));
    if (round === 3) setRound3Images(round3Images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title || description.some(d => !d) || answers.some(a => !a)) {
      showNotification("Please fill all fields before uploading.", "error");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("round", round);
    formData.append("title", title);
    formData.append("base_point", basePoint);

    description.forEach((d) => formData.append("description", d));
    answers.forEach((a) => formData.append("answers", a));

    if (round === 4) {
      links.filter(Boolean).forEach((link) => formData.append("links", link));
    }

    if (round === 3) {
      // Each question has its own image
      round3Images.forEach((img) => {
        if (img) formData.append("images", img);
      });
    } else if (round < 3) {
      // Round 1 & 2: single shared image input
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    try {
      await createQuestion(formData);
      showNotification("Question uploaded successfully!", "success");

      // Reset form
      setTitle("");
      setDescription([""]);
      setAnswers([""]);
      setLinks([""]);
      setImages([]);
      setRound3Images([null]);
    } catch (err) {
      showNotification("Upload failed. Verify backend and images.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRoundChange = (e) => {
    const selectedRound = Number(e.target.value);
    setRound(selectedRound);

    setDescription([""]);
    setAnswers([""]);
    setLinks([""]);
    setImages([]);
    setRound3Images([null]);
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
        <div key={index} className="question-block">
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

          {/* Per-question image upload — ONLY for Round 3 */}
          {round === 3 && (
            <div className="round3-image-field">
              <label>Image for Question {index + 1}</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleRound3ImageChange(index, e.target.files[0])}
              />
            </div>
          )}

          {/* Remove button (only for round 3 & 4) */}
          {round >= 3 && description.length > 1 && (
            <button type="button" className="remove-btn" onClick={() => removeField(index)}>
              Remove Question
            </button>
          )}
        </div>
      ))}

      {/* Add new question field button (only for round 3 & 4) */}
      {round >= 3 && (
        <button type="button" onClick={addField}>Add Question</button>
      )}

      {/* Links / Images section */}
      <div className="links-images-section">
        {round < 3 ? (
          /* Single shared image upload for Round 1 & 2 */
          <div style={{ marginTop: "1rem" }}>
            <label>Upload Images for Round {round}</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages(e.target.files)}
            />
          </div>
        ) : round === 4 ? (
          /* Links for Round 4 */
          <div style={{ marginTop: "1rem" }}>
            <h4>Links (Round 4)</h4>
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
          </div>
        ) : null /* Round 3 images are handled inline per question above */}
      </div>

      <input
        type="number"
        placeholder="Base Points"
        value={basePoint}
        onChange={(e) => setBasePoint(Number(e.target.value))}
      />

      <button type="button" onClick={handleSubmit} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Submit"}
      </button>
    </div>
  );
}

export default QuestionForm;