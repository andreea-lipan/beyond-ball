package diss.beyondballbe.model.DTOs;

public class QuizAnswerDTO {
    private Long questionId;
    private String answerText;

    public QuizAnswerDTO() { }

    public Long getQuestionId() {
        return questionId;
    }
    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public String getAnswerText() {
        return answerText;
    }
    public void setAnswerText(String answerText) {
        this.answerText = answerText;
    }
}
