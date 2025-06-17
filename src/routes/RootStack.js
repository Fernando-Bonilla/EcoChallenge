import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import LoginRegister from "../screens/LoginRegister/LoginRegister";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import Home from "../screens/Home/Home";
import { useUser } from "../Context/UserContext";

//const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

const RootStack = () => {
    const {user} = useUser();

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
                    options={{
                        title: user ? `Hola ${user.userName}` : "Bienvenido",
                        headerLeft: () => null,
                    }}
                    
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;