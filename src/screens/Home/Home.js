import React from "react";
import { View, Text } from "react-native";
import styles from "./Home.styles";

const Home = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Text>Bienvenido a Home!</Text>
        </View>
    );

}

export default Home;