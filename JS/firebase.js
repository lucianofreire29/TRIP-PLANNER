
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import { 
    getFirestore 
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKMoBZKtW3Mx4whlLTPASg9ql-doKTj0E",
  authDomain: "trip-planner-a1dd7.firebaseapp.com",
  projectId: "trip-planner-a1dd7",
  storageBucket: "trip-planner-a1dd7.firebasestorage.app",
  messagingSenderId: "193019127185",
  appId: "1:193019127185:web:d6cfce57e0e9387d56e630",
  measurementId: "G-VM8Q8K12VK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };