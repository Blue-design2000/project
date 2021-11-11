import styles from '../styles'
import React from 'react';
import { View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Recherche from './page/Recherche'
const Stack = createMaterialBottomTabNavigator();
const StructureClient=()=>{
  return (
      <Stack.Navigator>
        <Stack.Screen name="MenuClient" component={MenuClient}/>
        <Stack.Screen name="Panier" component={Panier} />
      </Stack.Navigator>
  );
}
export default StructureClient

