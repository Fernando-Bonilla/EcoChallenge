import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { RootStack } from './src/routes/RootStack';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>¡Hola desde Expo!</Text>      
      <RootStack/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
