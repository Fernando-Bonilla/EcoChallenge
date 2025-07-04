import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserProvider } from './src/Context/UserContext';
import RootStack from './src/routes/RootStack';

// Hardcodeamos un tipo de usuario Admin para poder Aprobar o Rechazar retos

const email = "admin";
const userName = "admin";
const password = "admin";
const profileImage = "";

const user = {

  email,
  userName,
  password,
  profileImage, 

}

AsyncStorage.setItem(email, JSON.stringify(user));

export default function App() {
  return (    
    <UserProvider>
      <View style={styles.container}>      
        <RootStack/>
        <StatusBar style="auto" />
      </View>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
