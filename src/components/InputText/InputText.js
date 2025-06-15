import React from "react";
import {stylesheet, TextInput, View} from "react-native";
import styles from "./InputText.styles";

export const InputText = (props) => {
    return(
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                maxLength={props.maxLength}
                minLength={props.minLength}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                placeholderTextColor="grey"
                secureTextEntry={props.secureTextEntry}
                value={props.value}>
            </TextInput>
        </View>
    )
}