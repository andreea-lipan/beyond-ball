package main.java.diss.beyondballbe.services;

import diss.beyondballbe.models.Answer;
import diss.beyondballbe.repositories.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;

    public Answer saveAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    public List<Answer> getAnswersByQuizId(Long quizId) {
        return answerRepository.findByQuizId(quizId);
    }

    public List<Answer> getAnswersByUsername(String username) {
        return answerRepository.findByUsername(username);
    }
}
