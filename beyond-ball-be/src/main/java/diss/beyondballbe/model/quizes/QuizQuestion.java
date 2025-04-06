package diss.beyondballbe.model.quizes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizQuestion {
    private Long id;
    private String question;
}
