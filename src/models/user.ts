import { Board } from "./board";

export interface User {
    id: string;
    name: string;
    email: string;
    bio: string;
    mobile: string;
    username: string;
    plan: string;
    active: boolean;
    type: string;
    dateCreated: string;
    dateUpdated: string;
    boards : [Board];
}