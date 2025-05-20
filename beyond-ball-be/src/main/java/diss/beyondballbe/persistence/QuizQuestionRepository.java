package diss.beyondballbe.persistence;

import diss.beyondballbe.model.quizes.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {
}
