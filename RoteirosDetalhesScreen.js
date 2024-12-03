import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function RoteiroDetalhesScreen() {
  const route = useRoute();
  const { routeId } = route.params;

  const [routeDetails, setRouteDetails] = useState(null);

  useEffect(() => {
    const fetchRouteDetails = async () => {
      try {
        const routeRef = doc(db, 'suggestedRoutes', routeId);
        const routeDoc = await getDoc(routeRef);
        if (routeDoc.exists()) {
          setRouteDetails(routeDoc.data());
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do roteiro:', error);
      }
    };

    fetchRouteDetails();
  }, [routeId]);

  if (!routeDetails) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{routeDetails.name}</Text>
      <Text style={styles.description}>{routeDetails.description}</Text>
      <Text style={styles.pointsTitle}>Pontos do Roteiro:</Text>
      <FlatList
        data={routeDetails.points}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.point}>{item}</Text>}
      />
      <TouchableOpacity style={styles.button} onPress={() => console.log('Iniciar o roteiro')}>
        <Text style={styles.buttonText}>Iniciar Roteiro</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  pointsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  point: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
