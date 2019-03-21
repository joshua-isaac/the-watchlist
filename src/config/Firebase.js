import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyDOpm_bXpPBvkiv0KyWL6QATVXHgLAffJI",
  authDomain: "movieapp-fe482.firebaseapp.com",
  databaseURL: "https://movieapp-fe482.firebaseio.com",
  projectId: "movieapp-fe482",
  storageBucket: "movieapp-fe482.appspot.com",
  messagingSenderId: "611284571248"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
//export const auth = firebase.auth();

export default firebase;
