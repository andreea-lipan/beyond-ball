package diss.beyondballbe.services;

import diss.beyondballbe.persistence.QuizAnswerEntity;
import java.util.List;

public interface QuizAnswerService {
    List<QuizAnswerEntity> findByQuizId(Long quizId);

    void saveAll(List<QuizAnswerEntity> answers);
}
