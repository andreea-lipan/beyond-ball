import {RequestInstance, RequestInstanceNoToken} from "./RequestInstance";
import {AUTH_ENDPOINTS} from "./Endpoints";
import Storage from "../utils/Storage";

// Example of using RequestInstance
// There should be a different service for each type of object
// All services should use RequestInstance

const login = async (username, password) => {
    Storage.clearToken();

    try {
        const response = await RequestInstance.post(AUTH_ENDPOINTS.LOGIN, {
            username,
            password
        });

        const data = response.data;
        Storage.setToken(data.token);
        return data;

    } catch (error) {
        // forward the message to the caller
        console.log("Caught error in AuthService.js");

        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Login failed due to an unknown error.";
        throw new Error(message);
    }
};

// See example of using this function in the LoginPage

const registerTeam = (team) => {
    return RequestInstanceNoToken.post(AUTH_ENDPOINTS.TEAM_SIGNUP, team)
        .then(res => res.data)
}

const AuthService = {
    registerTeam,
    login
}

export default AuthService