import { message } from "./message.type";

export type ChatRoom = {
    friend_username : string;
    messages : Array<message>
}