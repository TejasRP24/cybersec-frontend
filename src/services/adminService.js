import API from "./api";

// ADMIN AUTHENTICATION
export const adminSignup = async (adminData) => {
  const response = await API.post("/api/admin/signup", adminData);
  return response.data;
};

export const adminLogin = async (credentials) => {
  const response = await API.post("/api/admin/login", credentials);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", "admin");
  }
  return response.data;
};

// ADMIN QUESTION MANAGEMENT
export const getAdminQuestions = async () => {
  const response = await API.get("/api/admin/questions");
  return response.data;
};

export const createQuestion = async (formData) => {
  // Use "multipart/form-data" for file uploads if images are present
  // Otherwise, Axios will handle the regular JSON case.
  const response = await API.post("/api/admin/questions", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateQuestion = async (id, questionData) => {
  const response = await API.put(`/api/admin/questions/${id}`, questionData);
  return response.data;
};

export const deleteQuestion = async (id) => {
  const response = await API.delete(`/api/admin/questions/${id}`);
  return response.data;
};
