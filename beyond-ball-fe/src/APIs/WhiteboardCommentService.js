import {WHITEBOARD_COMMENT_ENDPOINTS} from "./Endpoints.js";
import {RequestInstance} from "./RequestInstance.js";
import Storage from "../utils/Storage.js";


const getWhiteboardCommentsForWhiteboard = (id) => {
    return RequestInstance.get(WHITEBOARD_COMMENT_ENDPOINTS.COMMENTS_BY_WHITEBOARD(id))
        .then((response) => response.data);
}

const createWhiteboardComment = (comment) => {
    const authorId = Storage.getUserIdFromToken();
    const data = {
        ...comment,
        authorId: authorId,
    }
    return RequestInstance.post(WHITEBOARD_COMMENT_ENDPOINTS.COMMENTS, data).then(response => response.data)
}

const deleteWhiteboardComment = (id) => {
    return RequestInstance.delete(WHITEBOARD_COMMENT_ENDPOINTS.COMMENT(id)).then(response => response.data)
}

const updateWhiteboardComment = (id, whiteboardComment) => {
    return RequestInstance.put(WHITEBOARD_COMMENT_ENDPOINTS.COMMENT(id), whiteboardComment).then(response => response.data)
}

const WhiteboardCommentService = {
    getWhiteboardCommentsForWhiteboard,
    createWhiteboardComment,
    deleteWhiteboardComment,
    updateWhiteboardComment,
}

export default WhiteboardCommentService;