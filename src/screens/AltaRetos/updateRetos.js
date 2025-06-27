import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import stylesForm from "./styleForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, TouchableOpacity } from 'react-native';




const UpdateRetoForm = ({ route, navigation }) => {

    const updateRetoInStorage = async (indexUpdate, newData) => {
    try {
        const arrayRetos = await AsyncStorage.getItem('arrayRetos');
        const retosParseados = arrayRetos ? JSON.parse(arrayRetos) : [];

        if (indexUpdate < 0 || indexUpdate >= retosParseados.length) {
        Alert.alert("Índice inválido para actualizar");
        return false;
        }

        const nuevosRetos = retosParseados.map((item, index) =>
        index === indexUpdate ? { ...item, ...newData } : item
        );
        console.log(nuevosRetos)
        await AsyncStorage.setItem('arrayRetos', JSON.stringify(nuevosRetos));
        Alert.alert("Reto actualizado con éxito");
        return true;
    } catch (error) {
        console.error("Error al actualizar el reto:", error);
        Alert.alert("Ocurrió un error al actualizar el reto");
        return false;
    }
    };

  // Recibimos el index y los datos actuales del reto a editar
  const { index, retoActual } = route.params;

  const [userName, setUserName] = useState(retoActual.userName);
  const [description, setDescription] = useState(retoActual.description);
  const [category, setCategory] = useState(retoActual.category);
  const [deadline, setDeadline] = useState(retoActual.deadline);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [score, setScore] = useState(retoActual.score);
  

  const handleChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');

    if (numericValue === '') {
      setScore('');
    } else {
      const number = parseInt(numericValue);
      if (number >= 1 && number <= 10) {
        setScore(numericValue);
      } else if (number > 10) {
        setScore('10'); // Limita a 10
      }
    }
  };

  const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`; // formato YYYY-MM-DD
};

const handleDateChange = (event, date) => {
  setShowDatePicker(Platform.OS === 'ios');

  if (date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      Alert.alert("Fecha inválida", "No puedes seleccionar una fecha pasada.");
      return;
    }

    setSelectedDate(date);
    setDeadline(formatDate(date));
  }
};



  const handleSubmit = async () => {
    if (!userName || !description || !category || !deadline || !score) {
      Alert.alert("Por favor, completa todos los campos");
      return;
    }

    const nuevoReto = {
      userName,
      description,
      category,
      deadline,
      score,
    };

    const success = await updateRetoInStorage(index, nuevoReto);
    if (success) {
      navigation.goBack(); // Volver a la lista tras actualizar
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={stylesForm.label}>Nombre del Reto</Text>
      <TextInput
        style={stylesForm.input}
        placeholder="Ej: Reto de reciclaje"
        value={userName}
        onChangeText={setUserName}
      />
      <Text style={stylesForm.label}>Descripción</Text>
      <TextInput
        style={stylesForm.input}
        placeholder="Ej: Recicla 3 botellas"
        value={description}
        onChangeText={setDescription}
      />
      <Text style={stylesForm.label}>Categoria</Text>
      <TextInput
        style={stylesForm.input}
        placeholder="Ej: Plástico, Papel, Electrónicos, etc."
        value={category}
        onChangeText={setCategory}
      />
      <Text style={stylesForm.label}>Fecha Límite</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={stylesForm.input}>
        <Text>{selectedDate ? selectedDate.toLocaleDateString() : 'Selecciona una fecha'}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={stylesForm.label}>Puntaje</Text>
      <TextInput
        style={stylesForm.input}
        placeholder="Escala de 1 al 10"
        value={score}
        onChangeText={handleChange}
        keyboardType="numeric"
        maxLength={2}
      />
      <Button title="Guardar" onPress={handleSubmit} />
    </View>
  );
};

export default UpdateRetoForm;
