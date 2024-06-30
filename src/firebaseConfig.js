import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyBWDuA_j15gKTwOXqkZZQ0stWZETeZFydg",
//     authDomain: "placementportal-32ced.firebaseapp.com",
//     databaseURL: "https://placementportal-32ced-default-rtdb.firebaseio.com/",
//     projectId: "placementportal-32ced",
//     storageBucket: "placementportal-32ced.appspot.com",
//     messagingSenderId: "397452433558",
//     appId: "1:397452433558:web:ac46af213c36af57220ab7"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAQCEFMHkqF2XQpN9RNbjtP1XwmiNQs9qY",
  authDomain: "iet-placement-portal.firebaseapp.com",
  databaseURL: "https://iet-placement-portal-default-rtdb.firebaseio.com/",
  projectId: "iet-placement-portal",
  storageBucket: "iet-placement-portal.appspot.com",
  messagingSenderId: "1094339849319",
  appId: "1:1094339849319:web:5683e200c93644234b78c2",
  measurementId: "G-K6E4SVJLNE",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
export { database, auth };
