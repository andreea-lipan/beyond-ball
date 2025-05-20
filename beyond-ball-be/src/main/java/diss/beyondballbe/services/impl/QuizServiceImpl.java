package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.DTOs.QuizDTO;
import diss.beyondballbe.model.DTOs.QuizQuestionDTO;
import diss.beyondballbe.model.quizes.Quiz;
import diss.beyondballbe.model.quizes.QuizQuestion;
import diss.beyondballbe.model.quizes.QuizQuestionType;
import diss.beyondballbe.persistence.QuizRepository;
import diss.beyondballbe.persistence.UserAccountRepository;
import diss.beyondballbe.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;


    @Override
public List<QuizDTO> getAllQuizzes() {
    return quizRepository.findAll().stream()
            .map(QuizDTO::new)
            .toList();
}


    @Override
    public void createQuiz(QuizDTO quizDTO) {
        Quiz quiz = new Quiz();
        quiz.setTitle(quizDTO.getTitle());
        quiz.setDescription(quizDTO.getDescription());
        quiz.setEstimatedDuration(quizDTO.getEstimatedDuration());

        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        var user = userAccountRepository.findUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        quiz.setAuthor(user);

        // ✅ Creăm întrebările și le asociem quizului
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
