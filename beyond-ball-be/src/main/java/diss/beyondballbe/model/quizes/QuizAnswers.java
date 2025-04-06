package diss.beyondballbe.model.quizes;

import diss.beyondballbe.model.accounts.PlayerAccount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizAnswers {
    private Long id;
    private Quiz quiz;
    private List<QuizAnswer> answers; // ordered list to allign it with the questions
    private PlayerAccount player;
}
