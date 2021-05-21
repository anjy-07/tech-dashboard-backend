import { Pin } from "./pin";

export interface Board {
    id: string;
    name: string;
    category: string;
    tags: string[];
    pins: Pin[];
    createdAt: string;
    updatedAt: string;
}