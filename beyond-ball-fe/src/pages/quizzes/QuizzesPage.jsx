import { useState, useMemo } from "react";
import Layout from "../../components/Layout.jsx";
import {
  QuizSheetIcon,
  QuestionMarkIcon,
  MultipleChoiceIcon,
  IdeaIcon,
  ChecklistIcon,
} from "../../components/icons/quizBadges/quizIcons.jsx";
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  Box,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const dummyQuizzes = [
  { id: 1, title: "Quiz 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet facilisis urna. Praesent consequat, felis nec." },
  { id: 2, title: "Quiz 2", content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." },
  { id: 3, title: "Quiz 3", content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
  { id: 4, title: "Quiz 4", content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { id: 5, title: "Quiz 5", content: "Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate." },
  { id: 6, title: "Quiz 6", content: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer placerat." },
];

const iconComponents = [
  QuizSheetIcon,
  QuestionMarkIcon,
  MultipleChoiceIcon,
  IdeaIcon,
  ChecklistIcon,
];

const QuizzesPage = () => {
  const [page, setPage] = useState(0);
  const quizzesPerPage = 3;
  const maxPage = Math.floor(dummyQuizzes.length / quizzesPerPage);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, maxPage));
  const handleSearch = (e) => console.log("Searching for:", e.target.value);
  const handleAddQuiz = () => console.log("Add Quiz clicked");

  const quizIcons = useMemo(() => {
    return dummyQuizzes.map(() => {
      const randomIndex = Math.floor(Math.random() * iconComponents.length);
      return iconComponents[randomIndex];
    });
  }, []);

  const currentQuizzes = dummyQuizzes.slice(
    page * quizzesPerPage,
    page * quizzesPerPage + quizzesPerPage
  );

  return (
    <Layout>
      {/* Sticky Top Bar */}
      <Paper
        elevation={3}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          p: 2,
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "white",
          gap: 2,
        }}
      >
        <Typography variant="h5" sx={{ mr: 4 }}>
          Quizzes
        </Typography>

        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search quizzes..."
            onChange={handleSearch}
            sx={{ minWidth: 250 }}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddQuiz}
          sx={{ ml: "auto" }}
        >
          Add Quiz
        </Button>
      </Paper>

      {/* Quiz Cards Row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 3,
          pl: 4, // extra left padding for alignment with sidebar
        }}
      >
        <IconButton
          onClick={handlePrev}
          disabled={page === 0}
          sx={{ fontSize: 36 }}
        >
          <ArrowBackIos fontSize="inherit" />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 3,
            alignItems: "center",
            flexWrap: "nowrap",
          }}
        >
          {currentQuizzes.map((quiz, idx) => {
            const Icon = quizIcons[page * quizzesPerPage + idx];

            return (
              <Card
                key={quiz.id}
                sx={{
                  width: "20vw",
                  height: "60vh",
                  position: "relative",
                  p: 2,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
              >
                {/* Icon in Top Left */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    color: "primary.main",
                    width: "25%",
                    height: "25%",
                  }}
                >
                  <Icon width="100%" height="100%" />
                </Box>

                <CardContent sx={{ mt: 8 }}>
                  <Typography variant="h6" gutterBottom>
                    {quiz.title}
                  </Typography>
                  <Typography variant="body2">{quiz.content}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        <IconButton
          onClick={handleNext}
          disabled={page === maxPage - 1}
          sx={{ fontSize: 36 }}
        >
          <ArrowForwardIos fontSize="inherit" />
        </IconButton>
      </Box>
    </Layout>
  );
};

export default QuizzesPage;
