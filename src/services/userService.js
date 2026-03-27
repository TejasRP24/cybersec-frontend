import API from "./api";

// USER AUTHENTICATION
// Note: If you have user-specific auth routes, they'd go here. 
// Standard login for users (non-admin) would likely be /api/users/login/signup - let's assume it matches admin pattern if needed.

// USER QUESTIONS & PROGRESS
export const getUserQuestionsRoundSummary = async () => {
  const response = await API.get("/api/questions/round");
  return response.data;
};

export const getSpecificUserQuestion = async (questionId) => {
  const response = await API.get(`/api/questions/${questionId}/current`);
  return response.data;
};

// SUBMISSIONS
export const submitAnswer = async (questionId, answer) => {
  const response = await API.post("/api/submissions", {
    questionId,
    answer,
  });
  return response.data;
};

// USER MANAGEMENT
export const listAllUsers = async () => {
  const response = await API.get("/api/users");
  return response.data;
};

export const getUserDetails = async (userId) => {
  const response = await API.get(`/api/users/${userId}`);
  return response.data;
};

// LEADERBOARD
export const getLeaderboard = async () => {
  const response = await API.get("/api/leaderboard");
  return response.data;
};
