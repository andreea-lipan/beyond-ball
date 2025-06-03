import {Box, Button, Card, CardActionArea, CardContent, CardHeader, Icon, Typography, useTheme} from "@mui/material";
import {
    ChecklistIcon,
    IdeaIcon,
    MultipleChoiceIcon,
    QuestionMarkIcon,
    QuizSheetIcon
} from "../../../components/icons/quiz/quizIcons.jsx";
import {TimerIcon} from "../../../components/icons/quiz/TimerIcon.jsx";
import {QuestionsIcon} from "../../../components/icons/quiz/QuestionsIcon.jsx";
import {CardActions} from "@mui/joy";
import Storage from "../../../utils/Storage.js";
import {useNavigate} from "react-router-dom";
import {QUIZ_TAKING_PAGE} from "../../../utils/UrlConstants.js";
import quizService from "../../../APIs/QuizService.js";
import {Delete} from "@mui/icons-material";
import useModal from "../../../components/modals/useModal.js";
import {ConfirmationModal} from "../../../components/modals/ConfirmationModal.jsx";
import React from "react";

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

export const QuizCard = ({viewType = "quizzesPage", quiz, index, onQuizDeleted, noPlayers}) => {
    const Icon = iconComponents[(index * getRandomInt(100)) % iconComponents.length];
    const role = Storage.getRoleFromToken();
    const canDownload = role === "STAFF" || role === "ADMIN";
    const canDelete = role === "STAFF" || role === "ADMIN";
    const quizCompleted = quiz.completed;
    const navigate = useNavigate();
    const theme = useTheme();

    const confirmationModalState = useModal();

    const handleDownload = async () => {
        try {
            const res = await quizService.downloadAnswers(quiz.id);
            const blob = new Blob([res.data], {type: "text/csv"});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `quiz-${quiz.id}-answers.csv`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Download failed", err);
            alert("Could not download quiz answers.");
        }
    };

    const handleClick = () => {
        if (role === "PLAYER") {
            navigate(QUIZ_TAKING_PAGE(quiz.id));
        }
    }

    const handleDelete = () => {
        onQuizDeleted(quiz.id);
    };

    return (
        <>
            <ConfirmationModal state={confirmationModalState} handleConfirm={handleDelete}
                               message={"Are you sure you want to delete the quiz?"}/>

            <Card
                key={quiz.id}
                sx={{
                    maxWidth: "25em",
                    // height: "45vh",
                    borderRadius: "20px",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: quizCompleted ? theme.palette.background.completed : "",
                }}
            >
                <CardActionArea
                    onClick={handleClick}
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
                    disabled={canDownload || quizCompleted || viewType === "profile"}
                >
                    {/* Icon in Top Left */}
                    <CardHeader
                        avatar={<Icon color="primary"/>}
                        title={
                            <Typography variant="h2" sx={{fontWeight: 700, padding: "10px"}} gutterBottom>
                                {quiz.title}
                            </Typography>
                        }
                        subheader={
                            (viewType === "profile" ? <></> :
                                <Box sx={{display: "flex", justifyContent: "space-between", marginX: "25px"}}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        <TimerIcon/> {quiz.estimatedDuration} min
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom>
                                        <QuestionsIcon/> {quiz.questions?.length} questions
                                    </Typography>
                                </Box>)
                        }
                        sx={{
                            minWidth: "300px"
                        }}
                    />

                    <CardContent style={{overflow: "hidden", flexGrow: 1}}>
                        <Typography
                            variant="body2"
                            sx={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: {
                                    xs: 2,
                                    sm: 3,
                                    md: 8,
                                    lg: 11
                                },
                                overflow: 'hidden',
                                // textOverflow: 'ellipsis',
                            }}
                        >
                            {quiz.description}</Typography>
                    </CardContent>

                    {quizCompleted && (
                        <Typography variant="body1" sx={{color: theme.palette.primary.main}}>Completed</Typography>
                    )}
                </CardActionArea>

                {canDownload && canDelete && (
                    <CardActions sx={{p: "0.5vw", display: 'flex', justifyContent: 'space-between'}}>
                        <Button onClick={handleDownload}> Download answers ({quiz.numberOfPlayersQuizzed} / {noPlayers})</Button>
                        {quiz.numberOfPlayersQuizzed === 0 &&
                            <Button
                                onClick={confirmationModalState.openModal}
                                variant="outlined"
                                color="error"
                                startIcon={<Delete/>}
                            >
                                Delete Quiz
                            </Button>
                        }
                    </CardActions>
                )}
            </Card>
        </>
    );
}