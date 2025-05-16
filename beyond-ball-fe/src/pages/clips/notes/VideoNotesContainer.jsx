import {Box, Button, Typography, useTheme} from "@mui/material";
import VideoNoteTemplate from "./VideoNoteTemplate.jsx";
import {useEffect, useState} from "react";
import VideoNotesList from "./VideoNotesList.jsx";
import VideoNoteService from "../../../APIs/VideoNoteService.js";

const VideoNotesContainer = ({ seekTo, getTimestamp, clipId}) => {

    const [addingComment, setAddingComment] = useState(false);
    const [videoNotes, setVideoNotes] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        fetchVideoNotes();
    }, [clipId]);

    const fetchVideoNotes = () => {
        VideoNoteService.getVideoNotesForClip(clipId).then((response) => {
            setVideoNotes(sortVideoNotes(response));
        })
    }

    const sortVideoNotes = (videoNotes) => {
        return videoNotes.sort((a, b) => {
            const aTimestamp = a.videoTimestamp;
            const bTimestamp = b.videoTimestamp;

            if (aTimestamp < bTimestamp) {
                return -1;
            }
            if (aTimestamp > bTimestamp) {
                return 1;
            }
            return 0;
        });
    }

    const addNote = (text, videoTimestamp) => {
        const note = {
            videoTimestamp,
            text,
            clipId
        }
        VideoNoteService.createVideoNote(note).then(fetchVideoNotes)
        setAddingComment(false);
    }

    const deleteNote = (noteId) => {
        VideoNoteService.deleteVideoNote(noteId).then(fetchVideoNotes);
    }

    const updateNote = (note) => {
        VideoNoteService.updateVideoNote(note.id, note).then(fetchVideoNotes);
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
            <VideoNotesList getTimestamp={getTimestamp} videoNotes={videoNotes} seekTo={seekTo} deleteNote={deleteNote} updateNote={updateNote} />
            {addingComment === true?
                <Box sx={{paddingX: 3}}>
                    <VideoNoteTemplate
                        handleClose={handleClose}
                        getTimestamp={getTimestamp}
                        addNote={addNote}/>
                </Box>
                :
                <Button variant={"contained"} onClick={() => setAddingComment(true)}>Add new note</Button>
            }
        </Box>
    );
}

export default VideoNotesContainer;