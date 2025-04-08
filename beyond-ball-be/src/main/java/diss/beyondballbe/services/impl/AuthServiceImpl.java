package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.DTOs.TeamDTO;
import diss.beyondballbe.model.Team;
import diss.beyondballbe.model.accounts.AdminAccount;
import diss.beyondballbe.model.accounts.UserRole;
import diss.beyondballbe.persistence.AdminAccountRepository;
import diss.beyondballbe.persistence.TeamRepository;
import diss.beyondballbe.persistence.UserAccountRepository;
import diss.beyondballbe.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
     @Autowired
     private UserAccountRepository userAccountRepository;

     @Autowired
     private AdminAccountRepository adminAccountRepository;

     @Autowired
     private TeamRepository teamRepository;

     @Override
     public void registerTeam(TeamDTO request) {
          if (adminAccountRepository.existsByUsername(request.getUsername())) {
               throw new RuntimeException("Username already exists");
          }

          // 1. Create and save the team first
          Team team = new Team();
          team.setTeamName(request.getTeamName());
          team = teamRepository.save(team); // <-- save it and assign the returned managed entity

          // 2. Create and assign the account
          AdminAccount account = new AdminAccount();
          account.setTeam(team);
          account.setUsername(request.getUsername());
          account.setRole(UserRole.ADMIN);
          account.setPassword(request.getPassword());

          adminAccountRepository.save(account); // now it works

     }
    // todo add the needed functions
}
