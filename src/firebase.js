import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBvc_AvPhR4kvGZ3Z9g6Rz95uPPzr-xYbM",
    authDomain: "contest-practice.firebaseapp.com",
    projectId: "contest-practice",
    storageBucket: "contest-practice.appspot.com",
    messagingSenderId: "1070483555360",
    appId: "1:1070483555360:web:55e9813f69ef6e2ef6e845"
  };

  const firedb = firebase.initializeApp(firebaseConfig);
  const storage = getStorage(firedb);
  export  {
    firedb,
    storage,
  };

