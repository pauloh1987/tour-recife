import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Picker, 
  ScrollView, 
  Image, 
  Button 
} from 'react-native';

// Dados dos pontos turísticos organizados por proximidade
const roteirosPorDias = {
  1: [
    {
      name: "Praia de Boa Viagem",
      description: "Uma das praias mais famosas de Recife, com águas mornas e recifes naturais.",
      address: 'Av. Boa Viagem, Boa Viagem, Recife - PE, 51011-000',
      latitude: -8.114217,
      longitude: -34.903281,
      category: 'Praia',
      image: require('./assets/boa-viagem.png'),
      moreInfo: 'Perfeita para relaxar, praticar esportes e aproveitar o calçadão.'
    },
    {
      name: "Marco Zero",
      description: "Ponto inicial e coração cultural do Recife.",
      address: 'Praça Rio Branco, Recife Antigo, Recife - PE, 50030-310',
      latitude: -8.063173,
      longitude: -34.871140,
      category: 'Histórico',
      image: require('./assets/marco-zero.png'),
      moreInfo: 'Conheça as famosas esculturas e aprecie a vista do porto.'
    },
  ],
  2: [
    {
      name: "Praia de Boa Viagem",
      description: "Uma das praias mais famosas de Recife, com águas mornas e recifes naturais.",
      address: 'Av. Boa Viagem, Boa Viagem, Recife - PE, 51011-000',
      latitude: -8.114217,
      longitude: -34.903281,
      category: 'Praia',
      image: require('./assets/boa-viagem.png'),
      moreInfo: 'Perfeita para relaxar, praticar esportes e aproveitar o calçadão.'
    },
    {
      name: "Marco Zero",
      description: "Ponto inicial e coração cultural do Recife.",
      address: 'Praça Rio Branco, Recife Antigo, Recife - PE, 50030-310',
      latitude: -8.063173,
      longitude: -34.871140,
      category: 'Histórico',
      image: require('./assets/marco-zero.png'),
      moreInfo: 'Conheça as famosas esculturas e aprecie a vista do porto.'
    },
    {
      name: "Paço do Frevo",
      description: "Espaço cultural dedicado ao frevo, patrimônio imaterial da humanidade.",
      address: 'Praça do Arsenal da Marinha, Recife Antigo, Recife - PE, 50030-360',
      latitude: -8.062017,
      longitude: -34.871080,
      category: 'Museu',
      image: require('./assets/paco-do-frevo.png'),
      moreInfo: 'Um mergulho na história do frevo com oficinas interativas.'
    },
  ],
  3: [
    {
      name: "Praia de Boa Viagem",
      description: "Uma das praias mais famosas de Recife, com águas mornas e recifes naturais.",
      address: 'Av. Boa Viagem, Boa Viagem, Recife - PE, 51011-000',
      latitude: -8.114217,
      longitude: -34.903281,
      category: 'Praia',
      image: require('./assets/boa-viagem.png'),
      moreInfo: 'Perfeita para relaxar, praticar esportes e aproveitar o calçadão.'
    },
    {
      name: "Marco Zero",
      description: "Ponto inicial e coração cultural do Recife.",
      address: 'Praça Rio Branco, Recife Antigo, Recife - PE, 50030-310',
      latitude: -8.063173,
      longitude: -34.871140,
      category: 'Histórico',
      image: require('./assets/marco-zero.png'),
      moreInfo: 'Conheça as famosas esculturas e aprecie a vista do porto.'
    },
    {
      name: "Paço do Frevo",
      description: "Espaço cultural dedicado ao frevo, patrimônio imaterial da humanidade.",
      address: 'Praça do Arsenal da Marinha, Recife Antigo, Recife - PE, 50030-360',
      latitude: -8.062017,
      longitude: -34.871080,
      category: 'Museu',
      image: require('./assets/paco-do-frevo.png'),
      moreInfo: 'Um mergulho na história do frevo com oficinas interativas.'
    },
    {
      name: "Rua do Bom Jesus",
      description: "Rua histórica com igrejas, lojas e um dos principais pontos turísticos de Recife Antigo.",
      address: 'Recife Antigo, Recife - PE, 50030-090',
      latitude: -8.062732,
      longitude: -34.871153,
      category: 'Histórico',
      image: require('./assets/rua-do-bom-jesus.png'),
      moreInfo: 'Lar da primeira sinagoga das Américas.'
    },
  ],
  4: [
    {
      name: "Praia de Boa Viagem",
      description: "Uma das praias mais famosas de Recife, com águas mornas e recifes naturais.",
      address: 'Av. Boa Viagem, Boa Viagem, Recife - PE, 51011-000',
      latitude: -8.114217,
      longitude: -34.903281,
      category: 'Praia',
      image: require('./assets/boa-viagem.png'),
      moreInfo: 'Perfeita para relaxar, praticar esportes e aproveitar o calçadão.'
    },
    {
      name: "Marco Zero",
      description: "Ponto inicial e coração cultural do Recife.",
      address: 'Praça Rio Branco, Recife Antigo, Recife - PE, 50030-310',
      latitude: -8.063173,
      longitude: -34.871140,
      category: 'Histórico',
      image: require('./assets/marco-zero.png'),
      moreInfo: 'Conheça as famosas esculturas e aprecie a vista do porto.'
    },
    {
      name: "Paço do Frevo",
      description: "Espaço cultural dedicado ao frevo, patrimônio imaterial da humanidade.",
      address: 'Praça do Arsenal da Marinha, Recife Antigo, Recife - PE, 50030-360',
      latitude: -8.062017,
      longitude: -34.871080,
      category: 'Museu',
      image: require('./assets/paco-do-frevo.png'),
      moreInfo: 'Um mergulho na história do frevo com oficinas interativas.'
    },
    {
      name: "Rua do Bom Jesus",
      description: "Rua histórica com igrejas, lojas e um dos principais pontos turísticos de Recife Antigo.",
      address: 'Recife Antigo, Recife - PE, 50030-090',
      latitude: -8.062732,
      longitude: -34.871153,
      category: 'Histórico',
      image: require('./assets/rua-do-bom-jesus.png'),
      moreInfo: 'Lar da primeira sinagoga das Américas.'
    },
    {
      name: "Shopping Recife",
      description: "Grande shopping center com lojas e entretenimento.",
      address: 'R. Padre Carapuceiro, 777, Boa Viagem, Recife - PE, 51020-280',
      latitude: -8.112005,
      longitude: -34.894401,
      category: 'Shoppings',
      image: require('./assets/shopping-recife.png'),
      moreInfo: 'Oferece eventos culturais e espaço kids.'
    },
  ],
  5: [
    // Adicione os pontos turísticos aqui, conforme os requisitos para 5 dias
  ],
  6: [
    // Adicione os pontos turísticos aqui, conforme os requisitos para 6 dias
  ],
  7: [
    {
      name: "Praia de Boa Viagem",
      description: "Uma das praias mais famosas de Recife, com águas mornas e recifes naturais.",
      address: 'Av. Boa Viagem, Boa Viagem, Recife - PE, 51011-000',
      latitude: -8.114217,
      longitude: -34.903281,
      category: 'Praia',
      image: require('./assets/boa-viagem.png'),
      moreInfo: 'Perfeita para relaxar, praticar esportes e aproveitar o calçadão.'
    },
    {
      name: "Marco Zero",
      description: "Ponto inicial e coração cultural do Recife.",
      address: 'Praça Rio Branco, Recife Antigo, Recife - PE, 50030-310',
      latitude: -8.063173,
      longitude: -34.871140,
      category: 'Histórico',
      image: require('./assets/marco-zero.png'),
      moreInfo: 'Conheça as famosas esculturas e aprecie a vista do porto.'
    },
    {
      name: "Paço do Frevo",
      description: "Espaço cultural dedicado ao frevo, patrimônio imaterial da humanidade.",
      address: 'Praça do Arsenal da Marinha, Recife Antigo, Recife - PE, 50030-360',
      latitude: -8.062017,
      longitude: -34.871080,
      category: 'Museu',
      image: require('./assets/paco-do-frevo.png'),
      moreInfo: 'Um mergulho na história do frevo com oficinas interativas.'
    },
    {
      name: "Rua do Bom Jesus",
      description: "Rua histórica com igrejas, lojas e um dos principais pontos turísticos de Recife Antigo.",
      address: 'Recife Antigo, Recife - PE, 50030-090',
      latitude: -8.062732,
      longitude: -34.871153,
      category: 'Histórico',
      image: require('./assets/rua-do-bom-jesus.png'),
      moreInfo: 'Lar da primeira sinagoga das Américas.'
    },
    {
      name: "Shopping Recife",
      description: "Grande shopping center com lojas e entretenimento.",
      address: 'R. Padre Carapuceiro, 777, Boa Viagem, Recife - PE, 51020-280',
      latitude: -8.112005,
      longitude: -34.894401,
      category: 'Shoppings',
      image: require('./assets/shopping-recife.png'),
      moreInfo: 'Oferece eventos culturais e espaço kids.'
    },
    {
      name: "Museu Cais do Sertão",
      description: "Museu moderno sobre o sertão nordestino.",
      address: 'Av. Alfredo Lisboa, Recife Antigo, Recife - PE, 50030-150',
      latitude: -8.062506,
      longitude: -34.870977,
      category: 'Museu',
      image: require('./assets/cais-do-sertao.png'),
      moreInfo: 'Um passeio cultural e interativo pelo universo sertanejo.'
    },
    {
      name: "Forte das Cinco Pontas",
      description: "Fortaleza histórica com museu sobre o Recife.",
      address: 'Praça das Cinco Pontas, São José, Recife - PE, 50020-100',
      latitude: -8.075064,
      longitude: -34.876013,
      category: 'Histórico',
      image: require('./assets/forte-cinco-pontas.png'),
      moreInfo: 'O forte abriga um museu que conta a história do Recife.'
    },
  ],
};

