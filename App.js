import styles from './styles'
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Connexion from './accueil/Connexion';
import Inscription from './accueil/Inscription';
import mdpOublie from './accueil/mdpOublie';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Connexion" component={Connexion} />
      <Stack.Screen name="Inscription" component={Inscription} />
      <Stack.Screen name="mdpOublie" component={mdpOublie} />
      </Stack.Navigator>
    </NavigationContainer>    </View>
  );
}

