import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Connexion from './accueil/Connexion';
import InscriptionEntreprise from './accueil/InscriptionEntreprise';
import InscriptionClient from './accueil/InscriptionClient';
import mdpOublie from './accueil/mdpOublie';
import StructureEntreprise from './entreprise/StructureEntreprise';
import StructureClient from './entreprise/StructureClient';

import styles from './styles';
const Stack = createNativeStackNavigator();
const App=()=> {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="ConnexionClient" component={Connexion} />
      <Stack.Screen name="InscriptionClient" component={InscriptionClient} />
      <Stack.Screen name="InscriptionEntreprise" component={InscriptionEntreprise} />
      <Stack.Screen name="mdpOublie" component={mdpOublie} />
      <Stack.Screen name="StructureEntreprise" component={StructureEntreprise} />
      <Stack.Screen name="StructureClient" component={StructureClient} />
      
      </Stack.Navigator>
    </NavigationContainer>    
  );
}
export default App

