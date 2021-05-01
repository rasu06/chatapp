import firebase from "firebase"
import 'firebase/storage'
require("firebase/firestore");

var firebaseConfig = {
    apiKey: process.env?.REACT_APP_apiKey,
    authDomain:process.env?.REACT_APP_authDomain,
    projectId: process.env?.REACT_APP_projectId,
    storageBucket: process.env?.REACT_APP_storageBucket,
    messagingSenderId: process.env?.REACT_APP_messagingSenderId,
    appId: process.env?.REACT_APP_appId
  };
  // Initialize Firebase
  
   const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider= new firebase.auth.GoogleAuthProvider();

  export {db,auth,provider,firebaseApp};
  
