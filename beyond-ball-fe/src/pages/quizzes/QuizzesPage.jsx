import { useState, useEffect } from "react";
import Layout from "../../components/Layout.jsx";
import { Typography } from "@mui/material";
import { TopBar } from "./TopBar.jsx";
import { QuizContainer } from "./QuizContainer.jsx";

const QuizzesPage = () => {
  const [page, setPage] = useState(0);
  const quizzesPerPage = 3;

  const [quizzes, setQuizzes] = useState([]);
  const [rawSearchTerm, setRawSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🆕 Debounce search term
  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchTerm(rawSearchTerm);
      setPage(0); // Reset page when search term changes
    }, 300); // Delay in ms

    return () => clearTimeout(delay); // Cleanup
  }, [rawSearchTerm]);

  useEffect(() => {
    fetch("http://localhost:8080/quizzes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch quizzes");
        }
        return response.json();
      })
      .then((data) => {
        setQuizzes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);

      });
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const maxPage = Math.ceil(filteredQuizzes.length / quizzesPerPage);
  const currentQuizzes = filteredQuizzes.slice(
    page * quizzesPerPage,
    page * quizzesPerPage + quizzesPerPage
  );

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, maxPage - 1));

  const handleSearch = (e) => setRawSearchTerm(e.target.value); // 🆕

  const handleAddQuiz = () => console.log("Add Quiz clicked");

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Layout>
      <Typography variant="h1" sx={{ mb: 7 }}>
        Quizzes
      </Typography>

      <TopBar handleAddQuiz={handleAddQuiz} handleSearch={handleSearch} />

      <QuizContainer
        quizzes={currentQuizzes}
        handleNext={handleNext}
        handlePrev={handlePrev}
        page={page}
        maxPage={maxPage}
      />
    </Layout>
  );
};

export default QuizzesPage;
