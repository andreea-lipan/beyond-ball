package diss.beyondballbe.model.quizes;

import diss.beyondballbe.model.accounts.UserAccount;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "quiz_table")
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_id")
    private Long id;
    @Column(name = "title", columnDefinition = "TEXT")
    private String title;
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    @Column(name = "duration", columnDefinition = "TEXT")
    private Long estimatedDuration; // in minutes
    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "question_id")
    private List<QuizQuestion> questions; // ordered list to allign it with the answers
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_account_id")
    private UserAccount author; // UserAccount or StaffAccount


}
