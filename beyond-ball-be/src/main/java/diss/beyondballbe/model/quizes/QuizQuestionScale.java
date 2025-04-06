package diss.beyondballbe.model.quizes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizQuestionScale extends QuizQuestion{
    private int minValue;
    private int maxValue;
}
