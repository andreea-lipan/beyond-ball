package diss.beyondballbe.model.DTOs;

import diss.beyondballbe.model.quizes.Quiz;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizDTO {
    private Long id;
    private String title;
    private String description;
    private Long estimatedDuration;
    private String author;
    private List<QuizQuestionDTO> questions;

    public QuizDTO(Quiz quiz) {
        this.id = quiz.getId();
        this.title = quiz.getTitle();
        this.description = quiz.getDescription();
        this.estimatedDuration = quiz.getEstimatedDuration();
        this.author = quiz.getAuthor().getUsername();

        if (quiz.getQuestions() != null) {
            this.questions = quiz.getQuestions().stream()
                .map(QuizQuestionDTO::new)
                .collect(Collectors.toList());
        }
    }
}
