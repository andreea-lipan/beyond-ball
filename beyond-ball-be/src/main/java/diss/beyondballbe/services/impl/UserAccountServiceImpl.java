package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.DTOs.TeamMembersDTO;
import diss.beyondballbe.model.DTOs.UserAccountDTO;
import diss.beyondballbe.model.Team;
import diss.beyondballbe.model.accounts.UserAccount;
import diss.beyondballbe.model.accounts.UserRole;
import diss.beyondballbe.persistence.UserAccountRepository;
import diss.beyondballbe.services.UserAccountService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import java.util.List;
import java.util.UUID;

@Service
public class UserAccountServiceImpl implements UserAccountService {

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Override
    public List<UserAccount> getAllAccounts() {
        return userAccountRepository.findAll();
    }

    @Override
    public UserAccount getAccountById(Long id) {
        return userAccountRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    }

    @Override
    public TeamMembersDTO getTeamMembers(Long teamId) {
        List<UserAccount> users = userAccountRepository.findUserAccountsByTeamId(teamId);
        Team team = users.get(0).getTeam();

        List<UserAccountDTO> userDTOs = users.stream()
                .filter(userAccount -> userAccount.getRole() != UserRole.ADMIN)
                .map(UserAccountDTO::new)
                .toList();
        TeamMembersDTO teamMembersDTO = new TeamMembersDTO();
        teamMembersDTO.setTeamId(team.getId());
        teamMembersDTO.setTeamName(team.getTeamName());
        teamMembersDTO.setMembers(userDTOs);
        return teamMembersDTO;
    }

    @Override
    public void changeActiveStatus(Long id, boolean active) {
        UserAccount userAccount = userAccountRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
        userAccount.setIsActive(active);
        userAccountRepository.save(userAccount);
    }

    @Override
    public Optional<UserAccount> findByUsername(String username) {
        return userAccountRepository.findUserByUsername(username);
    }

    @Override
    public UserAccount uploadProfilePicture(MultipartFile file, Long id) throws IOException {
        UserAccount user = getAccountById(id);

        String teamId = user.getTeam().getId().toString();

        String filename = id + "_" + file.getOriginalFilename();
        Path savePath = Paths.get("uploads", teamId, "profile", user.getId().toString(), filename);

        Files.createDirectories(savePath.getParent());
        Files.write(savePath, file.getBytes());

        user.setProfilePictureUrl(filename);
        return userAccountRepository.save(user);
    }
}
    
