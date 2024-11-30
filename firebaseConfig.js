// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

// Suas credenciais do Firebase (copiadas do Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBnl_z9y4bVsaH6V7EDHIQxUGC--A8Qn_M",
  authDomain: "tour-recife.firebaseapp.com",
  projectId: "tour-recife",
  storageBucket: "tour-recife.firebasestorage.app",
  messagingSenderId: "130813320192",
  appId: "1:130813320192:web:0e4f7717556cc58a5a8ce5",
  measurementId: "G-ZNWTFCDD9N"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Inicialize a autenticação e o banco de dados
const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app); // Firebase Firestore

export { auth, database };
