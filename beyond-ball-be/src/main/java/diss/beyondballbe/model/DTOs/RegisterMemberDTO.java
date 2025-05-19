package diss.beyondballbe.model.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterMemberDTO {
    private String username;
    private String password;
    private String email;
    private String firstname;
    private String lastname;
    private String position;
    private String role; // PLAYER, ADMIN, STAFF
    private Long teamId; // Optional, only for players
}
