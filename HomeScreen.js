import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logo.png')} // Logo do Tour Recife
        style={styles.logo}
      />
      <Text style={styles.title}>Bem-vindo ao Tour Recife!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PontosTuristicos')} // Navegar para pontos turísticos
      >
        <Text style={styles.buttonText}>Pontos Turísticos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Agenda')} // Navegar para agenda
      >
        <Text style={styles.buttonText}>Agenda Semanal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Perfil')} // Navegar para o perfil
      >
        <Text style={styles.buttonText}>Meu Perfil</Text>
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
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    maxWidth: 350,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
