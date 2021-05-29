import { db } from "./collection";
import { v4 as uuid } from 'uuid';
import { Pin } from "../models/pin";
import { BOARDS_COLLECTION } from "../constants/firebase-constants";
import { PINS_COLLECTION } from "../constants/firebase-constants";

const userCollection = db.users;

export const addPinToBoard = async (userId: string, boardId: string, pin: Pin): Promise<Pin> => {
    const id = uuid();
    const newPin: Pin = {
        id: id,
        ...pin,
        createdAt: new Date().toISOString()
    }
    return await userCollection.doc(userId).collection(BOARDS_COLLECTION)
        .doc(boardId).collection(PINS_COLLECTION).doc(id)
        .set(newPin)
        .then(_ => newPin);
}

export const deletePinFromBoard = async (userId: string, boardId: string, pinId: string): Promise<boolean> => {
    return await userCollection.doc(userId).collection(BOARDS_COLLECTION)
        .doc(boardId).collection(PINS_COLLECTION).doc(pinId)
        .delete()
        .then(_ => true);
}

export const getPinsByBoard = async (userId: string, boardId: string): Promise<Pin[]> => {
    return await userCollection.doc(userId).collection(BOARDS_COLLECTION)
        .doc(boardId).collection(PINS_COLLECTION)
        .get()
        .then(_ => getPinsFromFirestoreSnapshot(_));
}

const getPinsFromFirestoreSnapshot = (querySnapshot: FirebaseFirestore.QuerySnapshot): Pin[] => {
    let pins: Pin[] = []
    querySnapshot.forEach(pin => {
        if (pin.exists) {
            pins.push(pin.data() as Pin)
        }
    });
    return pins;
}