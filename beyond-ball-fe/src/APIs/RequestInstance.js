import axios from "axios";

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