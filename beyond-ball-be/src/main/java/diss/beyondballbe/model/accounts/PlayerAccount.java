package diss.beyondballbe.model.accounts;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayerAccount extends UserAccount {
    private String firstname;
    private String lastname;
    private PlayerStats stats;
}
