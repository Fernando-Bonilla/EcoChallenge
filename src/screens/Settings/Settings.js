import { useState } from "react";
import InputText from "../../components/InputText/InputText";
import Button from "../../components/Button/Button";
import { View } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import ImageComponent from "../../components/Image/Image";

import { useUser } from "../../Context/UserContext";

import styles from "./Settings.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = ({navigation}) => {
    const {user, setUser} = useUser(); // Traemos los datos del current user del contexto
   
    console.log('Usuario en contexto:', user);

    const [originalEmail, setOriginalEmail] = useState(user.email);

    // Variables locales para los inputs
    const [newName, setNewName] = useState(user.userName);
    const [newEmail, setNewEmail] = useState(user.email);
    const [newPassword, setNewPassword] = useState(user.password);
    const [newprofileImage, setNewProfileImage] = useState(user.profileImage);

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
            setNewProfileImage(result.assets[0].uri);
        }
    };



    const updateUserSettings = async () => {
        
        if(!newName) {
            Alert.alert("Ingrese un nombre de usuario");
            return;
        }
        if(!newEmail) {
            Alert.alert("Ingrese un email");
            return;
        }        

        if(!newPassword) {
            Alert.alert("Ingrese una contraseña valida");
            return;
        }
        /* if (!profileImage) {
            Alert.alert("Seleccione una imagen");
            return;
        } */

        /* if(await AsyncStorage.getItem(email)) { 
            console.log("Entra al chequeo email");
            Alert.alert("Ya existe una cuenta con ese email")
            //clearFields();
            return;
        }  */

        if (originalEmail !== newEmail) {
        // Borramos el usuario viejo buscando con el email original
        await AsyncStorage.removeItem(originalEmail);
        }

        try {
            //await AsyncStorage.removeItem(email);

            const userUpdated = {
                userName: newName,
                email: newEmail,
                password: newPassword,
                profileImage: newprofileImage
            };

            setUser(userUpdated); // guardamos los datos nuevos del user en el context

            await AsyncStorage.setItem(newEmail, JSON.stringify(userUpdated));
            setOriginalEmail(newEmail);


            Alert.alert(" ",
                "Datos actualizados con exito",
                [{text: "OK", onPress: () => navigation.navigate("Home")}],
                {cancelable: false}
            )
        }
        catch(error) {
            console.error(error)
            Alert.alert("Error en la actualizacion de datos");
        }       

    };


    return (
        <View style={styles.view}>
            <KeyboardAvoidingView>
                <InputText
                    onChangeText={setNewName}
                    value={newName}
                />
                <InputText
                    onChangeText={setNewEmail}
                    minLength={3}
                    maxLength={20}
                    value={newEmail}                                       
                />

                <InputText
                    onChangeText={setNewPassword}
                    minLength={3}
                    maxLength={20}
                    value={newPassword}
                    secureTextEntry={true}                    
                />
                
                <TouchableOpacity onPress={pickImage} style={{ alignItems: "center", marginBottom: 20 }}>
                    {newprofileImage ? (
                        <ImageComponent
                        source={{ uri: newprofileImage}} // 
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
                    title="Guardar"
                    customPress={updateUserSettings}
                />
            </KeyboardAvoidingView>
        </View>
    );
} 

export default Settings;