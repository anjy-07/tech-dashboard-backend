
import { db } from './collection';
import { User } from '../models/user';

const usersCollection = db.users;

export const createUser = async (user: User): Promise<User> => {
    const newUser: User = {
        ...user,
        createdAt: new Date().toISOString(),
        updatedAt: null,
    }
    return await usersCollection.doc(user.id)
        .set(newUser, { merge: true })
        .then(_ => newUser);
}

export const updateUser = async (user: User): Promise<User> => {
    const updatedUser: User = {
        ...user,
        updatedAt: new Date().toISOString()
    };
    return await usersCollection.doc(user.id)
        .set(updatedUser, { merge: true })
        .then(_ => updatedUser);
}

export const getUser = async (userId: string): Promise<User> => {
    return await usersCollection.doc(userId)
        .get()
        .then(user => {
            if (user.exists) {
                return user.data() as User;
            } else {
                throw new Error("User not found");
            }
        });
}

export const deleteUser = async (userId: string): Promise<boolean> => {
    return await usersCollection.doc(userId)
        .delete()
        .then(() => true);
}
