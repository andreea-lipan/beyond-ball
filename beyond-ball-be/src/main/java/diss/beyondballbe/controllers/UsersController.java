package diss.beyondballbe.controllers;

import diss.beyondballbe.model.DTOs.ChangeActiveStatusDTO;
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
    @PreAuthorize("@authValidator.belongsToTeam(#teamId) and hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @GetMapping("/teams/{teamId}/members")
    public ResponseEntity<?> getTeamMembers(@PathVariable Long teamId) {
        try {
            return ResponseEntity.ok(userAccountService.getTeamMembers(teamId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @PostMapping("/accounts/{id}/active")
    public ResponseEntity<?> changeActiveStatus(@PathVariable Long id, @RequestBody ChangeActiveStatusDTO changeActiveStatusDTO) {
        try {
            userAccountService.changeActiveStatus(id, changeActiveStatusDTO.getActive());
            return ResponseEntity.ok("User account status changed successfully");
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
