import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    Box, Button, TextField, Typography, IconButton, Snackbar, Alert
} from "@mui/material";
import {Delete, ContentCopy} from "@mui/icons-material";
import Layout from "../../../components/sidebar/Layout.jsx";
import quizService from "../../../APIs/QuizService.js";

export const CreateQuiz = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [estimatedDuration, setEstimatedDuration] = useState(5); // default 5 min
    const [questions, setQuestions] = useState([]);

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [copySuccess, setCopySuccess] = useState(false);

    const handleAddQuestion = (type) => {
        const newQuestion = {type, text: "", option1: "", option5: ""};
        setQuestions([...questions, newQuestion]);
    };

    const handleDeleteQuestion = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        const mappedQuestions = questions.map((q) => {
            if (q.type === "SCALA") {
                return {
                    type: "SCALA",
                    question: q.text,
                    option1: q.option1,
                    option5: q.option5
                };
            } else {
                return {
                    type: "PARAGRAPH",
                    question: q.text,
                    value: q.text
                };
            }
        });

        try {
            await quizService.createQuiz({
                title,
                description,
                estimatedDuration,
                questions: mappedQuestions,
            });
            navigate("/quizzes");
        } catch (error) {
            console.error(error);
            setErrorMessage("Failed to create quiz. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDuplicateQuestion = (index) => {
        const questionToDuplicate = questions[index];
        const duplicatedQuestion = { ...questionToDuplicate }; // shallow clone is enough for this case

        const updatedQuestions = [
            ...questions.slice(0, index + 1),
            duplicatedQuestion,
            ...questions.slice(index + 1)
        ];

        setQuestions(updatedQuestions);
    };

    const handleCloseSnackbar = () => setCopySuccess(false);

    return (
        <Layout>
            <Box sx={{maxWidth: 800, mx: "auto", mt: 10, p: 4, backgroundColor: "#f5f5f5", borderRadius: 5}}>
                <Typography variant="h2" gutterBottom align="center">
                    Create quiz
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Insert quiz title ..."
                        fullWidth
                        margin="normal"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <TextField
                        label="Insert quiz description ..."
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <TextField
                        label="Estimated duration (minutes)"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={estimatedDuration}
                        onChange={(e) => setEstimatedDuration(parseInt(e.target.value))}
                        inputProps={{min: 1}}
                        required
                    />

                    {questions.map((question, index) => (
                        <Box key={index} sx={{mt: 4, p: 2, backgroundColor: "white", borderRadius: 3}}>
                            {question.type === "SCALA" && (
                                <>
                                    <TextField
                                        label="Insert scala question ..."
                                        fullWidth
                                        value={question.text}
                                        onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
                                        margin="normal"
                                    />
                                    <Typography variant="body2" sx={{mt: 1}}>
                                        The answer to this question will be a number from 1 to 5.
                                    </Typography>
                                    <Box sx={{display: "flex", gap: 2, mt: 2}}>
                                        <TextField
                                            label="1"
                                            value={question.option1}
                                            onChange={(e) => handleQuestionChange(index, "option1", e.target.value)}
                                            fullWidth
                                        />
                                        <TextField
                                            label="5"
                                            value={question.option5}
                                            onChange={(e) => handleQuestionChange(index, "option5", e.target.value)}
                                            fullWidth
                                        />
                                    </Box>
                                </>
                            )}

                            {question.type === "PARAGRAPH" && (
                                <TextField
                                    label="Insert paragraph question ..."
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={question.text}
                                    onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
                                    margin="normal"
                                />
                            )}

                            <IconButton onClick={() => handleDeleteQuestion(index)} sx={{mt: 1}}>
                                <Delete/>
                            </IconButton>
                            <IconButton onClick={() => handleDuplicateQuestion(index)} sx={{mt: 1}}>
                                <ContentCopy/>
                            </IconButton>
                        </Box>
                    ))}

                    <Box sx={{display: "flex", justifyContent: "center", gap: 4, mt: 5}}>
                        <Button variant="outlined" onClick={() => handleAddQuestion("SCALA")}>
                            Scala
                        </Button>
                        <Button variant="outlined" onClick={() => handleAddQuestion("PARAGRAPH")}>
                            Paragraph
                        </Button>
                    </Box>

                    {errorMessage && (
                        <Typography color="error" sx={{mt: 2}}>
                            {errorMessage}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{mt: 5}}
                        disabled={loading}
                    >
                        {loading ? "Publishing..." : "Publish"}
                    </Button>
                </form>

                <Snackbar
                    open={copySuccess}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{vertical: "top", horizontal: "center"}}
                >
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{width: "100%"}}>
                        Quiz copied successfully!
                    </Alert>
                </Snackbar>
            </Box>
        </Layout>
    );
};
