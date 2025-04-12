package diss.beyondballbe.services;

import diss.beyondballbe.model.DTOs.TeamDTO;

public interface AuthService {
    void registerTeam(TeamDTO request);

    String login(String username, String password);
}
