import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Modal, TextInput, TouchableOpacity } from 'react-native';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Certifique-se de que o firebaseConfig exporta o Firestore

export default function AgendaScreen() {
  const [events, setEvents] = useState({});  // Estado para armazenar eventos
  const [modalVisible, setModalVisible] = useState(false);  // Estado para controle do modal
  const [newEvent, setNewEvent] = useState({ day: "Segunda-feira", time: "", description: "" });  // Estado para evento novo

  // Função para carregar eventos do Firestore
  const fetchEvents = () => {
    const eventsRef = collection(db, 'events');  // Refere-se à coleção 'events' no Firestore
    const unsubscribe = onSnapshot(eventsRef, (querySnapshot) => {
      const eventsData = {};  // Objeto para armazenar os eventos organizados por dia
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (!eventsData[data.day]) {
          eventsData[data.day] = [];
        }
        eventsData[data.day].push(`${data.time} - ${data.description}`);
      });

      console.log("Eventos carregados: ", eventsData);  // Mostra os eventos carregados no console
      setEvents(eventsData);  // Atualiza o estado 'events' com os dados carregados
    });

    return unsubscribe;  // Retorna o unsubscribe para limpar o listener quando necessário
  };

  useEffect(() => {
    const unsubscribe = fetchEvents();  // Chama a função para buscar os eventos
    return () => unsubscribe();  // Limpar o listener quando o componente for desmontado
  }, []);

  // Função para adicionar um novo evento ao Firestore
  const handleAddEvent = async () => {
    if (newEvent.time && newEvent.description) {
      try {
        await addDoc(collection(db, 'events'), newEvent);  // Adiciona o evento à coleção 'events'
        setModalVisible(false);  // Fecha o modal após adicionar o evento
        setNewEvent({ day: "Segunda-feira", time: "", description: "" });  // Limpa os campos do novo evento
      } catch (error) {
        console.error("Erro ao adicionar evento: ", error);  // Mostra erro caso não consiga adicionar o evento
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda Semanal</Text>
      <ScrollView>
        {Object.keys(events).length === 0 ? (
          <Text style={styles.noEvents}>Nenhum evento encontrado</Text>
        ) : (
          Object.keys(events).map((day) => (
            <View key={day} style={styles.dayContainer}>
              <Text style={styles.day}>{day}</Text>
              {events[day].map((event, index) => (
                <Text key={index} style={styles.event}>{event}</Text>
              ))}
            </View>
          ))
        )}
      </ScrollView>

      {/* Botão para adicionar evento */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Adicionar Evento</Text>
      </TouchableOpacity>

      {/* Modal para adicionar evento */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Evento</Text>
            <TextInput
              placeholder="Dia (ex: Segunda-feira)"
              value={newEvent.day}
              onChangeText={(text) => setNewEvent({ ...newEvent, day: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Horário (ex: 10:00)"
              value={newEvent.time}
              onChangeText={(text) => setNewEvent({ ...newEvent, time: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Descrição do evento"
              value={newEvent.description}
              onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <Button title="Adicionar" onPress={handleAddEvent} />
              <Button title="Cancelar" onPress={() => setModalVisible(false)} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dayContainer: {
    marginBottom: 16,
  },
  day: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  event: {
    fontSize: 16,
    color: 'gray',
  },
  noEvents: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#0066cc',
    padding: 12,
    borderRadius: 5,
    marginTop: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: '#ddd',
  },
  modalButtons: {
    marginTop: 20,
  },
});
