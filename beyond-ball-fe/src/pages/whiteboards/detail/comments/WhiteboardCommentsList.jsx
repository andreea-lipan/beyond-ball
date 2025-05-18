import WhiteboardCommentItem from "./WhiteboardCommentItem.jsx";

const WhiteboardCommentsList = ({comments, deleteComment, updateComment}) => {

    return(
        comments?.map((comment) => (
            <WhiteboardCommentItem comment={comment} deleteComment={deleteComment} updateComment={updateComment}/>
        ))
    )
}

export default WhiteboardCommentsList;