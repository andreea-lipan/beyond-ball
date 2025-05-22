package diss.beyondballbe.services;

import diss.beyondballbe.persistence.QuizAnswerEntity;
import java.util.List;

public interface QuizAnswerService {
    List<QuizAnswerEntity> findByQuizId(Long quizId);

    Boolean playerTookQuiz(Long quizId, Long playerId);
    void saveAll(List<QuizAnswerEntity> answers);
}
