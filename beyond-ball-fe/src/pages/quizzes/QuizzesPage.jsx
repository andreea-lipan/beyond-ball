import {useState} from "react";
import Layout from "../../components/Layout.jsx";

import {
    Typography,
} from "@mui/material";
import {TopBar} from "./TopBar.jsx";
import {QuizContainer} from "./QuizContainer.jsx";

const dummyQuizzes = [
    {
        id: 1,
        title: "thingy thingy evaluation",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet facilisis urna. Praesent consequat, felis nec."
    },
    {
        id: 2,
        title: "thingy thingy evaluation",
        description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
    },
    {
        id: 3,
        title: "thingy thingy evaluation",
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
        id: 4,
        title: "Quiz 4",
        description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },

];



const QuizzesPage = () => {
    const [page, setPage] = useState(0);
    const quizzesPerPage = 3;
    const maxPage = Math.ceil(dummyQuizzes.length / quizzesPerPage);

    const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0));
    const handleNext = () => setPage((prev) => Math.min(prev + 1, maxPage));
    const handleSearch = (e) => console.log("Searching for:", e.target.value);
    const handleAddQuiz = () => console.log("Add Quiz clicked");



    const currentQuizzes = dummyQuizzes.slice(
        page * quizzesPerPage,
        page * quizzesPerPage + quizzesPerPage
    );

    return (
        <Layout>
            <Typography variant="h1" sx={{mb: 7}}>
                Quizzes
            </Typography>

            {/* Top Bar */}
            <TopBar handleAddQuiz={handleAddQuiz} handleSearch={handleSearch} />

            {/* Quiz Cards Row */}
            <QuizContainer quizzes={currentQuizzes} handleNext={handleNext} handlePrev={handlePrev} page={page} maxPage={maxPage}/>
        </Layout>
    );
};

export default QuizzesPage;
