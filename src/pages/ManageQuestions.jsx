import { useEffect, useState } from "react";
import Navbar from "../components/Common/Navbar";
import { getAdminQuestions, deleteQuestion, updateQuestion } from "../services/adminService";
import { useNotification } from "../context/NotificationContext";
import "../styles/ManageQuestions.css";

function ManageQuestions() {
  const [round, setRound] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, [round]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const data = await getAdminQuestions();
      setQuestions(data.filter((q) => q.round === round));
    } catch (err) {
      console.error(err);
      showNotification("Failed to fetch questions.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // Replaced confirm with direct action for now to avoid popups
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter((q) => q._id !== id));
      showNotification("Question deleted successfully", "success");
    } catch (err) {
      console.error(err);
      showNotification("Failed to delete question.", "error");
    }
  };

  const startEditing = (q) => {
    setEditingId(q._id);
    setEditData({ ...q });
  };

  const handleEditChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleArrayChange = (field, index, value) => {
    const newArr = [...editData[field]];
    newArr[index] = value;
    setEditData({ ...editData, [field]: newArr });
  };

  const handleSave = async () => {
    try {
      const updatePayload = {
        title: editData.title,
        description: editData.description,
        answers: editData.answers,
        base_point: editData.base_point,
        links: editData.links
      };
      await updateQuestion(editingId, updatePayload);
      setQuestions(questions.map(q => q._id === editingId ? { ...q, ...updatePayload } : q));
      setEditingId(null);
      showNotification("Question updated successfully!", "success");
    } catch (err) {
      console.error(err);
      showNotification("Failed to update question.", "error");
    }
  };

  return (
    <div>
      <Navbar />
      <main className="manage-questions">
        <div className="manage-header">
           <h1>Manage Questions</h1>
           <div className="round-selector">
              <label>Round: </label>
              <select value={round} onChange={(e) => setRound(Number(e.target.value))}>
                <option value={1}>Round 1</option>
                <option value={2}>Round 2</option>
                <option value={3}>Round 3</option>
                <option value={4}>Round 4</option>
              </select>
           </div>
        </div>

        {loading ? (
          <p>Loading questions...</p>
        ) : questions.length === 0 ? (
          <p className="empty-msg">No questions found for Round {round}.</p>
        ) : (
          <div className="questions-grid">
            {questions.map((q) => (
              <div key={q._id} className="question-item">
                {editingId === q._id ? (
                  // EDIT MODE
                  <div className="edit-form-inline">
                    <input 
                      value={editData.title} 
                      onChange={(e) => handleEditChange("title", e.target.value)}
                      placeholder="Title"
                    />
                    <input 
                      type="number" 
                      value={editData.base_point} 
                      onChange={(e) => handleEditChange("base_point", Number(e.target.value))}
                      placeholder="Points"
                    />
                    
                    <h4>Description / Steps</h4>
                    {editData.description.map((d, i) => (
                      <textarea 
                        key={i} 
                        value={d} 
                        onChange={(e) => handleArrayChange("description", i, e.target.value)}
                        placeholder={`Step ${i+1}`}
                      />
                    ))}

                    <h4>Answers</h4>
                    {editData.answers.map((a, i) => (
                      <input 
                        key={i} 
                        value={a} 
                        onChange={(e) => handleArrayChange("answers", i, e.target.value)}
                        placeholder={`Answer ${i+1}`}
                      />
                    ))}

                    {editData.links && editData.links.length > 0 && (
                      <>
                        <h4>{round <= 3 ? "Image URLs (MinIO)" : "Links"}</h4>
                        {editData.links.map((link, i) => (
                          <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <input 
                              style={{ flex: 1 }}
                              value={link} 
                              onChange={(e) => handleArrayChange("links", i, e.target.value)}
                              placeholder={round <= 3 ? `Image URL ${i+1}` : `Link ${i+1}`}
                            />
                            <button 
                              type="button" 
                              onClick={() => {
                                const newLinks = editData.links.filter((_, index) => index !== i);
                                handleEditChange("links", newLinks);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </>
                    )}
                    {round === 4 && (
                      <button 
                        type="button" 
                        onClick={() => handleEditChange("links", [...(editData.links || []), ""])}
                        style={{ marginBottom: '10px' }}
                      >
                        Add Link
                      </button>
                    )}

                    <div className="question-actions">
                       <button className="save-btn" onClick={handleSave}>Save</button>
                       <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  // VIEW MODE
                  <>
                    <div className="question-info">
                       <h3>{q.title}</h3>
                       <span className="points-badge">{q.base_point} Points</span>
                    </div>
                    <div className="question-preview">
                       <p><strong>Steps:</strong> {q.description.join(" | ")}</p>
                       <p><strong>Answers:</strong> {q.answers.join(" | ")}</p>
                    </div>
                    <div className="question-actions">
                       <button className="edit-btn" onClick={() => startEditing(q)}>Edit</button>
                       <button className="delete-btn" onClick={() => handleDelete(q._id)}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ManageQuestions;
