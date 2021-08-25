import styles from '../styles'
import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profil from './pages/Profil';
import Commandes from './pages/Commandes';
import Menu from './pages/Menu'
const Stack = createBottomTabNavigator();
const Structure=()=>{
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Commandes" component={Commandes} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Profil" component={Profil} />
      </Stack.Navigator>
    </View>
  );
}
export default Structure

