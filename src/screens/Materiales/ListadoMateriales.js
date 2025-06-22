import { View, Text, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";

import { useState } from "react";
import styles from "./ListadoMateriales.styles";

const ListMateriales = ({navigation}) => {
    const [articulos, setArticulos] = useState([]);

    const confirmDelete = (indexToDelete) => {

        Alert.alert(
            "Confirmar eliminación",
            "¿Deseás eliminar este Material?",
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

            const listaArticulosFiltrada = articulos.filter((_, index) => index !== indexToDelete);
            setArticulos(listaArticulosFiltrada);

            await AsyncStorage.setItem('articulos', JSON.stringify(listaArticulosFiltrada));

            Alert.alert(" ",
                "Material eliminado con exito",
                [{ text: "OK", onPress: () => { } }],
                { cancelable: false }
            )

        } catch (error) {
            console.error('Error al eliminar el articulo:', error);
            Alert.alert("Error al intentar eliminar el material");
        }
    };

    useFocusEffect(
        useCallback(() => {
            const chargeArticulos = async () => {

                try {

                    const items = await AsyncStorage.getItem("articulos");
                    if (items) {

                        const articulosParseados = JSON.parse(items);
                        setArticulos(articulosParseados);
                        console.log("Contenido guardado en 'Articulos':", items);

                    } else {

                        setArticulos([]);

                        Alert.alert(" ",
                            "No se encontraron Materiales, ingrese nuevos para ver el listado aqui",
                            [{ text: "OK", onPress: () => navigation.navigate("Home") }],
                            { cancelable: false }
                        )

                    }
                } catch (error) {

                    console.error("Fallo la obtención de articulos:", error);

                    Alert.alert(" ",
                        "Error al cargar la lista de Materiales",
                        [{ text: "OK", onPress: () => navigation.navigate("Home") }],
                        { cancelable: false }
                    )
                }
            };

            chargeArticulos();
        }, [])
    );

    return (
        <View style={styles.view}>
            {articulos.length > 0 ? (
                articulos.map((articulo, index) => (
                    <View key={index}>

                        <Text>Articulo: {articulo.name}</Text>
                        <Text>Categoria: {articulo.category}</Text>

                        <Button
                            title="Eliminar"
                            customPress={() => confirmDelete(index)}
                        />
                        <Button
                            title="Editar"
                            customPress={() =>
                                navigation.navigate("UpdateMateriales", {
                                    index: index,
                                    articuloActual: articulo,
                                })
                            }
                        />
                    </View>
                ))
            ) : (
                <Text>No hay articulos para mostrar.</Text>
            )}

        </View>
    );



}

export default ListMateriales;