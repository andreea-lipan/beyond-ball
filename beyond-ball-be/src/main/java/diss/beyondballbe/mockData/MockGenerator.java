package diss.beyondballbe.mockData;

import diss.beyondballbe.model.DTOs.TeamDTO;
import diss.beyondballbe.model.accounts.UserRole;
import diss.beyondballbe.model.quizes.Quiz;
import diss.beyondballbe.persistence.QuizRepository;
import diss.beyondballbe.services.AuthService;
import diss.beyondballbe.services.QuizService;
import diss.beyondballbe.services.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/mock")
public class MockGenerator {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserAccountService userAccountService;

    @Autowired
    private QuizRepository quizRepository;

    @GetMapping
    public void generateMockData() {
        generateAdmin();
        generateUsers();
        generateQuizzes();
    }

    private void generateAdmin(){
        TeamDTO teamDTO = new TeamDTO();
        teamDTO.setTeamName("Buzz");
        teamDTO.setUsername("admin");
        teamDTO.setPassword("admin");
        authService.registerTeam(teamDTO);
    }

    private void generateUsers(){
        authService.registerTeamMember("staff", "staff", 1L, UserRole.STAFF);
        authService.registerTeamMember("player","player", 1L, UserRole.PLAYER);
    }


    private void generateQuizzes(){
        List<String> titles = List.of(
                "Anger Management",
                "Feedback game 25.04.2025",
                "Teamwork",
                "Communication Skills",
                "Time Management",
                "Problem Solving",
                "Leadership",
                "Conflict Resolution",
                "Adaptability",
                "Creativity"
        );


        for (int i = 0; i < 10; i++) {
            Quiz quiz = new Quiz();
            quiz.setTitle(titles.get(i));
            quiz.setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultrices  accumsan eros, eget consequat nulla aliquet eu. Cras a elit efficitur,  pharetra magna ut, hendrerit sapien.\u2028\u2028Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultrices  accumsan eros, eget consequat nulla aliquet eu. Cras a elit efficitur,  pharetra magna ut, hendrerit sapien.");
            quiz.setAuthor(userAccountService.getAccountById(1L));
            quiz.setEstimatedDuration(i*10L);

            quizRepository.save(quiz);

        }
    }
}
