import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import LoginRegister from "../screens/LoginRegister/LoginRegister";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import Home from "../screens/Home/Home";
import  AltaReto  from "../screens/AltaRetos/formAlta";
import Settings from "../screens/Settings/Settings";

import { useUser } from "../Context/UserContext";
import { ListRetos } from "../screens/AltaRetos/listRetos";
import UpdateRetoForm from "../screens/AltaRetos/updateRetos";

//const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

const RootStack = () => {
    const {user} = useUser();

     console.log(AltaReto)

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginRegister">
                <Stack.Screen
                    name="LoginRegister"
                    component={LoginRegister}
                    options={{title:"Bienvenido",
                        headerLeft: () => null,
                    }}
                />                                    
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{title:"Login"}}
                /> 
                <Stack.Screen
                
                    name="formAlta"
                    component={AltaReto}
                    options={{title:"Alta de reto"}}
                />  
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{title:"Registrarse"}}
                />              
                <Stack.Screen
                    name="listRetos"
                    component={ListRetos}
                    options={{title:"Lista de Retos"}}
                />
                <Stack.Screen
                name="updateRetos"
                component={UpdateRetoForm}
                options={{ title: "Actualizar Reto" }}
                />
                <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={{title:"Configuraciones"}}
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