import {useState} from "react";
import VideoNoteTemplate from "./VideoNoteTemplate.jsx";
import VideoNoteCard from "./VideoNoteCard.jsx";
import VideoNoteService from "../../../APIs/VideoNoteService.js";
import useModal from "../../../components/modals/useModal.js";
import {ConfirmationModal} from "../../../components/modals/ConfirmationModal.jsx";
const VideoNoteItem = ({note, seekTo, getTimestamp, deleteNote, updateNote}) => {

    const [isEditing, setIsEditing] = useState(false);
    const modalState = useModal();

    const startEditing = () => {
        setIsEditing(true);
    }

    const stopEditing = () => {
        setIsEditing(false);
    }

    const handleDelete = () => {
        deleteNote(note.id)
    }

    const handleUpdate = (text, timestamp) => {
        const updatedNote = {
            ...note,
            text: text,
            videoTimestamp: timestamp
        }
        updateNote(updatedNote);
        stopEditing();
    }

    return(
        <>
            <ConfirmationModal state={modalState} handleConfirm={handleDelete} message={"Are you sure you want to delete the note?"}/>
            {isEditing ? (
                <VideoNoteTemplate note={note} handleClose={stopEditing} addNote={handleUpdate}
                                   getTimestamp={getTimestamp}/>
            ) : (
                <VideoNoteCard note={note} seekTo={seekTo} onEdit={startEditing} onDelete={modalState.openModal}/>
            )}
        </>

    )
}

export default VideoNoteItem;