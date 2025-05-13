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
@Table(name = "clip_table")
public class Clip {

    @Id
    private String id;

    private String title;
    private LocalDateTime creationDate;
    private String clipUrl;

    @ManyToOne
    @JoinColumn(name = "user_account_id")
    private UserAccount author;

}
