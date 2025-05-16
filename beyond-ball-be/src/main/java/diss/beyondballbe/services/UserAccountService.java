package diss.beyondballbe.services;

import diss.beyondballbe.model.DTOs.TeamMembersDTO;
import diss.beyondballbe.model.accounts.UserAccount;

import java.util.List;

public interface UserAccountService {
    List<UserAccount> getAllAccounts();
    UserAccount getAccountById(Long id);
    TeamMembersDTO getTeamMembers(Long teamId);
}
