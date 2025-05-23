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

const WHITEBOARD_COMMENT_URL = `${BASE_URL}/whiteboard-comments`
export const WHITEBOARD_COMMENT_ENDPOINTS = {
    COMMENTS: `${WHITEBOARD_COMMENT_URL}`,
    COMMENTS_BY_WHITEBOARD: (whiteboardId) => `${WHITEBOARD_COMMENT_URL}/whiteboard/${whiteboardId}`,
    COMMENT: (id) => `${WHITEBOARD_COMMENT_URL}/${id}`,
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
    COMPLETED: (playerId) => `${QUIZ_URL}/player/${playerId}`,
};

const USER_URL = `${BASE_URL}/users`
export const USER_ENDPOINTS = {
    MOCK: `${USER_URL}/teams/{teamId}/players/mock`,
    TEAM_MEMBERS: (teamId) => `${USER_URL}/teams/${teamId}/members`,
    USERS: `${USER_URL}`,
    CHANGE_ACTIVE_STATUS: (userId) => `${USER_URL}/accounts/${userId}/active`,
    UPLOAD_PLAYERS: (teamId) => `${USER_URL}/teams/${teamId}/players/upload`,
    USER: (userId) => `${USER_URL}/${userId}`,
    AVATAR_IMAGE: (filename) => `${BASE_URL}${filename}`,
}

const SOCKET_URL = `${BASE_URL}/ws`
export const SOCKET_ENDPOINTS = {
    BASE: `${SOCKET_URL}`,
    CLIP: (teamId) => `/topic/${teamId}/clips`,
    CLIP_NOTE: (clipId) => `/topic/clips/${clipId}`,
    WHITEBOARD: (teamId) => `/topic/${teamId}/whiteboards`,
    WHITEBOARD_COMMENT: (whiteboardId) => `/topic/whiteboards/${whiteboardId}`,
    FOLDER: (teamId) => `/topic/${teamId}/folders`,
}

export const EMAIL_ENDPOINTS = {
    EMAIL_RESEND: `${BASE_URL}/email/resend`,
    EMAIL_SEND: `${BASE_URL}/email/send`
}