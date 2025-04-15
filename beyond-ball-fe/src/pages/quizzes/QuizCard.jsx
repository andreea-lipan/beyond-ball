import {Box, Card, CardContent, CardHeader, Icon, Typography} from "@mui/material";
import {
    ChecklistIcon,
    IdeaIcon,
    MultipleChoiceIcon,
    QuestionMarkIcon,
    QuizSheetIcon
} from "../../components/icons/quiz/quizIcons.jsx";
import {TimerIcon} from "../../components/icons/quiz/TimerIcon.jsx";
import {QuestionsIcon} from "../../components/icons/quiz/QuestionsIcon.jsx";

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

    return (
        <Card
            key={quiz.id}
            sx={{
                width: "17vw",
                height: "45vh",
                p: "2vw",
                borderRadius: "20px",
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

            <CardContent>
                <Typography variant="body2">{quiz.description}</Typography>
            </CardContent>
        </Card>
    );
}