// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import { 
    getFirestore 
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "trip-planner-a1dd7.firebaseapp.com",
    projectId: "trip-planner-a1dd7",
    storageBucket: "trip-planner-a1dd7.firebasestorage.app",
    messagingSenderId: "193019127185",
    appId: "SEU_APP_ID"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);


export { db };