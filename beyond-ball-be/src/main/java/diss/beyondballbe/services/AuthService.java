package diss.beyondballbe.services;

import diss.beyondballbe.model.DTOs.RegisterMemberDTO;
import diss.beyondballbe.model.DTOs.TeamDTO;
import diss.beyondballbe.model.DTOs.UserAccountDTO;

public interface AuthService {
    void registerTeam(TeamDTO request);
    String login(String username, String password);
    UserAccountDTO registerMember(RegisterMemberDTO request);
}
