// all endpoints from the BE should be written here
// use these variable, no hardcoded values in the code

const BASE_URL = "http://localhost:8080"

const AUTH_URL = `${BASE_URL}/auth`
export const AUTH_ENDPOINTS = {
    LOGIN: `${AUTH_URL}/login`,
    TEAM_SIGNUP: `${AUTH_URL}/team-signup`
}

// add as many categories as necessary
const WHITEBOARD_URL = `${BASE_URL}/whiteboards`
export const WHITEBOARD_ENDPOINTS = {
    CREATE_BOARD: `${WHITEBOARD_URL}`,
}

export const PLAYERS_ENDPOINTS = {
    //todo
}

export const USER_ENDPOINTS = {
    MOCK: `${BASE_URL}/users/teams/{teamId}/players/mock`
}