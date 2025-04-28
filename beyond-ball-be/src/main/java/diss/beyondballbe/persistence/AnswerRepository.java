package main.java.diss.beyondballbe.persistence;

import diss.beyondballbe.models.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

    List<Answer> findByQuizId(Long quizId);

    List<Answer> findByUsername(String username);
}
