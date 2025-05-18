import {RequestInstance} from "./RequestInstance.js";
import {USER_ENDPOINTS} from "./Endpoints.js";

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

const changeActiveStatus = (memberId, active) => {
    return RequestInstance.post(USER_ENDPOINTS.CHANGE_ACTIVE_STATUS(memberId), {active: active});
}

const UserService = {
    getTeamMembers,
    changeActiveStatus,
    getTeamMembersForAdmin
}

export default UserService;