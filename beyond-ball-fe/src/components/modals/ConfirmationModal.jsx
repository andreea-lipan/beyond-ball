import {Box, Button, Modal, TextField, Typography, useTheme} from "@mui/material";
import React from "react";

export const ConfirmationModal = ({ state, handleConfirm, message, confirmButtonText="Yes, I'm sure!", declineButtonText="No.", forWhiteboard=false }) => {

    const theme = useTheme();

    const [title, setTitle] = React.useState("");

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

                {forWhiteboard && <TextField
                    sx={{
                        borderRadius: "16px",
                        width: "100%",
                        justifyContent: "center",
                        backgroundColor: theme.palette.background.secondary,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: '16px',
                            boxShadow: "none",
                        }
                    }}
                    placeholder={"Give it a Title!"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />}

                <Box mt={4} display="flex" justifyContent="space-between">
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleConfirm(title);
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
