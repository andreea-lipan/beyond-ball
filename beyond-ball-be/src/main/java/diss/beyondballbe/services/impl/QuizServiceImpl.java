package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.DTOs.QuizDTO;
import diss.beyondballbe.model.DTOs.QuizQuestionDTO;
import diss.beyondballbe.model.DTOs.TeamMembersDTO;
import diss.beyondballbe.model.DTOs.UserAccountDTO;
import diss.beyondballbe.model.accounts.UserAccount;
import diss.beyondballbe.model.accounts.UserRole;
import diss.beyondballbe.model.quizes.Quiz;
import diss.beyondballbe.model.quizes.QuizQuestion;
import diss.beyondballbe.model.quizes.QuizQuestionType;
import diss.beyondballbe.persistence.QuizRepository;
import diss.beyondballbe.persistence.UserAccountRepository;
import diss.beyondballbe.security.AuthValidator;
import diss.beyondballbe.services.QuizAnswerService;
import diss.beyondballbe.services.QuizService;
import diss.beyondballbe.services.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private UserAccountService userAccountService;

    @Autowired
    private AuthValidator authValidator;

    @Autowired
    private QuizAnswerService answerService;


    @Override
    public List<QuizDTO> getAllQuizzes(String username) {

        UserAccount user = userAccountService.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        boolean isPlayer = user.getRole().equals(UserRole.PLAYER);

        return quizRepository.findAll().stream()
                .filter(quiz -> authValidator.belongsToTeam(quiz.getAuthor().getTeam().getId()))
                .map(quiz -> {
                    QuizDTO quizDTO = new QuizDTO(quiz);
                    if(isPlayer) {
                        quizDTO.setCompleted(playerTookQuiz(quiz, user));
                    } else {
                        TeamMembersDTO teamMembersDTO = userAccountService.getTeamMembers(user.getTeam().getId());
                        quizDTO.setNumberOfPlayersQuizzed(countPlayersTookQuiz(quiz, teamMembersDTO));
                    }
                    return quizDTO;
                })
                .toList();
    }

    @Override
    public List<QuizDTO> getAllCompletedQuizzes(Long playerId) {
        return quizRepository.findAll().stream()
                .filter(quiz -> authValidator.belongsToTeam(quiz.getAuthor().getTeam().getId()))
                .filter(quiz -> answerService.playerTookQuiz(quiz.getId(), playerId))
                .map(QuizDTO::new)
                .toList();
    }

    private Boolean playerTookQuiz(Quiz quiz, UserAccount player) {
        return answerService.playerTookQuiz(quiz.getId(), player.getId());
    }

    private Long countPlayersTookQuiz(Quiz quiz, TeamMembersDTO teamMembersDTO) {
        Long count = 0L;
        for (UserAccountDTO member : teamMembersDTO.getMembers()) {
            if (answerService.playerTookQuiz(quiz.getId(), member.getId())) {
                count++;
            }
        }
        return count;
    }


    @Override
    public void createQuiz(QuizDTO quizDTO) {
        Quiz quiz = new Quiz();
        quiz.setTitle(quizDTO.getTitle());
        quiz.setDescription(quizDTO.getDescription());
        quiz.setEstimatedDuration(quizDTO.getEstimatedDuration());

        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        var user = userAccountService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        quiz.setAuthor(user);

        // Create the questions and add to the quiz
        List<QuizQuestion> questions = new ArrayList<>();
        if (quizDTO.getQuestions() != null) {
            for (QuizQuestionDTO qdto : quizDTO.getQuestions()) {
                QuizQuestion question = new QuizQuestion();
                question.setQuestion(qdto.getQuestion());
                question.setType(QuizQuestionType.valueOf(qdto.getType()));
                question.setOption1(qdto.getOption1());
                question.setOption5(qdto.getOption5());
                question.setQuiz(quiz); // asociere bidirecțională

                questions.add(question);
            }
        }

        quiz.setQuestions(questions);

        // ✅ Salvează quiz-ul cu întrebări (dacă în Quiz.java ai cascade = ALL)
        quizRepository.save(quiz);
    }

    @Override
    public void deleteQuiz(Long quizId) {
        if (!quizRepository.existsById(quizId)) {
            throw new RuntimeException("Quiz not found with id: " + quizId);
        }
        quizRepository.deleteById(quizId);
    }

    @Override
    public QuizDTO getQuizById(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + quizId));
        return new QuizDTO(quiz);
    }

}
