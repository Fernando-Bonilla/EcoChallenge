import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { LoginRegister } from "../screens/LoginRegister/LoginRegister";
import { Login } from "../screens/Login/Login";
import { Register } from "../screens/Register/Register";
import { Home } from "../screens/Home/Home";

const Stack = createNativeStackNavigator();

export const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginRegister">
                <Stack.Screen
                    name="LoginRegister"
                    component={LoginRegister}
                    options={{title:"Bienvenido"}}
                />                                    
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{title:"Login"}}
                />  
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{title:"Registrarse"}}
                />                   
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{title:"Home"}}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};