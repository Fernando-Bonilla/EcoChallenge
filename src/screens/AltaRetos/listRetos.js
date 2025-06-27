import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { styleListRetos } from "./styleListRetos";

export function ListRetos() {
  const [reto, setReto] = useState([]);
  const navigation = useNavigation();

  const confirmDelete = (indexToDelete) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Deseás eliminar este reto, brother?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => handleDelete(indexToDelete)
        }
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async (indexToDelete) => {
    try {
      const nuevosRetos = reto.filter((_, index) => index !== indexToDelete);
      setReto(nuevosRetos);
      await AsyncStorage.setItem('arrayRetos', JSON.stringify(nuevosRetos));
      Alert.alert('Reto eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el reto:', error);
    }
  };


  useFocusEffect(
    useCallback(() => {
      const chargeRetos = async () => {
        try {
          const items = await AsyncStorage.getItem("arrayRetos");
          if (items) {
            console.log("Contenido guardado bajo 'Retos':", items);
            const retosParseados = JSON.parse(items);            
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0); // Quita hora, dejar solo día para evitar errores en fechas vigentes de retos
              const retosFiltrados = retosParseados.filter((reto) => {
                const fechaReto = new Date(reto.deadline); 
                return fechaReto >= hoy;
              });
              setReto(retosFiltrados);
          } else {
            setReto([]);
            console.warn("No se encontró 'Retos' en AsyncStorage");
          }
        } catch (error) {
          console.error("Fallo la obtención de retos:", error);
        }
      };

      chargeRetos();
    }, [])
  );

  return (
    //<View style={styleListRetos.container}>
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1, padding: 20 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
        {reto.length > 0 ? (
          reto.map((reto, index) => (
            <View key={index} style={styleListRetos.cardWrapper}>
              <Card
                userName={reto.userName}
                description={reto.description}
                category={reto.category}
                deadline={reto.deadline}
                score={reto.score}
              />
              <View style={styleListRetos.buttonGroup}>
                <Button
                  title="Eliminar"
                  customPress={() => confirmDelete(index)}
                />
                <Button
                  title="Actualizar"
                  customPress={() =>
                    navigation.navigate("updateRetos", {
                      index: index,
                      retoActual: reto,
                    })
                  }
                />

              </View>
            </View>
          ))
        ) : (
          <Text style={styleListRetos.emptyText}>
            No hay retos para mostrar.
          </Text>
        )}
        <Button
          title="Agregar Reto"
          customPress={() =>
            navigation.navigate("formAlta")
          }
        />
      </ScrollView>
    </KeyboardAvoidingView>
    //</View>
  );

}