import Storage from '../../../../utils/Storage.js';
import {Box, Card, CardContent, IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

const WhiteboardCommentCard = ({ comment, onEdit, onDelete }) => {
    const isAuthor = comment.authorId === Storage.getUserIdFromToken();
    const data = new Date(comment.postedDate);

    return (
        <Card sx={{ width: '100%', mb: 2, p: '0.5em', borderRadius: 8 , paddingBottom: 0}}>

            {/* Top section: Author + Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{m:1}}>
                    {comment.authorUsername} - {data.getDay()}/{data.getMonth() + 1}/{data.getFullYear()}
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
                    {comment.text}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default WhiteboardCommentCard;