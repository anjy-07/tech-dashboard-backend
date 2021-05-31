import { BOARDS_COLLECTION } from '../constants/firebase-constants';
import { Board } from '../models/board';
import { db } from './collection';
import { v4 as uuid } from 'uuid';

const userCollection = db.users;

export const createBoard = async (userId: string, board: Board): Promise<Board> => {
    const id = uuid();
    const newBoard: Board = {
        ...board,
        id: id,
        createdAt: new Date().toISOString(),
        updatedAt: null
    };
    return await userCollection.doc(userId).collection(BOARDS_COLLECTION)
        .doc(id)
        .set(newBoard)
        .then(_ => newBoard);
}

export const updateBoard = async (userId: string, board: Board): Promise<Board> => {
    const updatedBoard: Board = {
        ...board,
        updatedAt: new Date().toISOString()
    };
    return await userCollection.doc(userId).collection(BOARDS_COLLECTION)
        .doc(board?.id)
        .set(updatedBoard, { merge: true })
        .then(_ => updatedBoard);
}

export const deleteBoard = async (userId: string, boardId: string): Promise<boolean> => {
    return await userCollection.doc(userId).collection(BOARDS_COLLECTION)
        .doc(boardId)
        .delete()
        .then(_ => true);
}

export const getBoardsForUser = async (userId: string): Promise<Board[]> => {
    return await userCollection.doc(userId).collection(BOARDS_COLLECTION)
        .get()
        .then(_ => getBoardsFromFirestoreSnapshot(_));
}

export const getBoardByCategory = async (userId: string, category: string): Promise<Board[]> => {
    return await userCollection.doc(userId).collection(BOARDS_COLLECTION)
        .where('category', '==', category)
        .get()
        .then(_ => getBoardsFromFirestoreSnapshot(_));
}

export const getBoardByTags = async (userId: string, tags: string[]): Promise<Board[]> => {
    return await userCollection.doc(userId).collection(BOARDS_COLLECTION)
        .where('tags', 'array-contains-any', tags)
        .get()
        .then(_ => getBoardsFromFirestoreSnapshot(_));
}

const getBoardsFromFirestoreSnapshot = (querySnapshot: FirebaseFirestore.QuerySnapshot): Board[] => {
    let boards: Board[] = []
    querySnapshot.forEach(board => {
        if (board.exists) {
            boards.push(board.data() as Board)
        }
    });
    return boards;
}