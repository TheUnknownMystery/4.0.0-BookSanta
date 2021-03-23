import firebase from 'firebase'
require("@firebase/firestore")


const firebaseConfig = {
    apiKey: "AIzaSyBTp_eJF67c21UVhIAQdAiJ_9TQi3MDvM4",
 authDomain: "booksanta-1-53257.firebaseapp.com",
 projectId: "booksanta-1-53257",
 storageBucket: "booksanta-1-53257.appspot.com",
 messagingSenderId: "663297695070",
 appId: "1:663297695070:web:70d17c1cf6df7bbc6943cf"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();