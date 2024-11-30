import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { auth } from './firebaseConfig'; // Importa o Firebase Auth
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const db = getFirestore(); // Instancia o Firestore

export default function PerfilScreen() {
  const [visitedPlaces, setVisitedPlaces] = useState([]);

  useEffect(() => {
    const fetchVisitedPlaces = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid); // Documento do usuário no Firestore
        const userDoc = await getDoc(userRef); // Pega os dados do usuário

        if (userDoc.exists()) {
          setVisitedPlaces(userDoc.data().visitedPlaces || []);
        }
      }
    };

    fetchVisitedPlaces();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <Text style={styles.subtitle}>Locais Visitados:</Text>

      {visitedPlaces.length > 0 ? (
        <FlatList
          data={visitedPlaces}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.placeItem}>
              <Text style={styles.placeName}>{item}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noPlaces}>Nenhum local visitado ainda.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placeItem: {
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
  },
  placeName: {
    fontSize: 16,
  },
  noPlaces: {
    fontSize: 16,
    color: 'gray',
  },
});
