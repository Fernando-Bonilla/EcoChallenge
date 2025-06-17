import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { UserProvider } from './src/Context/UserContext';
import RootStack from './src/routes/RootStack';

console.log("Renderiza App.js", App);

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
