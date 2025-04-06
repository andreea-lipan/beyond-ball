package diss.beyondballbe.model.quizes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizAnswerParagraph implements QuizAnswer {
    private Long id;
    private String value;

    @Override
    public String getAnswerText() {
        return value;
    }
}
