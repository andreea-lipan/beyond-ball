import { jwtDecode } from "jwt-decode";

// use this when trying to get something from local storage
// cause if the future we try to change how we store things
// we would only have to change it here


const getUserId = () => {
    return localStorage.getItem('userId');
}

const getUserRole = () => {
    return localStorage.getItem('role');
}

const setUserId = (userId) => {
    localStorage.setItem('userId', userId);
}

const setUserRole = (role) => {
    localStorage.setItem('role', role);
}

const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
const getToken = () => {
    return localStorage.getItem('token');
  };
  
 const clearToken = () => {
    localStorage.removeItem('token');
  };

 const getDecodedToken = () => {
    const token = getToken();
    if (!token) return null;

    try {
        return jwtDecode(token);
    } catch (err) {
        console.error("Invalid token", err);
        return null;
    }
};

const getTeamIdFromToken = () => {
    const decoded = getDecodedToken();
    return decoded?.teamId ?? null;
};

const getRoleFromToken = () => {
    const decoded = getDecodedToken();
    return decoded?.role ?? null;
};

const getUsernameFromToken = () => {
    const decoded = getDecodedToken();
    return decoded?.sub ?? null;
};

const logout = () => {
    console.log("Logging out...");
    localStorage.clear();
    sessionStorage.clear();
};

const Storage = {
    getUserId,
    getUserRole,
    setUserId,
    setUserRole,
    setToken,
    getToken,
    clearToken,
    getDecodedToken,
    getTeamIdFromToken,
    getRoleFromToken,
    getUsernameFromToken,
    logout
}

export default Storage;