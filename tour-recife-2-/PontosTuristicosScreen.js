import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';

export default function PontosTuristicosScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const touristSpots = [
    {
      id: 1,
      name: 'Praia de Boa Viagem',
      description: 'Uma das praias mais famosas do Recife.',
      image: require('./assets/boa-viagem.png'),
      category: 'Praia',
    },
    {
      id: 2,
      name: 'Instituto Ricardo Brennand',
      description: 'Um dos maiores museus de arte do Brasil.',
      image: require('./assets/instituto-ricardo-brennand.png'),
      category: 'Museu',
    },
    {
      id: 3,
      name: 'Paço do Frevo',
      description: 'Espaço cultural dedicado ao frevo, patrimônio imaterial da humanidade.',
      image: require('./assets/paco-do-frevo.png'),
      category: 'Museu',
    },
    {
      id: 4,
      name: 'Shopping RioMar',
      description: 'Um dos maiores e mais modernos shoppings do Recife.',
      image: require('./assets/shopping-riomar.png'),
      category: 'Shoppings',
    },
    {
      id: 5,
      name: 'Parque da Jaqueira',
      description: 'Um dos maiores parques urbanos da cidade.',
      image: require('./assets/parque-da-jaqueira.png'),
      category: 'Parques',
    },
    {
      id: 6,
      name: 'Marco Zero',
      description: 'O marco inicial da cidade e um ponto histórico importante.',
      image: require('./assets/marco-zero.png'),
      category: 'Histórico',
    },
    {
      id: 7,
      name: 'Shopping Recife',
      description: 'Um dos maiores shoppings de Recife, com muitas opções de lojas e restaurantes.',
      image: require('./assets/shopping-recife.png'),
      category: 'Shoppings',
    },
  ];

  const filteredSpots = selectedCategory
    ? touristSpots.filter((spot) => spot.category === selectedCategory)
    : touristSpots;

  return (
    <View style={styles.container}>
      {/* Botão para abrir o filtro */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.filterButtonText}>Filtrar</Text>
      </TouchableOpacity>

      {/* Modal do Filtro */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha uma categoria</Text>
            {['Praia', 'Museu', 'Parques', 'Histórico', 'Shoppings'].map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.modalOption}
                onPress={() => {
                  setSelectedCategory(category); // Atualiza a categoria selecionada
                  setIsModalVisible(false); // Fecha o modal após seleção
                }}
              >
                <Text style={styles.modalOptionText}>{category}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.modalOption, styles.modalOptionClear]}
              onPress={() => {
                setSelectedCategory(null);
                setIsModalVisible(false);
              }}
            >
              <Text style={styles.modalOptionText}>Limpar Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Lista de pontos turísticos filtrados */}
      <ScrollView>
        {filteredSpots.map((spot) => (
          <TouchableOpacity
            key={spot.id}
            style={styles.card}
            onPress={() => navigation.navigate('Detalhes', { spotId: spot.id })}
          >
            <Image source={spot.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{spot.name}</Text>
              <Text style={styles.description}>{spot.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  filterButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  filterButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalOptionText: {
    fontSize: 16,
  },
  modalOptionClear: {
    borderBottomWidth: 0,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    padding: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});
