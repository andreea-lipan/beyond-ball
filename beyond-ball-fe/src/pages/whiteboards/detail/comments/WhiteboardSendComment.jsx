import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import React, {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from '@mui/icons-material/Send';

const WhiteboardSendComment = ({addComment, handleClose, comment}) => {
    const theme = useTheme();

    const [commentText, setCommentText] = useState(comment?.text || '');
    const maxCommentLength = 1000;

    const handleAddComment = () => {
        addComment(commentText);
        setCommentText('');
    }

    return(
        // <Card sx={{ width: '100%', mb: 1, p: 2, borderRadius: 8 , backgroundColor: theme.palette.background.secondary}}>
            <Box sx={{ paddingBottom: 1, margin: 0, width:"100%" }}>
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
                        },
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        sx = {{paddingRight: 0}}
                                        onClick={handleAddComment}>
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }
                    }}
                    helperText= {commentText.length > 0.9 * maxCommentLength ? `${commentText.length}/${maxCommentLength}` : ''}
                    sx={{
                        backgroundColor: theme.palette.background.secondary,
                        borderRadius: '10px',
                        '& .MuiInputBase-input': {
                            fontSize: '0.8rem'
                        },
                        '& .MuiFormHelperText-root': {
                            color: theme.palette.secondary.main
                        }
                    }}
                />
            </Box>
        // </Card>
    )

}

export default WhiteboardSendComment;