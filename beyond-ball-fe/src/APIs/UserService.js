import {RequestInstance} from "./RequestInstance.js";
import {USER_ENDPOINTS} from "./Endpoints.js";

const getTeamMembers = (teamId) => {
    return RequestInstance.get(USER_ENDPOINTS.TEAM_MEMBERS(teamId)).then(response => response.data);
}

const UserService = {
    getTeamMembers,
}

export default UserService;