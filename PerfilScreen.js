import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from './firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function PerfilScreen() {
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [visitedPlaces, setVisitedPlaces] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Função para buscar os dados do usuário
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setFullName(data.fullName || '');
            setLocation(data.location || '');
            setProfileImage(data.profileImage || null);
            setVisitedPlaces(data.visitedPlaces || []);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  // Função para selecionar imagem
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const downloadURL = await uploadImage(result.uri);
        setProfileImage(downloadURL);

        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          await setDoc(userRef, { profileImage: downloadURL }, { merge: true });
        }
        alert('Foto de perfil atualizada com sucesso!');
      } catch (error) {
        console.error('Erro ao enviar a imagem:', error);
        alert('Erro ao atualizar a foto de perfil. Tente novamente.');
      }
    }
  };

  // Função para fazer o upload da imagem no Firebase Storage
  const uploadImage = async (fileUri) => {
    setUploading(true);
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();

      const user = auth.currentUser;
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      const snapshot = await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('Upload bem-sucedido. URL da imagem:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Erro no upload da imagem:', error);
      throw new Error('Erro ao enviar a imagem. Tente novamente.');
    } finally {
      setUploading(false);
    }
  };

  // Função para salvar as alterações do perfil
  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(
          userRef,
          { fullName, location, visitedPlaces },
          { merge: true }
        );
        setIsEditing(false);
      } catch (error) {
        console.error('Erro ao salvar dados do usuário:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      <TouchableOpacity onPress={pickImage}>
        {uploading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : (
          <Image
            source={profileImage ? { uri: profileImage } : require('./assets/default-avatar.png')}
            style={styles.profileImage}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.infoText}>Clique na imagem para alterar a foto de perfil</Text>

      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Reside em"
            value={location}
            onChangeText={setLocation}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.infoText}>Nome: {fullName}</Text>
          <Text style={styles.infoText}>Localização: {location}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.subtitle}>Locais Visitados:</Text>
      {visitedPlaces.length > 0 ? (
        <FlatList
          data={visitedPlaces}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.placeItem}>
              <Text style={styles.placeName}>{item}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noPlaces}>Nenhum local visitado ainda.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#ffa500',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placeItem: {
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
  },
  placeName: {
    fontSize: 16,
  },
  noPlaces: {
    fontSize: 16,
    color: 'gray',
  },
});
