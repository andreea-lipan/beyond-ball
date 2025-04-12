package diss.beyondballbe.services.impl;

import diss.beyondballbe.exceptions.UsernameAlreadyExistsException;
import diss.beyondballbe.model.DTOs.TeamDTO;
import diss.beyondballbe.model.Team;
import diss.beyondballbe.model.accounts.UserAccount;
import diss.beyondballbe.model.accounts.UserRole;
import diss.beyondballbe.persistence.TeamRepository;
import diss.beyondballbe.persistence.UserAccountRepository;
import diss.beyondballbe.security.JwtUtil;
import diss.beyondballbe.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
     @Autowired
     private UserAccountRepository userAccountRepository;

     @Autowired
     private TeamRepository teamRepository;

     @Autowired
     private JwtUtil jwtUtil;

//     private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

     @Override
     public void registerTeam(TeamDTO request) {

          // Username check
          if (userAccountRepository.existsByUsername(request.getUsername())) {
               throw new UsernameAlreadyExistsException("Username '" + request.getUsername() + "' is already taken.");
          }

          // Team name length check
          if (request.getTeamName() == null || request.getTeamName().length() < 2) {
               throw new IllegalArgumentException("Team name must be at least 2 characters long.");
          }

          // Username length check (optional if not using annotations)
          if (request.getUsername() == null || request.getUsername().length() < 2) {
               throw new IllegalArgumentException("Username must be at least 2 characters long.");
          }

          // 1. Create and save the team first
          Team team = new Team();
          team.setTeamName(request.getTeamName());
          team = teamRepository.save(team);

          // 2. Create and assign the account
          UserAccount account = new UserAccount();
          account.setTeam(team);
          account.setUsername(request.getUsername());
          account.setRole(UserRole.ADMIN);
          account.setPassword(request.getPassword());

          userAccountRepository.save(account);
     }

     @Override
     public String login(String username, String password) {
          UserAccount user = userAccountRepository.findUserByUsername(username)
                  .orElseThrow(() -> new RuntimeException("User not found"));

          if (!passwordMatches(password, user)) {
               throw new RuntimeException("Invalid password");
          }

          return jwtUtil.generateToken(user);
     }

    private boolean passwordMatches(String password, UserAccount user) {
        return password.equals(user.getPassword());
//        return encoder.matches(password, user.getPassword());
    }


}
