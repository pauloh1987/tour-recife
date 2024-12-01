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

export const createUserProfile = async (userId, name) => {
  try {
    await db.collection('users').doc(userId).set({
      name,
      visitedPlaces: [],
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
  }
};

export const addVisitedPlace = async (userId, place) => {
  try {
    const userRef = db.collection('users').doc(userId);
    await userRef.update({
      visitedPlaces: firebase.firestore.FieldValue.arrayUnion(place),
    });
  } catch (error) {
    console.error('Error adding visited place:', error);
  }
};

export const fetchUsers = async () => {
  try {
    const snapshot = await db.collection('users').get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export default firebase;