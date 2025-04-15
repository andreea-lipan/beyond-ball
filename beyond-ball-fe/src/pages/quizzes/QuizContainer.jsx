import {Box, IconButton} from "@mui/material";
import {ArrowBackIos, ArrowForwardIos} from "@mui/icons-material";
import {QuizCard} from "./QuizCard.jsx";

export const QuizContainer = ({quizzes, handleNext, handlePrev, page, maxPage}) => {

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "primary.main",
                pt: "10vh",
                pb: "13vh",
                borderRadius: "10px",
            }}
        >
            <IconButton disableRipple
                        onClick={handlePrev}
                        disabled={page === 0}
                        sx={{fontSize: 36, width: "3.5vw"}}
            >
                <ArrowBackIos fontSize="inherit"/>
            </IconButton>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1vw",
                    mt: 2,
                }}
            >
                {quizzes.map((quiz, index) => {

                    return (
                        <QuizCard quiz={quiz} index={index} />
                    );
                })}
            </Box>

            <IconButton disableRipple
                        onClick={handleNext}
                        disabled={page === maxPage - 1}
                        sx={{
                            fontSize: 36, width: "3.5vw"
                        }}
            >
                <ArrowForwardIos fontSize="inherit"/>
            </IconButton>
        </Box>
    )
}