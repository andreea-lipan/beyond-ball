import {Avatar, Box, Button, Typography, useTheme} from "@mui/material";
import React, {useEffect, useState} from "react";
import {QuizCard} from "../quizzes/view/QuizCard.jsx";
import QuizService from "../../APIs/QuizService.js";
import useModal from "../../components/modals/useModal.js";
import {UploadAvatarModal} from "./UploadAvatarModal.jsx";
import {PROFILE_PAGE} from "../../utils/UrlConstants.js";

export const PlayerProfileContainer = ({player, uploadAvatar, avatar}) => {
    const theme = useTheme();

    const uploadModal = useModal();

    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        player && QuizService.getCompletedQuizzesForPlayer(player?.id).then((quizzes) => {
            setQuizzes(quizzes);
        })
    }, [player])

    return (
        <Box>
            <UploadAvatarModal state={uploadModal} handleConfirm={uploadAvatar}/>

            {/* Player Information */}
            <Box sx={{
                padding: "24px 5px 24px 5px",
                borderRadius: "16px",
                // flex: 1,
                display: 'flex',
                flexDirection: 'row'
            }}>
                {/* Player Image */}
                <Box sx={{m: 'auto', display: 'flex', padding: '0 20px 0 20px'}}>
                    <Avatar src={avatar} alt={"Profile Image"} sx={{width: 150, height: 150, m: 'auto'}}
                            onClick={uploadModal.openModal}/>
                </Box>

                {/* Player Base Information */}
                <Box sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "16px",
                    padding: "24px 5px 24px 5px",
                    flex: 1,
                    m: 1
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0 40px 0 40px'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            paddingRight: '10px'
                        }}>
                            <Typography variant="body1">Position:</Typography>
                            <Typography variant="body1">Nationality:</Typography>
                            <Typography variant="body1">DOB:</Typography>
                            <Typography variant="body1">Height:</Typography>
                            <Typography variant="body1">Weight:</Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            paddingLeft: '10px'
                        }}>
                            <Typography variant="body1">{player?.playerStats?.position || 'N/A'}</Typography>
                            <Typography variant="body1">{player?.playerStats?.nationality || 'N/A'}</Typography>
                            <Typography variant="body1">{player?.playerStats?.dateOfBirth || 'N/A'}</Typography>
                            <Typography variant="body1">{player?.playerStats?.height || 'N/A'}</Typography>
                            <Typography variant="body1">{player?.playerStats?.weight || 'N/A'}</Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Player Goals */}
                <Box sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "16px",
                    padding: "24px 5px 24px 5px",
                    flex: 1,
                    m: 1
                }}>
                    <Typography variant="h1" sx={{fontWeight: 500, color: theme.palette.text.primary}}> Goals </Typography>
                    <Typography variant="h1" sx={{color: theme.palette.text.primary, p : 1}}> {player?.playerStats?.goals || 'N/A'} </Typography>
                </Box>

                {/* Player Assists */}
                <Box sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "16px",
                    padding: "24px 5px 24px 5px",
                    flex: 1,
                    m: 1
                }}>
                    <Typography variant="h1" sx={{fontWeight: 500, color: theme.palette.text.primary}}> Assists </Typography>
                    <Typography variant="h1" sx={{color: theme.palette.text.primary, p : 1 }}> {player?.playerStats?.assists || 'N/A'} </Typography>
                </Box>
            </Box>

            {/* Completed Quizzes */}
            <Box sx={{
                backgroundColor: theme.palette.primary.main,
                borderRadius: "16px",
                padding: "24px 5px 24px 5px",
                m: "14px"
            }}>
                <Typography variant="h2" sx={{fontWeight: 700, p: 2}} gutterBottom> Completed Quizzes </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "1vw",
                        m: 2,
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
                        <Typography variant="body1" gutterBottom> No Quizzes completed yet. Complete
                            your first quiz in the Quizzes Page! </Typography>
                    }

                </Box>
            </Box>
        </Box>
    );
}