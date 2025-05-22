package diss.beyondballbe.persistence;

import diss.beyondballbe.persistence.QuizAnswerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuizAnswerRepository extends JpaRepository<QuizAnswerEntity, Long> {
    List<QuizAnswerEntity> findByQuiz_Id(Long quizId);
    Boolean existsByQuiz_IdAndUser_Id(Long quizId, Long userId);
}
