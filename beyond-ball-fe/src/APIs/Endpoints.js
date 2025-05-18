// all endpoints from the BE should be written here
// use these variable, no hardcoded values in the code

const BASE_URL = "http://localhost:8080"

const AUTH_URL = `${BASE_URL}/auth`
export const AUTH_ENDPOINTS = {
    LOGIN: `${AUTH_URL}/login`,
    TEAM_SIGNUP: `${AUTH_URL}/team-signup`,
    MEMBER_SIGNUP: `${AUTH_URL}/member-signup`,
}

// add as many categories as necessary
const WHITEBOARD_URL = `${BASE_URL}/whiteboards`
export const WHITEBOARD_ENDPOINTS = {
    BOARDS: `${WHITEBOARD_URL}`,
    BOARD: (id) => `${WHITEBOARD_URL}/${id}`,
    BOARD_IMAGE: (filename) => `${BASE_URL}${filename}`,
    FILTER: (title) => `${WHITEBOARD_URL}/filter?title=${encodeURIComponent(title)}`,

}

const CLIP_URL = `${BASE_URL}/clips`
export const CLIP_ENDPOINTS = {
    CLIPS: `${CLIP_URL}`,
    CLIPS_BY_FOLDER: (folderId) => `${CLIP_URL}/folder/${folderId}`,
    CLIP: (id) => `${CLIP_URL}/${id}`,
    CLIP_VIDEO: (filename) => `${BASE_URL}${filename}`,
}

const VIDEO_NOTES_URL = `${BASE_URL}/video-notes`
export const VIDEO_NOTES_ENDPOINTS = {
    NOTES: `${VIDEO_NOTES_URL}`,
    NOTES_BY_CLIP: (clipId) => `${VIDEO_NOTES_URL}/clip/${clipId}`,
    NOTE: (id) => `${VIDEO_NOTES_URL}/${id}`,
}

const FOLDER_URL = `${BASE_URL}/folders`
export const FOLDER_ENDPOINTS = {
    FOLDERS: `${FOLDER_URL}`,
    FOLDER: (id) => `${FOLDER_URL}/${id}`,
}

const QUIZ_URL = `${BASE_URL}/quizzes`;
export const QUIZ_ENDPOINTS = {
    QUIZZES: `${QUIZ_URL}`,
};

const USER_URL = `${BASE_URL}/users`
export const USER_ENDPOINTS = {
    MOCK: `${USER_URL}/teams/{teamId}/players/mock`,
    TEAM_MEMBERS: (teamId) => `${USER_URL}/teams/${teamId}/members`,
    USERS: `${USER_URL}`,
    CHANGE_ACTIVE_STATUS: (userId) => `${USER_URL}/accounts/${userId}/active`,
}

const SOCKET_URL = `${BASE_URL}/ws`
export const SOCKET_ENDPOINTS = {
    BASE: `${SOCKET_URL}`,
    CLIP: (clipId) => `/app/clips/${clipId}`,
    CLIP_INC: (clipId) => `/topic/clips/${clipId}`,
    WHITEBOARD: (whiteboardId) => `/app/whiteboards/${whiteboardId}`,
    WHITEBOARD_INC: (whiteboardId) => `/topic/whiteboards/${whiteboardId}`,
}