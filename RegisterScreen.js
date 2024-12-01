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
import { auth, db } from './firebaseConfig'; // Importe a configuração do Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Método para criar usuário
import { setDoc, doc } from 'firebase/firestore'; // Para salvar dados no Firestore

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (!fullName || !birthDate) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    // Validação do formato da data de nascimento
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(birthDate)) {
      alert('Por favor, insira a data de nascimento no formato DD/MM/AAAA.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Salvar dados adicionais no Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        birthDate,
        email
      });

      navigation.replace('Home'); // Navega para a tela 'Home' após sucesso
    } catch (error) {
      alert('Erro ao registrar: ' + error.message);
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

            {/* Campo de Nome Completo */}
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              placeholderTextColor="#000"
              value={fullName}
              onChangeText={setFullName}
            />

            {/* Campo de Data de Nascimento */}
            <TextInput
              style={styles.input}
              placeholder="Data de Nascimento (DD/MM/AAAA)"
              placeholderTextColor="#000"
              value={birthDate}
              onChangeText={(text) => {
                const rawText = text.replace(/[^0-9]/g, '');

                let formattedText = rawText;
                if (rawText.length > 2 && rawText.length <= 4) {
                  formattedText = `${rawText.slice(0, 2)}/${rawText.slice(2)}`;
                } else if (rawText.length > 4) {
                  formattedText = `${rawText.slice(0, 2)}/${rawText.slice(2, 4)}/${rawText.slice(4, 8)}`;
                }

                setBirthDate(formattedText);
              }}
              keyboardType="numeric"
              maxLength={10}
            />

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
