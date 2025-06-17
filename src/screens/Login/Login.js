import React from "react";
import Button from "../../components/Button/Button";
import InputText from "../../components/InputText/InputText";
import { useState } from "react";

const Login = ({navigation}) => {
    
    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");

    const clarFields = () => {       
        setEmailField("");
        setPasswordField("");
    }    

}

export default Login;