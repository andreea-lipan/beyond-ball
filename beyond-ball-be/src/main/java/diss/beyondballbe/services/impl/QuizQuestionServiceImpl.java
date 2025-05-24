package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.quizes.QuizQuestion;
import diss.beyondballbe.persistence.QuizQuestionRepository;
import diss.beyondballbe.services.QuizQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuizQuestionServiceImpl implements QuizQuestionService {
    private final QuizQuestionRepository repo;

    @Autowired
    public QuizQuestionServiceImpl(QuizQuestionRepository repo) {
        this.repo = repo;
    }

    @Override
    public Optional<QuizQuestion> getById(Long questionId) {
        return repo.findById(questionId);
    }
}
