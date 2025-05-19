import Storage from "../utils/Storage.js";
import {FileRequestInstance, RequestInstance} from "./RequestInstance.js";
import {CLIP_ENDPOINTS, WHITEBOARD_ENDPOINTS} from "./Endpoints.js";

const uploadClip = (file, title,folderId) => {
    const formData = new FormData();
    formData.append("file", file);

    const data = {
        player: Storage.getUserIdFromToken(),
        title: title? title : "Untitled",
        folderId: folderId? folderId : 1,
    }
    formData.append("data", JSON.stringify(data));

    return FileRequestInstance.post(CLIP_ENDPOINTS.CLIPS, formData)
}

const getClip = (id) => {
    return RequestInstance.get(CLIP_ENDPOINTS.CLIP(id)).then((response) => response.data);
}

const getClipVideo = (filename) => {
    return RequestInstance.get(CLIP_ENDPOINTS.CLIP_VIDEO(filename), {responseType: "blob"}).then((blob) => {
        const videoBlob = blob.data;
        return URL.createObjectURL(videoBlob);
    })
}

const getAllClips = () => {
    return RequestInstance.get(CLIP_ENDPOINTS.CLIPS)
        .then((response) => response.data);
};

const getClipsByFolder = (folderId) => {
    return RequestInstance.get(CLIP_ENDPOINTS.CLIPS_BY_FOLDER(folderId))
        .then((response) => response.data);
};

const ClipService = {
    uploadClip,
    getClipVideo,
    getAllClips,
    getClipsByFolder,
    getClip,
}

export default ClipService;