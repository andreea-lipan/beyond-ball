import {Box, Button, Modal, TextField, Typography, useTheme} from "@mui/material";
import React, {useState} from "react";
import {Popup} from "../../../components/popup/Popup.jsx";
import {MessageType} from "../../../components/popup/MessageType.js";

export const AddClipModal = ({ state, handleConfirm}) => {
    const theme = useTheme();
    const [selectedFile, setSelectedFile] = useState(null);

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState(MessageType.error);

    let confirmButtonText= "Upload";
    let declineButtonText= "Cancel";
    let message = "Upload a video clip";

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

    const showError = (message) => {
        setPopupMessage(message);
        setPopupType(MessageType.error);
        setIsPopupVisible(true);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Check file extension
        const allowedExtensions = ['.mp4', '.avi', '.mov', '.mkv'];
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        
        if (!allowedExtensions.includes(fileExtension)) {
            showError('Please select a valid video file format (mp4, avi, mov, mkv)');
            return;
        }

        // Check MIME type (what browsers use for video files)
        if (file.type.startsWith('video/')) {
            setSelectedFile(file);
        } else {
            showError('Please select a valid video file');
        }
    };

    const handleClose = () => {
        setSelectedFile(null);
        setVideoName("")
        state.closeModal()
    }

    const [videoName, setVideoName] = useState("");

    return (
        <>
            <Modal open={state.isOpen} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" gutterBottom>
                        {message}
                    </Typography>

                    {/* Select video file */}
                    <Box sx={{ 
                        border: '2px dashed',
                        borderColor: theme.palette.primary.main,
                        borderRadius: 2,
                        p: 3,
                        textAlign: 'center',
                        mb: 2,
                        cursor: 'pointer',
                        '&:hover': {
                            borderColor: theme.palette.primary.dark,
                        }
                    }}>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="video-upload"
                        />
                        <label htmlFor="video-upload">
                            <Typography>
                                {selectedFile ? selectedFile.name : 'Click to select video file'}
                            </Typography>
                        </label>
                    </Box>

                    {/* Add video name */}
                    <TextField
                        placeholder = {"Video name"}
                        value = {videoName}
                        onChange={e => setVideoName(e.target.value)}
                        sx = {{
                        minWidth: '100%'
                    }}/>

                    {/* Confirm or Cancel buttons */}
                    <Box mt={4} display="flex" justifyContent="space-between">
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (selectedFile) {
                                    handleConfirm(selectedFile, videoName);
                                    setSelectedFile(null);
                                    setVideoName("");
                                    state.closeModal();
                                } else {
                                    showError('Please select a video file first');
                                }
                            }}
                            sx={{
                                '&:focus': {
                                    outline: 'none'
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
                                    outline: 'none'
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
