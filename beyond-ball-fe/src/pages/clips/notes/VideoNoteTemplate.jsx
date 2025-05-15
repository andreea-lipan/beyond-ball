import React from 'react';
import { Box, Card, CardContent, Button, TextField, Typography } from '@mui/material';

const VideoNoteTemplate = ({handleClose, getTimestamp, addComment}) => {

    const [currentTimestamp, setCurrentTimestamp] = React.useState(0);

    const handleSetCurrentTimestamp = () => {
        const timestamp = getTimestamp();
        setCurrentTimestamp(timestamp);
    }

    const handleAddComment = () => {

    }

    return (
        <Card sx={{ width: '100%', mb: 2, p: 2, borderRadius: 8 }}>
            {/* Timestamp top */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap:1 }}>
                <Button variant="outlined" size="small" onClick={handleSetCurrentTimestamp}>
                    Set Current Timestamp
                </Button>
                <Typography variant="subtitle2" >
                    Timestamp - {formatTimestamp(currentTimestamp)}
                </Typography>
            </Box>

            {/* Note input */}
            <CardContent sx={{ p: 0,width:"500px" }}>
                <TextField
                    fullWidth
                    multiline
                    minRows={1}
                    placeholder="Write your note here..."
                    variant="outlined"
                />
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent:'space-between', alignItems: 'center', mt: 2 }}>
                <Button variant="outlined" size="small" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" size="small" onClick={handleAddComment}>
                    Post
                </Button>
            </Box>
        </Card>
    );
}

// Helper to format seconds into mm:ss
const formatTimestamp = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
};

export default VideoNoteTemplate;