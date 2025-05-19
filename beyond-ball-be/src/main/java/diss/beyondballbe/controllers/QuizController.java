package diss.beyondballbe.controllers;

import diss.beyondballbe.model.DTOs.QuizDTO;
import diss.beyondballbe.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    // ✅ GET - toți pot vedea quizurile
    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @GetMapping
    public ResponseEntity<?> getAllQuizzes() {
        return ResponseEntity.ok(quizService.getAllQuizzes());
    }

    // ✅ POST - doar STAFF și ADMIN pot crea quizuri
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    @PostMapping
    public ResponseEntity<?> createQuiz(@RequestBody QuizDTO quizDTO) {
        quizService.createQuiz(quizDTO);
        return ResponseEntity.ok().build();
    }


    // Pentru admin -> poate șterge quiz
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{quizId}")
    public ResponseEntity<?> deleteQuiz(@PathVariable Long quizId) {
        quizService.deleteQuiz(quizId);
        return ResponseEntity.ok().build();
    }
    
    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
@GetMapping("/{quizId}")
public ResponseEntity<QuizDTO> getQuizById(@PathVariable Long quizId) {
    return ResponseEntity.ok(quizService.getQuizById(quizId));
}


}
