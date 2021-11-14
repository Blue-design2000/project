import styles from '../styles'
import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profil from './pages/Profil';
import Commandes from './pages/Commandes';
import MenuClient from '../client/pages/MenuClient'
import Panier from '../client/pages/Panier'
import Menu from './pages/Menu'
const Stack = createBottomTabNavigator();
const Structure=()=>{
  return (
      <Stack.Navigator>
        <Stack.Screen name="MenuClient" component={MenuClient} options={{headerShown: false}}/>
        <Stack.Screen name="Panier" component={Panier} options={{headerShown: false}}/>
        <Stack.Screen name="Commandes" component={Commandes} options={{headerShown: false}}/>
        <Stack.Screen name="Menu" component={Menu} options={{headerShown: false}}/>
        <Stack.Screen name="Profil" component={Profil} options={{headerShown: false}}/>
      </Stack.Navigator>
  );
}
export default Structure

