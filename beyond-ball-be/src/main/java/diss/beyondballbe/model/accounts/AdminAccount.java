package diss.beyondballbe.model.accounts;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminAccount extends UserAccount {
    private int toBeAdded;
}
