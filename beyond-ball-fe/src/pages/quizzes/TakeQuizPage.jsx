import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizService from '../../APIs/QuizService';
import { submitAnswer } from '../../services/AnswerService';
import { Button, TextField, Typography, Box } from '@mui/material';
import Storage from '../../utils/Storage';

const TakeQuizPage = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const username = Storage.getUsernameFromToken(); // Assuming you store it there

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await quizService.getQuizById(quizId);
        setQuiz(res.data);
      } catch (error) {
        console.error('Failed to fetch quiz', error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleInputChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      for (const questionId in answers) {
        await submitAnswer({
          username,
          quizId,
          questionId,
          answerText: answers[questionId],
        });
      }
      alert('Answers submitted successfully!');
      navigate('/quizzes'); // Go back to quizzes page
    } catch (error) {
      console.error('Failed to submit answers', error);
      alert('Failed to submit answers. Try again.');
    }
  };

  if (!quiz) return <Typography>Loading quiz...</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>{quiz.title}</Typography>
      <Typography variant="subtitle1" gutterBottom>{quiz.description}</Typography>

      {quiz.questions.map((question) => (
        <Box key={question.id} sx={{ my: 2 }}>
          <Typography variant="h6">{question.text}</Typography>
          <TextField
            fullWidth
            multiline
            minRows={2}
            value={answers[question.id] || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder="Write your answer..."
            sx={{ mt: 1 }}
          />
        </Box>
      ))}

      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 4 }}>
        Submit Answers
      </Button>
    </Box>
  );
};

export default TakeQuizPage;
