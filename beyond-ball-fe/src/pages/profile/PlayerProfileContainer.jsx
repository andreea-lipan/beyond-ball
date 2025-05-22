import {Box, Typography, useTheme} from "@mui/material";
import React from "react";
import {QuizCard} from "../quizzes/view/QuizCard.jsx";

export const PlayerProfileContainer = ({player}) => {
    const theme = useTheme();

    const currentQuizzes = [
        {
            id: 1,
            title: "Basic Basketball Rules",
            description: "Test your knowledge of fundamental basketball rules",
            score: 85,
            totalQuestions: 10,
            completedAt: "2024-03-15T14:30:00",
            timeSpent: "15 minutes"
        },
        {
            id: 2,
            title: "Defensive Strategies",
            description: "Understanding different defensive formations and tactics",
            score: 92,
            totalQuestions: 8,
            completedAt: "2024-03-14T16:45:00",
            timeSpent: "12 minutes"
        },
        {
            id: 3,
            title: "Team Play Fundamentals",
            description: "Quiz on team coordination and basic plays",
            score: 78,
            totalQuestions: 12,
            completedAt: "2024-03-13T10:15:00",
            timeSpent: "20 minutes"
        },
        {
            id: 4,
            title: "Team Play Fundamentals",
            description: "Quiz on team coordination and basic plays",
            score: 78,
            totalQuestions: 12,
            completedAt: "2024-03-13T10:15:00",
            timeSpent: "20 minutes"
        }
    ];

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
                    {currentQuizzes.length > 0 ?
                        currentQuizzes.map((quiz, index) => {

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