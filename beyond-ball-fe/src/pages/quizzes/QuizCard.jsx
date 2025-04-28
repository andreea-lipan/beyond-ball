import { Button, Card, CardActionArea, CardContent, CardHeader, Icon, Typography } from "@mui/material";
import { ChecklistIcon, IdeaIcon, MultipleChoiceIcon, QuestionMarkIcon, QuizSheetIcon } from "../../components/icons/quiz/quizIcons.jsx";
import { TimerIcon } from "../../components/icons/quiz/TimerIcon.jsx";
import { QuestionsIcon } from "../../components/icons/quiz/QuestionsIcon.jsx";
import { CardActions } from "@mui/joy";
import Storage from "../../utils/Storage.js";
import { useNavigate } from "react-router-dom";
import { QUIZ_TAKING_PAGE } from "../../utils/UrlConstants.js";
import quizService from "../../APIs/QuizService.js";

const iconComponents = [
    QuizSheetIcon,
    QuestionMarkIcon,
    MultipleChoiceIcon,
    IdeaIcon,
    ChecklistIcon,
];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export const QuizCard = ({ quiz, index, onQuizDeleted }) => {
    const Icon = iconComponents[(index * getRandomInt(100)) % iconComponents.length];
    const role = Storage.getRoleFromToken();
    const isAdmin = role === "ADMIN";
    const navigate = useNavigate();

    const handleDownload = async () => {
        try {
            const response = await quizService.downloadAnswers(quiz.id);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${quiz.title}-answers.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download answers:", error);
            alert("Failed to download answers. Please try again.");
        }
    };

    const handleClick = () => {
        navigate(QUIZ_TAKING_PAGE(quiz.id));
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this quiz?")) {
            try {
                await quizService.deleteQuiz(quiz.id);
                if (onQuizDeleted) {
                    onQuizDeleted();
                }
            } catch (error) {
                console.error("Failed to delete quiz:", error);
                alert("Failed to delete quiz. Please try again.");
            }
        }
    };

    return (
        <Card
            key={quiz.id}
            sx={{
                width: "17vw",
                height: "45vh",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CardActionArea
                onClick={role === "PLAYER" ? handleClick : undefined}
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    p: "1.5vw",
                    "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                    },
                }}
            >
                <CardHeader
                    avatar={<Icon color="primary" />}
                    title={
                        <Typography variant="h2" sx={{ fontWeight: 700 }} gutterBottom>
                            {quiz.title}
                        </Typography>
                    }
                    subheader={
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" gutterBottom>
                                <TimerIcon /> {quiz.estimatedDuration} min
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                <QuestionsIcon /> {quiz.questions?.length} questions
                            </Typography>
                        </div>
                    }
                />

                <CardContent style={{ overflow: "hidden", flexGrow: 1 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: { xs: 2, sm: 3, md: 4, lg: 5 },
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {quiz.description}
                    </Typography>
                </CardContent>
            </CardActionArea>

            {/* Buttons section */}
            <CardActions sx={{ mt: "auto", mr: "auto", p: "0.5vw", flexDirection: "column" }}>
                {role === "PLAYER" && (
                    <Button onClick={handleClick} sx={{ mb: 1 }}>
                        Respond to Quiz
                    </Button>
                )}
                {(role === "STAFF" || role === "ADMIN") && (
                    <Button onClick={handleDownload} sx={{ mb: 1 }}>
                        Download answers
                    </Button>
                )}
                {isAdmin && (
                    <Button onClick={handleDelete} color="error">
                        Delete quiz
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};
