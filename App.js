import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import auth from '@react-native-firebase/auth'; // Importe o Firebase Auth

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

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false); // Pare o indicador de carregamento
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    // Mostra um indicador de carregamento enquanto verifica o estado do usuário
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
