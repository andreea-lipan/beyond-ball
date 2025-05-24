package diss.beyondballbe.services;

import diss.beyondballbe.model.quizes.QuizQuestion;
import java.util.Optional;

public interface QuizQuestionService {
    Optional<QuizQuestion> getById(Long questionId);
}
