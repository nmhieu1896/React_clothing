import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC2DdUupRotCp-Kw9CstqvSyu6uZ7SDSNw",
  authDomain: "shopping-653cd.firebaseapp.com",
  databaseURL: "https://shopping-653cd.firebaseio.com",
  projectId: "shopping-653cd",
  storageBucket: "",
  messagingSenderId: "972798661251",
  appId: "1:972798661251:web:64a31f3b963b8c15"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // const collectionRef = firestore.collection('users');

  const snapshot = await userRef.get();
  // const collectionSnapshop = await collectionRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userRef;
};

export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((target, collection) => {
    target[collection.title.toLowerCase()] = collection;
    return target;
  }, {});
};

// return when access while user is still signed in
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubcribe = auth.onAuthStateChanged(userAuth => {
      unsubcribe();
      resolve(userAuth);
    }, reject);
  });
};

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
