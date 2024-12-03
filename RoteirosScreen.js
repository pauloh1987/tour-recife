import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { db } from './firebaseConfig'; // Ajuste o caminho conforme seu projeto
import { collection, getDocs } from 'firebase/firestore';

const RoteirosScreen = () => {
  const [routes, setRoutes] = useState([]);

  // Função para buscar roteiros sugeridos do Firestore
  const fetchSuggestedRoutes = async () => {
    try {
      const routesCollection = collection(db, 'suggestedRoutes');
      const querySnapshot = await getDocs(routesCollection);
      const routesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRoutes(routesData);
    } catch (error) {
      console.error('Erro ao buscar roteiros:', error);
      Alert.alert('Erro', 'Não foi possível carregar os roteiros sugeridos.');
    }
  };

  // Carrega os roteiros ao abrir a tela
  useEffect(() => {
    fetchSuggestedRoutes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Roteiros Sugeridos</Text>
      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.routeItem}
            onPress={() => Alert.alert('Roteiro Selecionado', `Você escolheu o roteiro: ${item.name}`)}
          >
            <Text style={styles.routeName}>{item.name}</Text>
            <Text style={styles.routeDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.createButton} onPress={fetchSuggestedRoutes}>
        <Text style={styles.createButtonText}>Ver Roteiros</Text>
      </TouchableOpacity>
      {/* Adicionando o botão para criar roteiro */}
      <TouchableOpacity style={styles.createRouteButton} onPress={() => Alert.alert('Criar Roteiro')}>
        <Text style={styles.createRouteButtonText}>Criar Novo Roteiro</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  routeItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  routeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  routeDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  createButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createRouteButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  createRouteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RoteirosScreen;
