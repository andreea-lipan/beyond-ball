import {FileRequestInstance, RequestInstance} from "./RequestInstance.js";
import {WHITEBOARD_ENDPOINTS} from "./Endpoints.js";
import Storage from "../utils/Storage";


const uploadWhiteboard = (blob, title) => {
    const formData = new FormData();
    formData.append("file", blob);

    const data = {
        player: Storage.getUserIdFromToken(),
        title: title? title : "Untitled",
    }
    formData.append("data", JSON.stringify(data));

    return FileRequestInstance.post(WHITEBOARD_ENDPOINTS.BOARDS, formData)
}

const getWhiteboard = (id) => {
    return RequestInstance.get(WHITEBOARD_ENDPOINTS.BOARD(id))
}

const getWhiteboardImage = (filename) => {
    return RequestInstance.get(WHITEBOARD_ENDPOINTS.BOARD_IMAGE(filename), {responseType: "blob"}).then((blob) => {
        const imageBlob = blob.data;
        return URL.createObjectURL(imageBlob);
    })
}

const getWhiteboards = () => {
    return RequestInstance.get(WHITEBOARD_ENDPOINTS.BOARDS)
        .then((response) => response.data);
};


const getWhiteboardsByTitle = (title) => {
    return RequestInstance.get(WHITEBOARD_ENDPOINTS.FILTER(title));
}


const WhiteboardService = {
    uploadWhiteboard,
    getWhiteboard,
    getWhiteboardImage,
    getWhiteboards,
    getWhiteboardsByTitle
}

export default WhiteboardService;