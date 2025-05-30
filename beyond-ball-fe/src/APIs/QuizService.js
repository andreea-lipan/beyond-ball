import { RequestInstance } from "./RequestInstance.js";
import { QUIZ_ENDPOINTS } from "./Endpoints.js";

const getQuizzes = () => {
  return RequestInstance.get(QUIZ_ENDPOINTS.QUIZZES);
};

const getCompletedQuizzesForPlayer = (playerId) => {
  return RequestInstance.get(QUIZ_ENDPOINTS.COMPLETED(playerId)).then(res => res.data );
}

const createQuiz = (quizData) => {
  return RequestInstance.post(QUIZ_ENDPOINTS.QUIZZES, quizData);
};

const deleteQuiz = (quizId) => {
    return RequestInstance.delete(`${QUIZ_ENDPOINTS.QUIZZES}/${quizId}`);
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
const submitAnswers = (quizId, answerDTOs) =>
  RequestInstance.post(
    `${QUIZ_ENDPOINTS.QUIZZES}/${quizId}/answers`,
    answerDTOs
  );
const QuizService = {
  getQuizzes,
  createQuiz,
  deleteQuiz,
  getQuizById, // ✅ adăugat aici
  downloadAnswers,
  submitAnswers,
  getCompletedQuizzesForPlayer,
};

export default QuizService;
