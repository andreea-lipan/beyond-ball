import {Box, Button} from "@mui/material";
import VideoNoteTemplate from "./VideoNoteTemplate.jsx";
import VideoNoteItem from "./VideoNoteItem.jsx";
import {useEffect, useState} from "react";
import VideoNotesList from "./VideoNotesList.jsx";

const VideoNotesContainer = ({ seekTo, getTimestamp, clipId}) => {

    const [addingComment, setAddingComment] = useState(false);
    const [videoNotes, setVideoNotes] = useState([]);

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
        <Box>
            <h3>Bookmarks</h3>
            <VideoNotesList videoNotes={videoNotes} seekTo={seekTo}/>
            {addingComment === true?
                <VideoNoteTemplate handleClose={handleClose} getTimestamp={getTimestamp} addComment={addComment}/>
                :
                <Button variant={"contained"} onClick={() => setAddingComment(true)}>Add new comment</Button>
            }
        </Box>
    );
}

export default VideoNotesContainer;