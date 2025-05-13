import { useState, useEffect } from "react";
import Layout from "../../components/Layout.jsx";
import { Typography } from "@mui/material";
import { TopBar } from "./TopBar.jsx";
import { QuizContainer } from "./QuizContainer.jsx";
import {Popup} from "../../components/popup/Popup.jsx";
import quizService from "../../APIs/QuizService.js";
import {MessageType} from "../../components/popup/MessageType.js";

const QuizzesPage = () => {
  const [page, setPage] = useState(0);
  const quizzesPerPage = 3;

  const [quizzes, setQuizzes] = useState([]);
  const [rawSearchTerm, setRawSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Debounce search term
  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchTerm(rawSearchTerm);
      setPage(0); // Reset page when search term changes
    }, 300); // Delay in ms

    return () => clearTimeout(delay); // Cleanup
  }, [rawSearchTerm]);

  useEffect(() => {
    quizService.getQuizzes()
        .then(response => {
            setQuizzes(response.data);
        })
        .catch(error => {
          console.log(error);
          setIsVisible(true);
          setMessage("Failed to fetch quizzes.");
          setMessageType(MessageType.error);
        })
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

  const handleSearch = (e) => setRawSearchTerm(e.target.value);

  const handleAddQuiz = () => console.log("Add Quiz clicked");


  return (
    <Layout>
      <Popup isVisible={isVisible} setIsVisible={setIsVisible} message={message} messageType={messageType} />
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