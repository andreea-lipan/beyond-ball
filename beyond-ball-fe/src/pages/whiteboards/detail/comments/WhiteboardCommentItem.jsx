import {useState} from "react";
import useModal from "../../../../components/modals/useModal.js";
import {ConfirmationModal} from "../../../../components/modals/ConfirmationModal.jsx";
import VideoNoteTemplate from "../../../clips/clip-detail/notes/VideoNoteTemplate.jsx";
import VideoNoteCard from "../../../clips/clip-detail/notes/VideoNoteCard.jsx";
import WhiteboardCommentTemplate from "./WhiteboardCommentTemplate.jsx";
import WhiteboardCommentCard from "./WhiteboardCommentCard.jsx";

const WhiteboardCommentItem = ({ comment, deleteComment, updateComment }) => {
    const [isEditing, setIsEditing] = useState(false);
    const modalState = useModal();

    const startEditing = () => {
        setIsEditing(true);
    }

    const stopEditing = () => {
        setIsEditing(false);
    }

    const handleDelete = () => {
        deleteComment(comment.id)
    }

    const handleUpdate = (text) => {
        const updatedComment = {
            ...comment,
            text: text,
        }
        updateComment(updatedComment);
        stopEditing();
    }

    return(
        <>
            <ConfirmationModal state={modalState} handleConfirm={handleDelete} message={"Are you sure you want to delete the comment?"}/>
            {isEditing ? (
                <WhiteboardCommentTemplate addComment={handleUpdate} handleClose={stopEditing} comment={comment}/>
            ) : (
                <WhiteboardCommentCard comment={comment} onEdit={startEditing} onDelete={modalState.openModal}/>
            )}
        </>
    )
}

export default WhiteboardCommentItem;