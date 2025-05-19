import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout.jsx";
import { Typography } from "@mui/material";
import { TopBar } from "./TopBar.jsx";
import { QuizContainer } from "./QuizContainer.jsx";
import { Popup } from "../../components/popup/Popup.jsx";
import quizService from "../../APIs/QuizService.js";
import { MessageType } from "../../components/popup/MessageType.js";

const QuizzesPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const quizzesPerPage = 3;

  const [quizzes, setQuizzes] = useState([]);
  const [rawSearchTerm, setRawSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchTerm(rawSearchTerm);
      setPage(0);
    }, 300);
    return () => clearTimeout(delay);
  }, [rawSearchTerm]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = () => {
    quizService.getQuizzes()
      .then(response => {
        setQuizzes(response.data);
      })
      .catch(error => {
        console.log(error);
        setIsVisible(true);
        setMessage("Failed to fetch quizzes.");
        setMessageType(MessageType.error);
      });
  };

  const handleDeleteQuiz = async (quizId) => {
  
    fetchQuizzes();
  };


  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const maxPage = Math.ceil(filteredQuizzes.length / quizzesPerPage);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, maxPage - 1));
  const handleSearch = (e) => setRawSearchTerm(e.target.value);

  const handleAddQuiz = () => {
    navigate("/quizzes/create");
  };

  return (
    <Layout>
      <Popup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        message={message}
        messageType={messageType}
      />
      <Typography variant="h1" sx={{ mb: 7 }}>
        Quizzes
      </Typography>

      <TopBar handleAddQuiz={handleAddQuiz} handleSearch={handleSearch} />

      <QuizContainer
        quizzes={quizzes}
        handleNext={handleNext}
        handlePrev={handlePrev}
        page={page}
        maxPage={maxPage}
        onQuizDeleted={handleDeleteQuiz} // ✅ Pasăm funcția de delete
      />
    </Layout>
  );
};

export default QuizzesPage;
