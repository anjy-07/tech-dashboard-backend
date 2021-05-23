import { User } from '../../models/user';
import { Board } from '../../models/board';
import { Pin } from '../../models/pin';
import { createUser, deleteUser, getUser, updateUser } from '../../persistence/user-crud';

const pin: Pin = {
    id: 'akhh-kjhlaskdh',
    name: 'Javascript 101',
    description: 'Basics of javascript',
    url: 'https://howtodoinjavascript.com/javscript-101',
    image: null,
    category: 'Web Dev',
    tags: ['javascript', 'web-development'],
    createdAt: Date.now().toLocaleString(),
    updatedAt: Date.now().toLocaleString()
};
let board: Board = {
    id: 'abc-98012-9ahj-123jg',
    name: 'Javascript',
    category: 'Web Dev',
    tags: ['web-dev', 'js', 'ts'],
    pins: [pin],
    createdAt: Date.now().toLocaleString(),
    updatedAt: Date.now().toLocaleString()
};

export const resolvers = {
    Query: {
        user: (obj: any, args: any): any => {
            const userId = args?.userId;
            return getUser(userId).then(user => user)
            .catch(e => {
                const message = `Cannot fetch user with id ${userId} because of: ${e}`;
                throw new Error(message);
            });
        },
        boards: (userId: string): [Board] => [board],
        boardByCategory: (userId: string, category: string[]): [Board] => [board],
        boardByTags: (userId: string, tags: [String]): [Board] => [board],
        pins: (userId: string): [Pin] => [pin],
        pinsByBoard: (userId: string, boardId: string): [Pin] => [pin],
        pinByCategory: (userId: string, category: [String]): [Pin] => [pin],
        pinByTags: (userId: string, tags: [String]): [Pin] => [pin]
    },
    Mutation: {
        createUser: (obj: any, args: any) => {
            const user = args?.user as User;
            return createUser(user)
                .then(isUserCreated => isUserCreated)
                .catch(e => {
                    const message = `Cannot create user with id ${user.id} because of: ${e}`;
                    throw new Error(message);
                });
        },
        updateUser: (obj: any, args: any) => {
            const user = args?.user as User;
            return updateUser(user)
                .then(isUserUpdated => isUserUpdated)
                .catch(e => {
                    const message = `Cannot update user with id ${user.id} because of: ${e}`;
                    throw new Error(message);
                });;
        },
        deleteUser: (obj: any, args: any) => {
            const userId = args?.userId as string;
            return deleteUser(userId)
                .then(isUserDeleted => isUserDeleted)
                .catch(e => {
                    const message = `Cannot delete user data because of: ${e}`; 
                    throw new Error(message);
                });
        },
        createBoard: (obj: any, args: any) => {
            return board;
        },
        updateBoard: (obj: any, args: any) => {
            return board;
        },
        addPinToBoard: (userId: string, boardId: string, pin: Pin) => {
            const newPin = { ...pin, category: 'Web Development' }
            board.pins.push(newPin);
            return board;
        },
    }
}