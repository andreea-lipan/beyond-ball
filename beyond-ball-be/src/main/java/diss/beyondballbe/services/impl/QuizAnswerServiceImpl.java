package diss.beyondballbe.services.impl;

import diss.beyondballbe.persistence.QuizAnswerEntity;
import diss.beyondballbe.persistence.QuizAnswerRepository;
import diss.beyondballbe.services.QuizAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class QuizAnswerServiceImpl implements QuizAnswerService {

    private final QuizAnswerRepository repo;

    @Autowired
    public QuizAnswerServiceImpl(QuizAnswerRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<QuizAnswerEntity> findByQuizId(Long quizId) {
        return repo.findByQuiz_Id(quizId);
    }
}