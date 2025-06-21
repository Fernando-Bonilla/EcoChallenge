import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Alert } from "react-native";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';



export  function ListRetos() {
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
          const retosParseados = JSON.parse(items);
          setReto(retosParseados);
          console.log("Contenido guardado bajo 'Retos':", items);
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
        <View>
        {reto.length > 0 ? (
        reto.map((reto, index) => (
            <View key={index}>
            <Card
                userName={reto.userName}
                description={reto.description}
                category={reto.category}
                deadline={reto.deadline}
                score={reto.score}
            />
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
              }/>
            </View>
        ))
        ) : (
        <Text>No hay retos para mostrar. {JSON.stringify(reto)}</Text>
        )}

        </View>
    );
}