import VideoNoteCard from "./VideoNoteCard.jsx";
import VideoNoteItem from "./VideoNoteItem.jsx";

const VideoNotesList = ({videoNotes, seekTo, deleteNote, updateNote, getTimestamp}) => {

    return(
        videoNotes?.length > 0 ?
        videoNotes.map((note) => (
            <VideoNoteItem note={note} seekTo={seekTo} deleteNote={deleteNote} updateNote={updateNote} getTimestamp={getTimestamp}/>
        )) :
        <>
        </>
    )
}

export default VideoNotesList;