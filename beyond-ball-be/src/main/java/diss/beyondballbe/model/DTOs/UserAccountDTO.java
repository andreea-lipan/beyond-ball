package diss.beyondballbe.model.DTOs;

import diss.beyondballbe.model.accounts.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAccountDTO {
    private Long id;
    private String username;
    private String name;
    private String email;
    private PlayerStats playerStats;
    private Boolean active;
    private UserRole role;

    public UserAccountDTO(UserAccount userAccount) {

        if(userAccount instanceof PlayerAccount playerAccount){
            this.name = playerAccount.getLastname() + " " + playerAccount.getFirstname();
            this.playerStats = playerAccount.getStats();
        } else if (userAccount instanceof StaffAccount staffAccount) {
            this.name = staffAccount.getLastname() + " " + staffAccount.getFirstname();
        }

        this.id = userAccount.getId();
        this.username = userAccount.getUsername();
        this.role = userAccount.getRole();
        this.email = userAccount.getEmail();
        this.active = userAccount.getIsActive();
    }
}
