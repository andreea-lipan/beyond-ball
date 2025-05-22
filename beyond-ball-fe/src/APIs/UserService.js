import {RequestInstance} from "./RequestInstance.js";
import {USER_ENDPOINTS} from "./Endpoints.js";
import {FileRequestInstance} from "./RequestInstance.js";

const getTeamMembers = (teamId) => {
    return getTeamMembersForAdmin(teamId).then(res => {
        const members = res.members.filter((member) => member.active === true);
        return {
            ...res,
            members
        }
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
    getUserById
}

export default UserService;