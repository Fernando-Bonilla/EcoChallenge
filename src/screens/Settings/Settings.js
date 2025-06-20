import { useState } from "react";
import InputText from "../../components/InputText/InputText";
import Button from "../../components/Button/Button";
import { View } from "react-native";
import { KeyboardAvoidingView } from "react-native";

import { useUser } from "../../Context/UserContext";

import styles from "./Settings.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = ({navigation}) => {
    const {user, setUser} = useUser(); // Traemos los datos del current user del contexto

    /* if (!user || !user.userName) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Cargando usuario...</Text>
            </View>
        );
    } */
    console.log('Usuario en contexto:', user);

    const [originalEmail, setOriginalEmail] = useState(user.email);

/*     const [userName, setUserName] = useState(user.userName);
    const [password, setPassword] = useState(user.password);
    const [email, setEmail] = useState(user.email);    
    const [profileImage, setProfileImage] = useState(user.profileImage);
 */

    // Variables locales para los inputs
    const [newName, setNewName] = useState(user.userName);
    const [newEmail, setNewEmail] = useState(user.email);
    const [newPassword, setNewPassword] = useState(user.password);
    //const [newprofileImage, setNewProfileImage] = useState(user.profileImage);


    const clearFields = () => {
        setNewName("");
        setNewEmail("");
        setNewPassword("");
        setNewProfileImage(null);
    }

    const updateUserSettings = async () => {
        
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

        if(await AsyncStorage.getItem(email)) { 
            console.log("Entra al chequeo email");
            Alert.alert("Ya existe una cuenta con ese email")
            //clearFields();
            return;
        } 

        if (originalEmail !== email) {
        // Borramos el usuario viejo buscando con el email original
        await AsyncStorage.removeItem(originalEmail);
        }

        try {
            await AsyncStorage.removeItem(email);

            const userUpdated = {
                userName: newName,
                email: newEmail,
                password: newPassword,
                //profileImage: newrofileImage
            };

            setUser(userUpdated); // guardamos los datos nuevos del user en el context

            await AsyncStorage.setItem(email, JSON.stringify(userUpdated));
            setOriginalEmail(email);

            clearFields();

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
                    value={userName}
                />
                <InputText
                    onChangeText={setNewEmail}
                    minLength={3}
                    maxLength={20}
                    value={email}                                       
                />

                <InputText
                    onChangeText={setNewPassword}
                    minLength={3}
                    maxLength={20}
                    value=""
                    secureTextEntry={true}                    
                />
                <Button
                    title="Guardar"
                    customPress={updateUserSettings}
                />
            </KeyboardAvoidingView>
        </View>
    );
} 

export default Settings;