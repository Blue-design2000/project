import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuClient from "./client/pages/MenuClient";
import Panier from "./client/pages/Panier";
import Connexion from './accueil/Connexion';
import Inscription from './accueil/Inscription';
import mdpOublie from './accueil/mdpOublie';
import Structure from './entreprise/Structure';
import Commandes from './entreprise/pages/Commandes';
import styles from './styles';
const Stack = createNativeStackNavigator();
const App=()=> {
  return (
    <NavigationContainer>
      <Stack.Navigator>    
      <Stack.Screen name="Menuclient" component={MenuClient}/>
      <Stack.Screen name="Connexion" component={Connexion} />
      <Stack.Screen name="Commandes" component={Commandes} />
      <Stack.Screen name="Inscription" component={Inscription} />
      <Stack.Screen name="mdpOublie" component={mdpOublie} />
      <Stack.Screen name="Structure" component={Structure} />
      <Stack.Screen name="Panier" component={Panier} />
      </Stack.Navigator>
    </NavigationContainer>    
  );
}

export default App

