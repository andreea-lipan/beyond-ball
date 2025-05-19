package diss.beyondballbe.controllers;

import diss.beyondballbe.model.DTOs.QuizDTO;
import diss.beyondballbe.services.QuizService;

import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.io.ByteArrayOutputStream;

import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import diss.beyondballbe.persistence.QuizAnswerEntity;
import diss.beyondballbe.services.QuizAnswerService;


@CrossOrigin
@RestController
@RequestMapping("/quizzes")
public class QuizController {
    @Autowired
    private QuizAnswerService answerService;
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

  // ── Download answers CSV ───────────────────────────────────────────────────
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{quizId}/answers/download")
    public ResponseEntity<ByteArrayResource> downloadAnswers(@PathVariable Long quizId) throws Exception {
        // verify quiz exists (optional)
        quizService.getQuizById(quizId);

        // fetch persisted answers
        List<QuizAnswerEntity> answers = answerService.findByQuizId(quizId);

        // build CSV
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        CSVPrinter csv = new CSVPrinter(
            new OutputStreamWriter(out, StandardCharsets.UTF_8),
            CSVFormat.DEFAULT.withHeader("Answer ID","Username","Question Text","Answer","Submitted At")
        );

        for (QuizAnswerEntity a : answers) {
            csv.printRecord(
                a.getId(),
                a.getUser().getUsername(),
                a.getQuestion().getQuestion(),
                a.getAnswerText(),
                a.getSubmittedAt()
            );
        }
        csv.flush();

        // wrap and return
        ByteArrayResource resource = new ByteArrayResource(out.toByteArray());
        String filename = "quiz-" + quizId + "-answers.csv";

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
            .contentLength(resource.contentLength())
            .contentType(MediaType.parseMediaType("text/csv"))
            .body(resource);
    }

    
    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
@GetMapping("/{quizId}")
public ResponseEntity<QuizDTO> getQuizById(@PathVariable Long quizId) {
    return ResponseEntity.ok(quizService.getQuizById(quizId));
}


}
