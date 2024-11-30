import React from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logo.png')}  // Logo do Tour Recife (com fundo transparente)
        style={styles.logo}  // Aplica o estilo para logo
      />

      <Text style={styles.title}>Bem-vindo ao Tour Recife!</Text>

      {/* Botões para navegação */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PontosTuristicos')} // Navegação para pontos turísticos
      >
        <Text style={styles.buttonText}>Pontos Turísticos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Agenda')} // Navegação para a tela de agenda semanal
      >
        <Text style={styles.buttonText}>Agenda Semanal</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => console.log('Outra funcionalidade')}>
        <Text style={styles.buttonText}>Outra Funcionalidade</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => console.log('Mais opções')}>
        <Text style={styles.buttonText}>Mais Opções</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 40,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'Arial',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    maxWidth: 350,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
