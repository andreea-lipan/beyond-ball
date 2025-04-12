package diss.beyondballbe.controllers;

import diss.beyondballbe.model.accounts.UserAccount;
import diss.beyondballbe.services.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UserAccountService userAccountService;

    // Use this to view in Postman the data for the accounts
    @GetMapping("accounts")
    public ResponseEntity<?> accountsInfo() {
        try {
            List<UserAccount> accounts = userAccountService.getAllAccounts();
            return ResponseEntity.ok(accounts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Example secured method with team and role check
    @PreAuthorize("@authValidator.belongsToTeam(#teamId) and hasRole('ADMIN')")
    @GetMapping("/teams/{teamId}/players/mock")
    public ResponseEntity<?> getPlayersForTeamMock(@PathVariable Long teamId) {
        return ResponseEntity.ok("Test");
    }

}