const RoteirosScreen = () => {
  const [dias, setDias] = useState(1);
  const [roteiro, setRoteiro] = useState(roteirosPorDias[1]);

  const handleDiasChange = (value) => {
    setDias(value);
    setRoteiro(roteirosPorDias[value]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Escolha o número de dias que você vai passar em Recife</Text>
      <Picker
        selectedValue={dias}
        onValueChange={handleDiasChange}
        style={styles.picker}
      >
        <Picker.Item label="1 Dia" value={1} />
        <Picker.Item label="2 Dias" value={2} />
        <Picker.Item label="3 Dias" value={3} />
        <Picker.Item label="4 Dias" value={4} />
        <Picker.Item label="5 Dias" value={5} />
        <Picker.Item label="6 Dias" value={6} />
        <Picker.Item label="7 Dias" value={7} />
      </Picker>

      <Text style={styles.subTitle}>Roteiro para {dias} {dias > 1 ? 'dias' : 'dia'}:</Text>

      <View style={styles.roteiroContainer}>
        {roteiro.map((item, index) => (
          <View key={index} style={styles.pontoContainer}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.pontoTitle}>{item.name}</Text>
            <Text style={styles.pontoDescription}>{item.description}</Text>
          </View>
        ))}
      </View>

      <Button title="Salvar Roteiro" onPress={() => alert('Roteiro salvo!')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginVertical: 10,
  },
  roteiroContainer: {
    marginVertical: 10,
  },
  pontoContainer: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  pontoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  pontoDescription: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default RoteirosScreen;
