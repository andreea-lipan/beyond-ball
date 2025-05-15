import {Box, Button, Typography, useTheme} from "@mui/material";
import VideoNoteTemplate from "./VideoNoteTemplate.jsx";
import {useEffect, useState} from "react";
import VideoNotesList from "./VideoNotesList.jsx";

const VideoNotesContainer = ({ seekTo, getTimestamp, clipId}) => {

    const [addingComment, setAddingComment] = useState(false);
    const [videoNotes, setVideoNotes] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        fetchVideoNotes();
    }, [clipId]);

    const fetchVideoNotes = () => {

    }

    const addComment = () => {

    }

    const handleClose = () => {
        setAddingComment(false);
    }

    return (
        <Box sx = {{
            backgroundColor: theme.palette.primary.main,
            height: '100%',
            borderRadius: '10px',
            width: '20vw',
            maxWidth: '450px',
            overflowX: 'auto',
            marginLeft: '0.5em',
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        }}>
            <Typography variant="h2" sx={{paddingY: 3}}>Notes</Typography>
            <VideoNotesList videoNotes={videoNotes} seekTo={seekTo}/>
            {addingComment === true?
                <Box sx={{paddingX: 3}}>
                    <VideoNoteTemplate
                        handleClose={handleClose}
                        getTimestamp={getTimestamp}
                        addComment={addComment}/>
                </Box>
                :
                <Button variant={"contained"} onClick={() => setAddingComment(true)}>Add new note</Button>
            }
        </Box>
    );
}

export default VideoNotesContainer;