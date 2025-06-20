import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import stylesForm from "./styleForm";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AltaReto = () => {
    const [userName, setuserName] = useState('');
    const [description, setdescription] = useState('');
    const [category, setcategory] = useState('');
    const [deadline, setdeadline] = useState('');
    const [score, setscore] = useState('');


    const handleChange = (text) => {
        const numericValue = text.replace(/[^0-9]/g, '');

        if (numericValue === '') {
        setscore('');
        } else {
        const number = parseInt(numericValue);
        if (number >= 1 && number <= 10) {
            setscore(numericValue);
        } else if (number > 10) {
            setscore('10'); // Limita a 10
        }
        }
    };

    const registerReto = async () => {
        if (!userName) {
            Alert.alert("Ingresa el nombre del reto");
            return;
        }
        if (!description) {
            Alert.alert("Agrega una descripción del reto");
            return;
        }
        if (!category) {
            Alert.alert("Agrega a que categoria corresponde el reto");
            return;
        }
        if (!deadline) {
            Alert.alert("Ingresa una fecha");
            return;
        }
        if (!score) {
            Alert.alert("Agrega un puntaje");
            return;
        }
    };

    const saveReto = async () => {
        try {
            const reto = { userName, description, category, deadline, score };
            await AsyncStorage.setItem('Retos', JSON.stringify(reto));
            Alert.alert('Reto guardado', `Nombre: ${userName}\nDescripción: ${description}`);
        } catch {
            console.error('no funciona bro:', error)
        }
    }

    return (
    <View style={{ padding: 20 }}>
        <Text style={stylesForm.label}>userName del Reto</Text>
        <TextInput
        style={stylesForm.input}
        placeholder="Ej: Reto de reciclaje"
        value={userName}
        onChangeText={setuserName}
        />

        <Text style={stylesForm.label}>Descripción</Text>
        <TextInput
            style={stylesForm.input}
            placeholder="Ej: Recicla 3 botellas"
            value={description}
            onChangeText={setdescription}
        />
        <Text style={stylesForm.label}>Categoria</Text>
        <TextInput
            style={stylesForm.input}
            placeholder="Ej: Plástico, Papel, Electrónicos, etc."
            value={category}
            onChangeText={setcategory}
            /> 
        <Text style={stylesForm.label}>Fecha Limite</Text>
        <TextInput
            style={stylesForm.input}
            placeholder="Ej: 01/07/2025"
            value={deadline}
            onChangeText={setdeadline}            
        />
        <Text style={stylesForm.label}>Puntaje</Text>
        <TextInput
            style={stylesForm.input}
            placeholder="Escala de 1 al 10"
            value={score}
            onChangeText={handleChange}
            keyboardType="numeric"   
            maxLength={2}    
            
        />
        <Button title="Guardar" onPress={saveReto} />
    </View>
  );
};

export default AltaReto; 
