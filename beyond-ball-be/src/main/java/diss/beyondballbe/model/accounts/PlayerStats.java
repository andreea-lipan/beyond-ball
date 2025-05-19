package diss.beyondballbe.model.accounts;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class PlayerStats {
    //todo  and get displayed in the player profile
    private int goals;
    private int assists;
    private double height;
    private double weight;
    private String nationality;
    private LocalDate dateOfBirth;
    private String position;
}
