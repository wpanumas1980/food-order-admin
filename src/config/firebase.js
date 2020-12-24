import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyC25Bg1L2J2sL6ZzlEtJ3kVUy_ww2BGVSM",
    authDomain: "food-order-cebd4.firebaseapp.com",
    projectId: "food-order-cebd4",
    storageBucket: "food-order-cebd4.appspot.com",
    messagingSenderId: "934192492571",
    appId: "1:934192492571:web:da7aacce47604c0c7008be"
  };
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firestore =  firebaseApp.firestore();
export const auth =  firebase.auth();
export const storage = firebase.storage().ref();
// export const googleProvider = new firebaseApp.auth.GoogleAuthProvider();
 //  export default firebaseApp;
export default firebaseApp;