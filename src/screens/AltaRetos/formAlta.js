import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import stylesForm from "./styleForm";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AltaReto = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fechaLimite, setFechaLimite] = useState('');
    const [puntaje, setPuntaje] = useState('');

    const handleSubmit = () => {
    Alert.alert('Reto guardado', `Nombre: ${nombre}\nDescripción: ${descripcion}`);
    };

    const handleChange = (text) => {
        const numericValue = text.replace(/[^0-9]/g, '');

        if (numericValue === '') {
        setPuntaje('');
        } else {
        const number = parseInt(numericValue);
        if (number >= 1 && number <= 10) {
            setPuntaje(numericValue);
        } else if (number > 10) {
            setPuntaje('10'); // Limita a 10
        }
        }
    };

    return (
    <View style={{ padding: 20 }}>
        <Text style={stylesForm.label}>Nombre del Reto</Text>
        <TextInput
        style={stylesForm.input}
        placeholder="Ej: Reto de reciclaje"
        value={nombre}
        onChangeText={setNombre}
        />

        <Text style={stylesForm.label}>Descripción</Text>
        <TextInput
            style={stylesForm.input}
            placeholder="Ej: Recicla 3 botellas"
            value={descripcion}
            onChangeText={setDescripcion}
        />
        <Text style={stylesForm.label}>Categoria</Text>
        <TextInput
            style={stylesForm.input}
            placeholder="Ej: Plástico, Papel, Electrónicos, etc."
            value={categoria}
            onChangeText={setCategoria}
            /> 
        <Text style={stylesForm.label}>Fecha Limite</Text>
        <TextInput
            style={stylesForm.input}
            placeholder="Ej: 01/07/2025"
            value={fechaLimite}
            onChangeText={setFechaLimite}            
        />
        <Text style={stylesForm.label}>Puntaje</Text>
        <TextInput
            style={stylesForm.input}
            placeholder="Escala de 1 al 10"
            value={puntaje}
            onChangeText={handleChange}
            keyboardType="numeric"    // Muestra teclado numérico
            maxLength={2}    
            
        />
        <Button title="Guardar" onPress={handleSubmit} />
    </View>
  );
};

export default AltaReto; 
