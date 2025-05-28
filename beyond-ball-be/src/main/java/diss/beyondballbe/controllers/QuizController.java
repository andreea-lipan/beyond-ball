package diss.beyondballbe.controllers;

import diss.beyondballbe.model.DTOs.QuizDTO;
import diss.beyondballbe.model.DTOs.QuizQuestionDTO;
import diss.beyondballbe.model.accounts.UserAccount;
import diss.beyondballbe.model.quizes.Quiz;
import diss.beyondballbe.services.QuizService;

import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.time.Instant;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.stream.Stream;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import diss.beyondballbe.persistence.QuizAnswerEntity;
import diss.beyondballbe.persistence.QuizRepository;
import diss.beyondballbe.services.QuizAnswerService;
import diss.beyondballbe.services.QuizQuestionService;
import diss.beyondballbe.model.DTOs.QuizAnswerDTO;
import diss.beyondballbe.services.UserAccountService;
import jakarta.persistence.EntityNotFoundException;


@CrossOrigin
@RestController
@RequestMapping("/api/quizzes")
public class QuizController {
    @Autowired
    private QuizAnswerService answerService;
    @Autowired
    private QuizService quizService;
    @Autowired
    private UserAccountService userService;
    @Autowired
    private QuizQuestionService questionService;
    @Autowired
    private QuizRepository quizRepository;


    // GET - toți pot vedea quizurile
    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @GetMapping
    public ResponseEntity<?> getAllQuizzes(Principal principal) {
        return ResponseEntity.ok(quizService.getAllQuizzes(principal.getName()));
    }

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @GetMapping("/player/{playerId}")
    public ResponseEntity<?> getCompletedQuizzes(
            @PathVariable Long playerId) {
        return ResponseEntity.ok(quizService.getAllCompletedQuizzes(playerId));
    }


    // POST - doar STAFF și ADMIN pot crea quizuri
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

    @PreAuthorize("hasRole('PLAYER')")
    @PostMapping("/{quizId}/answers")
    public ResponseEntity<Void> submitQuizAnswers(
            @PathVariable Long quizId,
            @RequestBody List<QuizAnswerDTO> answerDTOs,
            Principal principal
    ) {
        // 1) Load the Quiz entity (instead of `new Quiz(quizId)`)
        Quiz quizEntity = quizRepository.findById(quizId)
                .orElseThrow(() -> new EntityNotFoundException("Quiz not found: " + quizId));

        // 2) Unwrap the Optional<UserAccount> instead of passing it in raw
        UserAccount user = userService.findByUsername(principal.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + principal.getName()));

        //todo verify if user hasnt already answered

        // 3) Map DTOs to entities
        List<QuizAnswerEntity> entities = answerDTOs.stream().map(dto -> {
            QuizAnswerEntity e = new QuizAnswerEntity();
            e.setQuiz(quizEntity);
            e.setUser(user);
            e.setQuestion(
                    questionService.getById(dto.getQuestionId())
                            .orElseThrow(() -> new EntityNotFoundException("Question not found: " + dto.getQuestionId()))
            );
            e.setAnswerText(dto.getAnswerText());
            e.setSubmittedAt(Instant.now());
            return e;
        }).toList();

        // 4) Persist them
        answerService.saveAll(entities);

        return ResponseEntity.ok().build();
    }

    // ── Download answers CSV ───────────────────────────────────────────────────
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{quizId}/answers/download")
    public ResponseEntity<ByteArrayResource> downloadAnswers(@PathVariable Long quizId) throws Exception {
        // 1) Load the quiz (DTO) to get the ordered list of questions
        QuizDTO quizDto = quizService.getQuizById(quizId);
        List<QuizQuestionDTO> questions = quizDto.getQuestions();

        // 2) Fetch all persisted answers
        List<QuizAnswerEntity> answers = answerService.findByQuizId(quizId);

        // 3) Group answers by username
        Map<String, List<QuizAnswerEntity>> answersByUser = answers.stream()
                .collect(Collectors.groupingBy(a -> a.getUser().getUsername()));

        // 4) Build the CSV with a header row: Username + each question text
        String[] header = Stream.concat(
                        Stream.of("Username"),
                        questions.stream().map(QuizQuestionDTO::getQuestion)
                )
                .toArray(String[]::new);

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        CSVPrinter csv = new CSVPrinter(
                new OutputStreamWriter(out, StandardCharsets.UTF_8),
                CSVFormat.DEFAULT.withHeader(header)
        );

        // 5) For each user, emit one row: username + answers in question order
        for (Map.Entry<String, List<QuizAnswerEntity>> entry : answersByUser.entrySet()) {
            String username = entry.getKey();
            List<QuizAnswerEntity> userAnswers = entry.getValue();

            // map questionId -> answerText
            Map<Long, String> answerMap = userAnswers.stream()
                    .collect(Collectors.toMap(
                            a -> a.getQuestion().getId(),
                            QuizAnswerEntity::getAnswerText
                    ));

            // build row
            List<String> row = new ArrayList<>();
            row.add(username);
            for (QuizQuestionDTO q : questions) {
                row.add(answerMap.getOrDefault(q.getId(), ""));
            }
            csv.printRecord(row);
        }

        csv.flush();

        // 6) Return as downloadable file
        ByteArrayResource resource = new ByteArrayResource(out.toByteArray());
        String filename = "quiz-" + quizId + "-responses.csv";
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
