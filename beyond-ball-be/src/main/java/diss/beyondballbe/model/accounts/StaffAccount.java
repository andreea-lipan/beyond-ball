package diss.beyondballbe.model.accounts;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class StaffAccount extends UserAccount {
    private String firstname;
    private String lastname;
    private String position; // e.g. Coach, Assistant Coach, etc.
}
