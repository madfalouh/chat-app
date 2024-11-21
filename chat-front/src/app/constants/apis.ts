export const BASE_URL: string = "http://localhost:8080/api/v1";

export const USER_URL: string = BASE_URL + "/user";
export const LOGIN_URL: string = USER_URL + "/login";
export const SIGNUP_URL: string = USER_URL + "/signup";
export const SEARCH_URL: string = USER_URL + "/search";

export const CHATROOM_URL: string = BASE_URL + "/chatroom"
export const GET_CHATROOMS_URL: string = CHATROOM_URL + "/all"
export const CHATROOM_SEND_MSG_URL: string = CHATROOM_URL + "/send-message"


export const MESSAGES_URL: string = BASE_URL + "/message"
export const GET_MESSAGES_URL: string = MESSAGES_URL + "/get-messages";

export const WEB_SOCKET_URL = "http://localhost:8080/ws";


