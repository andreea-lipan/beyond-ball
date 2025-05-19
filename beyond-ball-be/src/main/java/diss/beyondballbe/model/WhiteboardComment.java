package diss.beyondballbe.model;

import diss.beyondballbe.model.accounts.UserAccount;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "whiteboard_comment_table")
public class WhiteboardComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000)
    private String text;

    private LocalDateTime postedDate;

    @ManyToOne
    @JoinColumn(name = "whiteboard_id")
    private Whiteboard whiteboard;

    @ManyToOne
    @JoinColumn(name = "user_account_id")
    private UserAccount author;
}
