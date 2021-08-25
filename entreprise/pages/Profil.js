import styles from '../styles'
import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Profil from './pages/Profil';
import Commandes from './pages/Commandes';
import Menu from './pages/Menu'
const Stack = createMaterialTopTabNavigator();
const Profil=()=>{
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Compta" component={Commandes} />
        <Stack.Screen name="Employe" component={Menu} />
        <Stack.Screen name="InfoPerso" component={Profil} />
      </Stack.Navigator>
    </View>
  );
}
export default Profil