import { Board } from '../../models/board';
import { Pin } from '../../models/pin';

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
        boards: (userId: string): [Board] => [board],
        boardByCategory: (userId: string, category: string[]): [Board] => [board],
        boardByTags: (userId: string, tags: [String]): [Board] => [board],
        pins: (userId: string): [Pin] => [pin],
        pinsByBoard: (userId: string, boardId: string): [Pin] => [pin],
        pinByCategory: (userId: string, category: [String]): [Pin] => [pin],
        pinByTags: (userId: string, tags: [String]): [Pin] => [pin]        
    },
    Mutation: {
        createBoard: (userId: string, board: Board) => {
            return board;
        },
        updateBoard: (userId: string, board: Board) => {
            return board;
        },
        addPinToBoard: (userId: string, boardId: string, pin: Pin) => {
            const newPin = {...pin, category: 'Web Development'}
            board.pins.push(newPin);
            return board;
        },
    }
}