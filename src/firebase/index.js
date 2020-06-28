import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBdvwijPdki7QCJMQRo4cDGc3PbKhYpD-E",
  authDomain: "trulysgallery.firebaseapp.com",
  databaseURL: "https://trulysgallery.firebaseio.com",
  projectId: "trulysgallery",
  storageBucket: "trulysgallery.appspot.com",
  messagingSenderId: "1045878221930",
  appId: "1:1045878221930:web:6010a3973ac39b371a2e13",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
