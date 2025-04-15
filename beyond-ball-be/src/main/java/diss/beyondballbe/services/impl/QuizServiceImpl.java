package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.quizes.Quiz;
import diss.beyondballbe.persistence.QuizRepository;
import diss.beyondballbe.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class QuizServiceImpl implements QuizService {
    @Autowired
    private QuizRepository quizRepository;
    @Override
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }
}
