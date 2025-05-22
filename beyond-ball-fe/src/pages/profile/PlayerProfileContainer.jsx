import {Box, Typography, useTheme} from "@mui/material";
import React, {useEffect, useState} from "react";
import {QuizCard} from "../quizzes/view/QuizCard.jsx";
import QuizService from "../../APIs/QuizService.js";

export const PlayerProfileContainer = ({player}) => {
    const theme = useTheme();

    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        QuizService.getCompletedQuizzesForPlayer(player?.id).then((quizzes) => {
            setQuizzes(quizzes);
        })
    },[player])

    return (
        <>
            {/* Player Information */}
            <Box sx={{
                padding: "24px 5px 24px 5px",
                borderRadius: "16px",
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
            }}>
                {/* Player Image */}
                <Box sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "16px",
                    padding: "24px 5px 24px 5px",
                    flex: 1,
                    m: 1
                }}>
                    PlAyEr HEaD
                </Box>

                {/* Player Base Information */}
                <Box sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "16px",
                    padding: "24px 5px 24px 5px",
                    flex: 1,
                    m: 1
                }}>
                    Dates
                </Box>

                {/* Player Stats */}
                <Box sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "16px",
                    padding: "24px 5px 24px 5px",
                    flex: 1,
                    m: 1
                }}>
                    Golas
                </Box>
            </Box>

            {/* Completed Quizzes */}
            <Box sx={{
                backgroundColor: theme.palette.primary.main,
                borderRadius: "16px",
                padding: "24px 5px 24px 5px",
            }}>
                <Typography variant="h2" sx={{fontWeight: 700, p: 2}} gutterBottom> Completed Quizzes </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "1vw",
                        mt: 2,
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    {quizzes.length > 0 ?
                        quizzes.map((quiz, index) => {

                            return (
                                <QuizCard viewType="profile" quiz={quiz} index={index} onQuizDeleted={() => {
                                }}/>
                            );
                        })
                        :
                        <Typography variant="h2" sx={{fontWeight: 700}} gutterBottom> No Quizzes completed yet. Complete
                            your first quiz in the Quizzes Page! </Typography>
                    }

                </Box>
            </Box>
        </>
    );
}