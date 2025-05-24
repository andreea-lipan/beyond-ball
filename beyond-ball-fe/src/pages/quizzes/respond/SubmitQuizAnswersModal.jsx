import {Box, Button, Modal, Typography, useTheme} from "@mui/material";
import React from "react";

export const SubmitQuizAnswersModal = ({ state, handleConfirm }) => {
    const theme = useTheme();
    const confirmButtonText="Yes, submit my answers!"
    const declineButtonText="No."

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: theme.palette.background.paper,
        borderRadius: 4,
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal open={state.isOpen} onClose={state.closeModal}>
            <Box sx={modalStyle}>
                <Typography variant="h2" gutterBottom>
                    Are you ready to submit your answers?
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Once your answers are submitted you will not be able to edit them, or see them.
                    You will be redirected to the Quizzes page.
                </Typography>

                <Box mt={4} display="flex" justifyContent="space-between">
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleConfirm();
                            state.closeModal();
                        }}
                    >
                        {confirmButtonText}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={state.closeModal}
                    >
                        {declineButtonText}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};
