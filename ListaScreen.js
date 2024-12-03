import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { locais } from './data';

const ListaScreen = ({ navigation }) => {
    return (
        <FlatList
            data={locais}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.itemContainer}
                    onPress={() => navigation.navigate('DetalhesScreen', { spotId: item.id })}
                >
                    <Text style={styles.itemText}>{item.nome}</Text>
                </TouchableOpacity>
            )}
        />
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 18,
    },
});

export default ListaScreen;

useEffect(() => {
  const fetchPoints = async () => {
    const routeId = route.params.routeId;
    const routeDoc = doc(db, 'suggestedRoutes', routeId);
    const routeData = await getDoc(routeDoc);
    if (routeData.exists()) {
      setPoints(routeData.data().points || []);
    }
  };

  fetchPoints();
}, []);
