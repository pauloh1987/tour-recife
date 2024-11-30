import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { auth } from './firebaseConfig';
; // Importe o Auth do Firebase modular

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import IntroScreen from './IntroScreen';
import PontosTuristicosScreen from './PontosTuristicosScreen';
import DetalhesScreen from './DetalhesScreen';
import AgendaScreen from './AgendaScreen'; // Importe a tela de agenda

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitorar o estado de autenticação
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      console.log("Estado do usuário:", currentUser); // Adicionei um log aqui para monitorar o estado
      setUser(currentUser ? currentUser : null); // Se o usuário não estiver logado, seta como null
      setLoading(false); // Para o carregamento
    });

    // Cleanup para evitar vazamentos de memória
    return () => unsubscribe();
  }, []);

  if (loading) {
    // Enquanto o estado de autenticação está sendo verificado
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  console.log("Usuário está logado?", user); // Monitorando o estado do usuário

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrar-se' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Tela Inicial' }} />
        <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PontosTuristicos" component={PontosTuristicosScreen} options={{ title: 'Pontos Turísticos' }} />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} options={{ title: 'Detalhes do Ponto Turístico' }} />
        <Stack.Screen name="Agenda" component={AgendaScreen} options={{ title: 'Agenda Semanal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
