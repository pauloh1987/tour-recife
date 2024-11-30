import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import { auth } from './firebaseConfig'; // Importe a configuração do Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Método para criar usuário

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password); // Usando o Firebase Authentication
      navigation.replace('Home'); // Navega para a tela 'Home' após sucesso
    } catch (error) {
      alert('Erro ao registrar: ' + error.message); // Exibe erro caso falhe
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <Image 
              source={require('./assets/logo.png')} 
              style={styles.logo} 
            />
            <Text style={styles.title}>Crie sua conta</Text>

            {/* Campo de Email */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#000"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            {/* Campo de Senha */}
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#000"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* Campo de Confirmação de Senha */}
            <TextInput
              style={styles.input}
              placeholder="Confirme a Senha"
              placeholderTextColor="#000"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            {/* Botão de Registrar */}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>

            {/* Link para Login */}
            <TouchableOpacity 
              style={styles.registerButton} 
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.registerText}>Já tem uma conta? Faça login</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    color: '#000',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerButton: {
    marginTop: 20,
  },
  registerText: {
    color: '#007bff',
    fontSize: 16,
    textAlign: 'center',
  },
});
