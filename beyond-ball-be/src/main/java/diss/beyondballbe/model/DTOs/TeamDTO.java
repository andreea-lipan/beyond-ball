package diss.beyondballbe.model.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * We get this from frontend when we do team sign-up
  */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamDTO {
    private String teamName;
    private String username;
    private String password;
}
