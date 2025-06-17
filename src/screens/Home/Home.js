import React from "react";
import { View, Text } from "react-native";
import  Button from "../../components/Button/Button"
import styles from "./Home.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";


const  Home = ({navigation}) => {    

    const Logout = () => {

    }

    return (
        <View style={styles.container}>
            <Text>Bienvenido a Home!</Text>

            <Button
                title="Logout"
                backgroundColor="red"

            />
        </View>
    );

}

export default Home;