package diss.beyondballbe.controllers;

import diss.beyondballbe.models.Answer;
import diss.beyondballbe.services.AnswerService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/answers")
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService answerService;

    @PostMapping("/submit")
    public ResponseEntity<Answer> submitAnswer(@RequestBody Answer answer) {
        Answer saved = answerService.saveAnswer(answer);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/export/{quizId}")
    public void exportAnswersToExcel(@PathVariable Long quizId, HttpServletResponse response) throws IOException {
        List<Answer> answers = answerService.getAnswersByQuizId(quizId);

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Answers");

        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("Username");
        header.createCell(1).setCellValue("Question ID");
        header.createCell(2).setCellValue("Answer Text");

        int rowNum = 1;
        for (Answer answer : answers) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(answer.getUsername());
            row.createCell(1).setCellValue(answer.getQuestionId());
            row.createCell(2).setCellValue(answer.getAnswerText());
        }

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=answers.xlsx");
        workbook.write(response.getOutputStream());
        workbook.close();
    }
}
