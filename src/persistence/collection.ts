import { USERS_COLLECTION } from '../constants/firebase-constants';
import firebase from '../connectors/firebase';

export const db = {
    users: firebase.firestore().collection(USERS_COLLECTION)
}