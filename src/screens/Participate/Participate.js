import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
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
          const hoy = new Date();
          hoy.setHours(0, 0, 0, 0); // misma validacion que en listRetos, para obtener los retos vigentes
            const retosFiltrados = retosParseados.filter((reto) => {
              const fechaReto = new Date(reto.deadline); 
              return fechaReto >= hoy;
            });
          setOptions(retosFiltrados);
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
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso de ubicación denegado');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      const selectedReto = options.find((reto) => reto.userName === selected);
      console.log( `selected: ${selectedReto}`);

      const newParticipation = {
        reto: selectedReto.userName,
        comment: comment,
        img: image,
        user: user.email,
        location: coords,
        date: new Date().toISOString(),
        score: selectedReto.score,
        status: "Pendiente",
      };
      

      const existentes = await AsyncStorage.getItem("participaciones");
      const participaciones = existentes ? JSON.parse(existentes) : [];

      participaciones.push(newParticipation);
      await AsyncStorage.setItem("participaciones", JSON.stringify(participaciones));

      alert("¡Participación enviada!");
      console.log(newParticipation);
      setSelected("");
      setComment("");
      setImage("");

    } catch (error) {
      console.error("Error al guardar participación:", error);
    }
  };


  return (
    //<View style={stylesParticipate.container}>
      <KeyboardAvoidingView behavior="padding" style={{flex: 1, padding: 20}}> 
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
      <Text style={stylesParticipate.title}>Participación de Retos</Text>

      <Picker
        selectedValue={selected}
        onValueChange={(itemValue) => setSelected(itemValue)}
        style={stylesParticipate.picker}
      >
        <Picker.Item label="Selecciona un reto" value="" />
        {options.map((item, index) => (
          <Picker.Item
            label={item.userName} 
            value={item.userName}
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
    
    </ScrollView>
    </KeyboardAvoidingView>
    //</View>
  );

};

export default Participation;
