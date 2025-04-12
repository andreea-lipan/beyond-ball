package diss.beyondballbe.controllers;

import diss.beyondballbe.exceptions.UsernameAlreadyExistsException;
import diss.beyondballbe.model.DTOs.TeamDTO;
import diss.beyondballbe.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        try {
            System.out.println("Hit /auth/login endpoint");
            String token = authService.login(body.get("username"), body.get("password"));
            System.out.println("Got token");
            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/team-signup")
    public ResponseEntity<?> registerCompany(@RequestBody TeamDTO teamDTO) {
        try {
            authService.registerTeam(teamDTO);
            return ResponseEntity.ok(Map.of(
                    "message", "Team registered successfully!"
            ));
        } catch (UsernameAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                    "error", "Username already exists"
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "error", "Invalid input, all the inputs should be of length at least 2"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "error", "Unexpected error"
            ));
        }
    }
}
