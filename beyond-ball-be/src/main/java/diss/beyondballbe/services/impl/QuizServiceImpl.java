package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.DTOs.QuizDTO;
import diss.beyondballbe.persistence.QuizRepository;
import diss.beyondballbe.security.AuthValidator;
import diss.beyondballbe.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private AuthValidator authValidator;

    @Override
    public List<QuizDTO> getAllQuizzes() {
        return quizRepository.findAll().stream()
                .filter(quiz -> {
                    if (quiz.getAuthor() == null) {
                        return false;
                    }
                    return authValidator.belongsToTeam(quiz.getAuthor().getTeam().getId());
                })
                .map(QuizDTO::new)
                .toList();
    }
}
