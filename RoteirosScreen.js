// RoteirosScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Picker,
} from 'react-native';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const RoteirosScreen = ({ navigation }) => {
  const [routes, setRoutes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryPoints, setCategoryPoints] = useState([]);

  const categoryData = {
    Praias: [
      { id: 1, name: 'Praia de Boa Viagem', spotId: 1 }, // Ajustei os spotId para inteiros
      { id: 2, name: 'Praia do Pina', spotId: 6 },
      { id: 3, name: 'Praia de Barra de Jangada', spotId: 7 },
    ],
    Natureza: [
      { id: 1, name: 'Parque da Jaqueira', spotId: 5 },
      { id: 2, name: 'Parque do Cordeiro', spotId: 8 },
      { id: 3, name: 'Reserva do Paiva', spotId: 9 },
    ],
    Histórico: [
      { id: 1, name: 'Marco Zero', spotId: 6 },
      { id: 2, name: 'Museu do Frevo', spotId: 3 },
      { id: 3, name: 'Palácio do Campo das Princesas', spotId: 10 },
    ],
  };

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

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setCategoryPoints(categoryData[category] || []);
  };

  useEffect(() => {
    fetchSuggestedRoutes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Roteiros Sugeridos</Text>

      <Picker
        selectedValue={selectedCategory}
        style={styles.picker}
        onValueChange={(itemValue) => handleCategorySelection(itemValue)}
      >
        <Picker.Item label="Selecione uma Categoria" value="" />
        <Picker.Item label="Praias" value="Praias" />
        <Picker.Item label="Natureza" value="Natureza" />
        <Picker.Item label="Histórico" value="Histórico" />
      </Picker>

      {categoryPoints.length > 0 && (
        <View style={styles.pointsContainer}>
          <Text style={styles.subTitle}>Pontos Sugeridos</Text>
          {categoryPoints.map((point) => (
            <TouchableOpacity
              key={point.id}
              style={styles.routeItem}
              onPress={() =>
                navigation.navigate('Detalhes', { spotId: point.spotId }) // spotId atualizado
              }
            >
              <Text style={styles.routeName}>{point.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.routeItem}
            onPress={() => handleCategorySelection(item.name)}
          >
            <Text style={styles.routeName}>{item.name}</Text>
            <Text style={styles.routeDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
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
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
  },
  routeItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
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
    color: '#333',
  },
  routeDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  pointsContainer: {
    marginTop: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default RoteirosScreen;
