import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, StyleSheet, LogBox } from 'react-native';
import { auth } from './firebaseConfig'; // Certifique-se que o caminho esteja correto

// Importação das telas
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import IntroScreen from './IntroScreen';
import PontosTuristicosScreen from './PontosTuristicosScreen';
import DetalhesScreen from './DetalhesScreen';
import AgendaScreen from './AgendaScreen';
import PerfilScreen from './PerfilScreen';
import MainScreen from './MainScreen';
import RoteirosScreen from './RoteirosScreen'; // Ajuste o caminho conforme necessário


// Ignorar certos avisos irrelevantes para facilitar depuração
LogBox.ignoreLogs([
  'Setting a timer for a long period of time',
  'AsyncStorage has been extracted',
]);

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Usuário autenticado:", user); // Log para verificar usuário autenticado
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Tela de carregamento enquanto verifica o estado do usuário
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
        {/* Rota para Login */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }} 
        />
        {/* Rota para Registro */}
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: 'Registrar-se' }} 
        />
        {/* Rota para Tela Inicial */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Tela Inicial' }} 
        />
        {/* Rota para Tela de Introdução */}
        <Stack.Screen 
          name="Intro" 
          component={IntroScreen} 
          options={{ headerShown: false }} 
        />
        {/* Rota para Pontos Turísticos */}
        <Stack.Screen 
          name="PontosTuristicos" 
          component={PontosTuristicosScreen} 
          options={{ title: 'Pontos Turísticos' }} 
        />
        {/* Rota para Detalhes */}
        <Stack.Screen 
          name="Detalhes" 
          component={DetalhesScreen} 
          options={{ title: 'Detalhes do Ponto Turístico' }} 
        />
        {/* Rota para Agenda */}
        <Stack.Screen 
          name="Agenda" 
          component={AgendaScreen} 
          options={{ title: 'Agenda Semanal' }} 
        />
        {/* Rota para Perfil do Usuário */}
        <Stack.Screen 
          name="Perfil" 
          component={PerfilScreen} 
          options={{ title: 'Perfil do Usuário' }} 
        />
        {/* Rota para Tela Principal */}
        <Stack.Screen 
          name="MainScreen" 
          component={MainScreen} 
          options={{ title: 'Tela Principal' }} 
        />
        <Stack.Screen
          name="Roteiros"
          component={RoteirosScreen}
           options={{ title: 'Roteiros Sugeridos' }}
/>

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
