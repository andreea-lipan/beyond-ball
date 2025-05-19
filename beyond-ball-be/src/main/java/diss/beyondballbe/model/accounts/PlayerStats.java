package diss.beyondballbe.model.accounts;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class PlayerStats {
    //todo  this will have the player statistics that get filled from the excel
    //todo  and get displayed in the player profile
    private int toBeAdded;
}
