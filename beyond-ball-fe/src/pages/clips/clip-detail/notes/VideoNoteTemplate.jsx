import React from 'react';
import {Box, Card, CardContent, Button, TextField, Typography, useTheme, Tooltip} from '@mui/material';

const VideoNoteTemplate = ({handleClose, getTimestamp, addNote, note}) => {
    const theme = useTheme();
    const [currentTimestamp, setCurrentTimestamp] = React.useState(note?.videoTimestamp || 0);
    const [noteText, setNoteText] = React.useState(note?.text ||'');
    const maxNoteLength = 1000;

    const handleSetCurrentTimestamp = () => {
        const timestamp = getTimestamp();
        setCurrentTimestamp(timestamp);
    }

    const handleAddNote = () => {
        addNote(noteText, currentTimestamp);
    }

    return (
        <Card sx={{ width: '100%', mb: 2, p: 2, borderRadius: 8 , backgroundColor: theme.palette.background.secondary}}>

            {/* Timestamp top */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap:1 }}>
                <Tooltip arrow placement="top" title={'This will save a timestamp along with your note, to know which part of the video you are referring to'}>
                    <Button variant="outlined" size="small" onClick={handleSetCurrentTimestamp}>
                        Add current timestamp to note
                    </Button>
                </Tooltip>
                <Typography variant="subtitle2" >
                    {formatTimestamp(currentTimestamp)}
                </Typography>
            </Box>

            {/* Note input */}
            <CardContent sx={{ p: 0,width:"100%" }}>
                <TextField
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    fullWidth
                    multiline
                    minRows={1}
                    placeholder="Write your note here..."
                    variant="outlined"
                    size="small"
                    slotProps={{
                        htmlInput: {
                            maxLength: maxNoteLength
                        }
                    }}
                    helperText= {noteText.length > 0.9 * maxNoteLength ? `${noteText.length}/${maxNoteLength}` : ''}
                    sx={{
                        '& .MuiInputBase-input': {
                            fontSize: '0.8rem'
                        },
                        '& .MuiFormHelperText-root': {
                            color: theme.palette.secondary.main
                        }
                    }}
                />
            </CardContent>

            {/* Save and Cancel buttons */}
            <Box sx={{ display: 'flex', justifyContent:'space-between', alignItems: 'center', mt: 2 }}>
                <Button variant="outlined" size="small" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" size="small" onClick={handleAddNote}>
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