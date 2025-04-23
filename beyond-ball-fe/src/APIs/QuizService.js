import {RequestInstance} from "./RequestInstance.js";
import {QUIZ_ENDPOINTS} from "./Endpoints.js";

const getQuizzes = () => {
    return RequestInstance.get(QUIZ_ENDPOINTS.QUIZZES)
}

const QuizService = {
    getQuizzes,
}

export default QuizService