import firebase from "firebase";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBKtMQ60P8CUBegnYL-YOIsf5AwBZ1GAWM",
  authDomain: "todoapp-cb4c8.firebaseapp.com",
  projectId: "todoapp-cb4c8",
  storageBucket: "todoapp-cb4c8.appspot.com",
  messagingSenderId: "1039946547471",
  appId: "1:1039946547471:web:8b85c3dd3459509e9f3e7a",
});

export default app;
