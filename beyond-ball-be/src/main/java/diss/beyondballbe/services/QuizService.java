package diss.beyondballbe.services;

import diss.beyondballbe.model.DTOs.QuizDTO;

import java.util.List;

public interface QuizService {
    List<QuizDTO> getAllQuizzes(String username);
    List<QuizDTO> getAllCompletedQuizzes(Long playerId);
    void createQuiz(QuizDTO quizDTO);
    void deleteQuiz(Long quizId);
    QuizDTO getQuizById(Long quizId);
}
