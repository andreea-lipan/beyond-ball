package diss.beyondballbe.model.DTOs;

import diss.beyondballbe.model.quizes.QuizQuestion;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizQuestionDTO {
    private Long id;
    private String question;
    private String type;
    private String option1;
    private String option5;

    public QuizQuestionDTO(QuizQuestion q) {
        this.id = q.getId();
        this.question = q.getQuestion();
        this.type = q.getType().toString(); // e.g. "SCALA" sau "PARAGRAPH"
        this.option1 = q.getOption1();
        this.option5 = q.getOption5();
    }
}
