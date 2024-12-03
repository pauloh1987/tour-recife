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
        <Text style={styles.filterButtonText}>Filtrar Locais</Text>
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
            <Text style={styles.modalTitle}>Escolha uma Categoria</Text>
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
    backgroundColor: '#f4f4f4',
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  filterButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  filterButtonText: {
    color: 'white',
    fontSize: 18,
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
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  modalOptionClear: {
    borderBottomWidth: 0,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
