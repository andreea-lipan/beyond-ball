package diss.beyondballbe.model;

import diss.beyondballbe.model.accounts.UserAccount;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "video_note_table")
public class VideoNote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    private Long videoTimestamp;

    @ManyToOne
    @JoinColumn(name = "clip_id")
    private Clip clip;

    @ManyToOne
    @JoinColumn(name = "user_account_id")
    private UserAccount author;

}
