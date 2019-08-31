import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC2DdUupRotCp-Kw9CstqvSyu6uZ7SDSNw",
    authDomain: "shopping-653cd.firebaseapp.com",
    databaseURL: "https://shopping-653cd.firebaseio.com",
    projectId: "shopping-653cd",
    storageBucket: "",
    messagingSenderId: "972798661251",
    appId: "1:972798661251:web:64a31f3b963b8c15"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;