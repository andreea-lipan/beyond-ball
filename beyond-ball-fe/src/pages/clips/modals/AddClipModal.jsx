import {Box, Button, Modal, TextField, Typography, useTheme} from "@mui/material";
import React, {useState} from "react";
import {Popup} from "../../../components/popup/Popup.jsx";
import {MessageType} from "../../../components/popup/MessageType.js";

export const AddClipModal = ({ state, handleConfirm}) => {
    const theme = useTheme();

    // for error messages
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState(MessageType.error);
    const showError = (message) => {
        setPopupMessage(message);
        setPopupType(MessageType.error);
        setIsPopupVisible(true);
    };

    // modal information
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

    // video clip and filename information
    const [videoName, setVideoName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    // uploading a video file
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

    // closing the modal
    const handleClose = () => {
        setSelectedFile(null);
        setVideoName("")
        state.closeModal()
    }

    return (
        <>
            <Modal open={state.isOpen} onClose={handleClose}>
                <Box sx={modalStyle}>
                    {/* Modal message */}
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
                        >
                            {confirmButtonText}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
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
