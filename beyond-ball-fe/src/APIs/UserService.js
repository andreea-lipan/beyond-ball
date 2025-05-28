import {FileRequestInstance, RequestInstance} from "./RequestInstance.js";
import {USER_ENDPOINTS, WHITEBOARD_ENDPOINTS} from "./Endpoints.js";
import Storage from "../utils/Storage.js";

const getTeamMembers = (teamId) => {
    return getTeamMembersForAdmin(teamId).then(res => {
        const members = res.members.filter((member) => member.active === true);
        return {
            ...res,
            members
        }
    })
}

const uploadAvatar = (file) => {
    const userId = Storage.getUserIdFromToken();
    const formData = new FormData();
    formData.append("file", file);

    return FileRequestInstance.put(USER_ENDPOINTS.USER(userId), formData).then((response) => response.data);
}

const getAvatarImage = (filename) => {
    return RequestInstance.get(USER_ENDPOINTS.AVATAR_IMAGE(filename), {responseType: "blob"}).then((blob) => {
        const imageBlob = blob.data;
        return URL.createObjectURL(imageBlob);
    })
}

const getTeamMembersForAdmin = (teamId) => {
    return RequestInstance.get(USER_ENDPOINTS.TEAM_MEMBERS(teamId)).then(response => response.data);
}

const getNoPlayers = (teamId) => {
    return getTeamMembersForAdmin(teamId).then(res => {
        const members = res.members.filter((member) => member.active === true && member.role === "PLAYER");
        return members.length;
    })
}

const changeActiveStatus = (memberId, active) => {
    return RequestInstance.post(USER_ENDPOINTS.CHANGE_ACTIVE_STATUS(memberId), {active: active});
}

const uploadPlayersExcel = async (teamId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await FileRequestInstance.post(USER_ENDPOINTS.UPLOAD_PLAYERS(teamId), formData);
    return response.data;
};

const getUserById = (userId) => {
    return RequestInstance.get(USER_ENDPOINTS.USER(userId)).then(response => response.data);
}

const UserService = {
    getTeamMembers,
    changeActiveStatus,
    getTeamMembersForAdmin,
    uploadPlayersExcel,
    getNoPlayers,
    getUserById,
    uploadAvatar,
    getAvatarImage,
}

export default UserService;