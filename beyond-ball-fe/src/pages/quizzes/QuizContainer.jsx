import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { QuizCard } from "./QuizCard.jsx";

export const QuizContainer = ({ quizzes, handleNext, handlePrev, page, maxPage, onQuizDeleted }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "primary.main",
        pt: "10vh",
        pb: "13vh",
        borderRadius: "10px",
      }}
    >
      <IconButton
        disableRipple
        onClick={handlePrev}
        disabled={page === 0}
        sx={{ fontSize: 36, width: "3.5vw" }}
      >
        <ArrowBackIos fontSize="inherit" />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1vw",
          mt: 2,
        }}
      >
        {quizzes.length > 0 ? (
          quizzes.map((quiz, index) => (
            <QuizCard
              key={quiz.id || index}
              quiz={quiz}
              index={index}
              onDelete={onQuizDeleted} // ✅ transmite callback-ul
            />
          ))
        ) : (
          <Typography variant="h2" sx={{ fontWeight: 700 }} gutterBottom>
            No Quizzes found. Create one, or ask someone to create one.
          </Typography>
        )}
      </Box>

      <IconButton
        disableRipple
        onClick={handleNext}
        disabled={page >= maxPage - 1}
        sx={{
          fontSize: 36,
          width: "3.5vw",
        }}
      >
        <ArrowForwardIos fontSize="inherit" />
      </IconButton>
    </Box>
  );
};
