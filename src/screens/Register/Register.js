import React from "react";
import { View, Alert, KeyboardAvoidingView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { InputText } from "../../components/InputText/InputText";

import styles from "./Register.styles";

export const Register = ({ navigation }) => {

    const [userName , setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const clearFields = () => {
        setUserName("");
        setEmail("");
        setPassword("");
    }

    const registerUser = async () => { // Aca agregar mas validaciones, por ahora es generico
        if(!userName) {
            Alert.alert("Ingrese un nombre de usuario");
            return;
        }
        if(!email) {
            Alert.alert("Ingrese un email");
            return;
        }
        if(!password) {
            Alert.alert("Ingrese una contraseña valida");
            return;
        }

        try {
            const user = {email, userName, password}
            await AsyncStorage.setItem(email, JSON.stringify(user));
            clearFields();
            Alert.alert(" ",
                "Usuario registrado con exito",
                [{text: "OK", onPress: () => navigation.navigate("Home")}],
                {cancelable: false}
            )
        }
        catch(error) {
            console.error(error)
            Alert.alert("Error en el registro de usuario");
        }
        
    };

    return(
        <View style={styles.view}>
            <KeyboardAvoidingView>
                <InputText
                    placeHolder="Nombre Usuario"
                    onChangeText={setUserName}
                    minLength={3}
                    maxLength={20}
                    value={userName}
                />
                <InputText
                    placeHolder="Email"
                    onChangeText={setEmail}
                    minLength={3}
                    maxLength={20}
                    value={email}
                />
                <InputText
                    placeHolder="Contraseña"
                    onChangeText={setPassword}
                    minLength={3}
                    maxLength={20}
                    value={password}
                    secureTextEntry={true}
                />        
                <Button
                    title="Crear Usuario"
                    customPress={registerUser}
                />        
            </KeyboardAvoidingView>
        </View>
    );

};