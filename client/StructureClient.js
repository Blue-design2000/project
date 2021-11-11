import styles from '../styles'
import React from 'react';
import { View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Recherche from './page/Recherche'
const Stack = createMaterialBottomTabNavigator();
const StructureClient=()=>{
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Recherche" component={Recherche} />

      </Stack.Navigator>
    </View>
  );
}
export default StructureClient

