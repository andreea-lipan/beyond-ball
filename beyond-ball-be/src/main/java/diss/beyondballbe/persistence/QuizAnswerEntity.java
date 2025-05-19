package diss.beyondballbe.persistence;

import jakarta.persistence.*;
import java.time.Instant;
import diss.beyondballbe.model.quizes.Quiz;
import diss.beyondballbe.model.accounts.UserAccount;
import diss.beyondballbe.model.quizes.QuizQuestion;

@Entity
@Table(name = "quiz_answers")
public class QuizAnswerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_account_id")
    private UserAccount user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "question_id")
    private QuizQuestion question;

    @Column(name = "answer_text", columnDefinition = "TEXT")
    private String answerText;

    @Column(name = "submitted_at")
    private Instant submittedAt;

    // getters
    public Long getId() { return id; }
    public Quiz getQuiz() { return quiz; }
    public UserAccount getUser() { return user; }
    public QuizQuestion getQuestion() { return question; }
    public String getAnswerText() { return answerText; }
    public Instant getSubmittedAt() { return submittedAt; }

    // setters
    public void setQuiz(Quiz quiz) { this.quiz = quiz; }
    public void setUser(UserAccount user) { this.user = user; }
    public void setQuestion(QuizQuestion question) { this.question = question; }
    public void setAnswerText(String answerText) { this.answerText = answerText; }
    public void setSubmittedAt(Instant submittedAt) { this.submittedAt = submittedAt; }
}