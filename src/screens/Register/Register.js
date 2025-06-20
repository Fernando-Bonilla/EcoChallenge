import React from "react";
import { View, Alert, KeyboardAvoidingView, Image, Text } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
import Button from "../../components/Button/Button";
import { TouchableOpacity } from "react-native";
import InputText from "../../components/InputText/InputText";
import ImageComponent from "../../components/Image/Image";
import { useUser } from "../../Context/UserContext";
import styles from "./Register.styles";

const Register = ({navigation}) => {

    const {setUser} = useUser();

    const [userName , setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState(null);

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
            setProfileImage(result.assets[0].uri);
        }
    };

    const clearFields = () => {
        setUserName("");
        setEmail("");
        setPassword("");
        setProfileImage(null);
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
        /* if (!profileImage) {
            Alert.alert("Seleccione una imagen");
            return;
        } */

        if(await AsyncStorage.getItem(email)) { // Esto no me gusta porque ya da informacion, pero no me queda otra
            console.log("Entra al chequeo email");
            Alert.alert("Ya existe una cuenta con ese email")
            clearFields();
            return;
        }

        try {
            const user = {email, userName, password, profileImage}
            setUser(user); // guardamos los datos del user en el context
            await AsyncStorage.setItem(email, JSON.stringify(user));
            //clearFields();
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
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
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

                <TouchableOpacity onPress={pickImage} style={{ alignItems: "center", marginBottom: 20 }}>
                    {profileImage ? (
                        <ImageComponent
                        source={{ uri: profileImage }}
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                        />
                    ) : (
                        <View style={{
                        width: 100, height: 100, borderRadius: 50, backgroundColor: "#eee",
                        alignItems: "center", justifyContent: "center", marginBottom: 10
                        }}>
                        <Text>Seleccionar foto</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {console.log("en el register: ", profileImage)}
                <Button
                    title="Crear Usuario"
                    customPress={registerUser}
                />        
            </KeyboardAvoidingView>
        </View>
    );

};

export default Register;