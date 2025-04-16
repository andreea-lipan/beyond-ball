import {Button, Card, CardActionArea, CardContent, CardHeader, Icon, Typography} from "@mui/material";
import {
    ChecklistIcon,
    IdeaIcon,
    MultipleChoiceIcon,
    QuestionMarkIcon,
    QuizSheetIcon
} from "../../components/icons/quiz/quizIcons.jsx";
import {TimerIcon} from "../../components/icons/quiz/TimerIcon.jsx";
import {QuestionsIcon} from "../../components/icons/quiz/QuestionsIcon.jsx";
import {CardActions} from "@mui/joy";
import Storage from "../../utils/Storage.js";
import {useNavigate} from "react-router-dom";
import {QUIZ_TAKING_PAGE} from "../../utils/UrlConstants.js";

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

export const QuizCard = ({quiz, index}) => {

    const Icon = iconComponents[(index * getRandomInt(100)) % iconComponents.length];
    const role = Storage.getRoleFromToken();
    const canDownload = role === "STAFF" || role === "ADMIN";
    const navigate = useNavigate();

    const handleDownload = () => {

    }

    const handleClick = () => {
        if (role === "PLAYER") {
            navigate(QUIZ_TAKING_PAGE(quiz.id));
        }
    }

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
                disabled={canDownload}
            >
                {/* Icon in Top Left */}
                <CardHeader
                    avatar={<Icon color="primary"/>}
                    title={
                        <Typography variant="h2" sx={{fontWeight: 700}} gutterBottom>
                            {quiz.title}
                        </Typography>
                    }
                    subheader={
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="subtitle2" gutterBottom>
                                <TimerIcon/> {quiz.estimatedDuration} min
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                <QuestionsIcon/> {quiz.questions?.length} questions
                            </Typography>
                        </div>
                    }
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
                                md: 4,
                                lg: 5
                            },
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {quiz.description}</Typography>
                </CardContent>
            </CardActionArea>
            {canDownload && (
                <CardActions sx={{mt: "auto", mr: "auto", p: "0.5vw"}}>
                    <Button onClick={handleDownload}> Download answers</Button>
                </CardActions>
            )}
            {/*todo: add a "Completed" text when the quiz was taken by the player, and make the card action disabled too when that happens*/}
        </Card>
    );
}