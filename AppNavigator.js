import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PontosTuristicosScreen from './PontosTuristicosScreen';
import PerfilScreen from './PerfilScreen';
import UserDetails from './UserDetails'; // Added UserDetails screen

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="PontosTuristicos">
      <Stack.Screen
        name="PontosTuristicos"
        component={PontosTuristicosScreen}
        options={{ title: 'Pontos Turísticos' }}
      />
      <Stack.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{ title: 'Perfil do Usuário' }}
      />
      <Stack.Screen
        name="UserDetails"
        component={UserDetails}  // Added UserDetails screen to navigation
        options={{ title: 'Detalhes do Usuário' }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
