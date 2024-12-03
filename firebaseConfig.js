import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, updateDoc, collection, getDocs, arrayUnion } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Certifique-se de incluir isso

const firebaseConfig = {
  apiKey: "AIzaSyBnl_z9y4bVsaH6V7EDHIQxUGC--A8Qn_M",
  authDomain: "tour-recife.firebaseapp.com",
  projectId: "tour-recife",
  storageBucket: "tour-recife.appspot.com", // Correção do erro no bucket
  messagingSenderId: "130813320192",
  appId: "1:130813320192:web:0e4f7717556cc58a5a8ce5",
  measurementId: "G-ZNWTFCDD9N",
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase App Initialized:', app); 

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Inicializando o storage

export { auth, db, storage };

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

// Função para upload da imagem de perfil
export const uploadProfileImage = async (userId, fileUri) => {
  try {
    const response = await fetch(fileUri); // Converte URI para Blob
    const blob = await response.blob();

    const storageRef = ref(storage, `profileImages/${userId}`);
    await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);
    console.log('Imagem enviada com sucesso:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    throw new Error('Erro ao enviar a imagem. Tente novamente.');
  }
};
