import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function DetalhesScreen() {
  const route = useRoute();
  const { spotId } = route.params;

  const touristSpots = [
    {
      id: 1,
      name: 'Praia de Boa Viagem',
      description: 'Uma das praias mais famosas do Recife. Com águas mornas, recifes naturais e um grande calçadão, é o lugar ideal para lazer e relaxamento.',
      address: 'Av. Boa Viagem, Boa Viagem, Recife - PE, 51011-000',
      latitude: -8.114217,
      longitude: -34.903281,
      category: 'Praia',
      image: require('./assets/boa-viagem.png'),
      moreInfo: 'A Praia de Boa Viagem é uma das mais conhecidas do Brasil, com recifes de corais que formam piscinas naturais em suas águas claras. É um ótimo ponto para caminhar, praticar esportes ou apenas descansar.',
    },
    {
      id: 2,
      name: 'Instituto Ricardo Brennand',
      description: 'Um dos maiores museus de arte do Brasil, com um acervo impressionante que vai desde armas medievais até pinturas de grandes mestres da história.',
      address: 'Alameda Antônio Brennand, Várzea, Recife - PE, 50741-904',
      latitude: -8.047562,
      longitude: -34.978162,
      category: 'Museu',
      image: require('./assets/instituto-ricardo-brennand.png'),
      moreInfo: 'O Instituto Ricardo Brennand é um complexo cultural que inclui um museu de arte, uma pinacoteca e uma vasta coleção de armas medievais. O espaço também conta com um belíssimo jardim e arquitetura medieval.',
    },
    {
      id: 3,
      name: 'Paço do Frevo',
      description: 'Espaço cultural dedicado ao frevo, patrimônio imaterial da humanidade, onde você pode aprender mais sobre a dança e a música que definem a cultura pernambucana.',
      address: 'Praça do Arsenal da Marinha, Recife Antigo, Recife - PE, 50030-360',
      latitude: -8.062017,
      longitude: -34.871080,
      category: 'Museu',
      image: require('./assets/paco-do-frevo.png'),
      moreInfo: 'O Paço do Frevo é um centro cultural onde a história do frevo, ritmo tradicional de Pernambuco, é celebrada. O local conta com exposições, apresentações e oficinas sobre o famoso gênero musical e sua dança.',
    },
    {
      id: 4,
      name: 'Shopping RioMar',
      description: 'Um dos maiores e mais modernos shoppings do Recife, com diversas lojas, restaurantes, cinema e opções de entretenimento.',
      address: 'Av. República do Líbano, 2510, Pina, Recife - PE, 51110-160',
      latitude: -8.084913,
      longitude: -34.894073,
      category: 'Shoppings',
      image: require('./assets/shopping-riomar.png'),
      moreInfo: 'O Shopping RioMar é conhecido por sua grande variedade de lojas de marcas nacionais e internacionais, além de um diversificado centro gastronômico e cinemas de última geração.',
    },
    {
      id: 5,
      name: 'Parque da Jaqueira',
      description: 'Um dos maiores parques urbanos do Recife, ideal para caminhadas, piqueniques e atividades ao ar livre.',
      address: 'R. do Futuro, 959, Graças, Recife - PE, 52050-010',
      latitude: -8.039784,
      longitude: -34.898899,
      category: 'Parques',
      image: require('./assets/parque-da-jaqueira.png'),
      moreInfo: 'O Parque da Jaqueira é um espaço verde no coração do Recife, muito procurado para atividades esportivas, caminhadas e passeios ao ar livre. Ele possui quadras poliesportivas, playgrounds e áreas para piqueniques.',
    },
    {
      id: 6,
      name: 'Marco Zero',
      description: 'O marco inicial da cidade de Recife, ponto turístico e cultural, com vista para o Porto do Recife e várias esculturas no local.',
      address: 'Praça Rio Branco, Recife Antigo, Recife - PE, 50030-310',
      latitude: -8.063173,
      longitude: -34.871140,
      category: 'Histórico',
      image: require('./assets/marco-zero.png'),
      moreInfo: 'O Marco Zero é considerado o coração de Recife, de onde a cidade foi fundada. A área ao redor é repleta de cultura, arte e história, além de oferecer uma bela vista do Porto e do Rio Capibaribe.',
    },
    {
      id: 7,
      name: 'Shopping Recife',
      description: 'Um dos maiores centros comerciais de Recife, com inúmeras lojas, praça de alimentação e eventos frequentes.',
      address: 'R. Padre Carapuceiro, 777, Boa Viagem, Recife - PE, 51020-280',
      latitude: -8.112005,
      longitude: -34.894401,
      category: 'Shoppings',
      image: require('./assets/shopping-recife.png'),
      moreInfo: 'O Shopping Recife é um dos maiores e mais completos shoppings da cidade, com uma grande variedade de lojas, cinemas, praças de alimentação e eventos. Além disso, conta com uma arquitetura moderna e áreas de lazer.',
    },
  ];

  const spot = touristSpots.find((item) => item.id === spotId);

  if (!spot) {
    return (
      <View style={styles.container}>
        <Text>Local não encontrado!</Text>
      </View>
    );
  }

  // Função para abrir o Google Maps com coordenadas específicas
  const openMaps = () => {
    const url = `https://www.google.com/maps?q=${spot.latitude},${spot.longitude}`;
    Linking.openURL(url).catch((err) => console.error('Erro ao abrir Google Maps: ', err));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={spot.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{spot.name}</Text>
        <Text style={styles.description}>{spot.description}</Text>
        <Text style={styles.address}>{spot.address}</Text>
        <Text style={styles.category}>Categoria: {spot.category}</Text>

        {/* Informações adicionais sobre o local */}
        <View style={styles.moreInfoContainer}>
          <Text style={styles.moreInfoTitle}>Mais Informações:</Text>
          <Text style={styles.moreInfoText}>{spot.moreInfo}</Text>
        </View>

        {/* Botão para abrir o Google Maps */}
        <TouchableOpacity style={styles.mapButton} onPress={openMaps}>
          <Text style={styles.mapButtonText}>Como Chegar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  detailsContainer: {
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  address: {
    fontSize: 14,
    color: '#444',
    marginVertical: 5,
  },
  category: {
    fontSize: 14,
    color: '#888',
  },
  moreInfoContainer: {
    marginTop: 20,
  },
  moreInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  moreInfoText: {
    fontSize: 16,
    color: '#444',
    marginTop: 10, // Certifique-se de que esta vírgula está no final de um estilo anterior
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
});
