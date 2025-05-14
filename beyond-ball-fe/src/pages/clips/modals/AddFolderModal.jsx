import {Box, Button, Modal, TextField, Typography, useTheme} from "@mui/material";
import React, {useState} from "react";
import {Popup} from "../../../components/popup/Popup.jsx";
import {MessageType} from "../../../components/popup/MessageType.js";

export const AddFolderModal = ({ state, handleConfirm}) => {

    const theme = useTheme();

    let confirmButtonText= "Create folder";
    let declineButtonText= "Cancel";
    let message = "Choose folder name";

    // for error messages
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState(MessageType.error);

    const showError = (message) => {
        setPopupMessage(message);
        setPopupType(MessageType.error);
        setIsPopupVisible(true);
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: theme.palette.background.secondary,
        borderRadius: 4,
        boxShadow: 24,
        p: 4,
    };

    const [folderName, setFolderName] = useState("");

    const handleClose = () => {
        setFolderName("");
        state.closeModal()
    }

    return (
        <>
            <Modal open={state.isOpen} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" gutterBottom>
                        {message}
                    </Typography>
                    <TextField
                        placeholder = {"Folder 1"}
                        value = {folderName}
                        onChange={e => setFolderName(e.target.value)}
                        sx = {{
                        minWidth: '100%'
                    }}/>
                    <Box mt={4} display="flex" justifyContent="space-between">
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (folderName) {
                                    handleConfirm(folderName);
                                    setFolderName("");
                                    state.closeModal();
                                } else {
                                    showError('Please add a folder name first');
                                }
                            }}
                            sx={{
                                '&:focus': {
                                    outline: 'none' // make the default browser selection not visible
                                }
                            }}
                        >
                            {confirmButtonText}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            sx={{
                                '&:focus': {
                                    outline: 'none' // make the default browser selection not visible
                                }
                            }}
                        >
                            {declineButtonText}
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Error display */}
            <Popup
                isVisible={isPopupVisible}
                setIsVisible={setIsPopupVisible}
                message={popupMessage}
                messageType={popupType}
            />
        </>
    );
};
