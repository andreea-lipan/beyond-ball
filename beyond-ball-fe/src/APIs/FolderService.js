import {RequestInstance} from "./RequestInstance.js";
import {FOLDER_ENDPOINTS} from "./Endpoints.js";
import Storage from "../utils/Storage.js";


const createFolder = (folderName,parentFolder) => {
    const userId = Storage.getUserIdFromToken();
    const data = {
        name: folderName,
        userId: userId,
        parentFolderId: parentFolder,
    }
    return RequestInstance.post(FOLDER_ENDPOINTS.FOLDERS,data)
}

const getFolderTree = () => {
    return RequestInstance.get(FOLDER_ENDPOINTS.FOLDERS)
        .then((response) => response.data);
};

const FolderService = {
    createFolder,
    getFolderTree,
}

export default FolderService;