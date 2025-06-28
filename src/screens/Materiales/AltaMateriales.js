import React from "react";
import { TouchableOpacity, Image, Text, Alert } from "react-native";
import InputText from "../../components/InputText/InputText";
import ImageComponent from "../../components/Image/Image";
import { KeyboardAvoidingView, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Button from "../../components/Button/Button";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./AltaMateriales.styles";
import { Picker } from '@react-native-picker/picker';


const AltaMateriales = ({navigation}) => {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");

    const clearFields = () => {
        setName("");
        setCategory("");        
        setImage(null);
    }

    const pickImage = async () => {
    Alert.alert(
        "Seleccionar imagen",
        "¿Desea elegir una foto de la galería o tomar una nueva?",
        [
            {
                text: "Galería",
                onPress: () => launchImagePicker('gallery'),
            },
            {
                text: "Cámara",
                onPress: () => launchImagePicker('camera'),
            },
            { text: "Cancelar", style: "cancel" },
        ],
        { cancelable: true }
    );
};

const launchImagePicker = async (source) => {
    let permissionResult;

    if (source === 'camera') {
        permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    } else {
        permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    if (permissionResult.status !== 'granted') {
        Alert.alert("Permiso requerido", "Necesitamos permiso para acceder a la cámara o galería");
        return;
    }

    let result = await (source === 'camera'
        ? ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        })
        : ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        })
    );

    if (!result.canceled && result.assets) {
        setImage(result.assets[0].uri);
    }
};

    
    const crearArticulo = async () => {

        if(!name) {
                Alert.alert("Ingrese un nombre de articulo");
                return;
        }
        if(!category) {
            Alert.alert("Ingrese una categoria");
            return;
        }            
        if (!image) {
            Alert.alert("Seleccione una imagen");
            return;
        } 
            
        const articulosJson = await AsyncStorage.getItem("articulos");
        const articulos = articulosJson ? JSON.parse(articulosJson) : [];

        if(articulos.length > 0) {

            for (let element of articulos) {
                if (element.name === name) {
                    Alert.alert("Ya existe un Material con este nombre");
                    
                    return; 
                }
            }
        }

        try{

            const articulo = {
                name,
                category,
                image,
            }

            articulos.push(articulo);
            await AsyncStorage.setItem("articulos", JSON.stringify(articulos));

            console.log(articulos);

            Alert.alert(" ",
                "Material ingresado correctamente",
                [{text:"Ok", onPress: () => {}}],
                {cancelable: true}

            );
            clearFields();

        }catch(error){
            console.error(error)
            Alert.alert("Error en el registro de Material");
        }        
            
    }   

    return(
        <View style={styles.view}>
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
                <InputText
                    placeHolder="Nombre Material"
                    onChangeText={setName}
                    minLength={3}
                    maxLength={20}
                    value={name}
                />
                <Picker
                    selectedValue={category}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                    >
                    <Picker.Item label="Seleccione una categoría..." value="" />
                    <Picker.Item label="Plástico" value="plastico" />
                    <Picker.Item label="Papel" value="papel" />
                    <Picker.Item label="Electrónicos" value="electronicos" />
                    <Picker.Item label="Vidrio" value="vidrio" />
                </Picker>             
                <TouchableOpacity onPress={pickImage} style={{ alignItems: "center", marginBottom: 20 }}>
                    {image ? (
                        <ImageComponent
                        source={{ uri: image }}
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
                    title="Crear Articulo"
                    btnColor= "#488f63"
                    customPress={crearArticulo}                    
                />        
            </KeyboardAvoidingView>
        </View>
    );

}

export default AltaMateriales;
