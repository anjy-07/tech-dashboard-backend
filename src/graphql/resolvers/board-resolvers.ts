import { Board } from '../../models/board';
import { createBoard, deleteBoard, getBoardByCategory, getBoardByTags, getBoardsForUser, updateBoard } from '../../persistence/board-crud';

export const boardResolvers = {
    Query: {
        boards: (_: any, args: any) => {
            const userId = args?.userId as string;
            return getBoardsForUser(userId)
                .then(boards => boards)
                .catch(e => {
                    const message = `Cannot fetch boards for user ${userId} because of: ${e}`;
                    throw new Error(message);
                });
        },
        boardByCategory: (_: any, args: any) => {
            const userId = args?.userId as string;
            const category = args?.category as string;
            console.log(userId, category)
            return getBoardByCategory(userId, category)
            .then(boards => boards)
            .catch(e => {
                const message = `Cannot fetch boards for user ${userId} by category ${category} because of: ${e}`;
                throw new Error(message);
            });
        },
        boardByTags: (_: any, args: any) => {
            const userId = args?.userId as string;
            const tags = args?.tags as string[];
            return getBoardByTags(userId, tags)
            .then(boards => boards)
            .catch(e => {
                const message = `Cannot fetch boards for user ${userId} by tags ${tags.join(", ")} because of: ${e}`;
                throw new Error(message);
            });
        },
    },
    Mutation: {
        createBoard: (_: any, args: any) => {
            const userId = args?.userId as string;
            const board = args?.board as Board;
            return createBoard(userId, board)
                .then(newBoard => newBoard)
                .catch(e => {
                    const message = `Cannot create board because of: ${e}`;
                    throw new Error(message);
                });
        },
        updateBoard: (_: any, args: any) => {
            const userId = args?.userId as string;
            const board = args?.board as Board;
            return updateBoard(userId, board)
                .then(updatedBoard => updatedBoard)
                .catch(e => {
                    const message = `Cannot update board with id ${board.id} because of: ${e}`;
                    throw new Error(message);
                });
        },
        deleteBoard: (_: any, args: any) => {
            const userId = args?.userId as string;
            const boardId = args?.boardId as string;
            return deleteBoard(userId, boardId)
                .then(isBoardDeleted => isBoardDeleted)
                .catch(e => {
                    const message = `Cannot delete board with id ${boardId} because of: ${e}`;
                    throw new Error(message);
                });
        },
    }
}
