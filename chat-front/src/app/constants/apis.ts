export const BASE_URL: string = "http://localhost:8080/api/v1";

export const USER_URL: string = BASE_URL + "/user";
export const LOGIN_URL: string = USER_URL + "/login";
export const SIGNUP_URL: string = USER_URL + "/signup";

export const CHATROOM_URL: string = BASE_URL + "/chatroom"
export const GET_CHATROOMS_URL: string = CHATROOM_URL + "/rooms"


export const MESSAGES_URL: string = BASE_URL + "/messages"
export const GET_MESSAGES_URL: string = MESSAGES_URL ;