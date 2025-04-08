package diss.beyondballbe.model.accounts;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "admin_account")
public class AdminAccount extends UserAccount {

    @Column(name = "team_name")
    private String teamName;
}
