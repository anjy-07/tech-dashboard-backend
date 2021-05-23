import { USER_COLLECTION } from '../constants/firebase-constants';
import firebase from '../connectors/firebase';
import { User } from '../models/user';

const db = firebase.firestore();

const userCollection = db.collection(USER_COLLECTION);

export const createUser = async (user: User): Promise<boolean> => {
    return await userCollection.doc(user.id)
        .set({
            ...user,
            createdAt: new Date().toISOString(),
            updatedAt: null,
        })
    .then(() => true);
}

export const updateUser = async (user: User): Promise<boolean> => {
    return await userCollection.doc(user.id)
        .set({
            ...user,
            updatedAt: new Date().toISOString(),
        }, { merge: true })
    .then(() => true);
}

export const getUser = async (userId: string): Promise<User> => {
    return await userCollection.doc(userId)
        .get()
    .then(user => {
        if(user.exists) {
            return user.data() as User;
        } else {
            throw new Error("User not found");
        }});
}

export const deleteUser = async (userId: string): Promise<boolean> => {
    return await userCollection.doc(userId)
        .delete()
    .then(() => true);
}
