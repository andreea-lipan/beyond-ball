package diss.beyondballbe.services;

import diss.beyondballbe.model.DTOs.QuizDTO;
import diss.beyondballbe.model.quizes.Quiz;
import diss.beyondballbe.model.quizes.QuizQuestion;
import diss.beyondballbe.model.accounts.UserAccount;
import diss.beyondballbe.persistence.QuizRepository;
import diss.beyondballbe.persistence.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final UserAccountRepository userAccountRepository;

    @Autowired
    public QuizServiceImpl(QuizRepository quizRepository, UserAccountRepository userAccountRepository) {
        this.quizRepository = quizRepository;
        this.userAccountRepository = userAccountRepository;
    }

    @Override
    public void createQuiz(QuizDTO quizDTO) {
        Quiz quiz = new Quiz();
        quiz.setTitle(quizDTO.getTitle());
        quiz.setDescription(quizDTO.getDescription());
        quiz.setEstimatedDuration(quizDTO.getEstimatedDuration());

        UserAccount author = userAccountRepository.findById(quizDTO.getAuthorId())
                .orElseThrow(() -> new RuntimeException("Author not found"));
        quiz.setAuthor(author);

        List<QuizQuestion> questions = quizDTO.getQuestions().stream().map(qDto -> {
            QuizQuestion question = new QuizQuestion();
            question.setQuestion(qDto.getQuestion());
            question.setQuiz(quiz); // Very important to set parent
            return question;
        }).collect(Collectors.toList());

        quiz.setQuestions(questions);

        quizRepository.save(quiz);
    }

    @Override
    public List<QuizDTO> getAllQuizzes() {
        return quizRepository.findAll().stream()
                .map(QuizDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteQuiz(Long quizId) {
        quizRepository.deleteById(quizId);
    }
}
