package diss.beyondballbe.model.accounts;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class PlayerAccount extends UserAccount {
    private String firstname;
    private String lastname;

    @Embedded
    private PlayerStats stats;
}
