import { useState } from "react";
import InputText from "../../components/InputText/InputText";
import Button from "../../components/Button/Button";
import { View } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import ImageComponent from "../../components/Image/Image";
import { Picker } from '@react-native-picker/picker';
import styles from "./UpdateMateriales.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateMateriales = ({navigation, route}) => {    

    const {index, articuloActual} = route.params;

    console.log('articulos en update art:', articuloActual);
    
    // Variables locales para los inputs
    const [newName, setNewName] = useState(articuloActual.name);
    const [newCategory, setNewCategory] = useState(articuloActual.category);    
    const [newImage, setNewImage] = useState(articuloActual.image);

    const pickImage = async () => {
    
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert("Permiso requerido", "Necesitamos permiso para acceder a tus fotos");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], 
            quality: 0.5,
        });

        if (!result.canceled && result.assets) {
            setNewImage(result.assets[0].uri);
        }
    };

    const clearFields = () => {
        setNewName("");
        newCategory("");        
        newImage(null);
    }

    const updateArticulo = async () => {
        
        if(!newName) {
            Alert.alert("Ingrese un nombre de Material");
            return;
        }
        if(!newCategory) {
            Alert.alert("Ingrese una categoria");
            return;
        }  

        /* if (!profileImage) {
            Alert.alert("Seleccione una imagen");
            return;
        } */     

        try {
            
            const articulos = await AsyncStorage.getItem("articulos");
            const articulosParseados = JSON.parse(articulos);
            articulosParseados.splice(index, 1); // eliminamos el articulo en el index recibido por prop

            const articuloUpdated = {
                name: newName,
                category: newCategory,                
                image: newImage
            };
            
            articulosParseados.push(articuloUpdated);
            await AsyncStorage.setItem("articulos", JSON.stringify(articulosParseados)); //guardamos el articulo "updateado"

            //clearFields();

            Alert.alert(" ",
                "Datos actualizados con exito",
                [{text: "OK", onPress: () => navigation.replace("ListMateriales")}],
                {cancelable: false}
            )
        }
        catch(error) {
            console.error(error)
            Alert.alert("Error en la actualizacion de datos");
        }       

    };

    return (
        <View style={styles.view}>
            <KeyboardAvoidingView>
                <InputText
                    onChangeText={setNewName}
                    value={newName}
                />
                <Text style={styles.label}>Categoria</Text>
                <Picker
                    selectedValue={newCategory}
                    onValueChange={(itemValue) => setNewCategory(itemValue)}
                    >
                    <Picker.Item label="Seleccione una categoría..." value="" />
                    <Picker.Item label="Plástico" value="plastico" />
                    <Picker.Item label="Papel" value="papel" />
                    <Picker.Item label="Electrónicos" value="electronicos" />
                    <Picker.Item label="Vidrio" value="vidrio" />
                </Picker>

                <TouchableOpacity onPress={pickImage} style={{ alignItems: "center", marginBottom: 20 }}>
                    {newImage ? (
                        <ImageComponent
                        source={{ uri: newImage}} // 
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                        />
                    ) : (
                        <View style={{
                        width: 100, height: 100, borderRadius: 50, backgroundColor: "#eee",
                        alignItems: "center", justifyContent: "center", marginBottom: 10
                        }}>
                        <Text>foto</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <Button
                    title="Guardar"
                    customPress={updateArticulo}
                />
            </KeyboardAvoidingView>
        </View>
    );
} 

export default UpdateMateriales;