import React from 'react';
import { Card, CardContent, Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Storage from '../../../../utils/Storage.js';

const VideoNoteCard = ({ note, seekTo, onEdit, onDelete}) => {
    const isAuthor = note.authorId === Storage.getUserIdFromToken();

    const handleSeekTo = () => {
        seekTo(note.videoTimestamp);
    }

    return (
        <Card sx={{ width: '100%', mb: 2, p: '0.5em', borderRadius: 8 , paddingBottom: 0}}>

            {/* Top section: Author + Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{m:1}}>
                    {note.authorUsername}
                </Typography>

                {isAuthor && (
                    <Box>
                        <IconButton size="small" aria-label="edit" onClick={onEdit}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" aria-label="delete" onClick={onDelete}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                )}
            </Box>

            {/* Note content */}
            <CardContent sx={{ paddingY: 0}}>
                <Typography
                    variant="body1"
                    sx={{fontSize: '0.8rem'}}
                >
                    <strong style={{ color: '#1976d2', cursor:"pointer" }} onClick={handleSeekTo}>{formatTimestamp(note.videoTimestamp)}</strong> – {note.text}
                </Typography>
            </CardContent>
        </Card>
    );
};

// Helper to format seconds into mm:ss
const formatTimestamp = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
};

export default VideoNoteCard;
