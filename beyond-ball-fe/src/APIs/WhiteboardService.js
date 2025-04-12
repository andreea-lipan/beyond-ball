import {FileRequestInstance} from "./RequestInstance.js";
import {WHITEBOARD_ENDPOINTS} from "./Endpoints.js";


const uploadWhiteboard = (blob, player, title) => {
    const formData = new FormData();
    formData.append("file", blob);

    const data = {
        player: player,
        title: title? title : "Untitled",
    }
    formData.append("data", JSON.stringify(data));

    return FileRequestInstance.post(WHITEBOARD_ENDPOINTS.CREATE_BOARD, formData)
}

const WhiteboardService = {
    uploadWhiteboard,
}

export default WhiteboardService;