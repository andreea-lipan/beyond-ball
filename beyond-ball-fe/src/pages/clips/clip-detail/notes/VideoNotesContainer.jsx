import {AppBar, Box, Button, Toolbar, Typography, useTheme} from "@mui/material";
import VideoNoteTemplate from "./VideoNoteTemplate.jsx";
import {useEffect, useState} from "react";
import VideoNotesList from "./VideoNotesList.jsx";
import VideoNoteService from "../../../../APIs/VideoNoteService.js";

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
                    <Typography variant="h2">Notes</Typography>
                    <Button variant='contained' onClick={() => setAddingComment(true)}>
                        {/*<AddCircleIcon sx={{color: theme.palette.secondary.main}}/>*/}
                        Add new note
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Notes list */}
            <Box sx={{
                flex: 1,  // This makes it take up all remaining space
                overflowY: 'auto',
                paddingX: 3,
                paddingTop: 2,
                paddingBottom: addingComment ? '200px' : 2, // Add space for the fixed bottom component
                '&::-webkit-scrollbar': {
                    display: 'none'
                }
            }}>
                <VideoNotesList
                    getTimestamp={getTimestamp}
                    videoNotes={videoNotes}
                    seekTo={seekTo}
                    deleteNote={deleteNote}
                    updateNote={updateNote}
                />
                {videoNotes.length === 0 && (
                    <Typography sx={{paddingY: 2}}>
                        You have no notes yet. Add one by clicking the add button above!
                    </Typography>
                )}
            </Box>

            {/* Add new note */}
            {addingComment && (
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
                    <VideoNoteTemplate
                        handleClose={handleClose}
                        getTimestamp={getTimestamp}
                        addNote={addNote}
                    />
                </Box>
            )}
        </Box>
    );
}

export default VideoNotesContainer;