package diss.beyondballbe.controllers;

import diss.beyondballbe.model.DTOs.ChangeActiveStatusDTO;
import diss.beyondballbe.model.DTOs.UserAccountDTO;
import diss.beyondballbe.model.DTOs.WhiteboardCreationRequest;
import diss.beyondballbe.model.DTOs.WhiteboardResponse;
import diss.beyondballbe.model.accounts.UserAccount;
import diss.beyondballbe.services.PlayerUploadService;
import diss.beyondballbe.services.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UserAccountService userAccountService;

    @Autowired
    private PlayerUploadService playerUploadService;

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

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @PutMapping(path = "/{id}" ,consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> uploadPicture(
            @RequestPart("file") MultipartFile file,
            @PathVariable Long id
    ) {
        try {
            return ResponseEntity.ok(new UserAccountDTO(userAccountService.uploadProfilePicture(file, id)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving file: " + e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getAccountById(@PathVariable Long id) {
        try {
            UserAccountDTO userAccountDTO = new UserAccountDTO(userAccountService.getAccountById(id));
            return ResponseEntity.ok(userAccountDTO);
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

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/teams/{teamId}/players/upload")
    public ResponseEntity<?> uploadPlayersExcel(@RequestParam("file") MultipartFile file, @PathVariable Long teamId) {
        try {
            playerUploadService.uploadPlayerStats(file, teamId);
            return ResponseEntity.ok("Upload player stats from excel successful.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // Example secured method with team and role check
    @PreAuthorize("@authValidator.belongsToTeam(#teamId) and hasRole('ADMIN')")
    @GetMapping("/teams/{teamId}/players/mock")
    public ResponseEntity<?> getPlayersForTeamMock(@PathVariable Long teamId) {
        return ResponseEntity.ok("Test");
    }

}
