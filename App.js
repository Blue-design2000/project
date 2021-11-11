import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Connexion from './accueil/Connexion';
import Inscription from './accueil/Inscription';
import mdpOublie from './accueil/mdpOublie';
import Structure from './entreprise/Structure';
import styles from './styles';
const Stack = createNativeStackNavigator();

const App=()=> {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Connexion" component={Connexion} />
      <Stack.Screen name="Inscription" component={Inscription} />
      <Stack.Screen name="mdpOublie" component={mdpOublie} />
      <Stack.Screen name="Structure" component={Structure} />
      
      </Stack.Navigator>
    </NavigationContainer>    
  );
}

export default App

