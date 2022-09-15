import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyB7Stxfsk1glhbbF4VuZ873ohOzNg7WsDg",
  authDomain: "live-chat-8ffeb.firebaseapp.com",
  projectId: "live-chat-8ffeb",
  storageBucket: "live-chat-8ffeb.appspot.com",
  messagingSenderId: "283052842402",
  appId: "1:283052842402:web:44a5fed3d68fa5e8d1a6fb"
};

const db = firebase.initializeApp(firebaseConfig);
export default db;