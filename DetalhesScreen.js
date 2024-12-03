import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Linking,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { db, auth } from './firebaseConfig';
import { collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';

export default function DetalhesScreen() {
  const route = useRoute();
  const { spotId } = route.params;  // Recebendo spotId via navegação

  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [spot, setSpot] = useState(null);  // Detalhes do ponto turístico

  // Lista de todos os pontos turísticos
  const touristSpots = [
    { id: 1, name: 'Praia de Boa Viagem', description: 'Uma das praias mais famosas do Recife, com águas mornas e recifes naturais.', address: 'Av. Boa Viagem, Boa Viagem, Recife - PE, 51011-000', latitude: -8.114217, longitude: -34.903281, category: 'Praia', image: require('./assets/boa-viagem.png'), moreInfo: 'Perfeita para relaxar, praticar esportes e aproveitar o calçadão.' },
    { id: 2, name: 'Instituto Ricardo Brennand', description: 'Museu renomado com vasto acervo de arte e armas medievais.', address: 'Alameda Antônio Brennand, Várzea, Recife - PE, 50741-904', latitude: -8.047562, longitude: -34.978162, category: 'Museu', image: require('./assets/instituto-ricardo-brennand.png'), moreInfo: 'Conta com jardins impressionantes e exposições permanentes.' },
    { id: 3, name: 'Paço do Frevo', description: 'Espaço cultural dedicado ao frevo, patrimônio imaterial da humanidade.', address: 'Praça do Arsenal da Marinha, Recife Antigo, Recife - PE, 50030-360', latitude: -8.062017, longitude: -34.871080, category: 'Museu', image: require('./assets/paco-do-frevo.png'), moreInfo: 'Um mergulho na história do frevo com oficinas interativas.' },
    { id: 4, name: 'Shopping RioMar', description: 'Moderno centro comercial com opções variadas de lazer.', address: 'Av. República do Líbano, 2510, Pina, Recife - PE, 51110-160', latitude: -8.084913, longitude: -34.894073, category: 'Shoppings', image: require('./assets/shopping-riomar.png'), moreInfo: 'Inclui lojas, restaurantes e cinemas de última geração.' },
    { id: 5, name: 'Parque da Jaqueira', description: 'Um dos maiores parques urbanos do Recife.', address: 'R. do Futuro, 959, Graças, Recife - PE, 52050-010', latitude: -8.039784, longitude: -34.898899, category: 'Parques', image: require('./assets/parque-da-jaqueira.png'), moreInfo: 'Ideal para atividades ao ar livre e piqueniques.' },
    { id: 6, name: 'Marco Zero', description: 'Ponto inicial e coração cultural do Recife.', address: 'Praça Rio Branco, Recife Antigo, Recife - PE, 50030-310', latitude: -8.063173, longitude: -34.871140, category: 'Histórico', image: require('./assets/marco-zero.png'), moreInfo: 'Conheça as famosas esculturas e aprecie a vista do porto.' },
    { id: 7, name: 'Shopping Recife', description: 'Grande shopping center com lojas e entretenimento.', address: 'R. Padre Carapuceiro, 777, Boa Viagem, Recife - PE, 51020-280', latitude: -8.112005, longitude: -34.894401, category: 'Shoppings', image: require('./assets/shopping-recife.png'), moreInfo: 'Oferece eventos culturais e espaço kids.' },
    { id: 8, name: 'Museu Cais do Sertão', description: 'Museu moderno sobre o sertão nordestino.', address: 'Av. Alfredo Lisboa, Recife Antigo, Recife - PE, 50030-150', latitude: -8.062506, longitude: -34.870977, category: 'Museu', image: require('./assets/cais-do-sertao.png'), moreInfo: 'Um passeio cultural e interativo pelo universo sertanejo.' },
    { id: 9, name: 'Casa da Cultura', description: 'Antiga prisão transformada em centro cultural.', address: 'R. Floriano Peixoto, São José, Recife - PE, 50020-060', latitude: -8.065624, longitude: -34.877051, category: 'Histórico', image: require('./assets/casa-da-cultura.png'), moreInfo: 'Venda de artesanato e eventos culturais frequentes.' },
    { id: 10, name: 'Jardim Botânico do Recife', description: 'Área verde para educação ambiental e lazer.', address: 'BR-101, Curado, Recife - PE, 50791-540', latitude: -8.072165, longitude: -34.982872, category: 'Natureza', image: require('./assets/jardim-botanico.png'), moreInfo: 'Ideal para trilhas e observação da flora local.' },
    { id: 11, name: 'Parque Dona Lindu', description: 'Parque com projeto de Oscar Niemeyer.', address: 'Av. Boa Viagem, Boa Viagem, Recife - PE, 51030-000', latitude: -8.125587, longitude: -34.900826, category: 'Parques', image: require('./assets/parque-dona-lindu.png'), moreInfo: 'Espaço para shows, exposições e lazer.' },
    { id: 12, name: 'Basílica de Nossa Senhora do Carmo', description: 'Igreja histórica com arquitetura barroca.', address: 'Av. Dantas Barreto, Santo Antônio, Recife - PE, 50020-080', latitude: -8.063994, longitude: -34.876394, category: 'Histórico', image: require('./assets/basilica-do-carmo.png'), moreInfo: 'Aberta para visitas e missas regulares.' },
    { id: 13, name: 'Capela Dourada', description: 'Capela com impressionantes talhas em ouro.', address: 'R. do Imperador Dom Pedro II, Santo Antônio, Recife - PE, 50010-240', latitude: -8.064856, longitude: -34.876633, category: 'Histórico', image: require('./assets/capela-dourada.png'), moreInfo: 'Um exemplo da arte barroca no Brasil.' },
    { id: 14, name: 'Parque de Santana', description: 'Parque para esportes e lazer, com quadras e ciclovias.', address: 'Rua Jorge Gomes, Santana, Recife - PE, 52060-500', latitude: -8.025661, longitude: -34.905847, category: 'Parques', image: require('./assets/parque-de-santana.png'), moreInfo: 'Frequentado por famílias e esportistas locais.' },
    { id: 15, name: 'Mercado de São José', description: 'Mercado tradicional com artesanato e comidas típicas.', address: 'Praça Dom Vital, São José, Recife - PE, 50020-540', latitude: -8.066934, longitude: -34.877238, category: 'Histórico', image: require('./assets/mercado-de-sao-jose.png'), moreInfo: 'Ótimo para souvenirs e delícias locais.' },
    { id: 16, name: 'Praia do Pina', description: 'Praia urbana tranquila e próxima ao centro.', address: 'Av. Boa Viagem, Pina, Recife - PE, 51011-000', latitude: -8.083435, longitude: -34.899484, category: 'Praia', image: require('./assets/praia-do-pina.png'), moreInfo: 'Perfeita para um dia relaxante.' },
    { id: 17, name: 'Igreja Madre de Deus', description: 'Igreja barroca do século XVII.', address: 'R. Madre de Deus, Recife Antigo, Recife - PE, 50030-070', latitude: -8.063418, longitude: -34.871808, category: 'Histórico', image: require('./assets/igreja-madre-de-deus.png'), moreInfo: 'Atração histórica e religiosa imperdível.' },
    { id: 18, name: 'Rua do Bom Jesus', description: 'Rua icônica com sinagogas e edifícios coloridos.', address: 'Recife Antigo, Recife - PE, 50030-090', latitude: -8.062732, longitude: -34.871153, category: 'Histórico', image: require('./assets/rua-do-bom-jesus.png'), moreInfo: 'Lar da primeira sinagoga das Américas.' },
    { id: 19, name: 'Forte das Cinco Pontas', description: 'Fortaleza histórica com museu sobre o Recife.', address: 'Praça das Cinco Pontas, São José, Recife - PE, 50020-100', latitude: -8.075064, longitude: -34.876013, category: 'Histórico', image: require('./assets/forte-cinco-pontas.png'), moreInfo: 'O forte abriga um museu que conta a história do Recife.' },
    { id: 20, name: 'Praça do Arsenal', description: 'Praça no Recife Antigo com bares e eventos.', address: 'Recife Antigo, Recife - PE, 50030-360', latitude: -8.061768, longitude: -34.871584, category: 'Histórico', image: require('./assets/praca-do-arsenal.png'), moreInfo: 'Ponto de encontro cultural com eventos ao ar livre.' },
    { id: 21, name: 'Torre Malakoff', description: 'Antigo observatório astronômico.', address: 'Praça do Arsenal, Recife Antigo, Recife - PE, 50030-360', latitude: -8.062589, longitude: -34.870994, category: 'Histórico', image: require('./assets/torre-malakoff.png'), moreInfo: 'Hoje é um espaço cultural para exposições e shows.' },
    { id: 22, name: 'Cinema São Luiz', description: 'Cine-teatro com arquitetura clássica.', address: 'Rua da Aurora, Boa Vista, Recife - PE, 50050-000', latitude: -8.063519, longitude: -34.881037, category: 'Histórico', image: require('./assets/cinema-sao-luiz.png'), moreInfo: 'Preserva a arquitetura e oferece uma experiência única.' },
    { id: 23, name: 'Memorial Chico Science', description: 'Homenagem ao líder do Manguebeat.', address: 'Recife Antigo, Recife - PE, 50030-360', latitude: -8.061112, longitude: -34.870960, category: 'Museu', image: require('./assets/memorial-chico-science.png'), moreInfo: 'Celebra a música e o legado de Chico Science.' },
    { id: 24, name: 'Passeio de Catamarã', description: 'Passeio de barco pelos rios do Recife.', address: 'Cais das Cinco Pontas, São José, Recife - PE, 50020-100', latitude: -8.064045, longitude: -34.873789, category: 'Natureza', image: require('./assets/catamara.png'), moreInfo: 'Oferece vistas deslumbrantes da cidade e suas pontes.' },
  ];

  useEffect(() => {
    // Encontrar o ponto turístico correspondente ao spotId
    const foundSpot = touristSpots.find((item) => item.id === spotId);
    if (foundSpot) {
      setSpot(foundSpot);
    } else {
      Alert.alert('Erro', 'Local não encontrado!');
    }

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

  // Função para enviar feedback ao Firebase
  const handleSendFeedback = async () => {
    if (feedback.trim()) {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          const userName = userDoc.exists() ? userDoc.data().fullName || 'Usuário' : 'Usuário';

          await addDoc(collection(db, 'feedbacks'), {
            spotId,
            text: feedback,
            rating,
            timestamp: new Date(),
            userName,
          });

          // Atualiza o histórico de lugares visitados do usuário
          await updateDoc(userRef, {
            visitedPlaces: arrayUnion(spot.name),
          });

          setFeedback('');
          setRating(0);
          setIsFeedbackModalVisible(false);
        }
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
                  <Text style={styles.feedbackUserName}>{item.userName || 'Anônimo'}</Text>
                  <Text style={styles.feedbackRating}>Avaliação: {item.rating || 'Não avaliado'} ★</Text>
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
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <MaterialIcons
                    name="star"
                    size={40}
                    color={star <= rating ? '#FFD700' : '#ccc'}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.sendButton} onPress={handleSendFeedback}>
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cancelButton]}
              onPress={() => setIsFeedbackModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
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
    backgroundColor: '#f4f4f4',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'justify',
  },
  address: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  mapButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedbackButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
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
  feedbackItem: {
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  feedbackUserName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
  },
  feedbackRating: {
    fontSize: 14,
    color: '#FFD700',
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
    borderRadius: 10,
    padding: 20,
    width: '90%',
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
    borderRadius: 8,
    width: '100%',
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
