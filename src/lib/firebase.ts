import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAiHI761iwpNC--PPpViCfM3hLayo_HfKc",
    authDomain: "override-shops.firebaseapp.com",
    projectId: "override-shops",
    storageBucket: "override-shops.firebasestorage.app",
    messagingSenderId: "960396045126",
    appId: "1:960396045126:web:2ea11a43a8133268481347",
    measurementId: "G-T61ETT4EYD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
