import * as firebase from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import serviceAccountCredentials from '../service-account.json';

const serviceAccount = serviceAccountCredentials as ServiceAccount;

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)  
})

export default firebase;


