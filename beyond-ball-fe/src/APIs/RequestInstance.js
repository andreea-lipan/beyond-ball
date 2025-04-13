import axios from "axios";
import Storage from '../utils/Storage';


// use these functions when making calls to the BE

export const RequestInstance = axios.create({
    mode:'cors',
    headers: {
        "Content-Type": "application/json",
    },
});

export const FileRequestInstance = axios.create({
    mode:'cors',
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

// Attach token to all Requests
const attachAuthInterceptor = (instance) => {
    instance.interceptors.request.use((config) => {
        const token = Storage.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
};

attachAuthInterceptor(RequestInstance);
attachAuthInterceptor(FileRequestInstance);