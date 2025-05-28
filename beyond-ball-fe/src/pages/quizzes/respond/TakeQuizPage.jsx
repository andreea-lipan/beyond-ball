import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Layout from "../../../components/sidebar/Layout.jsx";
import quizService from "../../../APIs/QuizService.js";
import {
    Typography,
    Box,
    TextField,
    Button,
    Divider,
    Card,
    CardHeader,
    CardContent, useTheme,
} from "@mui/material";
import {ScalaAnswer} from "./ScalaAnswer.jsx";
import {SubmitQuizAnswersModal} from "./SubmitQuizAnswersModal.jsx";
import useModal from "../../../components/modals/useModal.js";
import {Popup} from "../../../components/popup/Popup.jsx";
import {MessageType} from "../../../components/popup/MessageType.js";

const TakeQuizPage = () => {
    // Page utils
    const theme = useTheme();
    const navigate = useNavigate();

    // Quiz information
    const {id} = useParams();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});

    // State for the confirmation modal
    const modalState = useModal(false);

    // State for the Error Popup
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState("")
    const [showPopup, setShowPopup] = useState(false)

    const failedToSubmitAnswers = () => {
        setPopupMessage(`Failed to submit your answers. Try taking the quiz again later!`);
        setPopupType(MessageType.error);
        setShowPopup(true);
    }

    const failedToLoadTheQuiz = () => {
        setPopupMessage(`Failed to load the quiz. Try taking the quiz again later!`);
        setPopupType(MessageType.error);
        setShowPopup(true);
    }

    useEffect(() => {
        quizService
            .getQuizById(id)
            .then((res) => setQuiz(res.data))
            .catch((err) => {
                console.error(err);
                failedToLoadTheQuiz();
            });
    }, [id]);

    const handleChange = (questionId, value) => {
        setAnswers((prev) => ({...prev, [questionId]: value}));
    };

    const handleSubmit = async () => {
        const payload = quiz.questions.map((q) => ({
            questionId: q.id,
            answerText: answers[q.id] ?? "",
        }));

        try {
            await quizService.submitAnswers(quiz.id, payload);
            navigate("/quizzes");
        } catch (err) {
            console.error("Submit failed", err);
            failedToSubmitAnswers();
        }
    };

    return (
        <Layout>
            {/* Popup for error messages */}
            <Popup
                message={popupMessage}
                messageType={popupType}
                isVisible={showPopup}
                setIsVisible={setShowPopup}
            />
            {quiz ?
                <>
                    {/* Confirmation modal for when submitting the answers */}
                    <SubmitQuizAnswersModal state={modalState} handleConfirm={handleSubmit}/>

                    {/* Page Content */}
                    <Box sx={{
                        width: '70vw',
                        mx: "auto",
                        padding: 4,
                        borderRadius: 3,
                        backgroundColor: theme.palette.background.secondary
                    }}>

                        {/* Title & Description */}
                        <Typography variant="h1" align="center" gutterBottom>
                            {quiz.title}
                        </Typography>
                        <Typography variant="body1" align="center" gutterBottom>
                            {quiz.description}
                        </Typography>
                        <Divider sx={{my: 3}}/>

                        {/* Quiz Content */}
                        <Box display="flex" flexDirection="column" gap={2}>
                            {quiz.questions.map((question, idx) => (
                                <Card
                                    key={question.id}
                                    variant="outlined"
                                    sx={{
                                        border: 'none',
                                        boxShadow: 'none',
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    <CardHeader
                                        title={`${idx + 1}. ${question.question}`}
                                        titleTypographyProps={{variant: "h6"}}
                                    />
                                    <CardContent>
                                        {question.type === "SCALA" && (
                                            <ScalaAnswer question={question} handleChange={handleChange}/>
                                        )}

                                        {question.type === "PARAGRAPH" && (
                                            <TextField
                                                fullWidth
                                                label="Your Answer"
                                                multiline
                                                rows={3}
                                                value={answers[question.id] || ""}
                                                onChange={(e) =>
                                                    handleChange(question.id, e.target.value)
                                                }
                                            />
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>

                        {/* Submit button */}
                        <Box textAlign="center" mt={4}>
                            <Button variant="contained" onClick={modalState.openModal}>
                                Submit Answers
                            </Button>
                        </Box>

                    </Box>
                </>
                : <Typography>Loading...</Typography>}
        </Layout>
    );
};

export default TakeQuizPage;
