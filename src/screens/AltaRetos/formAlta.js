import React, { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import stylesForm from "./styleForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../components/Button/Button";
import { KeyboardAvoidingView, ScrollView } from "react-native";

const AltaReto = () => {
    const [userName, setuserName] = useState('');
    const [description, setdescription] = useState('');
    const [category, setcategory] = useState('');
    const [deadline, setdeadline] = useState('');
    const [score, setscore] = useState('');

    const clearFields = () => {       
        setuserName("");
        setdescription("");
        setcategory("");
        setdeadline("");
        setscore("");
    }

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

    const HandleSubmit = () => {

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
    const nuevoReto = {
        userName,
        description,
        category,
        deadline,
        score,
    };

    saveReto(nuevoReto);
    };

   
    const saveReto = async (reto) => {

        try {
            const jsonValue = await AsyncStorage.getItem('arrayRetos');
            let arrayRetos = jsonValue != null ? JSON.parse(jsonValue) : [];
            console.log(arrayRetos)
            arrayRetos.push(reto);
            await AsyncStorage.setItem('arrayRetos', JSON.stringify(arrayRetos));
            console.log('Agregado Correctamente');

            Alert.alert(" ",
                "Reto creado con exito",
                [{ text: "OK", onPress: () => { } }],
                { cancelable: false }
            )
            clearFields();

        } catch {
            console.error('NO FUNCIONA BRO:', error)
        }
    }

    return (          
        <KeyboardAvoidingView behavior="padding" style={{flex: 1, padding: 20}}> 
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
                <Text style={stylesForm.label}>Nombre del Reto</Text>
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
                <Button
                    title="Guardar" customPress={HandleSubmit}
                >
                </Button>
            </ScrollView>
        </KeyboardAvoidingView>
   
    );
};

export default AltaReto; 
