import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Firestore, se for necessário

const firebaseConfig = {
  apiKey: "AIzaSyBnl_z9y4bVsaH6V7EDHIQxUGC--A8Qn_M",
  authDomain: "tour-recife.firebaseapp.com",
  projectId: "tour-recife",
  storageBucket: "tour-recife.firebasestorage.app",
  messagingSenderId: "130813320192",
  appId: "1:130813320192:web:0e4f7717556cc58a5a8ce5",
  measurementId: "G-ZNWTFCDD9N"
};

// Inicialização do Firebase para Web
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app); // Firestore, se necessário

export { auth, db }; // Exporta para ser utilizado em outras partes
