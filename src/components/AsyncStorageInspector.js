import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageInspector = () => {
  const [data, setData] = useState([]);

  const cargarDatos = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(keys);
      setData(values);
    } catch (error) {
      console.log("Error al cargar AsyncStorage:", error);
    }
  };

  const borrarTodo = async () => {
    await AsyncStorage.clear();
    setData([]);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🔍 AsyncStorage Inspector</Text>
      <Button title="Recargar datos" onPress={cargarDatos} />
      <Button title="🗑️ Borrar todo" color="red" onPress={borrarTodo} />

      <ScrollView style={styles.scroll}>
        {data.length === 0 ? (
          <Text style={styles.vacio}>No hay datos en AsyncStorage</Text>
        ) : (
          data.map(([key, value]) => (
            <View key={key} style={styles.item}>
              <Text style={styles.clave}>{key}:</Text>
              <Text>{value}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  scroll: { marginTop: 10 },
  item: { marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 5 },
  clave: { fontWeight: 'bold', color: '#333' },
  vacio: { marginTop: 20, fontStyle: 'italic', color: '#888' },
});

export default AsyncStorageInspector;
