import styles from '../styles'
import React from 'react';
import { View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Profil from './pages/Profil';
import Commandes from './pages/Commandes';
import Menu from './pages/Menu'
const Stack = createMaterialBottomTabNavigator();
const StructureEntreprise=()=>{
  return (
      <Stack.Navigator>
        <Stack.Screen name="Commandes" component={Commandes} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Profil" component={Profil} />
      </Stack.Navigator>
  );
}
export default StructureEntreprise

