import React from 'react';
import { Card, CardContent, Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Storage from '../../../utils/Storage.js';

const VideoNoteItem = ({ noteText, timestamp, author }) => {
    const isAuthor = author === "mark";

    return (
        <Card sx={{ width: '100%', mb: 2, p: 2, borderRadius: 8 }}>
            {/* Top section: Author + Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{m:1}}>
                    {author}
                </Typography>

                {isAuthor && (
                    <Box>
                        <IconButton size="small" aria-label="edit">
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" aria-label="delete">
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                )}
            </Box>

            {/* Note content */}
            <CardContent sx={{ pt: 1, pl: 0, pr: 0 }}>
                <Typography variant="body2">
                    <strong style={{ color: '#1976d2' }}>{formatTimestamp(timestamp)}</strong> – {noteText}
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

export default VideoNoteItem;
