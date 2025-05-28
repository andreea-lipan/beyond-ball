import {Box, Button, Modal, TextField, Typography, useTheme} from "@mui/material";
import React, {useState} from "react";
import {MessageType} from "../../components/popup/MessageType.js";
import {Popup} from "../../components/popup/Popup.jsx";

export const UploadAvatarModal = ({ state, handleConfirm}) => {
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
    let message = "Upload a profile picture";
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

    const [selectedImage, setSelectedImage] = useState(null);

    // uploading an image file
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Check file extension
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            showError('Please select a valid image file format (jpg, jpeg, png, gif, bmp, webp)');
            return;
        }

        // Check MIME type (what browsers use for image files)
        if (file.type.startsWith('image/')) {
            setSelectedImage(file);
            console.log(file);
        } else {
            showError('Please select a valid image file');
        }
    };


    // closing the modal
    const handleClose = () => {
        setSelectedImage(null);
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
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="image-upload"
                        />
                        <label htmlFor="image-upload">
                            <Typography>
                                {selectedImage ? selectedImage.name : 'Click to select image file'}
                            </Typography>
                        </label>
                    </Box>

                    {/* Confirm or Cancel buttons */}
                    <Box mt={4} display="flex" justifyContent="space-between">
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (selectedImage) {
                                    handleConfirm(selectedImage);
                                    handleClose();
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
