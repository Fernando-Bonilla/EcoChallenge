import React from "react";
import { View, Text } from "react-native";

import Button from "../../components/Button/Button";

import styles from "./LoginRegister.styles";

const LoginRegister = ({navigation}) => {

    return(
        <View style={styles.view}>            
            <Button
                title="Ingresar"
                customPress={() => navigation.navigate("Login")}>                
            </Button>

            <Button
                title="Registrarse"
                customPress={() => navigation.navigate("Register")}>                
            </Button>

            <Button
                title="Alta Retos"
                customPress={() => navigation.navigate("formAlta")}>                
            </Button>
        </View>
       
    );    

}

export default LoginRegister;