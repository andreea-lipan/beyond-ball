import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Slider,
  Box,
  CircularProgress
} from "@mui/material";
import Layout from "../../components/Layout.jsx";
import { useParams } from "react-router-dom";

const mockQuiz = {
  id: 1,
  title: "Player Anger Management",
  description: "This quiz assesses how well players manage emotional stress.",
  questions: [
    {
      id: 101,
      type: "paragraph",
      text: "Describe how you respond to provocation on the field."
    },
    {
      id: 102,
      type: "scale",
      text: "Rate your emotional control.",
      min: 1,
      max: 5,
      minLabel: "Low",
      maxLabel: "High"
    }
  ]
};

const QuizDetailPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Replace with real API call: fetch(`/api/quizzes/${id}`)
    setQuiz(mockQuiz);
  }, [id]);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const submission = {
      quizId: quiz.id,
      answers: Object.entries(answers).map(([questionId, response]) => ({
        questionId: Number(questionId),
        response
      }))
    };

    try {
      // Replace with real POST request
      console.log("Submitting:", submission);
      alert("Answers submitted successfully!");
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!quiz) return <Layout><CircularProgress /></Layout>;

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>{quiz.title}</Typography>
      <Typography variant="body1" gutterBottom>{quiz.description}</Typography>

      {quiz.questions.map((q) => (
        <Box key={q.id} sx={{ marginBottom: 3 }}>
          <Typography variant="subtitle1">{q.text}</Typography>
          {q.type === "paragraph" && (
            <TextField
              fullWidth
              multiline
              minRows={3}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}
          {q.type === "scale" && (
            <Box sx={{ px: 2 }}>
              <Slider
                min={q.min}
                max={q.max}
                step={1}
                value={answers[q.id] || q.min}
                onChange={(e, val) => handleChange(q.id, val)}
                marks
              />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="caption">{q.minLabel}</Typography>
                <Typography variant="caption">{q.maxLabel}</Typography>
              </Box>
            </Box>
          )}
        </Box>
      ))}

      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Answers"}
      </Button>
    </Layout>
  );
};

export default QuizDetailPage;
