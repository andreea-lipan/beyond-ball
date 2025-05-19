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
} from "@mui/material";
//ejcehcdjdyjt
const TakeQuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    quizService.getQuizById(id)
      .then((res) => setQuiz(res.data))
      .catch((err) => {
        console.error(err);
        setError("Could not load quiz.");
      });
  }, [id]);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("✅ Submitted answers:", answers);
    setSubmitted(true);

    // TODO: Poți trimite către backend cu axios.post("/answers", answers)
  };

  if (error) return <Layout><Alert severity="error">{error}</Alert></Layout>;
  if (!quiz) return <Layout><Typography>Loading...</Typography></Layout>;

  return (
    <Layout>
      <Box sx={{ p: 4 }}>
        <Typography variant="h2" gutterBottom>{quiz.title}</Typography>
        <Typography variant="subtitle1" gutterBottom>{quiz.description}</Typography>

        <Divider sx={{ my: 3 }} />

        {quiz.questions?.map((question, index) => (
          <Box key={question.id} sx={{ my: 4 }}>
            <Typography variant="h6" gutterBottom>
              {index + 1}. {question.question}
            </Typography>

            {question.type === "SCALA" ? (
              <TextField
                label="Scale (1 to 5)"
                type="number"
                inputProps={{ min: 1, max: 5 }}
                fullWidth
                value={answers[question.id] || ""}
                onChange={(e) => handleChange(question.id, e.target.value)}
              />
            ) : (
              <TextField
                label="Your Answer"
                multiline
                fullWidth
                rows={3}
                value={answers[question.id] || ""}
                onChange={(e) => handleChange(question.id, e.target.value)}
              />
            )}
          </Box>
        ))}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 3 }}
        >
          Submit Answers
        </Button>

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
