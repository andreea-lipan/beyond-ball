import {Button, Card, CardContent, CardHeader, Icon, Typography} from "@mui/material";
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

    const handleDownload = () => {

    }

    return (
        <Card
            key={quiz.id}
            sx={{
                width: "17vw",
                height: "45vh",
                p: "1.5vw",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column", // Stack children vertically
            }}
        >
            {/* Icon in Top Left */}
            <CardHeader
                avatar={<Icon color="primary"/>}
                title={
                    <Typography variant="h2" sx={{fontWeight:700}} gutterBottom>
                        {quiz.title}
                    </Typography>
                }
                subheader={
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="subtitle2" gutterBottom>
                            <TimerIcon/> 3 min
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            <QuestionsIcon/> 3 questions
                        </Typography>
                    </div>
                }
            />

            <CardContent style={{overflow:"hidden"}}>
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
                    {quiz.description}{quiz.description}{quiz.description}{quiz.description}{quiz.description}</Typography>
            </CardContent>

            <CardActions sx={{ mt: "auto", mr: "auto"}}>
                <Button onClick={handleDownload}> Download answers</Button>
            </CardActions>
        </Card>
    );
}