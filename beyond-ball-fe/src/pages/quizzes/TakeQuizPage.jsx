import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/sidebar/Layout.jsx";
import quizService from "../../APIs/QuizService.js";
import {
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  Divider,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";

const TakeQuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    quizService
      .getQuizById(id)
      .then((res) => setQuiz(res.data))
      .catch((err) => {
        console.error(err);
        setError("Could not load quiz.");
      });
  }, [id]);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    const payload = quiz.questions.map((q) => ({
      questionId: q.id,
      answerText: answers[q.id] ?? "",
    }));

    try {
      await quizService.submitAnswers(quiz.id, payload);
      setSubmitted(true);
    } catch (err) {
      console.error("Submit failed", err);
      setError("Could not submit answers.");
    }
  };

  if (error) {
    return (
      <Layout>
        <Alert severity="error">{error}</Alert>
      </Layout>
    );
  }
  if (!quiz) {
    return (
      <Layout>
        <Typography>Loading...</Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ maxWidth: 600, mx: "auto", py: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          {quiz.title}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          {quiz.description}
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Box display="flex" flexDirection="column" gap={2}>
          {quiz.questions.map((question, idx) => (
            <Card key={question.id} variant="outlined">
              <CardHeader
                title={`${idx + 1}. ${question.question}`}
                titleTypographyProps={{ variant: "h6" }}
              />
              <CardContent>
                {question.type === "SCALA" ? (
                  <TextField
                    fullWidth
                    label="Scale (1–5)"
                    type="number"
                    inputProps={{ min: 1, max: 5 }}
                    value={answers[question.id] || ""}
                    onChange={(e) =>
                      handleChange(question.id, e.target.value)
                    }
                  />
                ) : (
                  <TextField
                    fullWidth
                    label="Your Answer"
                    multiline
                    rows={3}
                    value={answers[question.id] || ""}
                    onChange={(e) =>
                      handleChange(question.id, e.target.value)
                    }
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box textAlign="center" mt={4}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit Answers
          </Button>
        </Box>

        {submitted && (
          <Alert severity="success" sx={{ mt: 3 }}>
            Thank you! Your answers have been recorded.
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default TakeQuizPage;
