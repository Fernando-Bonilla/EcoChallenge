import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./Button.styles";

const Button = (props) => {
    
    return(       
        <TouchableOpacity style={styles.button}
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