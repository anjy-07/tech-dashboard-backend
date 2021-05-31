import { addPinToBoard, deletePinFromBoard, getPinsByBoard } from "../../persistence/pin-crud";
import { Pin } from "../../models/pin";


export const pinResolvers = {
    Query: {
        pinsByBoard: (_: any, args: any) => {
            const userId = args?.userId as string;
            const boardId = args?.boardId as string;
            return getPinsByBoard(userId, boardId)
            .then(pins => pins)
            .catch(e => {
                const message = `Cannot get pins for board ${boardId} for user ${userId} because of: ${e}`;
                throw new Error(message);
            });
        },
    },
    Mutation: {
        addPinToBoard: (_: any, args: any) => {
            const userId = args?.userId as string;
            const boardId = args?.boardId as string;
            const pin = args?.pin as Pin;
            return addPinToBoard(userId, boardId, pin)
            .then(newPin => newPin)
            .catch(e => {
                const message = `Cannot add pin to board ${boardId} for user ${userId} because of: ${e}`;
                throw new Error(message);
            });
        },
        deletePinFromBoard: (_:any, args: any) => {
            const userId = args?.userId as string;
            const boardId = args?.boardId as string;
            const pinId = args?.pinId as string;
            return deletePinFromBoard(userId, boardId, pinId)
            .then(isPinDeleted => isPinDeleted)
            .catch(e => {
                const message = `Cannot delete pin from board ${boardId} for user ${userId} because of: ${e}`;
                throw new Error(message);
            });
        }
    }
}