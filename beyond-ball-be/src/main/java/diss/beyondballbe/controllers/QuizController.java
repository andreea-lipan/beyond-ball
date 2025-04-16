package diss.beyondballbe.controllers;

import diss.beyondballbe.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/quizzes")
public class QuizController {
    @Autowired
    private QuizService quizService;

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @GetMapping
    public ResponseEntity<?> getAllWhiteboards() {
        return ResponseEntity.ok(quizService.getAllQuizzes());
    }
}
