package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.DTOs.QuizDTO;
import diss.beyondballbe.model.quizes.Quiz;
import diss.beyondballbe.persistence.QuizRepository;
import diss.beyondballbe.persistence.UserAccountRepository;
import diss.beyondballbe.security.AuthValidator;
import diss.beyondballbe.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;

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

    @Override
    public void createQuiz(QuizDTO quizDTO) {
        Quiz quiz = new Quiz();
        quiz.setTitle(quizDTO.getTitle());
        quiz.setDescription(quizDTO.getDescription());

        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        var user = userAccountRepository.findUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        quiz.setAuthor(user);

        quizRepository.save(quiz);
    }

    @Override
    public void deleteQuiz(Long quizId) {
        if (!quizRepository.existsById(quizId)) {
            throw new RuntimeException("Quiz not found with id: " + quizId);
        }
        quizRepository.deleteById(quizId);
    }
}
