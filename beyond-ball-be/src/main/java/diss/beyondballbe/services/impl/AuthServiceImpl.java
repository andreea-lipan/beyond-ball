package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.DTOs.TeamDTO;
import diss.beyondballbe.model.accounts.AdminAccount;
import diss.beyondballbe.model.accounts.UserRole;
import diss.beyondballbe.persistence.AdminAccountRepository;
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

     @Override
     public void registerTeam(TeamDTO request) {
          if (adminAccountRepository.existsByUsername(request.getUsername())) {
               throw new RuntimeException("Username already exists");
          }

          AdminAccount account = new AdminAccount();
          account.setTeamName(request.getTeamName());
          account.setUsername(request.getUsername());
          account.setRole(UserRole.ADMIN);
          account.setPassword(request.getPassword());

          adminAccountRepository.save(account);
     }
    // todo add the needed functions
}
