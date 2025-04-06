package diss.beyondballbe.model.quizes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizAnswerScale implements QuizAnswer {
    private Long id;
    private int value;

    @Override
    public String getAnswerText() {
        return String.valueOf(value);
    }
}
