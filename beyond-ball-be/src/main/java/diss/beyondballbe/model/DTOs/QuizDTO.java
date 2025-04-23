package diss.beyondballbe.model.DTOs;

import diss.beyondballbe.model.quizes.Quiz;
import diss.beyondballbe.model.quizes.QuizQuestion;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizDTO {
    private Long id;
    private String title;
    private String description;
    private Long estimatedDuration;
    private List<QuizQuestion> questions;
    private String author;

    public QuizDTO(Quiz quiz){
        this.id = quiz.getId();
        this.title = quiz.getTitle();
        this.description = quiz.getDescription();
        this.estimatedDuration = quiz.getEstimatedDuration();
        this.questions = quiz.getQuestions();
        this.author = quiz.getAuthor().getUsername();
    }
}
