// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, doc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB-6Ag3yMGXaVI-EsqE4UcD4orRnsklp6k',
  authDomain: 'filmoteka-a6dd0.firebaseapp.com',
  projectId: 'filmoteka-a6dd0',
  storageBucket: 'filmoteka-a6dd0.appspot.com',
  messagingSenderId: '152374939851',
  appId: '1:152374939851:web:d5860e5907ada683688b4e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
console.log(db);

// async function getData() {
//   const querySnapshot = await getDocs(collection(db, 'watched-movie'));
//   // if (querySnapshot.exists()) {
//   //   const docData = querySnapshot.data();
//   //   console.log(JSON.stringify(docData));
//   // }
//   console.log(querySnapshot);
//   // querySnapshot.forEach(doc => {
//   //   console.log(`${doc.id} => ${doc.data()}`);
//   // });
// }
// getData();

// var firebase = require('firebase');
// var firebaseui = require('firebaseui');
// var ui = new firebaseui.auth.AuthUI(firebase.auth());
// ui.start('#firebaseui-auth-container', {
//   signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
//   // Other config options...
// });
// import { GoogleAuthProvider } from 'firebase/auth';

// import { getAuth } from 'firebase/auth';

// const auth = getAuth();
// auth.languageCode = 'it';
// // To apply the default browser preference instead of explicitly setting it.
// // firebase.auth().useDeviceLanguage();

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

document.querySelector('#login').addEventListener('click', () => {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // ...
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});
