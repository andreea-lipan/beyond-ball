import {Box, Button, Card, CardContent, TextField, Tooltip, Typography, useTheme} from "@mui/material";
import React, {useState} from "react";

const WhiteboardCommentTemplate = ({addComment, handleClose, comment}) => {
    const theme = useTheme();

    const [commentText, setCommentText] = useState(comment?.text || '');
    const maxCommentLength = 1000;

    const handleAddComment = () => {
        addComment(commentText);
        setCommentText('');
    }

    return(
        <Card sx={{ width: '100%', mb: 2, p: 2, borderRadius: 8 , backgroundColor: theme.palette.background.secondary}}>

            {/* Note input */}
            <CardContent sx={{ p: 0,width:"100%" }}>
                <TextField
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    fullWidth
                    multiline
                    minRows={1}
                    placeholder="Write your comment here..."
                    variant="outlined"
                    size="small"
                    slotProps={{
                        htmlInput: {
                            maxLength: maxCommentLength
                        }
                    }}
                    helperText= {commentText.length > 0.9 * maxCommentLength ? `${commentText.length}/${maxCommentLength}` : ''}
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
                <Button variant="contained" size="small" onClick={handleAddComment}>
                    Post
                </Button>
            </Box>
        </Card>
    )

}

export default WhiteboardCommentTemplate;