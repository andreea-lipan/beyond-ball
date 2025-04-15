package diss.beyondballbe.model.quizes;

import diss.beyondballbe.model.accounts.UserAccount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Quiz {
    private Long id;
    private String title;
    private String description;
    private Long estimatedDuration; // in minutes
    private List<QuizQuestion> questions; // ordered list to allign it with the answers
    private UserAccount author; // UserAccount or StaffAccount


}
