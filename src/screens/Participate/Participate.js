import { View, Text, TouchableOpacity,TextInput } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../Context/UserContext";
import * as ImagePicker from 'expo-image-picker';
import ImageComponent from "../../components/Image/Image";
import * as Location from 'expo-location';
import { stylesParticipate } from "./Participate.Style";


const Participation = () => {
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState('');
    const [comment, setComment] = useState('');
    const { user } = useUser();
    const [image, setImage] = useState("");
    
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
                setImage(result.assets[0].uri);
            }
        };

    useEffect(() => {
    const cargarRetos = async () => {
        try {
        const items = await AsyncStorage.getItem("arrayRetos");
        if (items) {
            const retosParseados = JSON.parse(items);
            setOptions(retosParseados);
            console.log("Contenido guardado bajo 'arrayRetos':", retosParseados);
        } else {
            console.warn("No se encontró 'arrayRetos' en AsyncStorage");
        }
        } catch (error) {
        console.error("Fallo la obtención de retos:", error);
        }
    };
    cargarRetos();
    }, []);

    const handleSubmit = async () => {
    if (!selected || !comment || !image) {
        alert("Por favor completa todos los campos");
        return;
    }

    try {
        // 🛰️ Pedir permisos de ubicación
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
        alert('Permiso de ubicación denegado');
        return;
        }

        // 📍 Obtener ubicación actual
        const location = await Location.getCurrentPositionAsync({});
        const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        };

        // Crear participación con ubicación incluida
        const nuevaParticipacion = {
        reto: selected,
        comentario: comment,
        imagen: image,
        usuario: user?.userName || "Desconocido",
        ubicacion: coords,
        fecha: new Date().toISOString(),
        };

        const existentes = await AsyncStorage.getItem("participaciones");
        const participaciones = existentes ? JSON.parse(existentes) : [];

        participaciones.push(nuevaParticipacion);
        await AsyncStorage.setItem("participaciones", JSON.stringify(participaciones));

        alert("¡Participación enviada!");
        console.log(nuevaParticipacion);
        setSelected("");
        setComment("");
        setImage("");

    } catch (error) {
        console.error("Error al guardar participación:", error);
    }
};


    return (
  <View style={stylesParticipate.container}>
    <Text style={stylesParticipate.title}>Participación de Retos</Text>
    
    <Picker
      selectedValue={selected}
      onValueChange={(itemValue) => setSelected(itemValue)}
      style={stylesParticipate.picker}
    >
      {options.map((item, index) => (
        <Picker.Item
          label={`${item.category} - ${item.description}`}
          value={item.category}
          key={index}
        />
      ))}
    </Picker>

    <TextInput
      placeholder="Agrega un comentario"
      value={comment}
      onChangeText={(text) => setComment(text)}
      style={stylesParticipate.input}
    />

    <TouchableOpacity onPress={pickImage} style={stylesParticipate.imagePickerContainer}>
      {image ? (
        <ImageComponent
          source={{ uri: image }}
          style={stylesParticipate.imagePreview}
        />
      ) : (
        <View style={stylesParticipate.placeholderImage}>
          <Text>Foto</Text>
        </View>
      )}
    </TouchableOpacity>

    <TouchableOpacity onPress={handleSubmit} style={stylesParticipate.submitButton}>
      <Text style={stylesParticipate.submitText}>Enviar Participación</Text>
    </TouchableOpacity>
  </View>
);

};

    export default Participation;
