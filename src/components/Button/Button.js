import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./Button.styles";

const Button = (props) => {
    const buttonColor = props.btnColor || styles.button.backgroundColor; // si no viene un color por prop, toma el valor por defecto del estilo seteado
    return(       
        <TouchableOpacity 
            style={[styles.button, {backgroundColor: buttonColor}]}
            onPress={props.customPress}>
                <View style={styles.view}>
                    <Text style={styles.text}>
                        {props.title}
                    </Text>
                </View>
        </TouchableOpacity>
    );   
    
} 

export default Button;

{/* <TouchableOpacity style={[styles.button, 
            {backgroundColor: props.btnColor}]}
            onPress={props.customPress}>
                <View style={styles.view}>
                    <Text style={styles.text}>
                        {props.title}
                    </Text>
                </View>
        </TouchableOpacity> */}