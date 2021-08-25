import { StatusBar } from 'expo-status-bar';
import styles from '../styles'
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Connexion from './accueil/Connexion';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Connexion" component={Connexion} />
      <Stack.Screen name="Inscription" component={Inscription} />
      <Stack.Screen name="mdpOublie" component={mdpOublie} />
      </Stack.Navigator>
    </NavigationContainer>    </View>
  );
}

