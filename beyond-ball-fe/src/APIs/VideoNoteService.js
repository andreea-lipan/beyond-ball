import {RequestInstance} from "./RequestInstance.js";
import Storage from "../utils/Storage.js";
import {VIDEO_NOTES_ENDPOINTS} from "./Endpoints.js";

const createVideoNote = (videoNote) => {
    const authorId = Storage.getUserIdFromToken();
    const data = {
        ...videoNote,
        authorId: authorId,
    }
    return RequestInstance.post(VIDEO_NOTES_ENDPOINTS.NOTES, data).then(response => response.data)
}

const getVideoNotesForClip = (clipId) => {
    return RequestInstance.get(VIDEO_NOTES_ENDPOINTS.NOTES_BY_CLIP(clipId)).then(response => response.data)
}

const VideoNoteService = {
    createVideoNote,
    getVideoNotesForClip
}

export default VideoNoteService;