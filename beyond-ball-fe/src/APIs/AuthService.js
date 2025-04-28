import {RequestInstance} from "./RequestInstance";
import {AUTH_ENDPOINTS} from "./Endpoints";
import Storage from "../utils/Storage";
import axios from "axios"; 


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
        console.log("Caught error in AuthService.js");
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Login failed due to an unknown error.";
        throw new Error(message);
    }
};

const registerTeam = (team) => {
    const PublicRequest = axios.create(); 
    return PublicRequest.post(AUTH_ENDPOINTS.TEAM_SIGNUP, team)
        .then(res => res.data);
}

const AuthService = {
    registerTeam,
    login
}

export default AuthService;
