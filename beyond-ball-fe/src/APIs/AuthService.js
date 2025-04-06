import {RequestInstance} from "./RequestInstance";
import {AUTH_ENDPOINTS} from "./Endpoints";
import Storage from "../utils/Storage";

// Example of using RequestInstance
// There should be a different service for each type of object
// All services should use RequestInstance

const logIn = (username, password) => {
    return RequestInstance.post(AUTH_ENDPOINTS.LOGIN, {username, password})
        .then(res => res.data)
        .then(data => {
            Storage.setUserId(data.id)
            Storage.setUserRole(data.role)
            return data
        })
}

// See example of using this function in the LoginPage

const registerCompany = (data) => {
    return RequestInstance.post(AUTH_ENDPOINTS.TEAM_SIGNUP, data)
}

const AuthService = {
    registerCompany,
    logIn
}

export default AuthService