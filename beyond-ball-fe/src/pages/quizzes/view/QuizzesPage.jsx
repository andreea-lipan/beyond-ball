import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router";
import Layout from "../../../components/sidebar/Layout.jsx";
import {Box, Typography} from "@mui/material";
import {TopBar} from "./TopBar.jsx";
import {QuizContainer} from "./QuizContainer.jsx";
import {Popup} from "../../../components/popup/Popup.jsx";
import quizService from "../../../APIs/QuizService.js";
import {MessageType} from "../../../components/popup/MessageType.js";
import {QUIZ_CREATE_PAGE} from "../../../utils/UrlConstants.js";
import UserService from "../../../APIs/UserService.js";
import Storage from "../../../utils/Storage.js"

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

    const [noPlayers, setNoPlayers] = useState(false);
    const teamId = Storage.getTeamIdFromToken();

    // Debounce search term
    useEffect(() => {
        const delay = setTimeout(() => {
            setPage(0);
            setSearchTerm(rawSearchTerm);
            setPage(0); // Reset page when search term changes
        }, 300); // Delay in ms

        return () => clearTimeout(delay); // Cleanup
    }, [rawSearchTerm]);

    useEffect(() => {
        fetchQuizzes();
        UserService.getNoPlayers(teamId).then(res=>setNoPlayers(res));
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
        try {
            await quizService.deleteQuiz(quizId);
            fetchQuizzes();
        } catch (error) {
            console.error(error);
            setIsVisible(true);
            setMessage("Failed to delete quiz.");
            setMessageType(MessageType.error);
        }
    };

    const sortFn = (a, b) => {
        if(a.completed === b.completed) {
            return a.creationDate < b.creationDate? 1 : -1;
        } else {
            return a.completed - b.completed;
        }
    }

    const filteredQuizzes = quizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort(sortFn);

    const maxPage = Math.ceil(filteredQuizzes.length / quizzesPerPage);
    const currentQuizzes = filteredQuizzes.slice(
        page * quizzesPerPage,
        page * quizzesPerPage + quizzesPerPage
    );

    const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0));
    const handleNext = () => setPage((prev) => Math.min(prev + 1, maxPage - 1));
    const handleSearch = (e) => {
        setRawSearchTerm(e.target.value);
    }
    const setSearchAndReset = (term) => {
        setSearchTerm(term);
        setPage(0);
    }


    const handleAddQuiz = () => {
        navigate(QUIZ_CREATE_PAGE);
    };

    return (
        <Layout>
            <Popup isVisible={isVisible} setIsVisible={setIsVisible} message={message} messageType={messageType}/>
            {/* Page Title */}
            <Typography variant="h1" align="center" sx={{mt: 3, mb: 3}}>
                Quizzes
            </Typography>

            {/* Page Content */}
            <Box sx={{
                width: {
                    // xs: '100%',
                    sm: '80vw',
                    xl: '80vw',
                    xxl: '1900px',
                },
                display: 'flex',
                flexDirection: 'column',
                minHeight: 'calc(100vh - 143px)', // Account for header and title
            }}>
                <TopBar searchTerm={searchTerm} setSearchTerm={setSearchAndReset} handleSearch={handleSearch}
                        handleAddQuiz={handleAddQuiz} quizzes={quizzes}/>

                <QuizContainer
                    quizzes={currentQuizzes}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    page={page}
                    maxPage={maxPage}
                    onQuizDeleted={handleDeleteQuiz}
                    noPlayers={noPlayers}
                />

            </Box>
        </Layout>
    );
};

export default QuizzesPage;