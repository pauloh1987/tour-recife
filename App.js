import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
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

  useEffect(() => {
    // Verifica se o usuário está logado
    const unsubscribe = auth().onAuthStateChanged(setUser);
    return () => unsubscribe(); // Limpa o listener quando o componente for desmontado
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
        {/* Se o usuário estiver logado, vai para Home */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Registrar-se' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Tela Inicial' }}
        />
        <Stack.Screen
          name="Intro"
          component={IntroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PontosTuristicos"
          component={PontosTuristicosScreen}
          options={{ title: 'Pontos Turísticos' }}
        />
        <Stack.Screen
          name="Detalhes"
          component={DetalhesScreen}
          options={{ title: 'Detalhes do Ponto Turístico' }}
        />
        <Stack.Screen
          name="Agenda"
          component={AgendaScreen}  // Defina a nova tela de agenda aqui
          options={{ title: 'Agenda Semanal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
