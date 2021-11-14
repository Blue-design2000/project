import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuClient from "./client/pages/MenuClient";
import Menu from "./entreprise/pages/Menu";
import Panier from "./client/pages/Panier";
import Connexion from './accueil/Connexion';
import Inscription from './accueil/Inscription';
import mdpOublie from './accueil/mdpOublie';
import Structure from './entreprise/Structure';
import Commandes from './entreprise/pages/Commandes';
const Stack = createNativeStackNavigator();
const App=()=> {
  return (
    <NavigationContainer>
      <Stack.Navigator>    
      <Stack.Screen name="Connexion" component={Connexion} options={{headerShown: false}}/>
      <Stack.Screen name="Inscription" component={Inscription} options={{headerShown: false}}/>
      <Stack.Screen name="mdpOublie" component={mdpOublie} options={{headerShown: false}}/>
      <Stack.Screen name="Structure" component={Structure} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>    
  );
}
export default App

