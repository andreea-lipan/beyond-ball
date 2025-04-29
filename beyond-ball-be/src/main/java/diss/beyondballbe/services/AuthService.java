package diss.beyondballbe.services;

import diss.beyondballbe.model.DTOs.TeamDTO;
import diss.beyondballbe.model.accounts.UserRole;

public interface AuthService {
    void registerTeam(TeamDTO request);

    String login(String username, String password);
    void registerTeamMember(String username, String password, Long teamId, UserRole role);
}
