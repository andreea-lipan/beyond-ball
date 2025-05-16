package diss.beyondballbe.model.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamMembersDTO {
    private Long teamId;
    private String teamName;
    private List<UserAccountDTO> members;

}
