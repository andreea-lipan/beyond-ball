import { RequestInstance } from "./RequestInstance.js";
import { QUIZ_ENDPOINTS } from "./Endpoints.js";

const getQuizzes = () => {
  return RequestInstance.get(QUIZ_ENDPOINTS.QUIZZES);
};

const createQuiz = (quizData) => {
  return RequestInstance.post(QUIZ_ENDPOINTS.QUIZZES, quizData);
};

const deleteQuiz = (quizId) => {
    return RequestInstance.delete(`/quizzes/${quizId}`);
  };

  const getQuizById = (quizId) => {
    return RequestInstance.get(`${QUIZ_ENDPOINTS.QUIZZES}/${quizId}`);
  };
  const downloadAnswers = (quizId) => {
  return RequestInstance.get(
    `${QUIZ_ENDPOINTS.QUIZZES}/${quizId}/answers/download`,
    { responseType: "blob" }
  );
};
const QuizService = {
  getQuizzes,
  createQuiz,
  deleteQuiz,
  getQuizById, // ✅ adăugat aici
  downloadAnswers
};

export default QuizService;
