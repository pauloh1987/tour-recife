import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PontosTuristicosScreen from './PontosTuristicosScreen';
import PerfilScreen from './PerfilScreen';

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
    </Stack.Navigator>
  );
}

export default AppNavigator;
