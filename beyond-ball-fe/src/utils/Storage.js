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

const Storage = {
    getUserId,
    getUserRole,
    setUserId,
    setUserRole
}

export default Storage;