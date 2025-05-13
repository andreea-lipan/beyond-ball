import Storage from "../utils/Storage.js";
import {FileRequestInstance, RequestInstance} from "./RequestInstance.js";
import {CLIP_ENDPOINTS, WHITEBOARD_ENDPOINTS} from "./Endpoints.js";

const uploadClip = (file, title) => {
    const formData = new FormData();
    formData.append("file", file);

    const data = {
        player: Storage.getUserIdFromToken(),
        title: title? title : "Untitled",
    }
    formData.append("data", JSON.stringify(data));

    return FileRequestInstance.post(CLIP_ENDPOINTS.CLIPS, formData)
}

const getClip = (clipUrl) => {
    return FileRequestInstance.get(CLIP_ENDPOINTS.CLIP(clipUrl))
}
const getClipVideo = (filename) => {
    return RequestInstance.get(CLIP_ENDPOINTS.CLIP_VIDEO(filename), {responseType: "blob"}).then((blob) => {
        const videoBlob = blob.data;
        return URL.createObjectURL(videoBlob);
    })
}

const ClipService = {
    uploadClip,
    getClipVideo
}

export default ClipService;