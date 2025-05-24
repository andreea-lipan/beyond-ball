package diss.beyondballbe.controllers;

import diss.beyondballbe.model.accounts.UserAccount;
import diss.beyondballbe.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<?> sendCredentials(@RequestBody UserAccount user) {
        boolean sent = emailService.sendCredentials(user);
        if (sent) {
            return ResponseEntity.ok("Email sent successfully.");
        } else {
            return ResponseEntity.status(500).body("Failed to send email.");
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<String> resendCredentials(@RequestBody UserAccount user) {
        boolean sent = emailService.sendCredentials(user);
        if (sent) {
            return ResponseEntity.ok("Email sent successfully.");
        } else {
            return ResponseEntity.status(500).body("Failed to send email.");
        }
    }
}
