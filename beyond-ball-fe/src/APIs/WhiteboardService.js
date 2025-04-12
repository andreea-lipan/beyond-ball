import {FileRequestInstance, RequestInstance} from "./RequestInstance.js";
import {WHITEBOARD_ENDPOINTS} from "./Endpoints.js";


const uploadWhiteboard = (blob, player, title) => {
    const formData = new FormData();
    formData.append("file", blob);

    const data = {
        player: player,
        title: title? title : "Untitled",
    }
    formData.append("data", JSON.stringify(data));

    return FileRequestInstance.post(WHITEBOARD_ENDPOINTS.BOARDS, formData)
}

const getWhiteboard = (id) => {
    return RequestInstance.get(WHITEBOARD_ENDPOINTS.BOARD(id))
}

const getWhiteboardImage = (filename) => {
    return RequestInstance.get(WHITEBOARD_ENDPOINTS.BOARD_IMAGE(filename))
}

const WhiteboardService = {
    uploadWhiteboard,
    getWhiteboard,
    getWhiteboardImage,
}

export default WhiteboardService;