import { RequestInstance } from "./RequestInstance.js";
import { QUIZ_ENDPOINTS } from "./Endpoints.js";

const getQuizzes = () => {
    return RequestInstance.get(QUIZ_ENDPOINTS.QUIZZES);
};

const createQuiz = (quizData) => {
    return RequestInstance.post(QUIZ_ENDPOINTS.QUIZZES, quizData);
};

const deleteQuiz = (quizId) => {
    return RequestInstance.delete(`${QUIZ_ENDPOINTS.QUIZZES}/${quizId}`);
};

const QuizService = {
    getQuizzes,
    createQuiz,
    deleteQuiz,  
};

export default QuizService;
