import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDTI7rBK3vUbh7FbKDRzDUfhuJLu5jWsgk",
    authDomain: "poketypes-c4369.firebaseapp.com",
    databaseURL: "https://poketypes-c4369.firebaseio.com",
    projectId: "poketypes-c4369",
    storageBucket: "poketypes-c4369.appspot.com",
    messagingSenderId: "191931962167",
    appId: "1:191931962167:web:1f594c968bd2f5bcac00b2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;