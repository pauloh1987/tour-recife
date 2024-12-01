import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, FlatList, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { db } from './firebaseConfig';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';

export default function DetalhesScreen() {
  const route = useRoute();
  const { spotId } = route.params;

  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);

  const touristSpots = [
    {
      id: 1,
      name: 'Praia de Boa Viagem',
      description: 'Uma das praias mais famosas do Recife, com águas mornas e recifes naturais.',
      address: 'Av. Boa Viagem, Boa Viagem, Recife - PE, 51011-000',
      latitude: -8.114217,
      longitude: -34.903281,
      category: 'Praia',
      image: require('./assets/boa-viagem.png'),
      moreInfo: 'A Praia de Boa Viagem é perfeita para relaxamento, esportes ou passeios.',
    },
    {
      id: 2,
      name: 'Instituto Ricardo Brennand',
      description: 'Um dos maiores museus do Brasil, com acervo impressionante de arte e armas medievais.',
      address: 'Alameda Antônio Brennand, Várzea, Recife - PE, 50741-904',
      latitude: -8.047562,
      longitude: -34.978162,
      category: 'Museu',
      image: require('./assets/instituto-ricardo-brennand.png'),
      moreInfo: 'Inclui museu, pinacoteca e belos jardins com arquitetura medieval.',
    },
    {
      id: 3,
      name: 'Paço do Frevo',
      description: 'Espaço cultural dedicado ao frevo, patrimônio imaterial da humanidade.',
      address: 'Praça do Arsenal da Marinha, Recife Antigo, Recife - PE, 50030-360',
      latitude: -8.062017,
      longitude: -34.871080,
      category: 'Museu',
      image: require('./assets/paco-do-frevo.png'),
      moreInfo: 'O Paço do Frevo celebra a história do frevo com exposições e oficinas.',
    },
    {
      id: 4,
      name: 'Shopping RioMar',
      description: 'Um dos maiores e mais modernos shoppings do Recife, com diversas lojas, restaurantes e cinema.',
      address: 'Av. República do Líbano, 2510, Pina, Recife - PE, 51110-160',
      latitude: -8.084913,
      longitude: -34.894073,
      category: 'Shoppings',
      image: require('./assets/shopping-riomar.png'),
      moreInfo: 'O RioMar oferece variedade de lojas, gastronomia e cinemas de última geração.',
    },
    {
      id: 5,
      name: 'Parque da Jaqueira',
      description: 'Um dos maiores parques urbanos do Recife, ideal para atividades ao ar livre.',
      address: 'R. do Futuro, 959, Graças, Recife - PE, 52050-010',
      latitude: -8.039784,
      longitude: -34.898899,
      category: 'Parques',
      image: require('./assets/parque-da-jaqueira.png'),
      moreInfo: 'O parque possui quadras poliesportivas, playgrounds e áreas para piqueniques.',
    },
    {
      id: 6,
      name: 'Marco Zero',
      description: 'O marco inicial da cidade de Recife, ponto turístico e cultural.',
      address: 'Praça Rio Branco, Recife Antigo, Recife - PE, 50030-310',
      latitude: -8.063173,
      longitude: -34.871140,
      category: 'Histórico',
      image: require('./assets/marco-zero.png'),
      moreInfo: 'O Marco Zero é o coração de Recife, repleto de cultura e história.',
    },
    {
      id: 7,
      name: 'Shopping Recife',
      description: 'Um dos maiores centros comerciais de Recife, com inúmeras lojas e praça de alimentação.',
      address: 'R. Padre Carapuceiro, 777, Boa Viagem, Recife - PE, 51020-280',
      latitude: -8.112005,
      longitude: -34.894401,
      category: 'Shoppings',
      image: require('./assets/shopping-recife.png'),
      moreInfo: 'O Shopping Recife oferece lojas, cinemas e eventos frequentes.',
    },
  ];

  const spot = touristSpots.find((item) => item.id === spotId);

  useEffect(() => {
    const feedbackQuery = query(collection(db, 'feedbacks'), where('spotId', '==', spotId));

    const unsubscribe = onSnapshot(feedbackQuery, (snapshot) => {
      const loadedFeedbacks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeedbacks(loadedFeedbacks);
    });

    return () => unsubscribe();
  }, [spotId]);

  const handleSendFeedback = async () => {
    if (feedback.trim()) {
      try {
        await addDoc(collection(db, 'feedbacks'), {
          spotId,
          text: feedback,
          timestamp: new Date(),
        });
        setFeedback('');
        setIsFeedbackModalVisible(false);
      } catch (error) {
        console.error('Erro ao enviar feedback:', error);
      }
    }
  };

  const openMaps = () => {
    const url = `https://www.google.com/maps?q=${spot.latitude},${spot.longitude}`;
    Linking.openURL(url).catch((err) => console.error('Erro ao abrir Google Maps: ', err));
  };

  if (!spot) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Local não encontrado!</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={spot.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{spot.name}</Text>
        <Text style={styles.description}>{spot.description}</Text>
        <Text style={styles.address}>{spot.address}</Text>
        <Text style={styles.category}>Categoria: {spot.category}</Text>

        <View style={styles.moreInfoContainer}>
          <Text style={styles.moreInfoTitle}>Mais Informações:</Text>
          <Text style={styles.moreInfoText}>{spot.moreInfo}</Text>
        </View>

        <TouchableOpacity style={styles.mapButton} onPress={openMaps}>
          <Text style={styles.mapButtonText}>Como Chegar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.feedbackButton} onPress={() => setIsFeedbackModalVisible(true)}>
          <Text style={styles.feedbackButtonText}>Dar Feedback</Text>
        </TouchableOpacity>

        <View style={styles.feedbacksContainer}>
          <Text style={styles.feedbacksTitle}>Feedbacks dos Usuários:</Text>
          {feedbacks.length === 0 ? (
            <Text style={styles.noFeedbacksText}>Ainda não há feedbacks para este local.</Text>
          ) : (
            <FlatList
              data={feedbacks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.feedbackItem}>
                  <Text style={styles.feedbackText}>{item.text}</Text>
                </View>
              )}
            />
          )}
        </View>
      </View>

      <Modal
        visible={isFeedbackModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsFeedbackModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Deixe seu Feedback</Text>
            <TextInput
              style={styles.feedbackInput}
              placeholder="Digite seu feedback"
              value={feedback}
              onChangeText={setFeedback}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendFeedback}>
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sendButton, { backgroundColor: 'gray', marginTop: 10 }]}
              onPress={() => setIsFeedbackModalVisible(false)}
            >
              <Text style={styles.sendButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'justify',
    marginBottom: 10,
  },
  address: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 15,
  },
  moreInfoContainer: {
    marginTop: 10,
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 10,
  },
  moreInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  moreInfoText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'justify',
  },
  mapButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedbackButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  feedbackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedbacksContainer: {
    marginTop: 20,
  },
  feedbacksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noFeedbacksText: {
    fontSize: 14,
    color: '#666',
  },
  feedbackItem: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  feedbackText: {
    fontSize: 14,
    color: '#333',
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
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
