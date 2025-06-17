import React from "react";
import Button from "../../components/Button/Button";
import InputText from "../../components/InputText/InputText";
import { View, KeyboardAvoidingView, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../Context/UserContext";

import styles from "../LoginRegister/LoginRegister.styles";

const Login = ({navigation}) => {
    
    const {setUser} = useUser(); // aca usamos el setUser para guardar los datos del user en la sesion actual
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const clearFields = () => {       
        setEmail("");
        setPassword("");
    }

    const loginUser = async () => {

        if(!email) {
            Alert.alert("Debe ingresar un email");
            return;
        }
        
        if(!password) {
            Alert.alert("Debe ingresar su contraseña");
            return;
        }

        try {
            const userData = await AsyncStorage.getItem(email);           
            clearFields();
            console.log(userData);

            if(!userData) {
                Alert.alert(" ",
                    "Usuario no existente",
                    [{text: "OK", onPress: () => {} }],
                    {cancelable: true}
                );

                return;
            }

            const user = JSON.parse(userData);
            if(user.password != password) {
                Alert.alert(" ",
                    "Contraseña incorrecta",
                    [{text: "Ok", onPress: () => {} }],
                    {cancelable: true}
                );

                return;
            }
            
            // Si los datos son correctos lo mandamos a la HomePage
            setUser(user); // aca guardamos los datos del user actual
            navigation.navigate("Home");            
            
        }
        catch(error) {
            console.error(error)
            Alert.alert(
                "Error en inicio de sesion",
                "Error sesion",
                [{text: "Ok", onPress: () => {} }],
                {cancelable: true}

            );
        }

    }

    return(
        <View style={styles.view}>
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>                
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
                    title="Ingresar"
                    customPress={loginUser}
                />        
            </KeyboardAvoidingView>
        </View>
    );

}

export default Login;