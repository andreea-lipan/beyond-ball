import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as XLSX from "xlsx";
import Layout from "../../components/Layout.jsx";
import { useAuth } from "../../components/AuthContext";
import { useNavigate } from "react-router-dom";

const mockQuizzes = [
  {
    id: 1,
    title: "Player anger management",
    duration: "12 mins",
    questions: 12,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultrices accumsan eros..."
  },
  {
    id: 2,
    title: "Player creativity assessment",
    duration: "30 mins",
    questions: 20,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultrices accumsan eros..."
  },
  {
    id: 3,
    title: "Team communication",
    duration: "12 mins",
    questions: 32,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultrices accumsan eros..."
  },
];

const mockAnswers = {
  1: [
    { player: "John Doe", answer: "Option A" },
    { player: "Jane Smith", answer: "Option B" },
  ],
  2: [
    { player: "Carlos Ruiz", answer: "True" },
    { player: "Maria Gomez", answer: "False" },
  ],
  3: [
    { player: "Eden Hazard", answer: "Yes" },
    { player: "Alex Morgan", answer: "No" },
  ],
};

const QuizzesPage = () => {
  const { role } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setQuizzes(mockQuizzes); // Replace with real API
  }, []);

  const downloadAnswers = (quizId) => {
    const data = mockAnswers[quizId];
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Answers");
    XLSX.writeFile(workbook, `quiz_${quizId}_answers.xlsx`);
  };

  const filteredQuizzes = quizzes.filter(q =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Quiz management
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <TextField
          placeholder="Search clips by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <Button variant="outlined">+ Add quiz</Button>
      </div>

      <Grid container spacing={2}>
        {filteredQuizzes.map(quiz => (
          <Grid item xs={12} sm={6} md={4} key={quiz.id}>
            <Card
              style={{ cursor: role === "PLAYER" ? "pointer" : "default" }}
              onClick={() => role === "PLAYER" && navigate(`/quizzes/${quiz.id}`)}
            >
              <CardContent>
                <Typography variant="h6">{quiz.title}</Typography>
                <Typography variant="body2" gutterBottom>
                  ⏱ {quiz.duration} &nbsp;&nbsp; 📄 {quiz.questions} questions
                </Typography>
                <Typography variant="body2" style={{ marginBottom: 12 }}>
                  {quiz.description}
                </Typography>
                {role === "PLAYER" && (
                  <Button
                    variant="text"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadAnswers(quiz.id);
                    }}
                  >
                    Download answers Excel
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default QuizzesPage;