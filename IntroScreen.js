import React, { useEffect, useState } from 'react'; 
import { View, Image, StyleSheet, Animated } from 'react-native';

export default function IntroScreen({ navigation }) {
  const [logoSize] = useState(new Animated.Value(150));  // Tamanho inicial da logo

  useEffect(() => {
    // Anima o tamanho da logo para aumentar ao longo do tempo
    Animated.timing(logoSize, {
      toValue: 500,  // Tamanho final da logo (agora maior)
      duration: 3000, // Duração da animação em milissegundos (3 segundos)
      useNativeDriver: false, // Necessário para animar as propriedades de estilo
    }).start();

    // Navega para a próxima tela após a animação
    setTimeout(() => {
      navigation.replace('Home');  // Ou outra tela desejada
    }, 3500);  // Espera até o final da animação (um pouco mais de 3 segundos)
  }, [logoSize, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./assets/logo.png')} // Logo do Tour Recife
        style={[styles.logo, { width: logoSize, height: logoSize }]}  // Aplica a animação
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',  // Fundo branco
  },
  logo: {
    resizeMode: 'contain',
  },
});
