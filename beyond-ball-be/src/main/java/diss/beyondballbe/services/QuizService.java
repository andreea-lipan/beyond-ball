package diss.beyondballbe.services;

import diss.beyondballbe.model.DTOs.QuizDTO;

import java.util.List;

public interface QuizService {
    List<QuizDTO> getAllQuizzes();

    void createQuiz(QuizDTO quizDTO);
    void deleteQuiz(Long quizId);

    // ✅ Nou: pentru a obține un quiz cu întrebările aferente
    QuizDTO getQuizById(Long quizId);
}
