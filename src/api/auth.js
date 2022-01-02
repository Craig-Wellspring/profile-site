import firebase from 'firebase/app';
import { adminConfig } from './apiKeys';

const signInUser = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOutUser = () => new Promise((resolve, reject) => {
  firebase.auth().signOut().then(resolve).catch(reject);
});

const currentUID = () => firebase.auth().currentUser?.uid;

const currentUser = () => firebase.auth().currentUser;

const userIsAdmin = () => firebase.auth().currentUser?.uid === adminConfig.adminUID;

export {
  signInUser, signOutUser, currentUID, currentUser, userIsAdmin,
};
