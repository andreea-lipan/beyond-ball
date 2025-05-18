import {AppBar, Box, Button, Toolbar, Typography, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import WhiteboardCommentService from "../../../../APIs/WhiteboardCommentService.js";
import VideoNotesList from "../../../clips/clip-detail/notes/VideoNotesList.jsx";
import VideoNoteTemplate from "../../../clips/clip-detail/notes/VideoNoteTemplate.jsx";
import WhiteboardCommentTemplate from "./WhiteboardCommentTemplate.jsx";
import WhiteboardCommentsList from "./WhiteboardCommentsList.jsx";
import {connect,disconnect} from "../../../../APIs/WebSocket.js";
import WhiteboardSendComment from "./WhiteboardSendComment.jsx";

const WhiteboardCommentsContainer = ({ whiteboardId }) => {

    const [comments, setComments] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        fetchComments();

        connect(whiteboardId, "WHITEBOARD", handleWebSocketMessage)

        return () => {
            disconnect();
        }
    }, [whiteboardId]);

    const handleWebSocketMessage = (message) => {
        console.log(message)
        const newComment = message.whiteboardComment;
        switch (message.action) {
            case "CREATE":
                setComments(prevState => [...prevState, newComment]);
                break;
            case "DELETE":
                setComments(prev => prev.filter(comment => comment.id !== newComment.id));
                break;
            case "UPDATE":
                setComments(prev => prev.map(comment =>
                    comment.id === newComment.id ? newComment : comment
                ));
                break;
            default:
                console.log("Unknown action: ", message.action);

        }
    }

    const fetchComments = () => {
        WhiteboardCommentService.getWhiteboardCommentsForWhiteboard(whiteboardId).then((comments) => {
            setComments(comments);
        })
    }

    const sortFn = (a, b) => {
        const aTimestamp = a.timestamp;
        const bTimestamp = b.timestamp;

        if (aTimestamp < bTimestamp) {
            return -1;
        }
        if (aTimestamp > bTimestamp) {
            return 1;
        }
        return 0;
    }

    const sortedComments = comments.sort(sortFn);

    const addComment = (text) => {
        const comment = {
            text,
            whiteboardId,
        }
        WhiteboardCommentService.createWhiteboardComment(comment)
    }

    const deleteComment = (id) => {
        WhiteboardCommentService.deleteWhiteboardComment(id)
    }

    const updateComment = (comment) => {
        WhiteboardCommentService.updateWhiteboardComment(comment.id, comment)
    }

    return(
        <Box sx={{
            backgroundColor: theme.palette.primary.main,
            height: '100%',
            borderRadius: '10px',
            width: '20vw',
            maxWidth: '450px',
            overflowX: 'auto',
            marginLeft: '0.5em',
            display: 'flex',
            flexDirection: 'column',
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        }}>

            {/* Note top bar */}
            <AppBar
                position='sticky'
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    boxShadow: 'none',
                    borderBottom: `1px solid ${theme.palette.secondary.main}`
                }}
            >
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0 24px'
                }}>
                    <Typography variant="h2">Comments</Typography>
                </Toolbar>
            </AppBar>

            {/* Notes list */}
            <Box sx={{
                flex: 1,  // This makes it take up all remaining space
                overflowY: 'auto',
                paddingX: 3,
                paddingTop: 2,
                paddingBottom: '10px', 
                '&::-webkit-scrollbar': {
                    display: 'none'
                }
            }}>
                <WhiteboardCommentsList
                    comments={sortedComments}
                    deleteComment={deleteComment}
                    updateComment={updateComment}
                />
                {comments.length === 0 && (
                    <Typography sx={{paddingY: 2}}>
                        You have no comments yet. Add one by posting one below!
                    </Typography>
                )}
            </Box>

            {/* Add new note */}
            <Box sx={{
                position: 'sticky',
                bottom: 0,
                backgroundColor: theme.palette.primary.main,
                borderTop: `1px solid ${theme.palette.secondary.main}`,
                padding: "10px 10px 0 10px",
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                    display: 'none'
                }
            }}>
                <WhiteboardSendComment
                    addComment={addComment}
                />
            </Box>
        </Box>
    )

}

export default WhiteboardCommentsContainer;