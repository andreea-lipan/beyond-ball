package diss.beyondballbe.controllers;

import diss.beyondballbe.model.DTOs.TeamDTO;
import diss.beyondballbe.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("login")
    public ResponseEntity<?> logIn(/*@RequestBody LoginRequest loginRequest*/) {
        try {
            //todo login logic
            // example:
            // LoginResponse response = authService.logIn(loginRequest);
            // return ResponseEntity.ok().body(response);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/team-signup")
    public ResponseEntity<?> registerCompany(@RequestBody TeamDTO teamDTO) {
        try {
            authService.registerTeam(teamDTO);
            return ResponseEntity.ok("Team registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }
}
