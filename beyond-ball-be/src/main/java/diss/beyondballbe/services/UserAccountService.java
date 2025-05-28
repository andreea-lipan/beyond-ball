package diss.beyondballbe.services;

import diss.beyondballbe.model.DTOs.TeamMembersDTO;
import diss.beyondballbe.model.accounts.UserAccount;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

import java.util.List;

public interface UserAccountService {
    List<UserAccount> getAllAccounts();
    UserAccount getAccountById(Long id);
    TeamMembersDTO getTeamMembers(Long teamId);
    void changeActiveStatus(Long id, boolean active);
    Optional<UserAccount> findByUsername(String username);

    UserAccount uploadProfilePicture(MultipartFile file, Long id) throws IOException;
}
