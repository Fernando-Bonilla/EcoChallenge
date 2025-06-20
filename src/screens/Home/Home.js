import React from "react";
import { View, Text } from "react-native";
import  Button from "../../components/Button/Button"
import styles from "./Home.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useUser } from "../../Context/UserContext";

const  Home = ({navigation}) => {    
    const {user, setUser} = useUser();

    const Logout = () => {
        setUser(null);
        navigation.navigate("LoginRegister")
    }

    return (
        <View style={styles.container}>       

            <Button
                title="Alta Retos"
                customPress={() => navigation.navigate("formAlta")}>                
            </Button>    

             <Button
                title="Configuraciones"
                customPress={() => navigation.navigate("Settings")}>                
            </Button>

            <Button
                title="Logout"
                btnColor="#c62100"
                customPress ={Logout}                
            />
        </View>        
    );

}

export default Home;