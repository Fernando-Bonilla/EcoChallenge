import React from "react";
import { TextInput, View } from "react-native";
import styles from "./InputText.styles";

const InputText = (props) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                maxLength={props.maxLength}
                minLength={props.minLength}
                onChangeText={props.onChangeText}
                placeholder={props.placeHolder}
                placeholderTextColor="grey"
                secureTextEntry={props.secureTextEntry}
                value={props.value}
            />
        </View>
    );
};

export default InputText;
