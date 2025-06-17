import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import RootStack from './src/routes/RootStack';


console.log("Renderiza App.js", App);

export default function App() {
  return (
    /* <>
      
      <StatusBar style="auto" />
      <RootStack/>
      
    </> */
    
    <View style={styles.container}>
      <Text>¡Hola desde Expo!</Text>      
      <Text>¡chuipala!</Text>
      <RootStack/>
      <StatusBar style="auto" />
    </View>
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
