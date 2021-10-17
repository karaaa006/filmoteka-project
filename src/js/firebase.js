// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore';
import api from './movie_Api';

import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';

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

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const auth = getAuth();
getAuth();

export async function getData() {
  const user = getAuth().currentUser;
  const id = user.uid;

  const docRef = doc(db, 'users-data', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
}

export async function setData(field, data) {
  const user = getAuth().currentUser;
  const id = user.uid;

  await setDoc(doc(db, 'users-data', id), {
    [field]: data,
  });
}
const api1 = new api();

// document.querySelector('#test').addEventListener('click', () => {
//   const moviesArray = [];
//   getData().then(d => {
//     if (d) {
//       const moviesArray = JSON.parse(d.watched);
//       api1.getMovieInfo('11').then(movie => {
//         moviesArray.push(movie);
//         setData('watched', JSON.stringify(moviesArray));
//       });
//       return;
//     }

//     api1.getMovieInfo('11').then(movie => {
//       moviesArray.push(movie);
//       setData('watched', JSON.stringify(moviesArray));
//     });
//   });
// });
export function isSignin() {
  console.log(getAuth().currentUser);
  if (getAuth().currentUser) return true;

  return false;
}

export function getUserName() {
  return getAuth().currentUser;
}

export async function login() {
  signInWithPopup(auth, provider)
    .then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      console.log(getUserName());

      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          console.log('ok');
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      const email = error.email;

      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

export async function logout() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('Logout ok');
    })
    .catch(error => {
      // An error happened.
    });
}

document.querySelector('#login').addEventListener('click', () => {
  login();
});

// document.querySelector('#logout').addEventListener('click', () => {
//   logout();
// });
