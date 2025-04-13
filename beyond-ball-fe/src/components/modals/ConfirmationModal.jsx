import {Box, Button, Modal, Typography, useTheme} from "@mui/material";
import React from "react";

export const ConfirmationModal = ({ state, handleConfirm, message, confirmButtonText="Yes, I'm sure!", declineButtonText="No." }) => {

    const theme = useTheme();

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
                <Typography variant="h6" gutterBottom>
                    {message}
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
