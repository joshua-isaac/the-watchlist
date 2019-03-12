import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBmnxNh9ZIThI57yOPmUembpvMBqAymPO0",
    authDomain: "the-watchlist.firebaseapp.com",
    databaseURL: "https://the-watchlist.firebaseio.com",
    projectId: "the-watchlist",
    storageBucket: "the-watchlist.appspot.com",
    messagingSenderId: "114521226950"
  };
  firebase.initializeApp(config);

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();

  export default firebase;