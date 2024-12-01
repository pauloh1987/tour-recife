import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, updateDoc, collection, getDocs, arrayUnion } from 'firebase/firestore'; 


const firebaseConfig = {
  apiKey: "AIzaSyBnl_z9y4bVsaH6V7EDHIQxUGC--A8Qn_M",
  authDomain: "tour-recife.firebaseapp.com",
  projectId: "tour-recife",
  storageBucket: "tour-recife.firebasestorage.app", // Corrigido
  messagingSenderId: "130813320192",
  appId: "1:130813320192:web:0e4f7717556cc58a5a8ce5",
  measurementId: "G-ZNWTFCDD9N"
};

// Inicialização do Firebase para Web
const app = initializeApp(firebaseConfig);

console.log('Firebase App Initialized:', app);  // Verifica se o Firebase foi inicializado corretamente


const auth = getAuth(app);
const db = getFirestore(app); // Firestore, se necessário

export { auth, db };

// Função para criar o perfil de usuário
export const createUserProfile = async (userId, name) => {
  try {
    await setDoc(doc(db, "users", userId), { name, visitedPlaces: [] });
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
};

// Função para adicionar local visitado ao usuário
export const addVisitedPlace = async (userId, place) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      visitedPlaces: arrayUnion(place),
    });
  } catch (error) {
    console.error("Error adding visited place:", error);
  }
};

// Função para buscar todos os usuários
// export const fetchUsers = async 
